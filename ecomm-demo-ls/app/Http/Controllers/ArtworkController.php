<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtworkUploadRequest;
use App\Models\Order;
use App\Services\ArtworkUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;
use InvalidArgumentException;

class ArtworkController extends Controller
{
    public function __construct(private readonly ArtworkUploadService $artworkUploadService)
    {
    }

    public function showUploadForm(string $token): View|RedirectResponse
    {
        $order = Order::query()->where('artwork_token', $token)->first();
        if (! $order) {
            return redirect()->route('home')->with('error', 'Invalid upload link.');
        }

        if (! $this->artworkUploadService->isTokenValid($order, $token)) {
            return redirect()->route('home')->with('error', 'This upload link has expired.');
        }

        return view('artwork.upload', compact('order', 'token'));
    }

    public function upload(string $token, ArtworkUploadRequest $request): RedirectResponse
    {
        $order = Order::query()->where('artwork_token', $token)->first();
        if (! $order) {
            return redirect()->route('home')->with('error', 'Invalid upload link.');
        }

        try {
            $this->artworkUploadService->upload($order, $token, $request->file('artwork'));

            return redirect()->route('home')->with('status', 'Artwork uploaded successfully.');
        } catch (InvalidArgumentException $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }
    }
}
