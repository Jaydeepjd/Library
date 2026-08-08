@props(['variant' => 'primary', 'href' => ''])

@php
    $base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
    $styles = $variant === 'secondary'
        ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-400'
        : 'bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-500';
@endphp

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $base . ' ' . $styles]) }}>
        {{ $slot }}
    </a>
@else
    <button {{ $attributes->merge(['class' => $base . ' ' . $styles]) }}>
        {{ $slot }}
    </button>
@endif
