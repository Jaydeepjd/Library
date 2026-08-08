<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Business Cards', 'slug' => 'business-cards', 'description' => 'Premium business cards for modern businesses.'],
            ['name' => 'Brochures', 'slug' => 'brochures', 'description' => 'High-quality brochures for marketing campaigns.'],
            ['name' => 'Posters', 'slug' => 'posters', 'description' => 'Vibrant posters for events and promotions.'],
            ['name' => 'Signage', 'slug' => 'signage', 'description' => 'Indoor and outdoor signage solutions.'],
            ['name' => 'Labels', 'slug' => 'labels', 'description' => 'Custom labels for packaging and products.'],
            ['name' => 'Banners', 'slug' => 'banners', 'description' => 'Large format banners for exhibitions.'],
            ['name' => 'Stickers', 'slug' => 'stickers', 'description' => 'Custom stickers for branding and promotion.'],
            ['name' => 'Packaging', 'slug' => 'packaging', 'description' => 'Packaging materials for retail products.'],
        ];

        foreach ($categories as $category) {
            Category::query()->firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
