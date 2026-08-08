<?php

namespace Tests\Unit;

use App\Models\Coupon;
use App\Services\CheckoutService;
use App\Services\PricingService;
use PHPUnit\Framework\TestCase;

class CheckoutServiceTest extends TestCase
{
    public function test_totals_are_calculated_without_coupon(): void
    {
        $service = new CheckoutService(new PricingService());

        $totals = $service->calculateTotals([
            ['total_price' => 1000.0],
            ['total_price' => 500.0],
        ]);

        $this->assertSame(1500.0, $totals['subtotal']);
        $this->assertSame(0.0, $totals['discount']);
        $this->assertSame(1500.0, $totals['total']);
    }

    public function test_fixed_coupon_applies_discount(): void
    {
        $service = new CheckoutService(new PricingService());
        $coupon = new Coupon(['type' => 'fixed', 'value' => 100.0, 'minimum_order_amount' => 0, 'active' => true]);

        $totals = $service->calculateTotals([
            ['total_price' => 500.0],
        ], $coupon);

        $this->assertSame(100.0, $totals['discount']);
        $this->assertSame(400.0, $totals['total']);
    }

    public function test_percent_coupon_applies_discount(): void
    {
        $service = new CheckoutService(new PricingService());
        $coupon = new Coupon(['type' => 'percent', 'value' => 10.0, 'minimum_order_amount' => 0, 'active' => true]);

        $totals = $service->calculateTotals([
            ['total_price' => 1000.0],
        ], $coupon);

        $this->assertSame(100.0, $totals['discount']);
        $this->assertSame(900.0, $totals['total']);
    }
}
