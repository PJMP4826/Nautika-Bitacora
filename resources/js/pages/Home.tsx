import {useState} from 'react';
import { NavigationBar } from '@/components/layout/Navbar';
import type { ViewType } from '@/types';

export default function Home() {
    const [currentView, setCurrentView] = useState<ViewType>('home');

    return (
        <div className="min-h-screen bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />
            <main>
                {/* Contenido principal */}
            </main>
        </div>
    )
}
