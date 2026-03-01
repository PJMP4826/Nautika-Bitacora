<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotFound extends Controller
{
    public function index()
    {
        return Inertia::render('landing/errors/NotFound');
    }
}
