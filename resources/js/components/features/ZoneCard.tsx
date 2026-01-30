import { MapPin, Star } from 'lucide-react';
import type { ZoneCardProps } from '@/types';

export const ZoneCard = ({ zone, experienceLevels, fishingTypes}: ZoneCardProps) => (
    <div
        className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
    >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
            <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
         <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
             zone.difficulty === 'beginner' ? 'bg-green-500/90 text-white' :
                 zone.difficulty === 'intermediate' ? 'bg-blue-500/90 text-white' :
                     'bg-slate-900/90 text-white'
         }`}>
           {experienceLevels.find(l => l.id === zone.difficulty)?.name}
         </span>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold text-slate-800">{zone.rating}</span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{zone.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <MapPin className="h-3 w-3" />
                        {zone.region}
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-xs line-clamp-2 mt-2 mb-4">{zone.description}</p>

            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {zone.types.map(t => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md whitespace-nowrap">
            {fishingTypes.find(ft => ft.id === t)?.name}
          </span>
                ))}
            </div>
        </div>
    </div>
);
