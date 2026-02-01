import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ZoneCard } from '@/components/features/ZoneCard';
import { NavigationBar } from '@/components/layout/Navbar';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { ViewType, ZoneViewProps } from '@/types';

const ZonesView = ({ zones, experienceLevels, fishingTypes, onDetail, onBack,  }: ZoneViewProps) => {
    const [currentView, setCurrentView] = useState<ViewType>('zones');

    const {breadcrumbs} = usePage().props as {
        breadcrumbs?: { label: string; url?: string | null | undefined }[]
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="bg-slate-50 min-h-screen pt-25 pb-20 animate-fade-in mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={breadcrumbs ?? []} />

                <div className="max-w-7xl mx-auto pt-7">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <button onClick={onBack} className="text-slate-500 hover:text-blue-600 mb-4 flex items-center gap-1 text-sm font-medium pb-2">
                                <ChevronRight className="h-4 w-4 rotate-180" /> Volver al Inicio
                            </button>
                            <h1 className="text-4xl font-bold text-slate-900 mb-3">Directorio de Zonas</h1>
                            <p className="text-slate-600 max-w-2xl">
                                Explora nuestra colección completa de zonas de pesca. Filtra mentalmente por región o dificultad y encuentra tu próximo destino.
                            </p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
                            {zones.length} Zonas Documentadas
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">


                        {zones.map(zone => (
                            <Link
                                key={zone.id}
                                href={`zones/${zone.slug}`}
                            >
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
