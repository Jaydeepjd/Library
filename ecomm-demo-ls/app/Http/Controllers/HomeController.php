<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Cache::remember('home.featured_products', 3600, function () {
            return Product::query()
                ->with('category')
                ->where('featured', true)
                ->where('status', true)
                ->limit(6)
                ->get();
        });

        $categories = Cache::remember('home.categories', 3600, function () {
            return Category::query()->where('status', true)->limit(6)->get();
        });

        return view('home', compact('featuredProducts', 'categories'))
            ->with('metaTitle', config('app.name'))
            ->with('metaDescription', 'Fast, reliable custom printing for packaging, signage, and promotional materials.');
    }
}
