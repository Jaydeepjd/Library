<?php

namespace App\Services;

use App\Models\Artwork;
use App\Models\Order;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class ArtworkUploadService
{
    public function generateSecureToken(): string
    {
        return bin2hex(random_bytes(32));
    }

    public function assignToken(Order $order, int $days = 7): string
    {
        $token = $this->generateSecureToken();
        $order->artwork_token = $token;
        $order->artwork_token_expires_at = Carbon::now()->addDays($days);
        $order->save();

        return $token;
    }

    public function isTokenValid(Order $order, string $token): bool
    {
        if (empty($token) || empty($order->artwork_token)) {
            return false;
        }

        if ($order->artwork_token !== $token) {
            return false;
        }

        if ($order->payment_status !== 'paid') {
            return false;
        }

        if (! $order->artwork_token_expires_at) {
            return false;
        }

        return Carbon::now()->lte($order->artwork_token_expires_at);
    }

    public function upload(Order $order, string $token, UploadedFile $file): Artwork
    {
        if (! $this->isTokenValid($order, $token)) {
            throw new InvalidArgumentException('Invalid or expired upload token.');
        }

        $this->assertFileIsAllowed($file);

        $existing = $order->artwork()->where('status', 'uploaded')->first();
        if ($existing) {
            throw new InvalidArgumentException('Artwork has already been uploaded for this order.');
        }

        $originalName = $this->sanitizeFileName($file->getClientOriginalName());
        $extension = strtolower($file->getClientOriginalExtension());
        $path = $file->storeAs('artworks/' . $order->id, $order->id . '-' . Str::uuid() . '.' . $extension, 'private');

        $artwork = $order->artwork()->create([
            'user_id' => $order->user_id,
            'file_name' => $originalName,
            'file_path' => $path,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'uploaded_at' => Carbon::now(),
            'status' => 'uploaded',
        ]);

        return $artwork;
    }

    public function assertFileIsAllowed(UploadedFile $file): void
    {
        $allowedExtensions = ['pdf', 'png', 'ai'];
        $allowedMimeTypes = [
            'application/pdf',
            'image/png',
            'application/postscript',
            'application/octet-stream',
        ];

        $extension = strtolower($file->getClientOriginalExtension());
        if (! in_array($extension, $allowedExtensions, true)) {
            throw new InvalidArgumentException('Invalid file extension.');
        }

        if ($file->getSize() > 50 * 1024 * 1024) {
            throw new InvalidArgumentException('File exceeds 50MB limit.');
        }

        $mimeType = $file->getMimeType();
        if (! in_array($mimeType, $allowedMimeTypes, true)) {
            throw new InvalidArgumentException('Invalid file type.');
        }

        if ($file->getError() !== UPLOAD_ERR_OK) {
            throw new InvalidArgumentException('File upload failed.');
        }
    }

    public function sanitizeFileName(string $name): string
    {
        $name = basename($name);
        $name = str_replace(['..', '/', '\\'], '', $name);

        return $name;
    }
}
