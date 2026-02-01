import { Link } from '@inertiajs/react';
import { Anchor, ChevronRight, Fish } from 'lucide-react';
import { useState } from 'react';
import { NavigationBar } from '@/components/layout/Navbar';
import type { ViewType } from '@/types';

interface NotFoundProps {
    not_found_param?: string;
}
export default function NotFound404({not_found_param}: NotFoundProps) {
    const [currentView, setCurrentView] = useState<ViewType>('not-found');

    return (
        <div className="h-screen overflow-hidden bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="animate-fade-in relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-slate-50 px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                {/* Fondo tipo agua / olas */}
                <div className="absolute inset-0 opacity-[0.07]">
                    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500 blur-3xl" />
                    <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-blue-600 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-4xl text-center">
                    {/* 404 con efecto de profundidad */}
                    <div className="relative mb-6 select-none">
                        <span className="block text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-slate-200">404</span>
                        <span
                            className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-blue-600/30 to-transparent bg-clip-text text-[clamp(4rem,12vw,8rem)] leading-none font-black tracking-tighter text-transparent"
                            aria-hidden
                        >
                            404
                        </span>
                    </div>

                    {/* Pez flotando cerca del 4 */}
                    <div className="absolute top-[5%] right-[15%] animate-bounce md:right-[25%]">
                        <Fish className="h-10 w-10 text-blue-600/80 md:h-12 md:w-12" strokeWidth={1.5} />
                    </div>
                    <div className="absolute top-[20%] left-[12%] animate-bounce [animation-delay:0.5s] md:left-[22%]">
                        <Anchor className="h-8 w-8 text-slate-400 md:h-10 md:w-10" strokeWidth={1.5} />
                    </div>

                    <p className="mb-2 text-xs font-bold tracking-[0.3em] text-blue-600 uppercase">Página no encontrada</p>
                    <h1 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">{
                        not_found_param ? `${not_found_param} ya no está en el mapa`
                            : 'Este recurso no existe'
                    }</h1>
                    <p className="mx-auto mb-10 max-w-md text-slate-600">
                        Te has salido de la ruta. La página que buscas no existe o cambió de rumbo.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/30"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                        Volver al puerto
                    </Link>

                    <p className="mt-5 text-sm text-slate-500">
                        <Link href="/zones" className="font-medium text-blue-600 underline-offset-2 hover:underline">
                            Explorar zonas de pesca
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
