<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductMaterial;

class PricingService
{
    public function calculate(Product $product, array $data): array
    {
        $width = (float) ($data['width'] ?? 0);
        $height = (float) ($data['height'] ?? 0);
        $quantity = (int) ($data['quantity'] ?? 1);
        $materialName = (string) ($data['material'] ?? '');

        $material = $product->materials()
            ->where('name', $materialName)
            ->where('status', true)
            ->first();

        if (! $material) {
            throw new \InvalidArgumentException('Invalid material selection.');
        }

        $area = $width * $height;
        $baseUnitPrice = round($area * $product->base_price * (float) $material->price_multiplier, 2);

        $discountRate = match (true) {
            $quantity >= 10 => 0.15,
            $quantity >= 5 => 0.10,
            $quantity >= 2 => 0.05,
            default => 0.00,
        };

        $discountAmount = round($baseUnitPrice * $quantity * $discountRate, 2);
        $subtotal = round($baseUnitPrice * $quantity, 2);
        $total = round($subtotal - $discountAmount, 2);

        return [
            'width' => $width,
            'height' => $height,
            'area' => $area,
            'material' => $material->name,
            'quantity' => $quantity,
            'base_unit_price' => $baseUnitPrice,
            'discount_rate' => $discountRate,
            'discount_amount' => $discountAmount,
            'subtotal' => $subtotal,
            'total' => $total,
        ];
    }
}
