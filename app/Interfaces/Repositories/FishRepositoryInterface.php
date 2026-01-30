<?php

namespace App\Interfaces\Repositories;

interface FishRepositoryInterface
{
    public function getFishTypes(): array;
    public function getFishBySlug(string $slug): ?array;
}
