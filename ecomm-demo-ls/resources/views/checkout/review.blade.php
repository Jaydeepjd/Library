@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <div class="space-y-4">
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 class="text-3xl font-semibold text-slate-900">Order review</h1>
                <p class="mt-2 text-sm text-slate-600">Confirm your order before you proceed to Stripe Sandbox.</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 class="text-xl font-semibold text-slate-900">Shipping details</h2>
                <div class="mt-4 space-y-1 text-sm text-slate-600">
                    <p>{{ $shipping['name'] }}</p>
                    <p>{{ $shipping['email'] }}</p>
                    <p>{{ $shipping['phone'] }}</p>
                    <p>{{ $shipping['address'] }}, {{ $shipping['city'] }}, {{ $shipping['state'] }} {{ $shipping['postal_code'] }}</p>
                    <p>{{ $shipping['country'] }}</p>
                </div>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 class="text-xl font-semibold text-slate-900">Items</h2>
                <div class="mt-4 space-y-3">
                    @foreach ($cart as $item)
                        <div class="flex items-center justify-between border-b border-slate-100 pb-3 text-sm text-slate-600">
                            <span>{{ $item['product_name'] }} × {{ $item['quantity'] }}</span>
                            <span>${{ number_format($item['total_price'], 2) }}</span>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 class="text-xl font-semibold text-slate-900">Summary</h2>
            <div class="mt-4 space-y-3 text-sm text-slate-600">
                <div class="flex justify-between"><span>Subtotal</span><span>${{ number_format($totals['subtotal'], 2) }}</span></div>
                <div class="flex justify-between"><span>Discount</span><span>-${{ number_format($totals['discount'], 2) }}</span></div>
                <div class="flex justify-between"><span>Shipping</span><span>${{ number_format($totals['shipping_amount'], 2) }}</span></div>
                <div class="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>${{ number_format($totals['total'], 2) }}</span></div>
            </div>
            <form method="POST" action="{{ route('checkout.submit') }}" class="mt-6 space-y-3">
                @csrf
                <label class="block text-sm font-medium text-slate-700">
                    Coupon code
                    <input name="coupon_code" value="{{ old('coupon_code') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <button type="submit" class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Proceed to payment</button>
            </form>
        </div>
    </div>
</div>
@endsection
