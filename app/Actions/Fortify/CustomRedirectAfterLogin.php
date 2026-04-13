<?php

namespace App\Actions\Fortify;

use Illuminate\Support\Facades\Auth;

class CustomRedirectAfterLogin
{
    public static function redirectTo()
    {
        $user = Auth::user();
        if (!$user) {
            return '/';
        }
        // Si usas Spatie o similar
        if (method_exists($user, 'hasRole') && ($user->hasRole('admin') || $user->hasRole('moderator'))) {
            return '/admin/zones';
        }
        // Si tienes un campo tipo o role
        if (property_exists($user, 'type') && $user->type === 'fisher') {
            return '/';
        }
        // Por defecto
        return '/';
    }
}
