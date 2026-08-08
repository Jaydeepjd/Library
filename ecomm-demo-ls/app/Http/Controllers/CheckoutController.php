<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Services\CheckoutService;
use App\Services\StripePaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\View\View;
use InvalidArgumentException;

class CheckoutController extends Controller
{
    public function __construct(
        private readonly CheckoutService $checkoutService,
        private readonly StripePaymentService $stripePaymentService,
    ) {
    }

    public function shipping(): View
    {
        $cart = Session::get('cart', []);
        if (empty($cart)) {
            return view('checkout.failure', ['message' => 'Your cart is empty.']);
        }

        $shipping = Session::get('checkout.shipping', []);

        return view('checkout.shipping', compact('shipping'));
    }

    public function storeShipping(CheckoutRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        Session::put('checkout.shipping', $validated);

        return redirect()->route('checkout.review');
    }

    public function review(): View|RedirectResponse
    {
        $cart = Session::get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $shipping = Session::get('checkout.shipping', []);
        if (empty($shipping)) {
            return redirect()->route('checkout.shipping');
        }

        $totals = $this->checkoutService->calculateTotals($cart);

        return view('checkout.review', compact('cart', 'shipping', 'totals'));
    }

    public function submit(Request $request): RedirectResponse
    {
        $cart = Session::get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $shipping = Session::get('checkout.shipping', []);
        if (empty($shipping)) {
            return redirect()->route('checkout.shipping')->with('error', 'Please enter your shipping information.');
        }

        try {
            $couponCode = $request->input('coupon_code');
            $order = $this->checkoutService->createOrder($cart, $shipping, $couponCode);
            Session::put('checkout.order_id', $order->id);
            Session::put('checkout.order_number', $order->order_number);
            Session::put('checkout.last_status', 'pending');

            return redirect()->route('checkout.payment');
        } catch (InvalidArgumentException $exception) {
            return redirect()->back()->with('error', $exception->getMessage());
        }
    }

    public function payment(): View|RedirectResponse
    {
        $orderId = Session::get('checkout.order_id');
        if (! $orderId) {
            return redirect()->route('checkout.shipping');
        }

        $order = Order::query()->findOrFail($orderId);
        if ($order->payment_status === 'paid') {
            return redirect()->route('checkout.success');
        }

        $sessionData = $this->stripePaymentService->createCheckoutSession($order);

        return view('checkout.payment', compact('order', 'sessionData'));
    }

    public function confirm(Request $request): RedirectResponse
    {
        $orderId = Session::get('checkout.order_id');
        if (! $orderId) {
            return redirect()->route('checkout.shipping')->with('error', 'Checkout session expired.');
        }

        $order = Order::query()->findOrFail($orderId);
        $status = $request->input('status', 'failed');
        $paymentReference = $request->input('payment_reference');

        try {
            $this->stripePaymentService->confirmOrder($order, $status, $paymentReference);
        } catch (InvalidArgumentException $exception) {
            return redirect()->route('checkout.failure')->with('error', $exception->getMessage());
        }

        if ($status === 'succeeded') {
            Session::forget('cart');
            Session::put('checkout.last_status', 'paid');
            return redirect()->route('checkout.success');
        }

        Session::put('checkout.last_status', 'failed');

        return redirect()->route('checkout.failure');
    }

    public function success(): View
    {
        $order = Order::query()->find(Session::get('checkout.order_id'));

        return view('checkout.success', compact('order'));
    }

    public function failure(): View
    {
        $order = Order::query()->find(Session::get('checkout.order_id'));

        return view('checkout.failure', compact('order'));
    }
}
