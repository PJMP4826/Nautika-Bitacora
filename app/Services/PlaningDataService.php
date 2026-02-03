<?php

namespace App\Services;

class PlaningDataService
{
    public function __construct(
        private readonly ZoneDataService $zones
    ) {}

    public function searchZones(
        string $fishingType,
        string $experienceLevel,
        string $season
    ) {
        $zones = [];

        $zoneFound = $this->zones->searchZones(
            $fishingType,
            $experienceLevel,
            $season,
        );

        foreach ($zoneFound as $zone) {
            $zone = $this->zones->findZoneDetailBySlug($zone['slug']);
            $zones[] = $zone;
        }

        return $zones;
    }
}
