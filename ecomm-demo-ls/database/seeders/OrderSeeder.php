<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::query()->where('email', 'customer@example.com')->firstOrFail();
        $products = Product::query()->take(3)->get();

        if ($products->isEmpty()) {
            return;
        }

        $order = Order::query()->create([
            'user_id' => $customer->id,
            'order_number' => 'ORD-' . Str::upper(Str::random(6)),
            'subtotal' => 300.00,
            'discount' => 25.00,
            'shipping' => 15.00,
            'total' => 290.00,
            'currency' => 'USD',
            'payment_status' => 'paid',
            'payment_provider' => 'stripe',
            'payment_reference' => 'pi_test_123',
            'order_status' => 'processing',
        ]);

        foreach ($products as $product) {
            OrderItem::query()->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'width' => 10,
                'height' => 10,
                'material' => 'Standard',
                'quantity' => 2,
                'unit_price' => $product->base_price,
                'total_price' => $product->base_price * 2,
                'configuration' => ['print_type' => 'standard'],
            ]);
        }
    }
}
