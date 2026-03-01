import { router } from '@inertiajs/react';
import { CloudUpload, Save } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/admin/zones';
import type { AutoFillSelectedZoneCardProps, ZoneAdminCardProps } from '@/types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ZoneAdminCardProps | null;
    autoFillSelectedZoneCardProps: AutoFillSelectedZoneCardProps;
};

type ZoneFormData = {
    name: string;
    slug: string;
    region: string;
    water_type: string;
    image: File | string | null;
    types: string[];
    difficulty: string;
    best_season: string[];
    rating: number;
    description: string;
    species: string[];
    regulations: string;
};

const initialState: ZoneFormData = {
    name: '',
    slug: '',
    region: '',
    water_type: 'mar',
    image: '',
    types: [],
    difficulty: '',
    best_season: [],
    rating: 0,
    description: '',
    species: [],
    regulations: '',
};

export function EditZoneDialog({ open, onOpenChange, data, autoFillSelectedZoneCardProps }: Props) {
    const [zoneForm, setZoneForm] = useState<ZoneFormData>(initialState);
    const [dragOver, setDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync when editing a different zone
    useEffect(() => {
        if (!data?.zone) return;
        setZoneForm(data.zone);
        setPreviewUrl(data.zone.image || null);
    }, [data?.zone, data?.zone?.id]);

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setZoneForm(initialState);
            setPreviewUrl(null);
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setZoneForm((prev) => ({ ...prev, [name]: value }));
    };

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
        setZoneForm((prev) => ({ ...prev, name, slug }));
    };

    // Image upload / drag-and-drop
    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setZoneForm((prev) => ({ ...prev, image: file }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data?.zone) return;

        router.post(
            update(data.zone.id).url,
            {
                name: zoneForm.name,
                slug: zoneForm.slug,
                description: zoneForm.description,
                region: zoneForm.region,
                water_type: zoneForm.water_type,
                rating: zoneForm.rating,
                regulations: zoneForm.regulations,
                experience_level_id: zoneForm.difficulty,
                fishing_type_ids: zoneForm.types,
                season_ids: zoneForm.best_season,
                _method: 'PUT',
                ...(zoneForm.image instanceof File ? { image: zoneForm.image } : {})
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    onOpenChange(false);
                },
                onError: (errors) => {
                    console.error(errors);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* Header */}
                    <DialogHeader className="border-b p-6 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg border bg-white p-1.5 shadow-sm">
                                <CloudUpload className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold">Editar</DialogTitle>
                                <DialogDescription className="mt-0.5 text-sm text-slate-500">
                                    Actualiza los detalles de la zona
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Body */}
                    <div className="space-y-6 p-6">
                        {/* Image upload + Name/Slug row */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Dropzone */}
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => fileInputRef.current?.click()}
                                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed py-6 transition-colors ${
                                    dragOver ? 'border-slate-400 bg-slate-100' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                                }`}
                            >
                                {previewUrl ? (
                                    <>
                                        <img
                                            src={previewUrl}
                                            alt="Zone preview"
                                            className="absolute inset-0 h-full w-full rounded-xl object-cover opacity-80"
                                        />
                                        <div className="relative z-10 flex flex-col items-center rounded-lg bg-white/80 px-4 py-2 backdrop-blur-sm">
                                            <CloudUpload className="mb-1 h-5 w-5 text-slate-600" />
                                            <p className="text-xs font-medium text-slate-700">Click to replace image</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <CloudUpload className="mb-2 h-8 w-8 text-slate-400" />
                                        <p className="text-sm font-medium text-slate-700">Select a file or drag and drop</p>
                                        <p className="mt-1 text-xs text-slate-400">JPG or PNG, max 10 MB</p>
                                    </>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileSelect} />
                            </div>

                            {/* Name + Slug stacked */}
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Nombre de la Zona <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        value={zoneForm.name}
                                        onChange={handleNameChange}
                                        placeholder="e.g. Sierra Nevada Highlands"
                                        className="bg-slate-50/50 focus-visible:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Slug (URL)
                                    </Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={zoneForm.slug}
                                        onChange={handleChange}
                                        placeholder="sierra-nevada-highlands"
                                        className="bg-slate-50/50 font-mono text-sm focus-visible:bg-white"
                                    />
                                    <p className="text-xs text-slate-400">Generado automaticamente con el nombre de la zona</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="region" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Region
                                    </Label>
                                    <Input
                                        id="region"
                                        name="region"
                                        value={zoneForm.region}
                                        onChange={handleChange}
                                        placeholder="e.g. California"
                                        className="bg-slate-50/50 focus-visible:bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="water_type" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Tipo de Agua <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="water_type"
                                        name="water_type"
                                        required
                                        value={zoneForm.water_type}
                                        onChange={(e) => setZoneForm((prev) => ({ ...prev, water_type: e.target.value }))}
                                        className="w-full rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                    >
                                        <option value="mar">Mar</option>
                                        <option value="rio">Río</option>
                                        <option value="lago">Lago</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                Descripción <span className="text-red-500">*</span>
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                value={zoneForm.description}
                                onChange={handleChange}
                                placeholder="Describe the zone's landscape, access points, and what makes it unique."
                                rows={4}
                                className="w-full resize-none rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none focus-visible:bg-white"
                            />
                        </div>

                        {/* Difficulty + Rating row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="difficulty" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    Dificultad
                                </Label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={zoneForm.difficulty}
                                    onChange={(e) =>
                                        setZoneForm((prev) => ({
                                            ...prev,
                                            difficulty: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                >
                                    <option value="">Seleccionar</option>
                                    {autoFillSelectedZoneCardProps.experienceLevels.map((e) => (
                                        <option value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rating" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    Calificación
                                </Label>
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    min={0}
                                    max={5}
                                    step={0.1}
                                    value={zoneForm.rating}
                                    onChange={(e) =>
                                        setZoneForm((prev) => ({
                                            ...prev,
                                            rating: parseFloat(e.target.value) || 0,
                                        }))
                                    }
                                    className="bg-slate-50/50 focus-visible:bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    Estilos de Pesca
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {autoFillSelectedZoneCardProps.fishingTypes.map((f) => (
                                        <label key={f.id} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-sm shadow-sm cursor-pointer hover:bg-slate-100">
                                            <input
                                                type="checkbox"
                                                checked={zoneForm.types.includes(f.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setZoneForm((prev) => ({
                                                        ...prev,
                                                        types: checked
                                                            ? [...prev.types, f.id]
                                                            : prev.types.filter((id) => id !== f.id),
                                                    }));
                                                }}
                                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                                            />
                                            {f.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    Mejores Temporadas
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {autoFillSelectedZoneCardProps.seasons.map((s) => (
                                        <label key={s.id} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-sm shadow-sm cursor-pointer hover:bg-slate-100">
                                            <input
                                                type="checkbox"
                                                checked={zoneForm.best_season.includes(s.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setZoneForm((prev) => ({
                                                        ...prev,
                                                        best_season: checked
                                                            ? [...prev.best_season, s.id]
                                                            : prev.best_season.filter((id) => id !== s.id),
                                                    }));
                                                }}
                                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                                            />
                                            {s.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="gap-2 border-t bg-slate-50/50 px-6 py-4">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                            <Save className="h-4 w-4" />
                            Guardar cambios
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
