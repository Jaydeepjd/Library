<?php

namespace Tests\Unit;

use App\Http\Controllers\Cart\CartController;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductMaterial;
use App\Services\PricingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use PHPUnit\Framework\TestCase;

class CartControllerTest extends TestCase
{
    public function test_cart_summary_calculates_subtotal_discount_and_total(): void
    {
        $controller = new CartController(new PricingService());
        $reflection = new \ReflectionClass($controller);
        $method = $reflection->getMethod('summarize');
        $method->setAccessible(true);

        $items = [
            [
                'total_price' => 1200.0,
                'unit_price' => 1000.0,
                'quantity' => 2,
            ],
            [
                'total_price' => 1800.0,
                'unit_price' => 2000.0,
                'quantity' => 1,
            ],
        ];

        $summary = $method->invoke($controller, $items);

        $this->assertSame(3000.0, $summary['subtotal']);
        $this->assertSame(400.0, $summary['discount']);
        $this->assertSame(2600.0, $summary['total']);
    }
}
