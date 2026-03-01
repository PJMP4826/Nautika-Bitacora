<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UpdateZoneRequest;
use App\Models\Zone;
use App\Services\HomeDataService;
use App\Services\ZoneDataService;
use Inertia\Inertia;
use Throwable;

class ZonesAdminController
{
    public function __construct(
        private readonly HomeDataService $dataService,
        private readonly ZoneDataService $zoneDataService
    ) {}

    public function index()
    {
        return Inertia::render('admin/zones/AdminZonePage', [
            'zones' => $this->dataService->getZones(),
            'fishingTypes' => $this->dataService->getFishingTypes(),
            'experienceLevels' => $this->dataService->getExperienceLevels(),
        ]);
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateZoneRequest $request, Zone $zone)
    {
        $this->zoneDataService->update($zone, $request);

        return redirect()->back()->with('success', 'Zona actualizada correctamente');
    }
}
