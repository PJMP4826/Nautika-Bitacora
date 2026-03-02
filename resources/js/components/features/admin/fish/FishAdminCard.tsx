import { router } from '@inertiajs/react';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/admin/fish';
import type { FishAdminCardProps } from '@/types';
import {EditFishDialog} from './EditFishDialog';

export const FishAdminCard = ({ fish, zone, zones }: FishAdminCardProps) => {
    console.log('zones:', zones);
    const [selectedCard, setSelectedCard] = useState<FishAdminCardProps | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleEdit = ({ fish, zone }: FishAdminCardProps) => {
        setOpen(true);
        setSelectedCard({
            fish,
            zone,
        });
    };

    const handleDelete = () => {
        router.delete(destroy(fish.id).url, {
            onSuccess: () => setDeleteOpen(false),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <>
            <div className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={fish.image}
                        alt={fish.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">{fish.name}</h3>
                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="h-3 w-3" />
                                {fish.zone?.region}
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 mb-4 line-clamp-2 text-xs text-slate-600">{fish.scientific_name}</p>

                    <div className="flex flex-1 flex-row items-center gap-2 p-6">
                        <Button
                            size="sm"
                            onClick={() =>
                                handleEdit({
                                    fish,
                                    zone,
                                })
                            }
                            className="flex cursor-pointer items-center gap-1 bg-green-500"
                        >
                            <Pencil className="h-4 w-4" />
                            Editar
                        </Button>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setDeleteOpen(true)}
                            className="flex cursor-pointer items-center gap-1"
                        >
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>

            <EditFishDialog open={open} onOpenChange={setOpen} data={selectedCard} autoFillSelectedFishCardProps={{ zones: zones ?? [] }}/>

            <DeleteConfirmDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title={`¿Eliminar "${fish.name}"?`}
                description="Se eliminará el pez y su imagen permanentemente."
                onConfirm={handleDelete}
            />
        </>
    );
};
