<?php

namespace App\Repositories;

class MockZoneRepository
{
    public function getZones(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Cabo Esperanza',
                'slug' => 'cabo-esperanza',
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
                'slug' => 'arrecife-del-silencio',
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
                'slug' => 'estero-azul',
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
                'slug' => 'bahia-de-los-vientos',
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
                'slug' => 'lago-esmeralda',
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

    public function getZoneBySlug(string $slug): array
    {
        foreach ($this->getZones() as $zone) {
            if ($zone['slug'] === $slug) {
                return $zone;
            }
        }

        return [];
    }
}
