@extends('layouts.app')

@section('content')
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Category</p>
                <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ $category->name }}</h1>
                <p class="mt-3 max-w-2xl text-sm text-slate-600">{{ $category->description }}</p>
            </div>

            <form method="GET" class="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search products" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
                <select name="sort" class="rounded-xl border border-slate-300 px-3 py-2 text-sm">
                    <option value="default" {{ request('sort') === 'default' ? 'selected' : '' }}>Default</option>
                    <option value="price_asc" {{ request('sort') === 'price_asc' ? 'selected' : '' }}>Price low to high</option>
                    <option value="price_desc" {{ request('sort') === 'price_desc' ? 'selected' : '' }}>Price high to low</option>
                    <option value="featured" {{ request('sort') === 'featured' ? 'selected' : '' }}>Popularity</option>
                </select>
                <button type="submit" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Apply</button>
            </form>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            @foreach ($products as $product)
                <a href="{{ route('products.show', [$category, $product]) }}" class="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1">
                    <img src="{{ $product->image ?? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80' }}" alt="{{ $product->name }}" width="640" height="420" loading="lazy" class="h-48 w-full rounded-xl object-cover" />
                    <div class="mt-4">
                        <p class="text-sm font-medium text-slate-500">{{ $product->category->name }}</p>
                        <h2 class="mt-1 text-lg font-semibold text-slate-900">{{ $product->name }}</h2>
                        <p class="mt-2 text-sm text-slate-600">{{ $product->short_description }}</p>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="text-base font-semibold text-slate-900">${{ number_format($product->base_price, 2) }}</span>
                            <span class="text-sm font-semibold text-slate-700">View details</span>
                        </div>
                    </div>
                </a>
            @endforeach
        </div>

        <div class="mt-10">
            {{ $products->links() }}
        </div>

        <div class="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 class="text-xl font-semibold text-slate-900">Related categories</h2>
            <div class="mt-4 flex flex-wrap gap-3">
                @foreach ($relatedCategories as $relatedCategory)
                    <a href="{{ route('categories.show', $relatedCategory) }}" class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">{{ $relatedCategory->name }}</a>
                @endforeach
            </div>
        </div>
    </div>
@endsection
