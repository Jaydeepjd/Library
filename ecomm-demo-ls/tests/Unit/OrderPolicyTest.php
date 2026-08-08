<?php

namespace Tests\Unit;

use App\Models\Order;
use App\Models\User;
use App\Policies\OrderPolicy;
use PHPUnit\Framework\TestCase;

class OrderPolicyTest extends TestCase
{
    public function test_customer_can_view_own_order(): void
    {
        $policy = new OrderPolicy();
        $user = new User();
        $user->id = 1;
        $order = new Order();
        $order->user_id = 1;

        $this->assertTrue($policy->view($user, $order));
    }

    public function test_customer_cannot_view_another_customers_order(): void
    {
        $policy = new OrderPolicy();
        $user = new User();
        $user->id = 1;
        $order = new Order();
        $order->user_id = 2;

        $this->assertFalse($policy->view($user, $order));
    }

    public function test_customer_can_upload_artwork_only_for_paid_order(): void
    {
        $policy = new OrderPolicy();
        $user = new User();
        $user->id = 1;
        $order = new Order();
        $order->user_id = 1;
        $order->payment_status = 'paid';

        $this->assertTrue($policy->uploadArtwork($user, $order));
    }
}
