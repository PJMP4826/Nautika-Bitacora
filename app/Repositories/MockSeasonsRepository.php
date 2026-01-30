<?php

namespace App\Repositories;

use App\Interfaces\Repositories\SeasonRepositoryInterface;

class MockSeasonsRepository implements SeasonRepositoryInterface
{
    public function getSeasons(): array
    {
        return [
            ['id' => 'spring', 'name' => 'Primavera', 'icon' => '🌸'],
            ['id' => 'summer', 'name' => 'Verano', 'icon' => '☀️'],
            ['id' => 'autumn', 'name' => 'Otoño', 'icon' => '🍂'],
            ['id' => 'winter', 'name' => 'Invierno', 'icon' => '❄️'],
        ];
    }
}
