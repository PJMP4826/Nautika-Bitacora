<?php

namespace App\Repositories\Eloquent\Search;

use App\Interfaces\Repositories\SearchSourceInterface;
use Illuminate\Support\Facades\DB;

class ZoneSearch implements SearchSourceInterface
{
    public function search(string $query): array
    {
        return DB::table('zones')
            ->whereFullText(
                ['name', 'slug', 'region', 'description'],
                $query
            )
            ->limit(5)
            ->get()
            ->map(fn ($zone) => [
                'type' => 'zone',
                'id' => $zone->id,
                'label' => $zone->name,
                'slug' => $zone->slug,
                'subtitle' => $zone->region,
                'route' => "/zones/{$zone->slug}",
            ])
            ->toArray();
    }
}
