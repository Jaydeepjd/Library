<?php

namespace Tests\Unit;

use App\Models\Order;
use App\Services\CheckoutService;
use App\Services\StripePaymentService;
use PHPUnit\Framework\TestCase;

class StripePaymentServiceTest extends TestCase
{
    public function test_duplicate_confirmation_is_ignored_when_order_is_already_paid(): void
    {
        $service = new StripePaymentService(new CheckoutService(new \App\Services\PricingService()));
        $order = new Order();
        $order->payment_status = 'paid';
        $order->payment_reference = 'existing-ref';
        $order->order_status = 'processing';

        $result = $service->confirmOrder($order, 'succeeded', 'new-ref');

        $this->assertSame('existing-ref', $result->payment_reference);
        $this->assertSame('processing', $result->order_status);
    }
}
