import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SearchAutocompleteProps, SearchResult } from '@/types';

export const SearchAutocomplete = ({ isScrolled }: SearchAutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<number | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = window.setTimeout(async () => {
            setLoading(true);

            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            setResults(data);
            setOpen(true);
            setLoading(false);
        }, 300);
    }, [query]);

    return (
        <div ref={containerRef} className="relative w-64">
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${isScrolled ? 'bg-white/20 text-white' : 'bg-white/90 text-gray-600'}`}>
                <Search className="h-4 w-4" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar zonas, especies..."
                    className="w-full bg-transparent text-sm focus:outline-none"
                />
            </div>

            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
                    {loading && <div className="px-4 py-3 text-sm text-slate-400">Buscando…</div>}

                    {!loading && results.length === 0 && query.length >= 2 && <div className="px-4 py-3 text-sm text-slate-400">Sin resultados</div>}

                    {results.map((item) => (
                        <button
                            key={`${item.type}-${item.id}`}
                            onClick={() => {
                                router.visit(item.route);
                                setQuery('');
                                setOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"
                        >
                            <div className="font-medium">{item.label}</div>
                            {item.subtitle && <div className="text-xs text-slate-400">{item.subtitle}</div>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
