<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\HomeDataService;
use Illuminate\Http\JsonResponse;

class FishController extends Controller
{
    public function __construct(
        private HomeDataService $homeDataService
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->homeDataService->getFishTypes()
        ]);
    }

    public function show(string $fish_slug): JsonResponse
    {
        $fish = $this->homeDataService->getFishBySlug($fish_slug);

        if (!$fish) {
            return response()->json(['message' => 'Pez no encontrado'], 404);
        }

        return response()->json(['data' => $fish]);
    }
}