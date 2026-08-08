<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductConfigurationRequest;
use App\Models\Product;
use App\Services\PricingService;

class ProductConfigurationController extends Controller
{
    public function __construct(private readonly PricingService $pricingService)
    {
    }

    public function estimate(Product $product, ProductConfigurationRequest $request)
    {
        $quote = $this->pricingService->calculate($product, $request->validated());

        return response()->json($quote);
    }
}
