<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = ['name', 'email', 'product_type', 'size', 'quantity', 'message', 'status', 'admin_response'];
}
