import { router } from '@inertiajs/react';
import { MapPin, Pencil, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/admin/zones';
import type { ZoneAdminCardProps } from '@/types';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditZoneDialog } from './EditZoneDialog';

export const ZoneAdminCard = ({ zone, experienceLevels, fishingTypes, seasons }: ZoneAdminCardProps) => {
    const [selectedCard, setSelectedCard] = useState<ZoneAdminCardProps | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleEdit = ({ zone, experienceLevels, fishingTypes, seasons }: ZoneAdminCardProps) => {
        setOpen(true);
        setSelectedCard({
            zone,
            experienceLevels,
            fishingTypes,
            seasons,
        });
    };

    const handleDelete = () => {
        router.delete(destroy(zone.id).url, {
            onSuccess: () => setDeleteOpen(false),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={zone.image}
                        alt={zone.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-bold shadow-lg backdrop-blur-md ${
                                zone.difficulty === 'beginner'
                                    ? 'bg-green-500/90 text-white'
                                    : zone.difficulty === 'intermediate'
                                      ? 'bg-blue-500/90 text-white'
                                      : 'bg-slate-900/90 text-white'
                            }`}
                        >
                            {experienceLevels.find((l) => l.id === zone.difficulty)?.name}
                        </span>
                    </div>
                    <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-xs font-bold text-slate-800">{zone.rating}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">{zone.name}</h3>
                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="h-3 w-3" />
                                {zone.region}
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 mb-4 line-clamp-2 text-xs text-slate-600">{zone.description}</p>

                    <div className="no-scrollbar mt-auto flex items-center gap-2 overflow-x-auto border-t border-slate-50 pt-4">
                        {zone.types.map((t) => (
                            <span key={t} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] whitespace-nowrap text-slate-600">
                                {fishingTypes.find((ft) => ft.id === t)?.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 flex-row items-center gap-2 p-6">
                    <Button
                        size="sm"
                        onClick={() =>
                            handleEdit({
                                zone,
                                experienceLevels,
                                fishingTypes,
                                seasons,
                            })
                        }
                        className="flex cursor-pointer items-center gap-1 bg-green-500"
                    >
                        <Pencil className="h-4 w-4" />
                        Editar
                    </Button>

                    <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)} className="flex cursor-pointer items-center gap-1">
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                    </Button>
                </div>
            </div>

            <EditZoneDialog
                open={open}
                onOpenChange={setOpen}
                data={selectedCard}
                autoFillSelectedZoneCardProps={{
                    fishingTypes,
                    experienceLevels,
                    seasons,
                }}
            />

            <DeleteConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={`¿Eliminar "${zone.name}"?`}
                description="Se eliminará la zona y su imagen permanentemente."
                onConfirm={handleDelete}
            />
        </>
    );
};
