<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function view(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    public function downloadInvoice(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    public function uploadArtwork(User $user, Order $order): bool
    {
        return $user->id === $order->user_id && $order->payment_status === 'paid';
    }
}
