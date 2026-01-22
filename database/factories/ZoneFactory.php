<?php

namespace Database\Factories;

use App\Enums\WaterType;
use App\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ZoneFactory extends Factory
{
    protected $model = Zone::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'region' => $this->faker->country(),
            'water_type' => fake()->randomElement(
                array_column(WaterType::cases(), 'value')
            ),
            'active' => $this->faker->boolean(),
        ];
    }
}
