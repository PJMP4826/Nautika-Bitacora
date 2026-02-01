<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class BreadCrumbs
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share('breadcrumbs', function () use ($request) {
            return match ($request->route()->getName()) {
                'zone' => [
                    ['label' => 'Inicio', 'url' => route('home')],
                    ['label' => 'Zones', 'url' => null],
                ],

//                'zone.show' => [
//                    ['label' => 'Inicio', 'url' => route('home')],
//                    ['label' => 'Zones', 'url' => route('zone')],
//                    ['label' => $request->route('zone_name'), 'url' => null],
//                ],

                default => [],
            };
        });

        return $next($request);
    }
}
