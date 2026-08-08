<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMaterial;
use App\Services\PricingService;
use PHPUnit\Framework\TestCase;

class PricingServiceTest extends TestCase
{
    protected PricingService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new PricingService();
    }

    public function test_basic_price_calculation(): void
    {
        $product = $this->makeProduct(10.00);
        $quote = $this->service->calculate($product, ['width' => 10, 'height' => 8, 'material' => 'Standard', 'quantity' => 1]);

        $this->assertSame(80.0, $quote['area']);
        $this->assertSame(8000.0, $quote['base_unit_price']);
        $this->assertSame(0.0, $quote['discount_rate']);
        $this->assertSame(8000.0, $quote['total']);
    }

    public function test_material_multiplier_is_applied(): void
    {
        $product = $this->makeProduct(10.00);
        $product->materials()->create(['name' => 'Premium', 'price_multiplier' => 1.25, 'status' => true]);
        $quote = $this->service->calculate($product, ['width' => 5, 'height' => 4, 'material' => 'Premium', 'quantity' => 1]);

        $this->assertSame(10000.0, $quote['base_unit_price']);
    }

    public function test_quantity_discount_is_applied(): void
    {
        $product = $this->makeProduct(10.00);
        $quote = $this->service->calculate($product, ['width' => 2, 'height' => 2, 'material' => 'Standard', 'quantity' => 5]);

        $this->assertSame(0.10, $quote['discount_rate']);
        $this->assertSame(800.0, $quote['discount_amount']);
        $this->assertSame(7200.0, $quote['total']);
    }

    public function test_invalid_material_throws_exception(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $product = $this->makeProduct(10.00);
        $this->service->calculate($product, ['width' => 2, 'height' => 2, 'material' => 'Unknown', 'quantity' => 1]);
    }

    public function test_large_quantity_uses_larger_discount(): void
    {
        $product = $this->makeProduct(10.00);
        $quote = $this->service->calculate($product, ['width' => 1, 'height' => 1, 'material' => 'Standard', 'quantity' => 10]);

        $this->assertSame(0.15, $quote['discount_rate']);
        $this->assertSame(1500.0, $quote['total']);
    }

    protected function makeProduct(float $basePrice): Product
    {
        $category = Category::query()->create(['name' => 'Test Category', 'slug' => 'test-category-' . uniqid(), 'status' => true]);
        $product = Product::query()->create([
            'category_id' => $category->id,
            'name' => 'Test Product',
            'slug' => 'test-product-' . uniqid(),
            'base_price' => $basePrice,
            'status' => true,
        ]);
        $product->materials()->create(['name' => 'Standard', 'price_multiplier' => 1.00, 'status' => true]);

        return $product;
    }
}
