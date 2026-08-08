@extends('layouts.app')

@section('content')
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div>
    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
    <h1 class="mt-2 text-3xl font-semibold text-slate-900">Customers</h1>
  </div>

  <div class="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-slate-700">
        <thead class="bg-slate-50 text-left">
          <tr>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Orders</th>
            <th class="px-4 py-3">Spend</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          @foreach ($customers as $customer)
            <tr class="border-t border-slate-200">
              <td class="px-4 py-3">{{ $customer->name }}</td>
              <td class="px-4 py-3">{{ $customer->email }}</td>
              <td class="px-4 py-3">{{ $customer->orders_count }}</td>
              <td class="px-4 py-3">${{ number_format($customer->total_spending ?? 0, 2) }}</td>
              <td class="px-4 py-3"><a href="{{ route('admin.customers.show', $customer) }}" class="font-semibold text-slate-700">View</a></td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-6">{{ $customers->links() }}</div>
</div>
@endsection
