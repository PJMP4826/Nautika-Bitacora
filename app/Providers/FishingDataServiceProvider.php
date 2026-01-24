<?php

namespace App\Providers;

use App\Interfaces\Repositories\FishingDataRepositoryInterface;
use App\Repositories\MockFishingDataRepository;
use Illuminate\Support\ServiceProvider;

class FishingDataServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            FishingDataRepositoryInterface::class,
            MockFishingDataRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
