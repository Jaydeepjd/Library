@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div>
    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
    <h1 class="mt-2 text-3xl font-semibold text-slate-900">Quotes</h1>
  </div>

  <div class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-slate-700">
        <thead class="bg-slate-50 text-left">
          <tr>
            <th class="px-4 py-3">Customer</th>
            <th class="px-4 py-3">Product</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          @foreach ($quotes as $quote)
            <tr class="border-t border-slate-200">
              <td class="px-4 py-3">{{ $quote->customer_name }}</td>
              <td class="px-4 py-3">{{ $quote->product_name }}</td>
              <td class="px-4 py-3">{{ ucfirst($quote->status) }}</td>
              <td class="px-4 py-3"><a href="{{ route('admin.quotes.show', $quote) }}" class="font-semibold text-slate-700">View</a></td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-6">{{ $quotes->links() }}</div>
</div>
@endsection
