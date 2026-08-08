<?php

namespace Database\Seeders;

use App\Models\Quote;
use Illuminate\Database\Seeder;

class QuoteSeeder extends Seeder
{
    public function run(): void
    {
        Quote::query()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'product_type' => 'Brochure',
            'size' => 'A4',
            'quantity' => 250,
            'message' => 'Please send a custom quote for a corporate brochure campaign.',
            'status' => 'pending',
        ]);

        Quote::query()->create([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'product_type' => 'Business Cards',
            'size' => '85x55mm',
            'quantity' => 1000,
            'message' => 'We need premium cards with foil finishing.',
            'status' => 'responded',
            'admin_response' => 'We can deliver within 5 business days.',
        ]);
    }
}
