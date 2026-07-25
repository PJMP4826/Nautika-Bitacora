<?php

use App\Http\Middleware\BreadCrumbs;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            BreadCrumbs::class,
        ]);

        $middleware->alias([
            'role'               => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission'         => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function ($response, Throwable $exception, Request $request) {
            // Si es un redirect (por ejemplo, validación fallida), solo retorna el response
            if ($response instanceof \Illuminate\Http\RedirectResponse) {
                return $response;
            }

            $status = $response->getStatusCode();

            $errorPages = [
                403 => 'errors/Forbidden',
                404 => 'landing/errors/NotFound',
                500 => 'landing/errors/ServerError',
                503 => 'landing/errors/ServiceUnavailable',
            ];

            if (array_key_exists($status, $errorPages)) {
                return Inertia::render($errorPages[$status], [
                    'status' => $status,
                ])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            return $response;
        });
    })->create();
