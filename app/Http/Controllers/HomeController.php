<?php

namespace App\Http\Controllers;

use App\Services\FishingDataService;
use Inertia\Inertia;

class HomeController extends Controller
{
    private FishingDataService $fishingDataService;

    public function __construct(
        FishingDataService $fishingDataService
    ) {
        $this->fishingDataService = $fishingDataService;
    }

    public function index()
    {
        return Inertia::render('Home', [
            'fishingTypes' => $this->fishingDataService->getFishingTypes(),
            'experienceLevels' => $this->fishingDataService->getExperienceLevels(),
            'seasons' => $this->fishingDataService->getSeasons(),
            'zones' => $this->fishingDataService->getZones(),
            'testimonials' => $this->fishingDataService->getTestimonials(),
        ]);
    }
}
