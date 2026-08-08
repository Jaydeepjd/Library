@extends('layouts.app')

@section('content')
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                <img src="{{ $product->image ?? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80' }}" alt="{{ $product->name }}" width="1200" height="800" loading="eager" class="h-[420px] w-full rounded-[1.5rem] object-cover" />
            </div>
            <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{{ $category->name }}</p>
                <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ $product->name }}</h1>
                <p class="mt-4 text-lg text-slate-600">{{ $product->short_description }}</p>
                <p class="mt-6 text-sm leading-7 text-slate-700">{{ $product->description }}</p>

                <form id="configurator-form" class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5" data-product-id="{{ $product->id }}">
                    <div class="grid gap-4 md:grid-cols-2">
                        <label class="text-sm font-medium text-slate-700">
                            Width (ft)
                            <input type="number" step="0.01" min="0.01" name="width" value="10" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                        </label>
                        <label class="text-sm font-medium text-slate-700">
                            Height (ft)
                            <input type="number" step="0.01" min="0.01" name="height" value="8" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                        </label>
                        <label class="text-sm font-medium text-slate-700">
                            Material
                            <select name="material" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2">
                                @foreach ($product->materials as $material)
                                    <option value="{{ $material->name }}">{{ $material->name }}</option>
                                @endforeach
                            </select>
                        </label>
                        <label class="text-sm font-medium text-slate-700">
                            Quantity
                            <input type="number" min="1" name="quantity" value="3" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                        </label>
                    </div>

                    <div class="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                        <div class="flex items-center justify-between text-sm text-slate-600">
                            <span>Estimated total</span>
                            <strong id="estimate-total" class="text-lg text-slate-900">$0.00</strong>
                        </div>
                        <p id="estimate-breakdown" class="mt-3 text-sm text-slate-600">Select values to estimate your print cost.</p>
                    </div>
                </form>

                <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-slate-500">Starting at</span>
                        <span class="text-2xl font-semibold text-slate-900">${{ number_format($product->base_price, 2) }}</span>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-3">
                        @foreach ($product->materials as $material)
                            <span class="rounded-full bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">{{ $material->name }}</span>
                        @endforeach
                    </div>
                    <form action="{{ route('cart.add', $product) }}" method="POST" class="mt-6">
                        @csrf
                        <input type="hidden" name="width" value="10" />
                        <input type="hidden" name="height" value="8" />
                        <input type="hidden" name="material" value="{{ $product->materials->first()?->name ?? '' }}" />
                        <input type="hidden" name="quantity" value="1" />
                        <button type="submit" class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="mt-12">
            <h2 class="text-2xl font-semibold text-slate-900">Related products</h2>
            <div class="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                @foreach ($relatedProducts as $relatedProduct)
                    <a href="{{ route('products.show', [$category, $relatedProduct]) }}" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <img src="{{ $relatedProduct->image ?? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80' }}" alt="{{ $relatedProduct->name }}" width="640" height="420" loading="lazy" class="h-40 w-full rounded-xl object-cover" />
                        <div class="mt-4">
                            <h3 class="text-lg font-semibold text-slate-900">{{ $relatedProduct->name }}</h3>
                            <p class="mt-2 text-sm text-slate-600">{{ $relatedProduct->short_description }}</p>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('configurator-form');
            if (!form) return;

            const updateEstimate = () => {
                const formData = new FormData(form);
                const productId = form.getAttribute('data-product-id');
                const url = '/products/' + productId + '/estimate';

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        const total = document.getElementById('estimate-total');
                        const breakdown = document.getElementById('estimate-breakdown');
                        if (total) total.textContent = '$' + Number(data.total).toFixed(2);
                        if (breakdown) breakdown.textContent = 'Area ' + data.area + ' ft² · Material ' + data.material + ' · Discount ' + Math.round(data.discount_rate * 100) + '%';
                    })
                    .catch(() => {
                        const total = document.getElementById('estimate-total');
                        const breakdown = document.getElementById('estimate-breakdown');
                        if (total) total.textContent = '$0.00';
                        if (breakdown) breakdown.textContent = 'Unable to calculate estimate at the moment.';
                    });
            };

            form.querySelectorAll('input,select').forEach(field => field.addEventListener('input', updateEstimate));
            form.querySelectorAll('select').forEach(field => field.addEventListener('change', updateEstimate));
            updateEstimate();
        });
    </script>
@endsection
