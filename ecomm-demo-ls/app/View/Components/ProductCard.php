<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ProductCard extends Component
{
    public function __construct(public object $product)
    {
    }

    public function render()
    {
        return view('components.product-card');
    }
}
