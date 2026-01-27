import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { SearchAutocompleteProps } from '@/types';

export const SearchAutocomplete = ({ items, onSelect, isScrolled }: SearchAutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={containerRef} className="relative w-64">
            {isScrolled ? (
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                    <Search className="w-4 h-4 text-white" />
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        placeholder="Buscar zonas, tipos..."
                        className="bg-transparent text-sm text-white placeholder-slate-100 focus:outline-none w-full"
                    />
                </div>
            ) : (
                <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2">
                    <Search className="w-4 h-4 text-gray-600" />
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setOpen(true);
                        }}
                        placeholder="Buscar zonas, tipos..."
                        className="bg-transparent text-sm text-gray-600 placeholder-gray-600 focus:outline-none w-full"
                    />
                </div>
            )}

            {open && query && (
                <div className="absolute mt-2 w-full rounded-xl bg-slate-900 shadow-xl border border-slate-800 z-50">
                    {results.length === 0 && (
                        <div className="px-4 py-3 text-sm text-slate-400">
                            Sin resultados
                        </div>
                    )}

                    {results.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onSelect(item.view);
                                setQuery('');
                                setOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-slate-200"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
