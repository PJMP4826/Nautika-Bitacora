<?php

namespace App\Http\Controllers\Auth;

use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController as FortifyAuthenticatedSessionController;
use Illuminate\Http\Request;
use App\Actions\Fortify\CustomRedirectAfterLogin;

class AuthenticatedSessionController extends FortifyAuthenticatedSessionController
{
    /**
     * Where to redirect users after login.
     */
    protected function redirectTo()
    {
        return CustomRedirectAfterLogin::redirectTo();
    }
}
