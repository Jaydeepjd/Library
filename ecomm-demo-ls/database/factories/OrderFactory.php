<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->first()?->id ?? 1,
            'order_number' => 'ORD-' . $this->faker->unique()->bothify('####'),
            'subtotal' => 100,
            'discount' => 10,
            'shipping' => 5,
            'total' => 95,
            'currency' => 'USD',
            'payment_status' => 'paid',
            'payment_provider' => 'stripe',
            'payment_reference' => 'pi_test',
            'order_status' => 'pending',
        ];
    }
}
