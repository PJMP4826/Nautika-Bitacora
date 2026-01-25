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

    /**
     * Obtiene todos los niveles de experiencia
     *
     * @return array<int, array{id: string, name: string, description: string}>
     */
    public function getExperienceLevels(): array;

    /**
     * Obtiene todas las temporadas disponibles
     *
     * @return array<int, array{id: string, name: string, icon: string}>
     */
    public function getSeasons(): array;

    public function getZones(): array;
    public function getTestimonials(): array;
}
