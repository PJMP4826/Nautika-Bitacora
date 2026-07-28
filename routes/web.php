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
use App\Http\Controllers\Web\ZoneController;
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

    // Administración de usuarios (solo admin)
    Route::middleware('role:admin')->group(function () {
        Route::get('users', [\App\Http\Controllers\Admin\UsersAdminController::class, 'index'])->name('users.index');
        Route::post('users/{user}/role', [\App\Http\Controllers\Admin\UsersAdminController::class, 'updateRole'])->name('users.updateRole');
        Route::delete('users/{user}', [\App\Http\Controllers\Admin\UsersAdminController::class, 'destroy'])->name('users.destroy');
    });

    // Dashboard — any authenticated + verified user with any admin role
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->middleware('role:admin|moderator')
        ->name('dashboard');

    // Zones
    Route::prefix('zones')->name('zones.')->group(function () {
        Route::get('/', [ZonesAdminController::class, 'index'])
            ->middleware('permission:zone.view')
            ->name('index');

        Route::post('/', [ZonesAdminController::class, 'store'])
            ->middleware('permission:zone.create')
            ->name('store');

        Route::put('/{zone}', [ZonesAdminController::class, 'update'])
            ->middleware('permission:zone.edit')
            ->name('update');

        Route::delete('/{zone}', [ZonesAdminController::class, 'destroy'])
            ->middleware('permission:zone.delete')
            ->name('destroy');
    });

    // Fish
    Route::prefix('fish')->name('fish.')->group(function () {
        Route::get('/', [FishAdminController::class, 'index'])
            ->middleware('permission:fish.view')
            ->name('index');

        Route::post('/', [FishAdminController::class, 'store'])
            ->middleware('permission:fish.create')
            ->name('store');

        Route::put('/{fish}', [FishAdminController::class, 'update'])
            ->middleware('permission:fish.edit')
            ->name('update');

        Route::delete('/{fish}', [FishAdminController::class, 'destroy'])
            ->middleware('permission:fish.delete')
            ->name('destroy');
    });

    // Catalog resources — admin only (fishing-types, seasons, experience-levels, water-types)
    Route::middleware('role:admin')->group(function () {

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
});

Route::fallback([NotFound::class, 'index']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
