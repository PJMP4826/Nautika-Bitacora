import { Menu, X} from 'lucide-react';
import {useState, useEffect} from 'react';
import { SearchAutocomplete } from '@/components/layout/SearchAutocomplete';
import type { NavigationBarProps, ViewType} from '@/types';

export const NavigationBar = ({ setCurrentView, currentView }: NavigationBarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home' as ViewType, label: 'Inicio' },
        { id: 'zones' as ViewType, label: 'Explorar Zonas' },
        { id: 'types' as ViewType, label: 'Tipos de Pesca' },
        { id: 'guides' as ViewType, label: 'Bitácora' },
    ];

    const searchItems = [
        { id: '1', label: 'Zonas de Pesca', view: 'zones' as ViewType },
        { id: '2', label: 'Tipos de Pesca', view: 'types' as ViewType },
        { id: '3', label: 'Bitácora', view: 'guides' as ViewType },
    ];


    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => setCurrentView('home')}
                    >
                        <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                            <img src={"./anchor.png"} className="max-w-9"/>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-wider text-white">NAUTIKA</h1>
                            <p className="text-[10px] text-blue-200 tracking-[0.2em] font-medium">BITÁCORA</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">

                        <SearchAutocomplete items={searchItems} onSelect={(view) => setCurrentView(view)} isScrolled={scrolled} />

                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentView(item.id)}
                                className={`text-sm font-medium transition-all ${
                                    currentView === item.id
                                        ? 'text-white border-b-2 border-blue-400 pb-1'
                                        : 'text-white hover:text-white hover:-translate-y-0.5'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}


                        <button
                            onClick={() => setCurrentView('contact')}
                            className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Contacto
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white hover:bg-white/10 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentView(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
