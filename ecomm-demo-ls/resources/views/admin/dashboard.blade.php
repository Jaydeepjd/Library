@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
    </div>
    <div class="text-sm text-slate-600">Protected admin area</div>
  </div>

  <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p class="text-sm text-slate-500">Total revenue</p><p class="mt-2 text-2xl font-semibold text-slate-900">${{ number_format($revenue, 2) }}</p></div>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p class="text-sm text-slate-500">This month</p><p class="mt-2 text-2xl font-semibold text-slate-900">${{ number_format($currentMonthRevenue, 2) }}</p></div>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p class="text-sm text-slate-500">Orders</p><p class="mt-2 text-2xl font-semibold text-slate-900">{{ $orderCount }}</p></div>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p class="text-sm text-slate-500">Customers</p><p class="mt-2 text-2xl font-semibold text-slate-900">{{ $customerCount }}</p></div>
  </div>

  <div class="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900">Monthly revenue</h2>
      <div class="mt-4 space-y-2">
        @foreach ($monthlyRevenue as $entry)
          <div class="flex items-center justify-between text-sm text-slate-600"><span>{{ $entry->month }}</span><span>${{ number_format($entry->total, 2) }}</span></div>
        @endforeach
      </div>
    </div>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900">Top products</h2>
      <div class="mt-4 space-y-2">
        @foreach ($topProducts as $name => $quantity)
          <div class="flex items-center justify-between text-sm text-slate-600"><span>{{ $name }}</span><span>{{ $quantity }}</span></div>
        @endforeach
      </div>
    </div>
  </div>

  <div class="mt-8 grid gap-6 lg:grid-cols-2">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900">Recent orders</h2>
      <div class="mt-4 space-y-3">
        @foreach ($recentOrders as $order)
          <div class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>#{{ $order->order_number }}</span>
            <span>${{ number_format($order->total, 2) }}</span>
          </div>
        @endforeach
      </div>
    </div>
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900">Quick links</h2>
      <div class="mt-4 flex flex-wrap gap-3">
        <a href="{{ route('admin.orders') }}" class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Orders</a>
        <a href="{{ route('admin.customers') }}" class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Customers</a>
        <a href="{{ route('admin.quotes') }}" class="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Quotes</a>
      </div>
    </div>
  </div>
</div>
@endsection
