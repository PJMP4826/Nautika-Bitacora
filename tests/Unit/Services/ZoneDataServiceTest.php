<?php

namespace Tests\Unit\Services;

use App\Services\ZoneDataService;
use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Interfaces\Repositories\FishingDataRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use Tests\TestCase;
use Mockery;

class ZoneDataServiceTest extends TestCase
{
    /** @test */
    public function it_hydrates_zone_ids_into_full_objects()
    {
        // Mocks de los repositorios
        $zoneRepo = Mockery::mock(ZoneRepositoryInterface::class);
        $fishingRepo = Mockery::mock(FishingDataRepositoryInterface::class);
        $seasonRepo = Mockery::mock(SeasonRepositoryInterface::class);
        $expRepo = Mockery::mock(ExperienceRepositoryInterface::class);

        // Datos de ejemplo que devolvería el repo de zonas
        $mockZone = [
            'slug' => 'test-zone',
            'types' => ['spinning'],
            'difficulty' => 'beginner',
            'best_season' => ['spring']
        ];

        $zoneRepo->shouldReceive('getZoneBySlug')->with('test-zone')->andReturn($mockZone);
        
        // Simulamos que el repo de pesca devuelve el objeto completo para 'spinning'
        $fishingRepo->shouldReceive('getFishingTypes')->andReturn([
            ['id' => 'spinning', 'name' => 'Spinning Technique']
        ]);

        $seasonRepo->shouldReceive('getSeasons')->andReturn([
            ['id' => 'spring', 'name' => 'Primavera']
        ]);

        $expRepo->shouldReceive('getExperienceLevels')->andReturn([
            ['id' => 'beginner', 'name' => 'Principiante']
        ]);

        $service = new ZoneDataService($zoneRepo, $fishingRepo, $seasonRepo, $expRepo);
        $result = $service->findZoneDetailBySlug('test-zone');

        // Verificamos que 'spinning' ya no es un string, sino un objeto/arreglo
        $this->assertEquals('Spinning Technique', $result['types'][0]['name']);
        $this->assertEquals('Principiante', $result['difficulty']['name']);
    }
}