<?php

namespace App\Repositories\Eloquent\Search;

use App\Interfaces\Repositories\SearchSourceInterface;
use Illuminate\Support\Facades\DB;

class FishSearch implements SearchSourceInterface
{
    public function search(string $query): array
    {
        return DB::table('fish')
            ->whereFullText(
                ['name', 'slug', 'scientific_name'],
                $query
            )
            ->limit(5)
            ->get()
            ->map(fn ($fish) => [
                'type' => 'fish',
                'id' => $fish->id,
                'label' => $fish->name,
                'slug' => $fish->slug,
                'subtitle' => $fish->scientific_name,
                'route' => "/fish/{$fish->slug}",
            ])
            ->toArray();
    }
}
