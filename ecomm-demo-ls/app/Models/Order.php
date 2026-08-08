<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'discount',
        'shipping',
        'total',
        'currency',
        'payment_status',
        'payment_provider',
        'payment_reference',
        'order_status',
        'artwork_token',
        'artwork_token_expires_at',
        'shipping_name',
        'shipping_email',
        'shipping_phone',
        'shipping_address',
        'shipping_city',
        'shipping_state',
        'shipping_postal_code',
        'shipping_country',
        'coupon_code',
        'coupon_discount',
        'shipping_amount',
    ];

    protected $casts = [
        'artwork_token_expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function artwork(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }
}
