<?php

namespace App\Http\Controllers;

use App\Services\HomeDataService;
use App\Utils\StringFormater;
use Inertia\Inertia;

class FishController extends Controller
{
    public function __construct(
        private HomeDataService $homeDataService
    ) {}

    public function index()
    {
        return Inertia::render('landing/fish/FishView', [
            'fish' => $this->homeDataService->getFishTypes(),
            'breadcrumbs' => [
                ['label' => 'Inicio', 'url' => route('home')],
                ['label' => 'Peces', 'url' => null],
            ],
        ]);
    }

    public function show(string $fish_slug)
    {
        $fish = $this->homeDataService->getFishBySlug($fish_slug);
        if (empty($fish)) {
            return Inertia::render('landing/errors/NotFound', [
                'not_found_param' => 'El pez '.StringFormater::kebabToTitle($fish_slug),
            ])
                ->toResponse(request())
                ->setStatusCode(404);
        }

        return Inertia::render('landing/fish/FishDetailView', [
            'fish' => $fish,
            'breadcrumbs' => [
                ['label' => 'Inicio', 'url' => route('home')],
                ['label' => 'Peces', 'url' => route('fish')],
                ['label' => $fish['name'], 'url' => null],
            ],
        ]);
    }
}
