import { Link } from '@inertiajs/react';
import { AlertTriangle, Waves, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NavigationBar } from '@/components/layout/Navbar';
import type { ViewType } from '@/types';

export default function ServerError() {
    const [currentView, setCurrentView] = useState<ViewType>('server-error');

    return (
        <div className="h-screen overflow-hidden bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="animate-fade-in relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-slate-50 px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                {/* Fondo */}
                <div className="absolute inset-0 opacity-[0.07]">
                    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-500 blur-3xl" />
                    <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-red-600 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-4xl text-center">
                    {/* 500 con efecto de profundidad */}
                    <div className="relative mb-6 select-none">
                        <span className="block text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-slate-200">500</span>
                        <span
                            className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-red-600/30 to-transparent bg-clip-text text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-transparent"
                            aria-hidden
                        >
                            500
                        </span>
                    </div>

                    <p className="mb-2 text-xs font-bold tracking-[0.3em] text-red-600 uppercase">Error del servidor</p>
                    <h1 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
                        El barco ha hundido
                    </h1>
                    <p className="mx-auto mb-10 max-w-md text-slate-600">
                        Algo salió mal en nuestros servidores. Nuestro equipo ya está trabajando para repararlo.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 hover:shadow-red-600/30"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                        Volver al inicio
                    </Link>

                    <p className="mt-5 text-sm text-slate-500">
                        Si el problema persiste, por favor{' '}
                        <Link href="/contact" className="font-medium text-red-600 underline-offset-2 hover:underline">
                            contacta con soporte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
