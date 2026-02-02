<?php

namespace App\Providers;

use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use App\Interfaces\Repositories\FishRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\TestimonialsRepositoryInterface;
use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Repositories\Eloquent\EloquentFishRepository;
use App\Repositories\MockExperienceRepository;
use App\Repositories\MockFishRepository;
use App\Repositories\MockSeasonsRepository;
use App\Repositories\MockTestimonialsRepository;
use App\Repositories\MockZoneRepository;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ZoneRepositoryInterface::class, MockZoneRepository::class);
        $this->app->bind(SeasonRepositoryInterface::class, MockSeasonsRepository::class);
        $this->app->bind(ExperienceRepositoryInterface::class, MockExperienceRepository::class);
        $this->app->bind(FishRepositoryInterface::class, EloquentFishRepository::class);
        $this->app->bind(TestimonialsRepositoryInterface::class, MockTestimonialsRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
