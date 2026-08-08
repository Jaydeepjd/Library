@props(['product'])

<article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <img src="{{ $product->image ?? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80' }}" alt="{{ $product->name }}" width="640" height="420" loading="lazy" class="h-48 w-full rounded-xl object-cover" />
    <div class="mt-4">
        <p class="text-sm font-medium text-slate-500">{{ $product->category->name ?? 'Printing' }}</p>
        <h3 class="mt-1 text-lg font-semibold text-slate-900">{{ $product->name }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ $product->short_description }}</p>
        <div class="mt-4 flex items-center justify-between">
            <span class="text-base font-semibold text-slate-900">${{ number_format($product->base_price, 2) }}</span>
            <a href="#" class="text-sm font-semibold text-slate-700 hover:text-slate-900">View details</a>
        </div>
    </div>
</article>
