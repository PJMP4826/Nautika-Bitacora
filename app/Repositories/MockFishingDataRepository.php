<?php

namespace App\Repositories;

use App\Interfaces\Repositories\FishingDataRepositoryInterface;

class MockFishingDataRepository implements FishingDataRepositoryInterface
{
    /**
     * {@inheritDoc}
     */
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

    /**
     * {@inheritDoc}
     */
    public function getExperienceLevels(): array
    {
        return [
            [
                'id' => 'beginner',
                'name' => 'Principiante',
                'description' => 'Fácil y seguro',
            ],
            [
                'id' => 'intermediate',
                'name' => 'Intermedio',
                'description' => 'Reto moderado',
            ],
            [
                'id' => 'expert',
                'name' => 'Experto',
                'description' => 'Alta exigencia técnica',
            ],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function getSeasons(): array
    {
        return [
            ['id' => 'spring', 'name' => 'Primavera', 'icon' => '🌸'],
            ['id' => 'summer', 'name' => 'Verano', 'icon' => '☀️'],
            ['id' => 'autumn', 'name' => 'Otoño', 'icon' => '🍂'],
            ['id' => 'winter', 'name' => 'Invierno', 'icon' => '❄️'],
        ];
    }

    public function getZones(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Cabo Esperanza',
                'region' => 'Costa Norte',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
                'types' => ['surfcasting', 'spinning'],
                'difficulty' => 'beginner',
                'best_season' => ['spring', 'summer'],
                'rating' => 4.8,
                'description' => 'Una extensa playa de arena dorada ideal para iniciarse en el surfcasting. Aguas tranquilas y fácil acceso.',
                'species' => ['Robalo', 'Lenguado', 'Corvina'],
                'regulations' => 'Licencia recreativa estándar. Prohibida la pesca nocturna sin permiso especial.',
            ],
            [
                'id' => 2,
                'name' => 'Arrecife del Silencio',
                'region' => 'Archipiélago Sur',
                'image' => 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1974&auto=format&fit=crop',
                'types' => ['deepsea', 'trolling'],
                'difficulty' => 'expert',
                'best_season' => ['autumn', 'winter'],
                'rating' => 4.9,
                'description' => 'Zona de corrientes fuertes y gran profundidad. El hogar de grandes depredadores pelágicos.',
                'species' => ['Atún', 'Marlin', 'Pez Espada'],
                'regulations' => 'Obligatorio radio VHF. Captura y suelta recomendada para especies de pico.',
            ],
            [
                'id' => 3,
                'name' => 'Estero Azul',
                'region' => 'Delta del Río',
                'image' => 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
                'types' => ['flyfishing', 'spinning'],
                'difficulty' => 'intermediate',
                'best_season' => ['spring', 'autumn'],
                'rating' => 4.5,
                'description' => 'Laberinto de manglares donde el río se encuentra con el mar. Perfecto para pesca ligera.',
                'species' => ['Sábalo', 'Pargo', 'Róbalo'],
                'regulations' => 'Motor eléctrico solamente para preservar el ecosistema.',
            ],
            [
                'id' => 4,
                'name' => 'Bahía de los Vientos',
                'region' => 'Costa Este',
                'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
                'types' => ['surfcasting'],
                'difficulty' => 'intermediate',
                'best_season' => ['winter'],
                'rating' => 4.2,
                'description' => 'Playa rocosa con fuerte oleaje, ideal para pescadores que buscan sargos y doradas en la espuma.',
                'species' => ['Sargo', 'Dorada', 'Lubina'],
                'regulations' => 'Precaución extrema con las mareas.',
            ],
            [
                'id' => 5,
                'name' => 'Lago Esmeralda',
                'region' => 'Sierra Alta',
                'image' => 'https://images.unsplash.com/photo-1499363536502-87642509e31b?q=80&w=1974&auto=format&fit=crop',
                'types' => ['flyfishing', 'spinning'],
                'difficulty' => 'beginner',
                'best_season' => ['spring', 'summer'],
                'rating' => 4.7,
                'description' => 'Lago de alta montaña con aguas cristalinas. Ideal para la pesca de trucha en un entorno sereno.',
                'species' => ['Trucha Arcoíris', 'Black Bass'],
                'regulations' => 'Pesca sin muerte obligatoria.',
            ],
        ];
    }

    public function getTestimonials(): array
    {
        return [
            [
                'name' => 'Fausto J.',
                'role' => 'Pescador',
                'content' => 'Gracias a Nautika encontré el Arrecife del Silencio. La información sobre las corrientes fue vital para mi salida.',
                'rating' => 4,
            ],
            [
                'name' => 'René  E.',
                'role' => 'Principiante',
                'content' => 'La guía para surfcasting me ayudó muchísimo. El Cabo Esperanza es exactamente como lo describieron.',
                'rating' => 5,
            ],
            [
                'name' => 'Edna F.',
                'role' => 'Guía Local',
                'content' => 'Una herramienta excelente para planificar. Los datos de temporada son muy precisos.',
                'rating' => 4,
            ],
            [
                'name' => 'Luisa F.',
                'role' => 'Turista',
                'content' => 'Un sitio web excelente para encontrar experiencias sobre pesca. Los tours son muy entretenidos.',
                'rating' => 5,
            ],
        ];
    }
}
