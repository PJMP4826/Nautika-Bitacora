<?php

namespace Tests\Unit\Services;

use App\Services\PlaningDataService;
use App\Services\ZoneDataService;
use Tests\TestCase;
use Mockery;

class PlaningDataServiceTest extends TestCase
{
    /** @test */
    public function it_fetches_details_for_each_found_zone()
    {
        $zoneDataService = Mockery::mock(ZoneDataService::class);

        // Simulamos que la búsqueda encuentra 2 zonas (solo slugs)
        $zoneDataService->shouldReceive('searchZones')
            ->once()
            ->andReturn([
                ['slug' => 'zona-1'],
                ['slug' => 'zona-2']
            ]);

        // El servicio DEBE llamar al detalle para cada una de esas zonas
        $zoneDataService->shouldReceive('findZoneDetailBySlug')
            ->with('zona-1')
            ->once()
            ->andReturn(['name' => 'Zona Detallada 1']);

        $zoneDataService->shouldReceive('findZoneDetailBySlug')
            ->with('zona-2')
            ->once()
            ->andReturn(['name' => 'Zona Detallada 2']);

        $service = new PlaningDataService($zoneDataService);
        $results = $service->searchZones('surfcasting', 'beginner', 'summer');

        $this->assertCount(2, $results);
        $this->assertEquals('Zona Detallada 1', $results[0]['name']);
    }
}
