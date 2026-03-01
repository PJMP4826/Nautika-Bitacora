<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ZonesAdminController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\FishController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotFound;
use App\Http\Controllers\PlaningController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ZoneController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchController::class, 'search'])->name('search');
Route::get('/zones', [ZoneController::class, 'index'])->name('zone');
Route::get('/zones/{zone_name}', [ZoneController::class, 'show'])->name('zone.show');
Route::get('/fish', [FishController::class, 'index'])->name('fish');
Route::get('/fish/{fish_slug}', [FishController::class, 'show'])->name('fish.show');
Route::get('/contact', [ContactoController::class, 'index']);
Route::post('/contact', [ContactoController::class, 'store']);

Route::get('/planing', [PlaningController::class, 'index']);

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('zones')->name('zones.')->group(function () {
        Route::get('/', [ZonesAdminController::class, 'index'])->name('index');
        Route::put('/{zone}', [ZonesAdminController::class, 'update'])->name('update');
    });
});

Route::fallback([NotFound::class, 'index']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
