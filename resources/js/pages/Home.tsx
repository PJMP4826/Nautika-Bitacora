import { SearchBar } from '@/components/features/SearchBar';
import { NavigationBar } from '@/components/layout/Navbar';
import type { HomePageProps, SearchCriteria, ViewType } from '@/types';
import { useState } from 'react';

export default function Home({ fishingTypes, experienceLevels, seasons }: HomePageProps) {
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
                <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                        alt="Ocean Background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-12 max-w-4xl text-center">
                            <span className="mb-6 inline-block rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-sm font-bold tracking-wide text-blue-300 backdrop-blur-sm">
                                NUEVA TEMPORADA 2024
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

                <main>{/* Contenido principal */}</main>
            </div>
        </div>
    );
}
