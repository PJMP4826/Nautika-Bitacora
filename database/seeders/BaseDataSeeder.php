<?php

namespace Database\Seeders;

use App\Models\ExperienceLevel;
use App\Models\FishingType;
use App\Models\Season;
use App\Repositories\MockExperienceRepository;
use App\Repositories\MockFishingDataRepository;
use App\Repositories\MockSeasonsRepository;
use Illuminate\Database\Seeder;

class BaseDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $experienceRepo = new MockExperienceRepository;
        foreach ($experienceRepo->getExperienceLevels() as $data) {
            ExperienceLevel::firstOrCreate(['id' => $data['id']], $data);
        }

        $seasonRepo = new MockSeasonsRepository;
        foreach ($seasonRepo->getSeasons() as $data) {
            Season::firstOrCreate(['id' => $data['id']], $data);
        }

        $fishingRepo = new MockFishingDataRepository;
        foreach ($fishingRepo->getFishingTypes() as $data) {
            // Remove 'count' key if it exists, as it might not be in the database columns
            if (isset($data['count'])) {
                unset($data['count']);
            }
            FishingType::firstOrCreate(['id' => $data['id']], $data);
        }
    }
}
