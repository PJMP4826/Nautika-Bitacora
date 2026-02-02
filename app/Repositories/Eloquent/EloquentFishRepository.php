<?php

namespace App\Repositories\Eloquent;

use App\Interfaces\Repositories\FishRepositoryInterface;
use App\Models\Fish;

class EloquentFishRepository implements FishRepositoryInterface
{
    public function getFishTypes(): array
    {
        return Fish::query()
            ->with(['zone.fishingTypes:id', 'zone.seasons:id', 'zone.experienceLevel:id', 'zone.fish:id,zone_id,name'])
            ->orderBy('name')
            ->get()
            ->map(fn (Fish $fish) => $this->fishToArray($fish))
            ->values()
            ->all();
    }

    public function getFishBySlug(string $slug): ?array
    {
        $fish = Fish::query()
            ->with(['zone.fishingTypes:id', 'zone.seasons:id', 'zone.experienceLevel:id', 'zone.fish:id,zone_id,name'])
            ->where('slug', $slug)
            ->first();

        return $fish ? $this->fishToArray($fish) : null;
    }

    private function fishToArray(Fish $fish): array
    {
        $zone = $fish->zone;
        $zoneArray = $zone ? [
            'id' => $zone->id,
            'name' => $zone->name,
            'slug' => $zone->slug,
            'region' => $zone->region,
            'image' => $zone->image,
            'types' => $zone->fishingTypes->pluck('id')->values()->all(),
            'difficulty' => $zone->experienceLevel?->id,
            'best_season' => $zone->seasons->pluck('id')->values()->all(),
            'rating' => $zone->rating !== null ? (float) $zone->rating : null,
            'description' => $zone->description,
            'species' => $zone->fish->pluck('name')->values()->all(),
            'regulations' => $zone->regulations,
        ] : [];

        return [
            'name' => $fish->name,
            'slug' => $fish->slug,
            'image' => $fish->image,
            'scientific_name' => $fish->scientific_name,
            'zone' => $zoneArray,
        ];
    }
}
