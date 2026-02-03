<?php

namespace App\Interfaces\Repositories;

interface ZoneRepositoryInterface
{
    public function getZones(): array;

    public function getZoneBySlug(string $slug): array;

    public function searchZones(
        string $fishingType,
        string $experienceLevel,
        string $season
    ): array;
}
