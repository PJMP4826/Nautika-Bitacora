<?php

namespace App\Http\Controllers;

use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use App\Services\HomeDataService;
use App\Services\ZoneDataService;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ZoneController extends Controller
{
    public function __construct(
        private HomeDataService $homeDataService,
        private ZoneDataService $zoneDataService
    ) {}

    public function index()
    {
        return Inertia::render('ZonesView', [
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
            throw new NotFoundHttpException('Zona no encontrada.');
        }

        return Inertia::render('Zones/ZoneDetailView', [
            'zone' => $zone,
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
        $zone->delete();

        return response()->json();
    }
}
