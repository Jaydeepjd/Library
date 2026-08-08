@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Stripe Sandbox</p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">Payment</h1>
        <p class="mt-3 text-sm text-slate-600">This is a sandbox placeholder. The order remains pending until payment is confirmed.</p>
        <div class="mt-8 flex flex-wrap gap-3">
            @if (!empty($sessionData['url']))
                <a href="{{ $sessionData['url'] }}" class="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Open Stripe Sandbox checkout</a>
            @endif
            <form method="POST" action="{{ route('checkout.confirm') }}">
                @csrf
                <input type="hidden" name="status" value="succeeded" />
                <input type="hidden" name="payment_reference" value="sandbox-{{ $order->order_number }}" />
                <button type="submit" class="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">Simulate successful payment</button>
            </form>
            <form method="POST" action="{{ route('checkout.confirm') }}">
                @csrf
                <input type="hidden" name="status" value="failed" />
                <button type="submit" class="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700">Simulate failed payment</button>
            </form>
        </div>
    </div>
</div>
@endsection
