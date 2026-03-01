<?php

namespace App\Interfaces\Repositories;

use App\Models\Zone;
use Illuminate\Http\UploadedFile;


interface ZoneRepositoryInterface
{
    public function getZones(): array;

    public function getZoneBySlug(string $slug): array;

    public function searchZones(
        string $fishingType,
        string $experienceLevel,
        string $season
    ): array;

    public function update(Zone $zone, array $data): Zone;

    public function updateImage(Zone $zone, UploadedFile $file): string;

    public function syncSeasons(Zone $zone, array $seasonIds): void;

    public function syncFishingTypes(Zone $zone, array $fishingTypeIds): void;

    public function delete(Zone $zone): void;
}
