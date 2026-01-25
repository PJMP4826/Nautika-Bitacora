import { Anchor } from 'lucide-react';

export const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className="flex items-center gap-3 mb-6 md:mb-0">
                    <div className="bg-white/5 p-3 rounded-xl">
                        <Anchor className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                        <span className="font-bold text-2xl text-white block">NAUTIKA</span>
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Planificación Inteligente</span>
                    </div>
                </div>
                <div className="flex gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">Zonas</a>
                    <a href="#" className="hover:text-white transition-colors">Guías</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
                <p>© 2026 Nautika-Bitácora. Este sistema es una herramienta informativa. Pesca responsablemente.</p>
            </div>
        </div>
    </footer>
);
