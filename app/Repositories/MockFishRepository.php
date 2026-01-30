<?php

namespace App\Repositories;

class MockFishRepository
{
    public function getFishTypes(): array
    {
        return [
            [
                'name' => 'Pez Payaso',
                'slug' => 'pez-payaso',
                'image' => 'https://www.peceswiki.com/Imagenes/caracteristicas-distintivas-del-pez-payaso.jpg',
                'scientific_name' => 'Amphiprion ocellaris',
                'zone' => [
                    'id' => 1,
                    'name' => 'Cabo Esperanza',
                    'slug' => 'cabo-esperanza',
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
                'slug' => 'tiburon-blanco',
                'image' => 'https://cdn0.expertoanimal.com/es/razas/2/1/8/tiburon-blanco_812_0_orig.jpg',
                'scientific_name' => 'Carcharodon carcharias',
                'zone' => [
                    'id' => 2,
                    'name' => 'Isla Rocosa',
                    'slug' => 'isla-rocosa',
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
                'slug' => 'salmon-atlantico',
                'image' => 'https://content.nationalgeographic.com.es/medio/2026/01/15/salmon-atlantico_191d157f_260115182617_1280x853.webp',
                'scientific_name' => 'Salmo salar',
                'zone' => [
                    'id' => 3,
                    'name' => 'Río Boreal',
                    'slug' => 'rio-boreal',
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
                'slug' => 'atun-de-aleta-amarilla',
                'image' => 'https://img.freepik.com/foto-gratis/peces-nadando-agua_23-2150777186.jpg',
                'scientific_name' => 'Thunnus albacares',
                'zone' => [
                    'id' => 4,
                    'name' => 'Mar Azul',
                    'slug' => 'mar-azul',
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
                'slug' => 'caballito-de-mar',
                'image' => 'https://content.nationalgeographic.com.es/medio/2023/01/05/son-expertos-en-camuflaje_76041f32_230105114745_2000x1500.jpg',
                'scientific_name' => 'Hippocampus kuda',
                'zone' => [
                    'id' => 5,
                    'name' => 'Laguna Verde',
                    'slug' => 'laguna-verde',
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
                'slug' => 'pez-leon',
                'image' => 'https://www.peces.com.mx/wp-content/uploads/2023/10/1200px-Strahlenfeuerfisch.jpg',
                'scientific_name' => 'Pterois volitans',
                'zone' => [
                    'id' => 6,
                    'name' => 'Arrecife Rojo',
                    'slug' => 'arrecife-rojo',
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

    public function getFishBySlug(string $slug): ?array
    {
        foreach ($this->getFishTypes() as $fish) {
            if ($fish['slug'] === $slug) {
                return $fish;
            }
        }

        return null;
    }

}
