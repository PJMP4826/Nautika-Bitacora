<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherService
{
    private const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
    private const MARINE_URL = 'https://marine-api.open-meteo.com/v1/marine';

    private const CACHE_TTL_MINUTES = 30;

    public function getForecast(float $lat, float $lng): array
    {
        $cacheKey = "weather:forecast:{$lat}:{$lng}";

        return Cache::remember($cacheKey, now()->addMinutes(self::CACHE_TTL_MINUTES), function () use ($lat, $lng) {
            $response = Http::timeout(5)->get(self::FORECAST_URL, [
                'latitude' => $lat,
                'longitude' => $lng,
                'current' => 'temperature_2m,wind_speed_10m,wind_direction_10m,precipitation,weather_code,cloud_cover',
                'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
                'timezone' => 'auto',
                'forecast_days' => 5,
            ]);

            if ($response->failed()) {
                Log::warning('Open-Meteo forecast request failed', [
                    'lat' => $lat,
                    'lng' => $lng,
                    'status' => $response->status(),
                ]);

                return [];
            }

            return $response->json();
        });
    }

    public function getMarineForecast(float $lat, float $lng): array
    {
        $cacheKey = "weather:marine:{$lat}:{$lng}";

        return Cache::remember($cacheKey, now()->addMinutes(self::CACHE_TTL_MINUTES), function () use ($lat, $lng) {
            $response = Http::timeout(5)->get(self::MARINE_URL, [
                'latitude' => $lat,
                'longitude' => $lng,
                'current' => 'wave_height,wave_direction,wave_period,sea_surface_temperature',
                'daily' => 'wave_height_max,wave_period_max',
                'timezone' => 'auto',
                'forecast_days' => 5,
            ]);

            if ($response->failed()) {
                Log::warning('Open-Meteo marine request failed', [
                    'lat' => $lat,
                    'lng' => $lng,
                    'status' => $response->status(),
                ]);

                return [];
            }

            return $response->json();
        });
    }

    public function getZoneWeather(float $lat, float $lng): array
    {
        $forecast = $this->getForecast($lat, $lng);
        $marine = $this->getMarineForecast($lat, $lng);

        return [
            'current' => [
                'temperature' => $forecast['current']['temperature_2m'] ?? null,
                'windSpeed' => $forecast['current']['wind_speed_10m'] ?? null,
                'windDirection' => $forecast['current']['wind_direction_10m'] ?? null,
                'precipitation' => $forecast['current']['precipitation'] ?? null,
                'cloudCover' => $forecast['current']['cloud_cover'] ?? null,
                'weatherCode' => $forecast['current']['weather_code'] ?? null,
                'waveHeight' => $marine['current']['wave_height'] ?? null,
                'waveDirection' => $marine['current']['wave_direction'] ?? null,
                'wavePeriod' => $marine['current']['wave_period'] ?? null,
                'seaSurfaceTemperature' => $marine['current']['sea_surface_temperature'] ?? null,
            ],
            'daily' => $this->mergeDailyData($forecast['daily'] ?? [], $marine['daily'] ?? []),
            'fetchedAt' => now()->toIso8601String(),
        ];
    }

    /**
     * Open-Meteo devuelve cada serie diaria como un arreglo paralelo
     * (mismo índice = mismo día). Aquí lo convertimos en un arreglo
     * de objetos, mucho más cómodo de consumir en React.
     */
    private function mergeDailyData(array $forecastDaily, array $marineDaily): array
    {
        $dates = $forecastDaily['time'] ?? [];
        $days = [];

        foreach ($dates as $index => $date) {
            $days[] = [
                'date' => $date,
                'weatherCode' => $forecastDaily['weather_code'][$index] ?? null,
                'tempMax' => $forecastDaily['temperature_2m_max'][$index] ?? null,
                'tempMin' => $forecastDaily['temperature_2m_min'][$index] ?? null,
                'precipitationSum' => $forecastDaily['precipitation_sum'][$index] ?? null,
                'windSpeedMax' => $forecastDaily['wind_speed_10m_max'][$index] ?? null,
                'waveHeightMax' => $marineDaily['wave_height_max'][$index] ?? null,
                'wavePeriodMax' => $marineDaily['wave_period_max'][$index] ?? null,
            ];
        }

        return $days;
    }
}