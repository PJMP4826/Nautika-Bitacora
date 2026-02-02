<?php

namespace App\Interfaces\Repositories;

interface SearchSourceInterface
{
    public function search(string $query): array;
}
