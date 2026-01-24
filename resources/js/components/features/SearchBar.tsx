import { Calendar, Compass, FishSymbol, Search } from 'lucide-react';
import React, { useState } from 'react';

import { FishingTypeSelect } from '@/components/ui/FishingTypeSelect';
import type { SearchBarProps } from '@/types';

export const SearchBar = ({ onSearch, className = '', fishingTypes, experienceLevels, seasons }: SearchBarProps) => {
    const [formData, setFormData] = useState({
        type: '',
        experience: '',
        season: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.type && formData.experience && formData.season) {
            onSearch(formData);
        }
    };

    return (
        <div className={`mx-auto max-w-8xl rounded-3xl bg-white p-2 shadow-2xl ${className}`}>
            <form onSubmit={handleSearch} className="flex flex-col divide-y divide-slate-100 md:flex-row md:items-center md:divide-x md:divide-y-0">
                {/* Style Selector */}
                <div className="group relative flex-1 cursor-pointer rounded-2xl px-10 py-4 transition-colors hover:bg-slate-50 md:py-2">
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-500 uppercase">Estilo de Pesca</label>
                    <FishingTypeSelect value={formData.type} fishingTypes={fishingTypes} onChange={(type) => setFormData({ ...formData, type })} />
                    <div className="pointer-events-none absolute top-1/2 right-1 mt-2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600">
                        <FishSymbol className="h-5 w-5" />
                    </div>
                </div>

                {/* Experience Selector */}
                <div className="group relative flex-1 cursor-pointer rounded-2xl px-10 py-4 transition-colors hover:bg-slate-50 md:py-2">
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-500 uppercase">Experiencia</label>
                    <FishingTypeSelect
                        value={formData.experience}
                        fishingTypes={experienceLevels}
                        onChange={(experience) => setFormData({ ...formData, experience })}
                    />
                    <div className="pointer-events-none absolute top-1/2 right-1 mt-2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600">
                        <Compass className="h-5 w-5" />
                    </div>
                </div>

                {/* Season Selector */}
                <div className="group relative flex-1 cursor-pointer rounded-2xl px-10 py-4 transition-colors hover:bg-slate-50 md:py-2">
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-500 uppercase">Temporada</label>
                    <FishingTypeSelect value={formData.season} fishingTypes={seasons} onChange={(season) => setFormData({ ...formData, season })} />
                    <div className="pointer-events-none absolute top-1/2 right-1 mt-2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600">
                        <Calendar className="h-5 w-5" />
                    </div>
                </div>

                {/* Search Button */}
                <div className="p-2">
                    <button
                        type="submit"
                        className="flex w-full transform items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 md:w-auto md:py-3"
                    >
                        <Search className="h-5 w-5" />
                        <span className="md:hidden">Buscar</span>
                    </button>
                </div>
            </form>
        </div>
    );
};
