<?php

namespace App\Repositories;

use App\Interfaces\Repositories\FishingDataRepositoryInterface;

class MockFishingDataRepository implements FishingDataRepositoryInterface
{

    public function getFishingTypes(): array
    {
        return [
            [
                'id' => 'surfcasting',
                'name' => 'Surfcasting',
                'icon' => '🌊',
                'description' => 'Pesca de orilla de largo alcance. Ideal para playas de arena y zonas mixtas.',
                'count' => 12,
            ],
            [
                'id' => 'spinning',
                'name' => 'Spinning',
                'icon' => '🎣',
                'description' => 'Pesca dinámica con señuelos artificiales. Requiere movimiento constante.',
                'count' => 8,
            ],
            [
                'id' => 'trolling',
                'name' => 'Curricán',
                'icon' => '🛥️',
                'description' => 'Arrastre de señuelos desde embarcación en movimiento para peces depredadores.',
                'count' => 5,
            ],
            [
                'id' => 'deepsea',
                'name' => 'Fondo',
                'icon' => '⚓',
                'description' => 'Pesca vertical buscando especies que habitan en el lecho marino.',
                'count' => 7,
            ],
            [
                'id' => 'flyfishing',
                'name' => 'Mosca',
                'icon' => '🦋',
                'description' => 'Técnica sutil utilizando señuelos ligeros que imitan insectos o pequeños peces.',
                'count' => 4,
            ],
        ];
    }




}
