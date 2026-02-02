<?php

namespace App\Http\Controllers;

use App\Services\SearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController
{
    public function __construct(private readonly SearchService $searchService) {}

    public function search(Request $request): JsonResponse
    {
        $query = $request->query('query');

        $request->validate([
            'query' => ['required', 'string', 'min:2'],
        ]);

        return response()->json(
            $this->searchService->search($query)
        );
    }
}
