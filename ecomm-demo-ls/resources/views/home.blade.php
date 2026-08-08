@extends('layouts.app')

@section('content')
    <section class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div class="flex flex-col justify-center">
            <x-badge tone="success">Fast turnaround · Premium finishing</x-badge>
            <h1 class="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Print products that look sharp from first glance to final delivery.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Order professional business cards, brochures, signage, packaging, and more with custom sizing and secure artwork upload.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
                <x-button href="#products">Shop now</x-button>
                <x-button variant="secondary" href="#categories">Browse categories</x-button>
            </div>
            <div class="mt-8 flex flex-wrap gap-4 text-sm text-slate-600">
                <span>✓ 24h quote turnaround</span>
                <span>✓ Free delivery on bulk orders</span>
                <span>✓ Secure artwork handling</span>
            </div>
        </div>
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f337?auto=format&fit=crop&w=1400&q=80" alt="Printing press and custom materials" width="1400" height="900" loading="eager" class="h-[420px] w-full rounded-[1.5rem] object-cover" />
        </div>
    </section>

    <section id="products" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-4">
            <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Featured products</p>
                <h2 class="mt-2 text-3xl font-semibold text-slate-900">Popular print essentials</h2>
            </div>
            <a href="#" class="text-sm font-semibold text-slate-700 hover:text-slate-900">View all</a>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            @foreach ($featuredProducts as $product)
                <x-product-card :product="$product" />
            @endforeach
        </div>
    </section>

    <section id="categories" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div class="flex items-end justify-between gap-4">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Popular categories</p>
                    <h2 class="mt-2 text-3xl font-semibold text-slate-900">A catalog built for modern teams</h2>
                </div>
            </div>
            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                @foreach ($categories as $category)
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <h3 class="text-lg font-semibold text-slate-900">{{ $category->name }}</h3>
                        <p class="mt-2 text-sm text-slate-600">{{ $category->description }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <section id="about" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-6 lg:grid-cols-3">
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 class="text-xl font-semibold text-slate-900">Trusted quality</h3>
                <p class="mt-3 text-sm text-slate-600">Premium print standards with color precision and dependable delivery.</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 class="text-xl font-semibold text-slate-900">Flexible customization</h3>
                <p class="mt-3 text-sm text-slate-600">Choose size, material, quantity, and custom configurations for each order.</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 class="text-xl font-semibold text-slate-900">Secure artwork flow</h3>
                <p class="mt-3 text-sm text-slate-600">Upload and manage artwork after payment through a protected workflow.</p>
            </div>
        </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-slate-900 px-8 py-12 text-white">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Ready to create</p>
                    <h2 class="mt-2 text-3xl font-semibold">Launch your next print campaign with confidence.</h2>
                </div>
                <x-button variant="secondary" href="#">Request a quote</x-button>
            </div>
        </div>
    </section>
@endsection
