@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Order</p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">#{{ $order->order_number }}</h1>
      </div>
      <form method="POST" action="{{ route('admin.orders.update-status', $order) }}" class="flex flex-wrap items-center gap-3">
        @csrf
        <select name="order_status" class="rounded-xl border border-slate-300 px-3 py-2 text-sm">
          <option value="pending" {{ $order->order_status === 'pending' ? 'selected' : '' }}>Pending</option>
          <option value="processing" {{ $order->order_status === 'processing' ? 'selected' : '' }}>Processing</option>
          <option value="shipped" {{ $order->order_status === 'shipped' ? 'selected' : '' }}>Shipped</option>
          <option value="delivered" {{ $order->order_status === 'delivered' ? 'selected' : '' }}>Delivered</option>
        </select>
        <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Update</button>
      </form>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Customer</h2>
        <p class="mt-2 text-sm text-slate-600">{{ $order->user->name ?? 'Guest' }}</p>
        <p class="text-sm text-slate-600">{{ $order->shipping_email }}</p>
      </div>
      <div>
        <h2 class="text-lg font-semibold text-slate-900">Totals</h2>
        <p class="mt-2 text-sm text-slate-600">Subtotal: ${{ number_format($order->subtotal, 2) }}</p>
        <p class="text-sm text-slate-600">Shipping: ${{ number_format($order->shipping_total, 2) }}</p>
        <p class="text-sm text-slate-600">Total: ${{ number_format($order->total, 2) }}</p>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-lg font-semibold text-slate-900">Items</h2>
      <div class="mt-4 space-y-3">
        @foreach ($order->items as $item)
          <div class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>{{ $item->product_name }}</span>
            <span>{{ $item->quantity }} × ${{ number_format($item->unit_price, 2) }}</span>
          </div>
        @endforeach
      </div>
    </div>
  </div>
</div>
@endsection
