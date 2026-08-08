<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\ProductMaterial;
use Illuminate\Foundation\Http\FormRequest;

class ProductConfigurationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'width' => ['required', 'numeric', 'gt:0'],
            'height' => ['required', 'numeric', 'gt:0'],
            'material' => ['required', 'string'],
            'quantity' => ['required', 'integer', 'gt:0'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $productId = $this->route('product')?->id ?? $this->input('product_id');
            $product = $productId ? Product::query()->find($productId) : null;

            if (! $product || ! $product->status) {
                $validator->errors()->add('product', 'The selected product is not available.');
                return;
            }

            $materialName = $this->input('material');
            $material = $product->materials()->where('name', $materialName)->where('status', true)->first();

            if (! $material) {
                $validator->errors()->add('material', 'The selected material is invalid.');
            }
        });
    }
}
