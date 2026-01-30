<?php

namespace App\Repositories;

class MockExperienceRepository
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
