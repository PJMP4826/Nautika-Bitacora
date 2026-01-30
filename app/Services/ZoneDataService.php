<?php

namespace App\Services;

use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use App\Interfaces\Repositories\FishingDataRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\ZoneRepositoryInterface;

class ZoneDataService
{
    public function __construct(
        private ZoneRepositoryInterface $zoneRepository,
        private FishingDataRepositoryInterface $fishingDataRepository,
        private SeasonRepositoryInterface $seasonRepository,
        private ExperienceRepositoryInterface $experienceRepository,
    ) {
    }

    public function findZoneBySlug(string $slug): array
    {
        return $this->zoneRepository->getZoneBySlug($slug);
    }

    /**
     * Returns zone with types, difficulty and best_season resolved to full objects.
     */
    public function findZoneDetailBySlug(string $slug): array
    {
        $zone = $this->zoneRepository->getZoneBySlug($slug);
        if (empty($zone)) {
            return [];
        }

        $fishingTypesById = $this->indexById($this->fishingDataRepository->getFishingTypes());
        $seasonsById = $this->indexById($this->seasonRepository->getSeasons());
        $experienceById = $this->indexById($this->experienceRepository->getExperienceLevels());

        $zone['types'] = array_values(array_filter(array_map(
            fn (string $id) => $fishingTypesById[$id] ?? null,
            $zone['types']
        )));
        $zone['difficulty'] = $experienceById[$zone['difficulty']] ?? ['id' => $zone['difficulty'], 'name' => $zone['difficulty'], 'description' => ''];
        $zone['best_season'] = array_values(array_filter(array_map(
            fn (string $id) => $seasonsById[$id] ?? null,
            $zone['best_season']
        )));

        return $zone;
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array<string, array<string, mixed>>
     */
    private function indexById(array $items): array
    {
        $indexed = [];
        foreach ($items as $item) {
            if (isset($item['id'])) {
                $indexed[$item['id']] = $item;
            }
        }
        return $indexed;
    }
}
