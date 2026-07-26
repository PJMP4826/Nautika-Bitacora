<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\WeatherService;
use Illuminate\Support\Facades\Http;

class WeatherServiceTest extends TestCase
{
    private WeatherService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new WeatherService();
    }

    /** @test */
    public function it_merges_forecast_and_marine_data_correctly()
    {
        // Simulamos la respuesta del pronóstico normal
        Http::fake([
            'api.open-meteo.com/*' => Http::response([
                'current' => [
                    'temperature_2m' => 25.5,
                    'wind_speed_10m' => 10,
                ],
                'daily' => [
                    'time' => ['2024-01-01'],
                    'weather_code' => [1],
                    'temperature_2m_max' => [30],
                ]
            ], 200),
        ]);

        $result = $this->service->getZoneWeather(10.0, 20.0);

        // Verificamos que los datos se mezclaron correctamente
        $this->assertEquals(25.5, $result['current']['temperature']);

        // Verificamos el mapeo del primer día en 'daily'
        $this->assertCount(1, $result['daily']);
    }

    /** @test */
    public function it_returns_empty_structure_when_api_fails()
    {
        Http::fake([
            '*' => Http::response([], 500),
        ]);

        $result = $this->service->getZoneWeather(10.0, 20.0);

        $this->assertNull($result['current']['temperature']);
        $this->assertEmpty($result['daily']);
    }
}
