<?php

namespace App\Http\Controllers\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartItemRequest;
use App\Models\Product;
use App\Services\PricingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    public function __construct(private readonly PricingService $pricingService)
    {
    }

    public function index()
    {
        $items = Session::get('cart', []);
        $totals = $this->summarize($items);

        return view('cart.index', compact('items', 'totals'));
    }

    public function add(CartItemRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();
        $quote = $this->pricingService->calculate($product, [
            'width' => $validated['width'],
            'height' => $validated['height'],
            'material' => $validated['material'],
            'quantity' => $validated['quantity'],
        ]);

        $cart = Session::get('cart', []);
        $key = $this->makeItemKey($product->id, $validated);

        $cart[$key] = [
            'product_id' => $product->id,
            'product_name' => $product->name,
            'width' => (float) $validated['width'],
            'height' => (float) $validated['height'],
            'material' => $validated['material'],
            'quantity' => (int) $validated['quantity'],
            'unit_price' => $quote['base_unit_price'],
            'total_price' => $quote['total'],
            'configuration' => [
                'area' => $quote['area'],
                'material' => $validated['material'],
                'discount_rate' => $quote['discount_rate'],
            ],
        ];

        Session::put('cart', $cart);

        return redirect()->route('cart.index')->with('status', 'Item added to cart.');
    }

    public function update(Request $request, string $key): RedirectResponse
    {
        $cart = Session::get('cart', []);
        if (! isset($cart[$key])) {
            abort(404);
        }

        $item = $cart[$key];
        $quantity = max(1, (int) $request->input('quantity', $item['quantity']));
        $product = Product::query()->findOrFail($item['product_id']);
        $quote = $this->pricingService->calculate($product, [
            'width' => $item['width'],
            'height' => $item['height'],
            'material' => $item['material'],
            'quantity' => $quantity,
        ]);

        $item['quantity'] = $quantity;
        $item['unit_price'] = $quote['base_unit_price'];
        $item['total_price'] = $quote['total'];
        $item['configuration']['area'] = $quote['area'];
        $item['configuration']['discount_rate'] = $quote['discount_rate'];
        $cart[$key] = $item;
        Session::put('cart', $cart);

        return redirect()->route('cart.index')->with('status', 'Cart updated.');
    }

    public function remove(string $key): RedirectResponse
    {
        $cart = Session::get('cart', []);
        unset($cart[$key]);
        Session::put('cart', $cart);

        return redirect()->route('cart.index')->with('status', 'Item removed.');
    }

    public function clear(): RedirectResponse
    {
        Session::forget('cart');

        return redirect()->route('cart.index')->with('status', 'Cart cleared.');
    }

    private function summarize(array $items): array
    {
        $subtotal = array_sum(array_column($items, 'total_price'));
        $discount = 0;
        foreach ($items as $item) {
            $discount += max(0, ($item['unit_price'] * $item['quantity']) - $item['total_price']);
        }

        return [
            'subtotal' => round($subtotal, 2),
            'discount' => round($discount, 2),
            'total' => round($subtotal - $discount, 2),
        ];
    }

    private function makeItemKey(int $productId, array $data): string
    {
        return implode(':', [
            $productId,
            (string) round((float) $data['width'], 2),
            (string) round((float) $data['height'], 2),
            (string) $data['material'],
            (string) (int) $data['quantity'],
        ]);
    }
}
