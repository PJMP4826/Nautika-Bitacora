<?php

namespace Tests\Unit\Services;

use App\Services\SearchService;
use App\Repositories\Eloquent\Search\FishSearch;
use App\Repositories\Eloquent\Search\ZoneSearch;
use Tests\TestCase;
use Mockery;

class SearchServiceTest extends TestCase
{
    /** @test */
    public function it_limits_total_search_results_to_ten()
    {
        $zoneSearch = Mockery::mock(ZoneSearch::class);
        $fishSearch = Mockery::mock(FishSearch::class);

        // Cada uno devuelve 7 resultados (total 14)
        $zoneSearch->shouldReceive('search')->andReturn(array_fill(0, 7, ['name' => 'Zone']));
        $fishSearch->shouldReceive('search')->andReturn(array_fill(0, 7, ['name' => 'Fish']));

        $service = new SearchService($zoneSearch, $fishSearch);
        $results = $service->search('test query');

        $this->assertCount(10, $results);
    }
}
