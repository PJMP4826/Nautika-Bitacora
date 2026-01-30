<?php

namespace App\Repositories;

use App\Interfaces\Repositories\TestimonialsRepositoryInterface;

class MockTestimonialsRepository implements TestimonialsRepositoryInterface
{
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
