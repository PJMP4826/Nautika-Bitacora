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

    public function getFishTypes(): array
    {
        return [
            [
                'name' => 'Pez Payaso',
                'image' => 'https://www.peceswiki.com/Imagenes/caracteristicas-distintivas-del-pez-payaso.jpg',
                'sciencetic_name' => 'Amphiprion ocellaris',
                'zone' => [
                    'id' => 1,
                    'name' => 'Cabo Esperanza',
                    'region' => 'Costa Norte',
                    'image' => 'cabo_esperanza.jpg',
                    'types' => ['snorkeling', 'spinning'],
                    'difficulty' => 'beginner',
                    'best_season' => ['spring', 'summer'],
                    'rating' => 4.8,
                    'description' => 'Zona coralina poco profunda ideal para observación y pesca ligera.',
                    'species' => ['Pez Payaso', 'Damisela'],
                    'regulations' => 'Prohibido el uso de redes. Solo pesca recreativa controlada.',
                ],
            ],
            [
                'name' => 'Tiburón Blanco',
                'image' => 'https://cdn0.expertoanimal.com/es/razas/2/1/8/tiburon-blanco_812_0_orig.jpg',
                'sciencetic_name' => 'Carcharodon carcharias',
                'zone' => [
                    'id' => 2,
                    'name' => 'Isla Rocosa',
                    'region' => 'Océano Abierto',
                    'image' => 'isla_rocosa.jpg',
                    'types' => ['deep_sea'],
                    'difficulty' => 'expert',
                    'best_season' => ['winter'],
                    'rating' => 4.9,
                    'description' => 'Aguas profundas con fuerte presencia de grandes depredadores.',
                    'species' => ['Tiburón Blanco'],
                    'regulations' => 'Pesca prohibida. Solo investigación autorizada.',
                ],
            ],
            [
                'name' => 'Salmón Atlántico',
                'image' => 'https://content.nationalgeographic.com.es/medio/2026/01/15/salmon-atlantico_191d157f_260115182617_1280x853.webp',
                'sciencetic_name' => 'Salmo salar',
                'zone' => [
                    'id' => 3,
                    'name' => 'Río Boreal',
                    'region' => 'Zona Norte',
                    'image' => 'rio_boreal.jpg',
                    'types' => ['fly_fishing'],
                    'difficulty' => 'intermediate',
                    'best_season' => ['autumn'],
                    'rating' => 4.6,
                    'description' => 'Río frío y caudaloso famoso por la migración del salmón.',
                    'species' => ['Salmón Atlántico'],
                    'regulations' => 'Captura y suelta obligatoria en temporada alta.',
                ],
            ],
            [
                'name' => 'Atún de Aleta Amarilla',
                'image' => 'https://img.freepik.com/foto-gratis/peces-nadando-agua_23-2150777186.jpg',
                'sciencetic_name' => 'Thunnus albacares',
                'zone' => [
                    'id' => 4,
                    'name' => 'Mar Azul',
                    'region' => 'Alta Mar',
                    'image' => 'mar_azul.jpg',
                    'types' => ['trolling'],
                    'difficulty' => 'advanced',
                    'best_season' => ['summer'],
                    'rating' => 4.7,
                    'description' => 'Zona oceánica rica en especies pelágicas.',
                    'species' => ['Atún', 'Dorado'],
                    'regulations' => 'Límite de captura diaria por embarcación.',
                ],
            ],
            [
                'name' => 'Caballito de Mar',
                'image' => 'https://content.nationalgeographic.com.es/medio/2023/01/05/son-expertos-en-camuflaje_76041f32_230105114745_2000x1500.jpg',
                'sciencetic_name' => 'Hippocampus kuda',
                'zone' => [
                    'id' => 5,
                    'name' => 'Laguna Verde',
                    'region' => 'Costa Sur',
                    'image' => 'laguna_verde.jpg',
                    'types' => ['observational'],
                    'difficulty' => 'beginner',
                    'best_season' => ['spring'],
                    'rating' => 4.5,
                    'description' => 'Laguna protegida con vegetación marina abundante.',
                    'species' => ['Caballito de Mar'],
                    'regulations' => 'Prohibida cualquier forma de captura.',
                ],
            ],
            [
                'name' => 'Pez León',
                'image' => 'https://www.peces.com.mx/wp-content/uploads/2023/10/1200px-Strahlenfeuerfisch.jpg',
                'sciencetic_name' => 'Pterois volitans',
                'zone' => [
                    'id' => 6,
                    'name' => 'Arrecife Rojo',
                    'region' => 'Caribe',
                    'image' => 'arrecife_rojo.jpg',
                    'types' => ['spinning', 'submarine'],
                    'difficulty' => 'intermediate',
                    'best_season' => ['summer', 'autumn'],
                    'rating' => 4.3,
                    'description' => 'Arrecife afectado por especies invasoras.',
                    'species' => ['Pez León'],
                    'regulations' => 'Captura permitida para control poblacional.',
                ],
            ],
        ];
    }
}
