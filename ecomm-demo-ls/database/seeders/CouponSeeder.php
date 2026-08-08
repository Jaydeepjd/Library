<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        Coupon::query()->updateOrCreate(
            ['code' => 'WELCOME10'],
            [
                'code' => 'WELCOME10',
                'type' => 'percent',
                'value' => 10,
                'minimum_order_amount' => 100,
                'starts_at' => now()->subDay(),
                'expires_at' => now()->addMonth(),
                'usage_limit' => 100,
                'used_count' => 0,
                'active' => true,
            ]
        );
    }
}
