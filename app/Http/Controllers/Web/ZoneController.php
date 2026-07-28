<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use App\Services\HomeDataService;
use App\Services\WeatherService;
use App\Services\ZoneDataService;
use App\Utils\StringFormater;
use Inertia\Inertia;

class ZoneController extends Controller
{
    public function __construct(
        private HomeDataService $homeDataService,
        private ZoneDataService $zoneDataService,
        private WeatherService $weatherService
    ) {}

    public function index()
    {
        return Inertia::render('landing/zones/ZonesView', [
            'zones' => $this->homeDataService->getZones(),
            'fishingTypes' => $this->homeDataService->getFishingTypes(),
            'experienceLevels' => $this->homeDataService->getExperienceLevels(),
        ]);
    }

    public function store(ZoneRequest $request)
    {
        return new ZoneResource(Zone::create($request->validated()));
    }

    public function show(string $zone_name)
    {
        $zone = $this->zoneDataService->findZoneDetailBySlug($zone_name);
        if (empty($zone)) {
            return Inertia::render('landing/errors/NotFound', [
                'not_found_param' => 'La zona ' . StringFormater::kebabToTitle($zone_name),
            ])
                ->toResponse(request())
                ->setStatusCode(404);
        }

        $weather = ($zone['latitude'] && $zone['longitude'])
            ? $this->weatherService->getZoneWeather($zone['latitude'], $zone['longitude'])
            : null;
        
        // dd($weather);

        return Inertia::render('landing/zones/ZoneDetailView', [
            'zone' => $zone,
            'weather' => $weather,
            'breadcrumbs' => [
                ['label' => 'Inicio', 'url' => route('home')],
                ['label' => 'Zonas', 'url' => route('zone')],
                ['label' => $zone['name'], 'url' => null],
            ],
        ]);
    }

    public function update(ZoneRequest $request, Zone $zone)
    {
        $zone->update($request->validated());

        return new ZoneResource($zone);
    }

    public function destroy(Zone $zone)
    {
        $this->zoneDataService->delete($zone);

        return response()->json();
    }
}
