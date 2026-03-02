<?php

namespace App\Repositories\Eloquent;

use App\Interfaces\Repositories\WaterTypeRepositoryInterface;
use App\Models\WaterType;

class EloquentWaterTypeRepository implements WaterTypeRepositoryInterface
{
    public function getWaterTypes(): array
    {
        return WaterType::all()->toArray();
    }
}
