@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Order details</p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">#{{ $order->order_number }}</h1>
      </div>
      <a href="{{ route('account.order.invoice', $order) }}" class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Download invoice</a>
    </div>
    <div class="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-4">
        @foreach ($order->items as $item)
          <div class="rounded-2xl border border-slate-200 p-4">
            <p class="font-semibold text-slate-900">{{ $item->product_name }}</p>
            <p class="mt-2 text-sm text-slate-600">Dimensions: {{ $item->width }} × {{ $item->height }} ft</p>
            <p class="text-sm text-slate-600">Material: {{ $item->material }}</p>
            <p class="text-sm text-slate-600">Quantity: {{ $item->quantity }}</p>
            <p class="text-sm text-slate-600">Price: ${{ number_format($item->unit_price, 2) }}</p>
            <p class="text-sm text-slate-600">Total: ${{ number_format($item->total_price, 2) }}</p>
          </div>
        @endforeach
      </div>
      <div class="rounded-2xl border border-slate-200 p-5">
        <h2 class="text-xl font-semibold text-slate-900">Status</h2>
        <div class="mt-4 space-y-3 text-sm text-slate-600">
          <p><span class="font-semibold text-slate-900">Payment:</span> {{ ucfirst($order->payment_status) }}</p>
          <p><span class="font-semibold text-slate-900">Order:</span> {{ ucfirst($order->order_status) }}</p>
          <p><span class="font-semibold text-slate-900">Artwork:</span> {{ $order->artwork()->exists() ? 'Uploaded' : 'Pending' }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
