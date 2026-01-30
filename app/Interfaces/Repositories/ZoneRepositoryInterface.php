<?php

namespace App\Interfaces\Repositories;

interface ZoneRepositoryInterface
{
    public function getZones(): array;
    public function getZoneBySlug(string $slug): array;
}
