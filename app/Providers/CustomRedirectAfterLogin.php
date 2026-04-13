<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;

class CustomRedirectAfterLogin
{
    /**
     * Get the post-login redirect path based on user type.
     */
    public static function redirectTo()
    {
        $user = Auth::user();
        if (!$user) {
            return '/';
        }
        // Ajusta esto según tu lógica de roles/tipos
        if (method_exists($user, 'hasRole') && $user->hasRole('admin')) {
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
