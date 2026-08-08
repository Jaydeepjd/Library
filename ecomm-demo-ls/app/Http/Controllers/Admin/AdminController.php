<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function dashboard(): View
    {
        $revenue = Order::query()->where('payment_status', 'paid')->sum('total');
        $currentMonthRevenue = Order::query()->where('payment_status', 'paid')->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])->sum('total');
        $orderCount = Order::query()->count();
        $customerCount = User::query()->count();
        $productCount = Product::query()->count();
        $topProducts = OrderItem::query()
            ->select('product_name')
            ->selectRaw('SUM(quantity) as total_quantity')
            ->groupBy('product_name')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->pluck('total_quantity', 'product_name');
        $recentOrders = Order::query()->with('user')->latest()->take(5)->get();
        $monthlyRevenue = Order::query()->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(total) as total')->where('payment_status', 'paid')->groupBy('month')->orderBy('month')->take(6)->get();

        return view('admin.dashboard', compact('revenue', 'currentMonthRevenue', 'orderCount', 'customerCount', 'productCount', 'topProducts', 'recentOrders', 'monthlyRevenue'));
    }

    public function orders(Request $request): View
    {
        $query = Order::query()->with('user');
        if ($request->filled('search')) {
            $query->where('order_number', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('status')) {
            $query->where('order_status', $request->status);
        }

        $orders = $query->latest()->paginate(15);

        return view('admin.orders', compact('orders'));
    }

    public function showOrder(Order $order): View
    {
        $order->load(['user', 'items', 'artwork']);

        return view('admin.order-show', compact('order'));
    }

    public function updateOrderStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate(['order_status' => ['required', 'in:pending,processing,shipped,delivered']]);
        $order->order_status = $validated['order_status'];
        $order->save();

        return back()->with('status', 'Order status updated.');
    }

    public function customers(): View
    {
        $customers = User::query()->withCount('orders')->withSum('orders as total_spending', 'total')->paginate(15);

        return view('admin.customers', compact('customers'));
    }

    public function showCustomer(User $user): View
    {
        $orders = $user->orders()->latest()->paginate(10);

        return view('admin.customer-show', compact('user', 'orders'));
    }

    public function quotes(Request $request): View
    {
        $query = Quote::query();
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        $quotes = $query->latest()->paginate(15);

        return view('admin.quotes', compact('quotes'));
    }

    public function showQuote(Quote $quote): View
    {
        return view('admin.quote-show', compact('quote'));
    }

    public function updateQuote(Request $request, Quote $quote): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,approved,rejected'],
            'admin_response' => ['nullable', 'string'],
        ]);
        $quote->fill($validated);
        $quote->save();

        return back()->with('status', 'Quote updated.');
    }
}
