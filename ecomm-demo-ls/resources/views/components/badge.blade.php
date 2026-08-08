@props(['tone' => 'default'])

@php
    $styles = match ($tone) {
        'success' => 'bg-emerald-100 text-emerald-700',
        'warning' => 'bg-amber-100 text-amber-700',
        default => 'bg-slate-100 text-slate-700',
    };
@endphp

<span {{ $attributes->merge(['class' => 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ' . $styles]) }}>
    {{ $slot }}
</span>
