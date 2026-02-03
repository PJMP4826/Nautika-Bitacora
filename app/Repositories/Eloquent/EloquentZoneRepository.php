<?php

namespace App\Repositories\Eloquent;

use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Models\Zone;

class EloquentZoneRepository implements ZoneRepositoryInterface
{
    public function getZones(): array
    {
        return Zone::query()
            ->with(['fishingTypes', 'seasons', 'experienceLevel', 'fish'])
            ->get()
            ->map(fn (Zone $zone) => $this->transform($zone))
            ->toArray();
    }

    public function getZoneBySlug(string $slug): array
    {
        $zone = Zone::query()
            ->with(['fishingTypes', 'seasons', 'experienceLevel', 'fish'])
            ->where('slug', $slug)
            ->first();

        return $zone ? $this->transform($zone) : [];
    }

    public function searchZones(
        string $fishingType,
        string $experienceLevel,
        string $season
    ): array {
        return Zone::query()
            ->with(['fishingTypes', 'seasons', 'experienceLevel', 'fish'])
            ->whereHas('fishingTypes', function ($q) use ($fishingType) {
                $q->where('name', $fishingType);
            })
            ->whereHas('experienceLevel', function ($q) use ($experienceLevel) {
                $q->where('name', $experienceLevel);
            })
            ->whereHas('seasons', function ($q) use ($season) {
                $q->where('name', $season);
            })
            ->get()
            ->map(fn (Zone $zone) => $this->transform($zone))
            ->toArray();
    }

    private function transform(Zone $zone): array
    {
        return [
            'id' => $zone->id,
            'name' => $zone->name,
            'slug' => $zone->slug,
            'region' => $zone->region,
            'image' => $zone->image,
            'types' => $zone->fishingTypes->pluck('id')->values()->toArray(),
            'difficulty' => $zone->experienceLevel?->id,
            'best_season' => $zone->seasons->pluck('id')->values()->toArray(),
            'rating' => (float) $zone->rating,
            'description' => $zone->description,
            'species' => $zone->fish->pluck('name')->values()->toArray(),
            'regulations' => $zone->regulations,
        ];
    }
}
