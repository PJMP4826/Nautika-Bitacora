<?php

namespace App\Http\Controllers\Api;

use App\Models\Zone;
use App\Http\Controllers\Controller;
use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Services\ZoneDataService;
use App\Services\HomeDataService;
use App\Services\WeatherService;

class ZoneController extends Controller
{
    public function __construct(
        private HomeDataService $homeDataService,
        private ZoneDataService $zoneDataService,
        private WeatherService $weatherService
    ) {}

    public function index()
    {
        return response()->json([
            'zones' => $this->homeDataService->getZones(),
            'fishingTypes' => $this->homeDataService->getFishingTypes(),
            'experienceLevels' => $this->homeDataService->getExperienceLevels(),
        ]);
    }

    public function show(string $zone_name)
    {
        $zone = $this->zoneDataService->findZoneDetailBySlug($zone_name);
        if (!$zone) {
            return response()->json(['message' => 'Zona no encontrada'], 404);
        }

        $weather = ($zone['latitude'] && $zone['longitude'])
            ? $this->weatherService->getZoneWeather($zone['latitude'], $zone['longitude'])
            : null;

        // dd($weather);

        return response()->json([
            'zone' => $zone,
            'weather' => $weather,
            'breadcrumbs' => [
                ['label' => 'Inicio', 'url' => route('home')],
                ['label' => 'Zonas', 'url' => route('zone')],
                ['label' => $zone['name'], 'url' => null],
            ],
        ]);
    }

    public function store(ZoneRequest $request)
    {
        return new ZoneResource(Zone::create($request->validated()));
    }

    public function update(ZoneRequest $request, Zone $zone)
    {
        $zone->update($request->validated());
        return new ZoneResource($zone);
    }

    public function destroy(Zone $zone)
    {
        $this->zoneDataService->delete($zone);
        return response()->json(['message' => 'Zone deleted successfully']);
    }
}
