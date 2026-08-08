@props(['type' => 'text', 'name' => '', 'label' => ''])

<div>
    @if ($label)
        <label for="{{ $name }}" class="mb-2 block text-sm font-medium text-slate-700">{{ $label }}</label>
    @endif
    <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" {{ $attributes->merge(['class' => 'w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none']) }} />
</div>
