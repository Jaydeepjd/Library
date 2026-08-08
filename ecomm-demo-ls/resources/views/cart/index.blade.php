@extends('layouts.app')

@section('content')
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-4">
            <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Shopping cart</p>
                <h1 class="mt-2 text-3xl font-semibold text-slate-900">Your custom print order</h1>
            </div>
            @if (!empty($items))
                <form method="POST" action="{{ route('cart.clear') }}">
                    @csrf
                    <button type="submit" class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Clear cart</button>
                </form>
            @endif
        </div>

        @if (empty($items))
            <div class="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h2 class="text-xl font-semibold text-slate-900">Your cart is empty</h2>
                <p class="mt-3 text-sm text-slate-600">Add a custom print product to start building your order.</p>
            </div>
        @else
            <div class="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div class="space-y-4">
                    @foreach ($items as $key => $item)
                        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <h2 class="text-lg font-semibold text-slate-900">{{ $item['product_name'] }}</h2>
                                    <p class="mt-2 text-sm text-slate-600">Size: {{ $item['width'] }} ft × {{ $item['height'] }} ft</p>
                                    <p class="text-sm text-slate-600">Material: {{ $item['material'] }}</p>
                                    <p class="text-sm text-slate-600">Quantity: {{ $item['quantity'] }}</p>
                                    <p class="mt-3 text-sm text-slate-600">Configuration: {{ json_encode($item['configuration']) }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-lg font-semibold text-slate-900">${{ number_format($item['total_price'], 2) }}</p>
                                    <p class="text-sm text-slate-500">Unit price: ${{ number_format($item['unit_price'], 2) }}</p>
                                </div>
                            </div>
                            <div class="mt-4 flex flex-wrap items-center gap-3">
                                <form method="POST" action="{{ route('cart.update', $key) }}" class="flex items-center gap-2">
                                    @csrf
                                    @method('PATCH')
                                    <label class="text-sm text-slate-600">Qty</label>
                                    <input type="number" min="1" name="quantity" value="{{ $item['quantity'] }}" class="w-20 rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                                    <button type="submit" class="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Update</button>
                                </form>
                                <form method="POST" action="{{ route('cart.remove', $key) }}">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">Remove</button>
                                </form>
                            </div>
                        </div>
                    @endforeach
                </div>

                <aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 class="text-xl font-semibold text-slate-900">Order summary</h2>
                    <div class="mt-4 space-y-3 text-sm text-slate-600">
                        <div class="flex items-center justify-between"><span>Subtotal</span><span>${{ number_format($totals['subtotal'], 2) }}</span></div>
                        <div class="flex items-center justify-between"><span>Discount</span><span>-${{ number_format($totals['discount'], 2) }}</span></div>
                        <div class="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>${{ number_format($totals['total'], 2) }}</span></div>
                    </div>
                    <a href="{{ route('checkout.shipping') }}" class="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Proceed to checkout</a>
                </aside>
            </div>
        @endif
    </div>
@endsection
