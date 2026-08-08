<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'slug', 'short_description', 'description', 'image', 'base_price', 'status', 'featured'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function materials(): HasMany
    {
        return $this->hasMany(ProductMaterial::class);
    }
}
