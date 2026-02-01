import { Link } from '@inertiajs/react';
import { Wrench, Anchor, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NavigationBar } from '@/components/layout/Navbar';
import type { ViewType } from '@/types';

export default function ServiceUnavailable() {
    const [currentView, setCurrentView] = useState<ViewType>('maintenance');

    return (
        <div className="h-screen overflow-hidden bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="animate-fade-in relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-slate-50 px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                {/* Fondo */}
                <div className="absolute inset-0 opacity-[0.07]">
                    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-500 blur-3xl" />
                    <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-orange-600 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-4xl text-center">
                    {/* 503 con efecto de profundidad */}
                    <div className="relative mb-6 select-none">
                        <span className="block text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-slate-200">503</span>
                        <span
                            className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-600/30 to-transparent bg-clip-text text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-transparent"
                            aria-hidden
                        >
                            503
                        </span>
                    </div>

                    {/* Iconos flotantes */}
                    <div className="absolute top-[5%] right-[15%] animate-bounce md:right-[25%]">
                        <Wrench className="h-10 w-10 text-amber-600/80 md:h-12 md:w-12" strokeWidth={1.5} />
                    </div>
                    <div className="absolute top-[20%] left-[12%] animate-bounce [animation-delay:0.5s] md:left-[22%]">
                        <Anchor className="h-8 w-8 text-slate-400 md:h-10 md:w-10" strokeWidth={1.5} />
                    </div>

                    <p className="mb-2 text-xs font-bold tracking-[0.3em] text-amber-600 uppercase">En mantenimiento</p>
                    <h1 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
                        El barco sigue en el puerto
                    </h1>
                    <p className="mx-auto mb-10 max-w-md text-slate-600">
                        Estamos realizando tareas de mantenimiento para mejorar tu experiencia. Volveremos pronto.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-600/25 transition-all hover:bg-amber-700 hover:shadow-amber-600/30"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                        Reintentar
                    </button>

                    <p className="mt-5 text-sm text-slate-500">
                        Estimamos volver en unos minutos
                    </p>
                </div>
            </div>
        </div>
    );
}
