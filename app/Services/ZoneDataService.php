<?php

namespace App\Services;

use App\Http\Requests\UpdateZoneRequest;
use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use App\Interfaces\Repositories\FishingDataRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Models\Zone;
use Illuminate\Support\Facades\DB;
use Throwable;

class ZoneDataService
{
    public function __construct(
        private readonly ZoneRepositoryInterface $zoneRepository,
        private readonly FishingDataRepositoryInterface $fishingDataRepository,
        private readonly SeasonRepositoryInterface $seasonRepository,
        private readonly ExperienceRepositoryInterface $experienceRepository,
    ) {}

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

    public function searchZones(
        string $fishingType,
        string $experienceLevel,
        string $season
    ): array {
        return $this->zoneRepository->searchZones(
            $fishingType,
            $experienceLevel,
            $season
        );
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
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

    /**
     * @throws Throwable
     */
    public function update(Zone $zone, UpdateZoneRequest $request): Zone
    {
        return DB::transaction(function () use ($zone, $request) {
            $data = $request->safe()->except(['image', 'fishing_type_ids', 'season_ids']);

            if ($request->hasFile('image')) {
                $data['image'] = $this->zoneRepository->updateImage($zone, $request->file('image'));
            }

            $zone = $this->zoneRepository->update($zone, $data);

            $this->zoneRepository->syncFishingTypes($zone, $request->input('fishing_type_ids', []));
            $this->zoneRepository->syncSeasons($zone, $request->input('season_ids', []));

            return $zone->load(['experienceLevel', 'seasons', 'fishingTypes']);
        });
    }

    /**
     * @throws Throwable
     */
    public function delete(Zone $zone): void
    {
        DB::transaction(fn () => $this->zoneRepository->delete($zone));
    }
}
