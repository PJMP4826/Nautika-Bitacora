import { useState } from 'react';
import { SearchBar } from '@/components/features/SearchBar';
import { NavigationBar } from '@/components/layout/Navbar';
import type { HomePageProps, SearchCriteria, ViewType } from '@/types';

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
            <SearchBar
                onSearch={handleSearch}
                className="translate-y-4 transform"
                fishingTypes={fishingTypes}
                experienceLevels={experienceLevels}
                seasons={seasons}
            />
            <main>{/* Contenido principal */}</main>
        </div>
    );
}
