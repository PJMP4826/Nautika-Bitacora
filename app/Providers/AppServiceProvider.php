<?php

namespace App\Providers;

use App\Interfaces\Repositories\ExperienceRepositoryInterface;
use App\Interfaces\Repositories\FishRepositoryInterface;
use App\Interfaces\Repositories\SeasonRepositoryInterface;
use App\Interfaces\Repositories\TestimonialsRepositoryInterface;
use App\Interfaces\Repositories\WaterTypeRepositoryInterface;
use App\Interfaces\Repositories\ZoneRepositoryInterface;
use App\Mail\ResetPasswordMailable;
use App\Mail\VerifyEmailMailable;
use App\Repositories\Eloquent\EloquentFishRepository;
use App\Repositories\Eloquent\EloquentWaterTypeRepository;
use App\Repositories\Eloquent\EloquentZoneRepository;
use App\Repositories\MockExperienceRepository;
use App\Repositories\MockSeasonsRepository;
use App\Repositories\MockTestimonialsRepository;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Contracts\LogoutResponse;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ZoneRepositoryInterface::class, EloquentZoneRepository::class);
        $this->app->bind(SeasonRepositoryInterface::class, MockSeasonsRepository::class);
        $this->app->bind(ExperienceRepositoryInterface::class, MockExperienceRepository::class);
        $this->app->bind(FishRepositoryInterface::class, EloquentFishRepository::class);
        $this->app->bind(TestimonialsRepositoryInterface::class, MockTestimonialsRepository::class);
        $this->app->bind(WaterTypeRepositoryInterface::class, EloquentWaterTypeRepository::class);

        $this->app->singleton(LogoutResponse::class, function () {
            return new class implements LogoutResponse
            {
                public function toResponse($request): \Illuminate\Http\RedirectResponse
                {
                    return to_route('login');
                }
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new VerifyEmailMailable($url))
                ->to($notifiable->email);
        });

        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));

            return (new ResetPasswordMailable($url))
                ->to($notifiable->email);
        });
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
