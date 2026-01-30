<?php

namespace App\Services;

use App\Interfaces\Repositories\FishingDataRepositoryInterface;

class FishingDataService
{
    private FishingDataRepositoryInterface $repository;

    public function __construct(
        FishingDataRepositoryInterface $repository
    ) {
        $this->repository = $repository;
    }
}
