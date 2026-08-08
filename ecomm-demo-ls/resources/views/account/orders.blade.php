@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <h1 class="text-3xl font-semibold text-slate-900">Your orders</h1>
    <div class="mt-6 space-y-3">
      @foreach ($orders as $order)
        <a href="{{ route('account.order.show', $order) }}" class="flex flex-col gap-2 rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span class="font-semibold text-slate-900">#{{ $order->order_number }}</span>
          <span>{{ $order->created_at?->format('Y-m-d') }}</span>
          <span>${{ number_format($order->total, 2) }}</span>
          <span>{{ ucfirst($order->payment_status) }}</span>
          <span>{{ ucfirst($order->order_status) }}</span>
        </a>
      @endforeach
    </div>
    <div class="mt-6">{{ $orders->links() }}</div>
  </div>
</div>
@endsection
