<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ZoneController;

Route::get('/zones', [ZoneController::class, 'index']);
Route::get('/zones/{zone_name}', [ZoneController::class, 'show']);