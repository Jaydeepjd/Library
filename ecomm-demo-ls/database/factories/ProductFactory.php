<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::query()->inRandomOrder()->first()?->id ?? 1,
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->slug(),
            'short_description' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'base_price' => $this->faker->randomFloat(2, 20, 300),
            'status' => true,
            'featured' => false,
        ];
    }
}
