<?php

namespace App\Http\Controllers;

use App\Services\PlaningDataService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaningController
{
    public function __construct(
        private readonly PlaningDataService $planingDataService
    ) {}

    public function index(Request $request)
    {
        $request->validate([
            'fishingType' => 'required|string',
            'experience' => 'required|string',
            'season' => 'required|string',
        ]);

        $zones = $this->planingDataService->searchZones(
            fishingType: $request->query('fishingType'),
            experienceLevel: $request->query('experience'),
            season: $request->query('season'),
        );

        return Inertia::render('PlaningResultView', [
            'zones' => $zones,
            'experienceLevels' => array_map(fn ($expirence) => $expirence['difficulty'], $zones),
            'fishingTypes' => array_map(fn ($types) => $types['types'], $zones),
            'breadcrumbs' => [
                ['label' => 'Inicio', 'url' => route('home')],
                ['label' => 'Planificación', 'url' => null],
            ],
        ]);
    }
}
