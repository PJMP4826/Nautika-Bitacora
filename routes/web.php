<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExperienceLevelsAdminController;
use App\Http\Controllers\Admin\FishingTypesAdminController;
use App\Http\Controllers\Admin\SeasonsAdminController;
use App\Http\Controllers\Admin\WaterTypesAdminController;
use App\Http\Controllers\Admin\ZonesAdminController;
use App\Http\Controllers\Admin\FishAdminController;
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
        Route::delete('/{zone}', [ZonesAdminController::class, 'destroy'])->name('destroy');
        Route::post('/', [ZonesAdminController::class, 'store'])->name('store');
    });

    Route::prefix('fish')->name('fish.')->group(function () {
        Route::get('/', [FishAdminController::class, 'index'])->name('index');
        Route::put('/{zone}', [FishAdminController::class, 'update'])->name('update');
        Route::delete('/{zone}', [FishAdminController::class, 'destroy'])->name('destroy');
        Route::post('/', [FishAdminController::class, 'store'])->name('store');
    });

    Route::prefix('fishing-types')->name('fishing-types.')->group(function () {
        Route::get('/', [FishingTypesAdminController::class, 'index'])->name('index');
        Route::post('/', [FishingTypesAdminController::class, 'store'])->name('store');
        Route::put('/{fishingType}', [FishingTypesAdminController::class, 'update'])->name('update');
        Route::delete('/{fishingType}', [FishingTypesAdminController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('seasons')->name('seasons.')->group(function () {
        Route::get('/', [SeasonsAdminController::class, 'index'])->name('index');
        Route::post('/', [SeasonsAdminController::class, 'store'])->name('store');
        Route::put('/{season}', [SeasonsAdminController::class, 'update'])->name('update');
        Route::delete('/{season}', [SeasonsAdminController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('experience-levels')->name('experience-levels.')->group(function () {
        Route::get('/', [ExperienceLevelsAdminController::class, 'index'])->name('index');
        Route::post('/', [ExperienceLevelsAdminController::class, 'store'])->name('store');
        Route::put('/{experienceLevel}', [ExperienceLevelsAdminController::class, 'update'])->name('update');
        Route::delete('/{experienceLevel}', [ExperienceLevelsAdminController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('water-types')->name('water-types.')->group(function () {
        Route::get('/', [WaterTypesAdminController::class, 'index'])->name('index');
        Route::post('/', [WaterTypesAdminController::class, 'store'])->name('store');
        Route::put('/{waterType}', [WaterTypesAdminController::class, 'update'])->name('update');
        Route::delete('/{waterType}', [WaterTypesAdminController::class, 'destroy'])->name('destroy');
    });
});

Route::fallback([NotFound::class, 'index']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
