<?php

namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    public function accessAdmin(User $user): bool
    {
        return (bool) ($user->is_admin ?? false);
    }
}
