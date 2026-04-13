<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class CustomLoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();
        if ($user && method_exists($user, 'hasRole') && $user->hasRole('admin')) {
            $redirect = '/admin/zones';
        } else {
            $redirect = '/';
        }
        return redirect()->intended($redirect);
    }
}
