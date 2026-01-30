<?php

namespace App\Http\Controllers;

use App\Services\FishingDataService;
use App\Services\HomeDataService;
use Inertia\Inertia;

class HomeController extends Controller
{
    private HomeDataService $service;

    public function __construct(
        HomeDataService $service
    ) {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('Home', [
            'fishingTypes' => $this->service->getFishingTypes(),
            'experienceLevels' => $this->service->getExperienceLevels(),
            'seasons' => $this->service->getSeasons(),
            'zones' => $this->service->getZones(),
            'testimonials' => $this->service->getTestimonials(),
            'fish' => $this->service->getFishTypes(),
        ]);
    }
}
