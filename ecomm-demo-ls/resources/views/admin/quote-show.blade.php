@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quote</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ $quote->product_name }}</h1>
      <p class="mt-2 text-sm text-slate-600">{{ $quote->customer_name }} • {{ $quote->customer_email }}</p>
    </div>

    <form method="POST" action="{{ route('admin.quotes.update', $quote) }}" class="mt-8 space-y-4">
      @csrf
      <div>
        <label class="text-sm font-medium text-slate-700">Status</label>
        <select name="status" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
          <option value="pending" {{ $quote->status === 'pending' ? 'selected' : '' }}>Pending</option>
          <option value="approved" {{ $quote->status === 'approved' ? 'selected' : '' }}>Approved</option>
          <option value="rejected" {{ $quote->status === 'rejected' ? 'selected' : '' }}>Rejected</option>
        </select>
      </div>
      <div>
        <label class="text-sm font-medium text-slate-700">Admin response</label>
        <textarea name="admin_response" rows="4" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">{{ old('admin_response', $quote->admin_response) }}</textarea>
      </div>
      <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save</button>
    </form>
  </div>
</div>
@endsection
