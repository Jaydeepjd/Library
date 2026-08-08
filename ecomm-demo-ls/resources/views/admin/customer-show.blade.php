@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ $user->name }}</h1>
      <p class="mt-2 text-sm text-slate-600">{{ $user->email }}</p>
    </div>

    <div class="mt-8">
      <h2 class="text-lg font-semibold text-slate-900">Recent orders</h2>
      <div class="mt-4 space-y-3">
        @foreach ($orders as $order)
          <div class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>#{{ $order->order_number }}</span>
            <span>${{ number_format($order->total, 2) }}</span>
          </div>
        @endforeach
      </div>
    </div>
  </div>
</div>
@endsection
