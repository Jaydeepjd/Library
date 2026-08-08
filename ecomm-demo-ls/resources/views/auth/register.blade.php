@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 class="text-3xl font-semibold text-slate-900">Create your account</h1>
        <form method="POST" action="{{ route('register') }}" class="mt-6 space-y-4">
            @csrf
            <label class="block text-sm font-medium text-slate-700">Name<input name="name" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
            <label class="block text-sm font-medium text-slate-700">Email<input type="email" name="email" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
            <label class="block text-sm font-medium text-slate-700">Password<input type="password" name="password" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
            <label class="block text-sm font-medium text-slate-700">Confirm password<input type="password" name="password_confirmation" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
            <button type="submit" class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Register</button>
        </form>
    </div>
</div>
@endsection
