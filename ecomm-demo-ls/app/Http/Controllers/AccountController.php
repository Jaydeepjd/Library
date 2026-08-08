<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AccountController extends Controller
{
    public function dashboard(): View
    {
        $user = Auth::user();
        $orders = $user->orders()->latest()->take(5)->get();
        $orderCount = $user->orders()->count();

        return view('account.dashboard', compact('user', 'orders', 'orderCount'));
    }

    public function orders(): View
    {
        $orders = Auth::user()->orders()->latest()->paginate(10);

        return view('account.orders', compact('orders'));
    }

    public function show(Order $order): View|RedirectResponse
    {
        $this->authorize('view', $order);

        return view('account.order-detail', compact('order'));
    }

    public function downloadInvoice(Order $order)
    {
        $this->authorize('downloadInvoice', $order);

        $path = storage_path('app/private/invoices/' . $order->id . '-');
        $files = glob($path . '*');
        if (empty($files)) {
            abort(404);
        }

        return response()->download($files[0]);
    }
}
