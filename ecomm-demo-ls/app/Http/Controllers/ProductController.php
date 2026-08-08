<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show(Category $category, Product $product)
    {
        abort_unless($product->category_id === $category->id, 404);

        $product->load(['category', 'materials']);

        $relatedProducts = Product::query()
            ->with(['category', 'materials'])
            ->where('category_id', $category->id)
            ->where('id', '!=', $product->id)
            ->where('status', true)
            ->limit(4)
            ->get();

        return view('catalog.product', compact('category', 'product', 'relatedProducts'))
            ->with('metaTitle', $product->name . ' | Custom Print')
            ->with('metaDescription', $product->short_description ?? 'Browse this custom printing product.')
            ->with('canonicalUrl', route('products.show', [$category, $product]))
            ->with('ogImage', $product->image ?? null);
    }
}
