<?php

namespace App\Services;

use App\Jobs\SendOrderConfirmationJob;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Stripe\StripeClient;
use Stripe\Webhook;
use Symfony\Component\HttpFoundation\Request;
use UnexpectedValueException;

class StripePaymentService
{
    public function __construct(private readonly CheckoutService $checkoutService)
    {
    }

    public function createCheckoutSession(Order $order): array
    {
        $stripe = new StripeClient(config('services.stripe.secret'));

        $session = $stripe->checkout->sessions->create([
            'mode' => 'payment',
            'line_items' => [[
                'price_data' => [
                    'currency' => config('app.currency', 'USD'),
                    'product_data' => [
                        'name' => 'Order #' . $order->order_number,
                    ],
                    'unit_amount' => (int) round($order->total * 100),
                ],
                'quantity' => 1,
            ]],
            'success_url' => route('checkout.success', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.failure', [], true) . '?session_id={CHECKOUT_SESSION_ID}',
            'client_reference_id' => (string) $order->id,
            'metadata' => [
                'order_id' => $order->id,
                'order_number' => $order->order_number,
            ],
            'payment_intent_data' => [
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                ],
            ],
            'allow_promotion_codes' => false,
        ]);

        $order->payment_reference = $session->id;
        $order->save();

        return [
            'id' => $session->id,
            'url' => $session->url,
            'client_secret' => $session->payment_intent,
        ];
    }

    public function handleWebhook(Request $request): array
    {
        $payload = $request->getContent();
        $signature = $request->headers->get('stripe-signature');

        if (empty($payload) || empty($signature)) {
            throw new UnexpectedValueException('Missing Stripe signature.');
        }

        $event = Webhook::constructEvent($payload, $signature, config('services.stripe.webhook_secret'));

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $order = Order::query()->find($session->metadata->order_id ?? null);
            if ($order && $order->payment_status !== 'paid') {
                $this->checkoutService->finalizeOrder($order, 'succeeded', $session->payment_intent);
            }

            return ['status' => 'succeeded'];
        }

        if ($event->type === 'checkout.session.expired' || $event->type === 'checkout.session.async_payment_failed') {
            $session = $event->data->object;
            $order = Order::query()->find($session->metadata->order_id ?? null);
            if ($order && $order->payment_status !== 'failed') {
                $this->checkoutService->finalizeOrder($order, 'failed', $session->payment_intent);
            }

            return ['status' => 'failed'];
        }

        return ['status' => 'ignored'];
    }

    public function confirmOrder(Order $order, string $status, ?string $paymentReference = null): Order
    {
        if ($order->payment_status === 'paid') {
            return $order;
        }

        return DB::transaction(function () use ($order, $status, $paymentReference) {
            $order->refresh();
            if ($order->payment_status === 'paid') {
                return $order;
            }

            if ($status === 'succeeded') {
                $order->payment_status = 'paid';
                $order->payment_provider = 'stripe';
                $order->payment_reference = $paymentReference ?? $order->payment_reference;
                $order->order_status = 'processing';
            } else {
                $order->payment_status = 'failed';
                $order->payment_provider = 'stripe';
                $order->payment_reference = $paymentReference ?? $order->payment_reference;
                $order->order_status = 'cancelled';
            }

            $order->save();

            if ($status === 'succeeded') {
                SendOrderConfirmationJob::dispatch($order);
            }

            return $order;
        });
    }
}
