<?php

namespace App\Repositories\Eloquent\Search;

use App\Interfaces\Repositories\SearchSourceInterface;
use Illuminate\Support\Facades\DB;

class FishSearch implements SearchSourceInterface
{
    public function search(string $query): array
    {
        return DB::table('fish')
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('slug', 'like', "%{$query}%")
                    ->orWhere('scientific_name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            })
            ->limit(5)
            ->get()
            ->map(fn ($fish) => [
                'type' => 'fish',
                'id' => $fish->id,
                'label' => $fish->name,
                'slug' => $fish->slug,
                'subtitle' => $fish->scientific_name,
                'description' => $fish->description,
                'route' => "/fish/{$fish->slug}",
            ])
            ->toArray();
    }
}
