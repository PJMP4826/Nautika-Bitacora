import { MapPin } from 'lucide-react';
import type { FishCardProps } from '@/types';

export const FishCard = ({ fish }: FishCardProps) => (
    <div
        className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col h-full"
    >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
            <img
                src={fish.image}
                alt={fish.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{fish.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <MapPin className="h-3 w-3" />
                        {fish.zone.region}
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-xs line-clamp-2 mt-2 mb-4">{fish.sciencetic_name}</p>
        </div>
    </div>
);
