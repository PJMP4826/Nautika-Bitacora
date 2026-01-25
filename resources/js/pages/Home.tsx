import { SearchBar } from '@/components/features/SearchBar';
import { ZoneCard } from '@/components/features/ZoneCard';
import { NavigationBar } from '@/components/layout/Navbar';
import { AnimatedWave } from '@/components/ui/AnimatedWave';
import type { HomePageProps, SearchCriteria, ViewType } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Testimonials } from '@/components/ui/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { FishCard } from '@/components/features/FishCard';

export default function Home({ fishingTypes, experienceLevels, seasons, zones, testimonials, fish, onSearch, onViewMore, onDetail }: HomePageProps) {
    const [currentView, setCurrentView] = useState<ViewType>('home');
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);

    const handleSearch = (criteria: SearchCriteria) => {
        setSearchCriteria(criteria);
        setCurrentView('results');
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />

            <div className="animate-fade-in">
                {/* Hero Section */}
                <div className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
                    <img src="./img/hero-img.jpg" alt="Ocean Background" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-blue-950" />

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-12 max-w-4xl text-center">
                            <span className="mb-6 inline-block rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-sm font-bold tracking-wide text-blue-300 backdrop-blur-sm">
                                NUEVA TEMPORADA 2026
                            </span>
                            <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white md:text-7xl">
                                Descubre tu próxima <br />
                                <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">aventura de pesca</span>
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-slate-200 md:text-xl">
                                Planifica con precisión. Encuentra las mejores zonas según tu nivel, la temporada y tu estilo favorito. Sin reservas,
                                solo información pura.
                            </p>

                            <SearchBar
                                onSearch={handleSearch}
                                className="translate-y-4 transform"
                                fishingTypes={fishingTypes}
                                experienceLevels={experienceLevels}
                                seasons={seasons}
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute top-145 bottom-0 left-0 w-full">
                    <AnimatedWave color={'#162456'} />
                </div>

                <main>
                    {/* Featured Zones */}
                    <div className="bg-slate-50 py-20 pt-40">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl md:text-4xl font-extrabold mb-4 tracking-tight">Zonas Destacadas</h2>
                                    <p className="text-slate-500">Lugares recomendados por nuestra comunidad este mes.</p>
                                </div>
                                <button
                                    onClick={() => onViewMore('zones')}
                                    className="hidden items-center gap-2 font-bold text-blue-600 transition-colors hover:text-blue-800 md:flex"
                                >
                                    Ver todas las zonas <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {zones.slice(0, 4).map((zone) => (
                                    <ZoneCard
                                        zone={zone}
                                        onClick={() => onDetail(zone)}
                                        experienceLevels={experienceLevels}
                                        fishingTypes={fishingTypes}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="bg-slate-50 py-20 pt-5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <h2 className="text-4xl md:text-4xl font-extrabold mb-4 tracking-tight">Peces Destacados</h2>
                                    <p className="text-slate-500">Explora variadad de peces en diferentes zonas.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {fish.slice(0, 4).map((fish) => (
                                    <FishCard
                                        fish={fish}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 pb-16">
                        <Testimonials testimonials={testimonials}/>
                    </div>
                </main>
            </div>

            <Footer/>
        </div>
    );
}
