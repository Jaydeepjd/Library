<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatalogIndexRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show(Category $category, CatalogIndexRequest $request)
    {
        $query = Product::query()
            ->with(['category', 'materials'])
            ->where('category_id', $category->id)
            ->where('status', true);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->string('search') . '%')
                    ->orWhere('short_description', 'like', '%' . $request->string('search') . '%');
            });
        }

        $sort = $request->input('sort', 'default');
        match ($sort) {
            'price_asc' => $query->orderBy('base_price', 'asc'),
            'price_desc' => $query->orderBy('base_price', 'desc'),
            'featured' => $query->orderByDesc('featured'),
            default => $query->orderBy('name', 'asc'),
        };

        $products = $query->paginate(12)->withQueryString();

        $relatedCategories = Category::query()
            ->where('id', '!=', $category->id)
            ->limit(4)
            ->get();

        return view('catalog.category', compact('category', 'products', 'relatedCategories'))
            ->with('metaTitle', $category->name . ' | Custom Print')
            ->with('metaDescription', $category->description ?? 'Browse printing products in this category.')
            ->with('canonicalUrl', route('categories.show', $category))
            ->with('ogImage', $category->image ?? null);
    }
}
