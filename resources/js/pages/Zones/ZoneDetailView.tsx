import { router } from '@inertiajs/react';
import { BookOpen, ChevronRight, Fish, LifeBuoy, Map, Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { ZoneDetailViewProps } from '@/types';

const ZoneDetailView = ({ zone, onBack, breadcrumbs }: ZoneDetailViewProps) => {
    if (!zone) return null;

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.visit('/zones');
        }
    };

    return (
        <div className="animate-fade-in min-h-screen bg-white">
            {/* Immersive Header */}
            <div className="relative h-[50vh] w-full">
                <img src={zone.image} alt={zone.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <button
                    onClick={handleBack}
                    className="absolute top-7 left-4 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 md:left-8"
                >
                    <ChevronRight className="h-6 w-6 rotate-180" />
                </button>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-12">
                    <div className="mx-auto max-w-7xl">
                        <span className="mb-3 inline-block rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-lg">
                            {zone.region}
                        </span>
                        <h1 className="mb-4 text-4xl font-bold shadow-sm md:text-6xl">{zone.name}</h1>
                        <Breadcrumbs items={breadcrumbs ?? []} />
                        <div className="flex items-center gap-6 text-sm font-medium pt-3">
                            <span className="flex items-center gap-2">
                                <Star className="h-4 w-4 fill-current text-yellow-400" /> {zone.rating} Puntuación
                            </span>
                            <span className="flex items-center gap-2">
                                <LifeBuoy className="h-4 w-4" /> Nivel {zone.difficulty.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 lg:grid-cols-3">
                <div className="space-y-12 lg:col-span-2">
                    <div>
                        <h3 className="mb-4 text-2xl font-bold text-slate-900">Sobre esta zona</h3>
                        <p className="text-lg leading-relaxed text-slate-600">{zone.description}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                            <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                                <Fish className="h-5 w-5 text-blue-600" /> Especies Clave
                            </h4>
                            <ul className="space-y-2">
                                {zone.species.map((s) => (
                                    <li key={s} className="flex items-center gap-2 text-slate-600">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                            <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                                <BookOpen className="h-5 w-5 text-blue-600" /> Normativa
                            </h4>
                            <p className="text-sm leading-relaxed text-slate-600">{zone.regulations}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
                        <h3 className="mb-6 font-bold text-slate-900">Planificación Rápida</h3>

                        <div className="mb-6">
                            <span className="mb-2 block text-xs font-bold tracking-wider text-slate-400 uppercase">Mejor Temporada</span>
                            <div className="flex flex-wrap gap-2">
                                {zone.best_season.map((s) => (
                                    <span
                                        key={s.id}
                                        className="flex items-center gap-1 rounded-lg border border-green-100 bg-green-50 px-3 py-1 text-sm font-bold text-green-700"
                                    >
                                        {s.icon} {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <span className="mb-2 block text-xs font-bold tracking-wider text-slate-400 uppercase">Tipos Permitidos</span>
                            <div className="flex flex-wrap gap-2">
                                {zone.types.map((t) => (
                                    <span key={t.id} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                        {t.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800">
                            <Map className="h-5 w-5" /> Ver en Mapa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoneDetailView;
