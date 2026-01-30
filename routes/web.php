<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ZoneController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/zones', [ZoneController::class, 'index'])->name('zone');


// Route::fallback(function () {
//    return '404';
// });
