<?php

use App\Http\Controllers\Api\FishController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ZoneController;


Route::get('/zones', [ZoneController::class, 'index']);
Route::get('/zones/{zone_name}', [ZoneController::class, 'show']);

Route::get('/fish', [FishController::class, 'index']);
Route::get('/fish/{fish_slug}', [FishController::class, 'show']);
