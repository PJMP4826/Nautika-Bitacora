<?php

namespace App\Services;

use App\Repositories\Eloquent\Search\FishSearch;
use App\Repositories\Eloquent\Search\ZoneSearch;

class SearchService
{
    public function __construct(
        private readonly ZoneSearch $zoneSearch,
        private readonly FishSearch $fishSearch
    ) {}

    public function search(string $query): array
    {
        return collect([
            ...$this->zoneSearch->search($query),
            ...$this->fishSearch->search($query),
        ])
            ->take(10)
            ->values()
            ->toArray();
    }
}
