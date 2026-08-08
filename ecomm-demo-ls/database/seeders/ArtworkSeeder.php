<?php

namespace Database\Seeders;

use App\Models\Artwork;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArtworkSeeder extends Seeder
{
    public function run(): void
    {
        $order = Order::query()->first();
        $user = User::query()->where('email', 'customer@example.com')->first();

        if (! $order) {
            return;
        }

        Artwork::query()->create([
            'order_id' => $order->id,
            'user_id' => $user?->id,
            'file_name' => 'artwork.pdf',
            'file_path' => 'artworks/artwork.pdf',
            'mime_type' => 'application/pdf',
            'file_size' => 102400,
            'uploaded_at' => now(),
            'status' => 'uploaded',
        ]);
    }
}
