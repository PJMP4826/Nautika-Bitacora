<?php

namespace App\Repositories;

class MockSeasonsRepository
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
