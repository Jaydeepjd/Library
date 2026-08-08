@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Artwork upload</p>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">Upload your print-ready files</h1>
        <p class="mt-3 text-sm text-slate-600">Only PDF, PNG, and AI files up to 50MB are accepted. Files are stored privately and only associated with your order.</p>

        <form method="POST" action="{{ route('artwork.upload', ['token' => $token]) }}" enctype="multipart/form-data" class="mt-8 space-y-4">
            @csrf
            <label class="block text-sm font-medium text-slate-700">
                Select artwork file
                <input type="file" name="artwork" accept=".pdf,.png,.ai,application/pdf,image/png,application/postscript" class="mt-2 block w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
            <button type="submit" class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Upload artwork</button>
        </form>
    </div>
</div>
@endsection
