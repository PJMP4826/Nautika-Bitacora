<?php

namespace App\Repositories;

use App\Interfaces\Repositories\ExperienceRepositoryInterface;

class MockExperienceRepository implements ExperienceRepositoryInterface
{
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
}
