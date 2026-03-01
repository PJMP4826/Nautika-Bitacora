<?php

namespace App\Repositories\Eloquent;

use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Models\Zone;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
                $q->where('id', $fishingType);
            })
            ->whereHas('experienceLevel', function ($q) use ($experienceLevel) {
                $q->where('id', $experienceLevel);
            })
            ->whereHas('seasons', function ($q) use ($season) {
                $q->where('id', $season);
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
            'image' => $this->resolveImageUrl($zone->image),
            'types' => $zone->fishingTypes->pluck('id')->values()->toArray(),
            'difficulty' => $zone->experienceLevel?->id,
            'best_season' => $zone->seasons->pluck('id')->values()->toArray(),
            'rating' => (float) $zone->rating,
            'description' => $zone->description,
            'species' => $zone->fish->pluck('name')->values()->toArray(),
            'regulations' => $zone->regulations,
        ];
    }

    public function findById(int $id): Zone
    {
        return Zone::with(['experienceLevel', 'seasons', 'fishingTypes', 'fish'])->findOrFail($id);
    }

    public function update(Zone $zone, array $data): Zone
    {
        $zone->update($data);

        return $zone;
    }

    public function updateImage(Zone $zone, UploadedFile $file): string
    {
        // Elimina la imagen anterior si existe
        if ($zone->image) {
            Storage::disk('public')->delete($zone->image);
        }

        return $file->store('zones', 'public');
    }

    public function syncSeasons(Zone $zone, array $seasonIds): void
    {
        $zone->seasons()->sync($seasonIds);
    }

    public function syncFishingTypes(Zone $zone, array $fishingTypeIds): void
    {
        $zone->fishingTypes()->sync($fishingTypeIds);
    }

    private function resolveImageUrl(?string $image): ?string
    {
        if (! $image) {
            return null;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        return asset('storage/'.$image);
    }
}
