<?php

namespace App\View\Components;

use Illuminate\View\Component;

class FormInput extends Component
{
    public function __construct(public string $type = 'text', public string $name = '', public string $label = '')
    {
    }

    public function render()
    {
        return view('components.form-input');
    }
}
