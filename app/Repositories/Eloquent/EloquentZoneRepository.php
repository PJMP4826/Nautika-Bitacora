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
