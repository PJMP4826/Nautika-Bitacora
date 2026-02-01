import { ZoneCard } from '@/components/features/ZoneCard';
import { NavigationBar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { ViewType, ZoneViewProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ZonesView = ({ zones, experienceLevels, fishingTypes, onDetail, onBack }: ZoneViewProps) => {
    const [currentView, setCurrentView] = useState<ViewType>('zones');

    const { breadcrumbs } = usePage().props as {
        breadcrumbs?: { label: string; url?: string | null | undefined }[];
    };

    const handleBack = () => {
        router.visit('/');
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="animate-fade-in mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 pt-25 pb-20 sm:px-6 lg:px-8">
                <Breadcrumbs items={breadcrumbs ?? []} />

                <div className="mx-auto max-w-7xl pt-7">
                    <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <button
                                onClick={handleBack}
                                className="mb-4 flex items-center gap-1 pb-2 text-sm font-medium text-slate-500 hover:text-blue-600 cursor-pointer"
                            >
                                <ChevronRight className="h-4 w-4 rotate-180" /> Volver al Inicio
                            </button>
                            <h1 className="mb-3 text-4xl font-bold text-slate-900">Directorio de Zonas</h1>
                            <p className="max-w-2xl text-slate-600">
                                Explora nuestra colección completa de zonas de pesca. Filtra mentalmente por región o dificultad y encuentra tu
                                próximo destino.
                            </p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            {zones.length} Zonas Documentadas
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {zones.map((zone) => (
                            <Link key={zone.id} href={`zones/${zone.slug}`}>
                                <ZoneCard key={zone.id} zone={zone} experienceLevels={experienceLevels} fishingTypes={fishingTypes} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZonesView;
