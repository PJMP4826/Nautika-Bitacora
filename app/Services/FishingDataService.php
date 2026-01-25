<?php

namespace App\Services;

use App\Interfaces\Repositories\FishingDataRepositoryInterface;

class FishingDataService
{
    private FishingDataRepositoryInterface $repository;

    public function __construct(
        FishingDataRepositoryInterface $repository
    ) {
        $this->repository = $repository;
    }

    /**
     * Obtiene los tipos de pesca disponibles
     */
    public function getFishingTypes(): array
    {
        return $this->repository->getFishingTypes();
    }

    /**
     * Obtiene los niveles de experiencia
     */
    public function getExperienceLevels(): array
    {
        return $this->repository->getExperienceLevels();
    }

    /**
     * Obtiene las temporadas disponibles
     */
    public function getSeasons(): array
    {
        return $this->repository->getSeasons();
    }

    /**
     * Obtiene las Zonas disponibles
     */
    public function getZones(): array
    {
        return $this->repository->getZones();
    }

    public function getTestimonials(): array
    {
        return $this->repository->getTestimonials();
    }

    public function getFishTypes(): array
    {
        return $this->repository->getFishTypes();
    }
}
