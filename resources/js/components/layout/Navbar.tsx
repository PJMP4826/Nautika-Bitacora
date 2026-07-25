import { router, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SearchAutocomplete } from '@/components/layout/SearchAutocomplete';
import type { NavigationBarProps, ViewType } from '@/types';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const NavigationBar = ({ setCurrentView, currentView }: NavigationBarProps) => {
    const { auth } = usePage().props as { auth?: { user?: { name: string, email: string } } };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleManualVisit = (id: ViewType) => {
        if (id === 'home') {
            router.visit('/');
            setCurrentView(id);
            return;
        }

        router.visit(`/${id}`);
        setCurrentView(id);
    };

    const navItems = [
        { id: 'home' as ViewType, label: 'Inicio' },
        { id: 'zones' as ViewType, label: 'Explorar Zonas' },
        { id: 'fish' as ViewType, label: 'Peces' },
    ];

    {console.log('Current View: ', currentView)}

    // Helper para inicial de avatar
    const getInitial = (name?: string) => name ? name.charAt(0).toUpperCase() : '?';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView != 'home' ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => handleManualVisit('home')}
                    >
                        <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                            <img src={"/anchor.png"} className="max-w-9"/>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-wider text-white">NAUTIKA</h1>
                            <p className="text-[10px] text-blue-200 tracking-[0.2em] font-medium">BITÁCORA</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <SearchAutocomplete isScrolled={scrolled} />
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleManualVisit(item.id)}
                                className={`text-sm font-medium transition-all ${
                                    currentView === item.id
                                        ? 'text-white border-b-2 border-blue-400 pb-1 cursor-pointer'
                                        : 'text-white hover:text-white hover:-translate-y-0.5 cursor-pointer'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => handleManualVisit('contact')}
                            className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Contacto
                        </button>
                        {/* Botones Login/Registro o Avatar */}
                        {!auth?.user ? (
                            <>
                                <button
                                    onClick={() => router.visit('/login')}
                                    className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl ml-2"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.visit('/register')}
                                    className="bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl ml-2"
                                >
                                    Registro
                                </button>
                            </>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="ml-4 flex items-center focus:outline-none">
                                        <Avatar className="h-9 w-9 bg-blue-700 text-white font-bold">
                                            <AvatarFallback>{getInitial(auth.user.name)}</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-40">
                                    <div className="px-3 py-2">
                                        <div className="font-semibold">{auth.user.name}</div>
                                        <div className="text-xs text-gray-400">{auth.user.email}</div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => router.post('/logout')}
                                        className="cursor-pointer text-red-500"
                                    >
                                        Cerrar sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                            className="p-2 text-white hover:bg-white/10 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full z-50">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    handleManualVisit(item.id);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                handleManualVisit('contact');
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 mt-2"
                        >
                            Contacto
                        </button>
                        {!auth?.user ? (
                            <>
                                <button
                                    onClick={() => { router.visit('/login'); setIsMobileMenuOpen(false); }}
                                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-blue-50 mt-2"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { router.visit('/register'); setIsMobileMenuOpen(false); }}
                                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-white bg-blue-500 hover:bg-blue-600 mt-2"
                                >
                                    Registro
                                </button>
                            </>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="mt-2 flex items-center focus:outline-none w-full">
                                        <Avatar className="h-9 w-9 bg-blue-700 text-white font-bold">
                                            <AvatarFallback>{getInitial(auth.user.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="ml-2 text-white font-semibold">{auth.user.name}</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="min-w-40">
                                    <div className="px-3 py-2">
                                        <div className="font-semibold">{auth.user.name}</div>
                                        <div className="text-xs text-gray-400">{auth.user.email}</div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => { router.post('/logout'); setIsMobileMenuOpen(false); }}
                                        className="cursor-pointer text-red-500"
                                    >
                                        Cerrar sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
