<?php

use App\Http\Controllers\FishController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ZoneController;
use App\Http\Controllers\NotFound;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/zones', [ZoneController::class, 'index'])->name('zone');
Route::get('/zones/{zone_name}', [ZoneController::class, 'show'])->name('zone.show');
Route::get('/fish', [FishController::class, 'index'])->name('fish');
Route::get('/fish/{fish_slug}', [FishController::class, 'show'])->name('fish.show');

Route::fallback([NotFound::class, 'index']);
