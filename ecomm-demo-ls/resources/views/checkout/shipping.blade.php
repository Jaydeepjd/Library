@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Checkout</p>
            <h1 class="mt-2 text-3xl font-semibold text-slate-900">Shipping information</h1>
            <p class="mt-3 text-sm text-slate-600">We use your details only for order fulfillment and payment confirmation.</p>
        </div>
        <form method="POST" action="{{ route('checkout.shipping.store') }}" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            @csrf
            <div class="grid gap-4 md:grid-cols-2">
                <label class="text-sm font-medium text-slate-700">Name<input name="name" value="{{ old('name', $shipping['name'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">Email<input name="email" type="email" value="{{ old('email', $shipping['email'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">Phone<input name="phone" value="{{ old('phone', $shipping['phone'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">Address<input name="address" value="{{ old('address', $shipping['address'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">City<input name="city" value="{{ old('city', $shipping['city'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">State<input name="state" value="{{ old('state', $shipping['state'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">Postal code<input name="postal_code" value="{{ old('postal_code', $shipping['postal_code'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
                <label class="text-sm font-medium text-slate-700">Country<input name="country" value="{{ old('country', $shipping['country'] ?? '') }}" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
            </div>
            <div class="mt-6 flex justify-end">
                <button type="submit" class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Continue to review</button>
            </div>
        </form>
    </div>
</div>
@endsection
