@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">Orders</h1>
    </div>
    <form method="GET" class="flex flex-wrap gap-3">
      <input name="search" value="{{ request('search') }}" placeholder="Order number" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
      <select name="status" class="rounded-xl border border-slate-300 px-3 py-2 text-sm">
        <option value="">All statuses</option>
        <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
        <option value="processing" {{ request('status') === 'processing' ? 'selected' : '' }}>Processing</option>
        <option value="shipped" {{ request('status') === 'shipped' ? 'selected' : '' }}>Shipped</option>
        <option value="delivered" {{ request('status') === 'delivered' ? 'selected' : '' }}>Delivered</option>
      </select>
      <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Filter</button>
    </form>
  </div>

  <div class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-slate-700">
        <thead class="bg-slate-50 text-left">
          <tr>
            <th class="px-4 py-3">Order</th>
            <th class="px-4 py-3">Customer</th>
            <th class="px-4 py-3">Amount</th>
            <th class="px-4 py-3">Payment</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Artwork</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          @foreach ($orders as $order)
            <tr class="border-t border-slate-200">
              <td class="px-4 py-3">#{{ $order->order_number }}</td>
              <td class="px-4 py-3">{{ $order->user->name ?? 'Guest' }}</td>
              <td class="px-4 py-3">${{ number_format($order->total, 2) }}</td>
              <td class="px-4 py-3">{{ ucfirst($order->payment_status) }}</td>
              <td class="px-4 py-3">{{ ucfirst($order->order_status) }}</td>
              <td class="px-4 py-3">{{ $order->artwork()->exists() ? 'Uploaded' : 'Pending' }}</td>
              <td class="px-4 py-3"><a href="{{ route('admin.orders.show', $order) }}" class="font-semibold text-slate-700">View</a></td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-6">{{ $orders->links() }}</div>
</div>
@endsection
