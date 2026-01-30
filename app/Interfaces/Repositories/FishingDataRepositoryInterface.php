<?php

namespace App\Interfaces\Repositories;

interface FishingDataRepositoryInterface
{
    /**
     * Obtiene todos los tipos de pesca disponibles
     *
     * @return array<int, array{id: string, name: string, icon: string, description: string, count: int}>
     */
    public function getFishingTypes(): array;

}
