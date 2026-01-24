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
     *
     * @return array
     */
    public function getFishingTypes(): array
    {
        return $this->repository->getFishingTypes();
    }

    /**
     * Obtiene los niveles de experiencia
     *
     * @return array
     */
    public function getExperienceLevels(): array
    {
        return $this->repository->getExperienceLevels();
    }

    /**
     * Obtiene las temporadas disponibles
     *
     * @return array
     */
    public function getSeasons(): array
    {
        return $this->repository->getSeasons();
    }
}
