<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use InvalidArgumentException;

class CheckoutService
{
    public function __construct(private readonly PricingService $pricingService)
    {
    }

    public function calculateTotals(array $items, ?Coupon $coupon = null, float $shippingAmount = 0.0): array
    {
        $subtotal = 0.0;
        foreach ($items as $item) {
            $subtotal += max(0.0, (float) ($item['total_price'] ?? 0));
        }

        $discount = 0.0;
        if ($coupon) {
            $discount = $this->applyCoupon($subtotal, $coupon);
        }

        $total = round(max(0.0, $subtotal - $discount + $shippingAmount), 2);

        return [
            'subtotal' => round($subtotal, 2),
            'discount' => round($discount, 2),
            'shipping_amount' => round($shippingAmount, 2),
            'total' => $total,
        ];
    }

    public function createOrder(array $cartItems, array $shippingData, ?string $couponCode = null): Order
    {
        $coupon = null;
        if (! empty($couponCode)) {
            $coupon = Coupon::query()
                ->where('code', strtoupper($couponCode))
                ->where('active', true)
                ->first();

            if (! $coupon) {
                throw new InvalidArgumentException('Invalid coupon code.');
            }
        }

        $validatedItems = [];
        foreach ($cartItems as $item) {
            $validatedItems[] = $this->validateCartItem($item);
        }

        $totals = $this->calculateTotals($validatedItems, $coupon, 0.0);
        $shippingAmount = 0.0;
        $orderNumber = 'ORD-' . strtoupper(Str::random(8));

        return DB::transaction(function () use ($validatedItems, $shippingData, $coupon, $totals, $shippingAmount, $orderNumber): Order {
            $order = Order::query()->create([
                'order_number' => $orderNumber,
                'subtotal' => $totals['subtotal'],
                'discount' => $totals['discount'],
                'shipping' => $shippingAmount,
                'total' => $totals['total'],
                'currency' => 'USD',
                'payment_status' => 'pending',
                'payment_provider' => 'stripe',
                'payment_reference' => null,
                'order_status' => 'pending',
                'shipping_name' => $shippingData['name'] ?? null,
                'shipping_email' => $shippingData['email'] ?? null,
                'shipping_phone' => $shippingData['phone'] ?? null,
                'shipping_address' => $shippingData['address'] ?? null,
                'shipping_city' => $shippingData['city'] ?? null,
                'shipping_state' => $shippingData['state'] ?? null,
                'shipping_postal_code' => $shippingData['postal_code'] ?? null,
                'shipping_country' => $shippingData['country'] ?? null,
                'coupon_code' => $coupon?->code,
                'coupon_discount' => $totals['discount'],
                'shipping_amount' => $shippingAmount,
            ]);

            foreach ($validatedItems as $item) {
                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'width' => $item['width'],
                    'height' => $item['height'],
                    'material' => $item['material'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['total_price'],
                    'configuration' => $item['configuration'],
                ]);
            }

            return $order;
        });
    }

    public function finalizeOrder(Order $order, string $status, ?string $paymentReference = null): Order
    {
        return DB::transaction(function () use ($order, $status, $paymentReference) {
            $order->refresh();
            if ($status === 'succeeded') {
                $order->payment_status = 'paid';
                $order->order_status = 'processing';
                $order->payment_provider = 'stripe';
                $order->payment_reference = $paymentReference ?? $order->payment_reference;
            } else {
                $order->payment_status = 'failed';
                $order->order_status = 'cancelled';
                $order->payment_reference = $paymentReference ?? $order->payment_reference;
            }

            $order->save();

            return $order;
        });
    }

    private function validateCartItem(array $item): array
    {
        if (empty($item['product_id'])) {
            throw new InvalidArgumentException('Invalid product selection.');
        }

        $product = Product::query()->find($item['product_id']);
        if (! $product || ! $product->status) {
            throw new InvalidArgumentException('Invalid product selection.');
        }

        $quote = $this->pricingService->calculate($product, [
            'width' => (float) ($item['width'] ?? 0),
            'height' => (float) ($item['height'] ?? 0),
            'material' => $item['material'] ?? '',
            'quantity' => (int) ($item['quantity'] ?? 1),
        ]);

        $unitPrice = round((float) ($item['unit_price'] ?? 0), 2);
        $totalPrice = round((float) ($item['total_price'] ?? 0), 2);
        $expectedUnitPrice = round((float) $quote['base_unit_price'], 2);
        $expectedTotalPrice = round((float) $quote['total'], 2);

        if ($unitPrice !== $expectedUnitPrice || $totalPrice !== $expectedTotalPrice) {
            throw new InvalidArgumentException('Cart prices have changed.');
        }

        return [
            'product_id' => $product->id,
            'product_name' => $product->name,
            'width' => (float) ($item['width'] ?? 0),
            'height' => (float) ($item['height'] ?? 0),
            'material' => $item['material'] ?? '',
            'quantity' => (int) ($item['quantity'] ?? 1),
            'unit_price' => $unitPrice,
            'total_price' => $totalPrice,
            'configuration' => $item['configuration'] ?? [],
        ];
    }

    private function applyCoupon(float $subtotal, Coupon $coupon): float
    {
        if ($subtotal < (float) $coupon->minimum_order_amount) {
            throw new InvalidArgumentException('Coupon minimum order amount not met.');
        }

        if (! empty($coupon->starts_at) && Carbon::now()->lt($coupon->starts_at)) {
            throw new InvalidArgumentException('Coupon is not active yet.');
        }

        if (! empty($coupon->expires_at) && Carbon::now()->gt($coupon->expires_at)) {
            throw new InvalidArgumentException('Coupon has expired.');
        }

        if ($coupon->type === 'percent') {
            return round($subtotal * ((float) $coupon->value / 100), 2);
        }

        if ($coupon->type === 'fixed') {
            return round(min((float) $coupon->value, $subtotal), 2);
        }

        throw new InvalidArgumentException('Unsupported coupon type.');
    }
}
