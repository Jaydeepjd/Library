<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="{{ $metaDescription ?? 'Professional custom printing and packaging for business essentials.' }}">
    <meta name="robots" content="{{ $robots ?? 'index,follow' }}">
    <title>{{ $metaTitle ?? config('app.name') }}</title>
    <link rel="canonical" href="{{ $canonicalUrl ?? url()->current() }}">
    <meta property="og:title" content="{{ $ogTitle ?? $metaTitle ?? config('app.name') }}">
    <meta property="og:description" content="{{ $ogDescription ?? $metaDescription ?? 'Professional custom printing and packaging for business essentials.' }}">
    <meta property="og:url" content="{{ $canonicalUrl ?? url()->current() }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    @if (! empty($ogImage))
        <meta property="og:image" content="{{ $ogImage }}">
    @endif
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    @stack('head')
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
    <div class="min-h-screen flex flex-col">
        <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <a href="/" class="text-lg font-semibold tracking-wide text-slate-900">CustomPrint</a>
                <nav class="hidden items-center gap-6 md:flex">
                    <a href="#products" class="text-sm font-medium text-slate-600 hover:text-slate-900">Products</a>
                    <a href="#categories" class="text-sm font-medium text-slate-600 hover:text-slate-900">Categories</a>
                    <a href="#about" class="text-sm font-medium text-slate-600 hover:text-slate-900">About</a>
                </nav>
                <div class="flex items-center gap-3">
                    <div class="hidden rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 sm:flex">
                        <span class="mr-2">🔎</span>
                        Search
                    </div>
                    <a href="{{ route('cart.index') }}" class="rounded-full border border-slate-200 p-2 text-slate-700">🛒 <span class="ml-1 text-sm">{{ count(Session::get('cart', [])) }}</span></a>
                    <a href="#" class="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">Login</a>
                </div>
            </div>
        </header>

        <main class="flex-1">
            @yield('content')
        </main>

        <footer class="border-t border-slate-200 bg-slate-900 text-slate-200">
            <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div class="grid gap-8 md:grid-cols-3">
                    <div>
                        <h2 class="text-lg font-semibold">CustomPrint</h2>
                        <p class="mt-3 text-sm text-slate-400">Fast, reliable custom printing for packaging, signage, and promotional materials.</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold uppercase tracking-wide">Navigation</h3>
                        <ul class="mt-3 space-y-2 text-sm text-slate-400">
                            <li><a href="#products" class="hover:text-white">Products</a></li>
                            <li><a href="#categories" class="hover:text-white">Categories</a></li>
                            <li><a href="#about" class="hover:text-white">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold uppercase tracking-wide">Contact</h3>
                        <ul class="mt-3 space-y-2 text-sm text-slate-400">
                            <li>hello@customprint.example</li>
                            <li>+1 (555) 010-2048</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
