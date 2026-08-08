<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->is_admin ?? false;
    }

    public function view(User $user): bool
    {
        return $user->is_admin ?? false;
    }
}
