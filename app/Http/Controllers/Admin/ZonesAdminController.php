<?php

namespace App\Http\Controllers\Admin;

use App\Services\HomeDataService;
use Inertia\Inertia;

class ZonesAdminController
{
    public function __construct(
        private HomeDataService $dataService,
    ) {}

    public function index()
    {
        return Inertia::render('admin/zones/ZonesList', [
            'zones' => $this->dataService->getZones(),
            'fishingTypes' => $this->dataService->getFishingTypes(),
            'experienceLevels' => $this->dataService->getExperienceLevels(),
        ]);
    }
}
