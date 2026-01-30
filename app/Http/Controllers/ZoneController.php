<?php

namespace App\Http\Controllers;

use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use App\Services\FishingDataService;
use Inertia\Inertia;

class ZoneController extends Controller
{
    private FishingDataService $fishingDataService;
    public function __construct(FishingDataService $fishingDataService)
    {
        $this->fishingDataService = $fishingDataService;
    }

    public function index()
    {
        return Inertia::render('ZonesView', [
            'zones' => $this->fishingDataService->getZones(),
            'fishingTypes' => $this->fishingDataService->getFishingTypes(),
            'experienceLevels' => $this->fishingDataService->getExperienceLevels(),
        ]);
    }

    public function store(ZoneRequest $request)
    {
        return new ZoneResource(Zone::create($request->validated()));
    }

    public function show(Zone $zone)
    {
        return new ZoneResource($zone);
    }

    public function update(ZoneRequest $request, Zone $zone)
    {
        $zone->update($request->validated());

        return new ZoneResource($zone);
    }

    public function destroy(Zone $zone)
    {
        $zone->delete();

        return response()->json();
    }
}
