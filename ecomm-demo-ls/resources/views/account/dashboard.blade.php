@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Account</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">Welcome, {{ $user->name }}</h1>
      <p class="mt-3 text-sm text-slate-600">{{ $user->email }}</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl bg-slate-50 p-4">
          <p class="text-sm text-slate-500">Orders</p>
          <p class="mt-2 text-2xl font-semibold text-slate-900">{{ $orderCount }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900">Recent orders</h2>
        <a href="{{ route('account.orders') }}" class="text-sm font-semibold text-slate-700">View all</a>
      </div>
      <div class="mt-6 space-y-3">
        @foreach ($orders as $order)
          <a href="{{ route('account.order.show', $order) }}" class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>#{{ $order->order_number }}</span>
            <span>${{ number_format($order->total, 2) }}</span>
          </a>
        @endforeach
      </div>
    </div>
  </div>
</div>
@endsection
