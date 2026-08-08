<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductMaterial;
use Illuminate\Database\Seeder;

class ProductMaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            ['name' => 'Standard', 'price_multiplier' => 1.00],
            ['name' => 'Premium', 'price_multiplier' => 1.25],
            ['name' => 'Luxury', 'price_multiplier' => 1.50],
        ];

        foreach (Product::query()->cursor() as $product) {
            foreach ($materials as $material) {
                ProductMaterial::query()->firstOrCreate([
                    'product_id' => $product->id,
                    'name' => $material['name'],
                ], [
                    'product_id' => $product->id,
                    'name' => $material['name'],
                    'price_multiplier' => $material['price_multiplier'],
                    'status' => true,
                ]);
            }
        }
    }
}
