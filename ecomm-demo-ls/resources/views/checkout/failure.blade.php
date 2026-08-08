@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Payment failed</p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">We could not complete your checkout.</h1>
        <p class="mt-3 text-sm text-slate-600">{{ $message ?? 'Please try again or contact support.' }}</p>
        @if ($order)
            <p class="mt-4 text-sm font-medium text-slate-700">Order number: {{ $order->order_number }}</p>
        @endif
    </div>
</div>
@endsection
