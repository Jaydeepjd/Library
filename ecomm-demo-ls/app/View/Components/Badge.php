<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Badge extends Component
{
    public function __construct(public string $tone = 'default')
    {
    }

    public function render()
    {
        return view('components.badge');
    }
}
