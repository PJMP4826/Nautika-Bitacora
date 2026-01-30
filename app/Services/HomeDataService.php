<?php

namespace App\Services;

use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use App\Interfaces\Repositories\FishingDataRepositoryInterface;
use App\Interfaces\Repositories\FishRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\TestimonialsRepositoryInterface;
use App\Interfaces\Repositories\ZoneRepositoryInterface;

class HomeDataService
{
    private ExperienceRepositoryInterface $experienceRepository;

    private FishingDataRepositoryInterface $fishingDataRepository;

    private FishRepositoryInterface $fishRepository;

    private SeasonRepositoryInterface $seasonRepository;

    private TestimonialsRepositoryInterface $testimonialsRepository;

    private ZoneRepositoryInterface $zoneRepository;

    public function __construct(
        ExperienceRepositoryInterface $experienceRepository,
        FishingDataRepositoryInterface $fishingDataRepository,
        FishRepositoryInterface $fishRepository,
        SeasonRepositoryInterface $seasonRepository,
        TestimonialsRepositoryInterface $testimonialsRepository,
        ZoneRepositoryInterface $zoneRepository,
    ) {
        $this->experienceRepository = $experienceRepository;
        $this->fishingDataRepository = $fishingDataRepository;
        $this->fishRepository = $fishRepository;
        $this->seasonRepository = $seasonRepository;
        $this->testimonialsRepository = $testimonialsRepository;
        $this->zoneRepository = $zoneRepository;
    }

    /**
     * Obtiene los tipos de pesca disponibles
     */
    public function getFishingTypes(): array
    {
        return $this->fishingDataRepository->getFishingTypes();
    }

    /**
     * Obtiene los niveles de experiencia
     */
    public function getExperienceLevels(): array
    {
        return $this->experienceRepository->getExperienceLevels();
    }

    /**
     * Obtiene las temporadas disponibles
     */
    public function getSeasons(): array
    {
        return $this->seasonRepository->getSeasons();
    }

    /**
     * Obtiene las Zonas disponibles
     */
    public function getZones(): array
    {
        return $this->zoneRepository->getZones();
    }

    public function getTestimonials(): array
    {
        return $this->testimonialsRepository->getTestimonials();
    }

    public function getFishTypes(): array
    {
        return $this->fishRepository->getFishTypes();
    }
}
