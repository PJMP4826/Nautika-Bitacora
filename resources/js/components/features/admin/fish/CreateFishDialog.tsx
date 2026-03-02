import { router } from '@inertiajs/react';
import { CloudUpload, Plus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/admin/fish';
import type { Zone } from '@/types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    zones: Zone[];
};

type FishFormData = {
    name: string;
    slug: string;
    scientific_name: string;
    zone_id: string;
    image: File | null;
    imageUrl: string;
};

const initialState: FishFormData = {
    name: '',
    slug: '',
    scientific_name: '',
    zone_id: '',
    image: null,
    imageUrl: '',
};

export function CreateFishDialog({ open, onOpenChange, zones }: Props) {
    const [fishForm, setFishForm] = useState<FishFormData>(initialState);
    const [dragOver, setDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!open) {
            setFishForm(initialState);
            setPreviewUrl(null);
        }
    }, [open]);

    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFishForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
        setFishForm((prev) => ({ ...prev, name, slug }));
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFishForm((prev) => ({ ...prev, image: file }));
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

        router.post(
            store().url,
            {
                name:            fishForm.name,
                slug:            fishForm.slug,
                scientific_name: fishForm.scientific_name,
                zone_id:         fishForm.zone_id,
                ...(imageMode === 'upload' && fishForm.image
                    ? { image: fishForm.image }
                    : imageMode === 'url' && fishForm.imageUrl
                        ? { image_url: fishForm.imageUrl }
                        : {}),
            },
            {
                forceFormData: true,
                onSuccess: () => onOpenChange(false),
                onError: (errors) => console.error(errors),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto p-0">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <DialogHeader className="border-b p-6 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg border bg-white p-1.5 shadow-sm">
                                <Plus className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-semibold">Crear Pez</DialogTitle>
                                <DialogDescription className="mt-0.5 text-sm text-slate-500">
                                    Completa los detalles del nuevo pez
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6 p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Imagen */}
                            <div className="flex flex-col gap-3">
                                <div className="flex rounded-lg border border-slate-200 p-1">
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('upload')}
                                        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                            imageMode === 'upload'
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                    >
                                        Subir archivo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageMode('url')}
                                        className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                            imageMode === 'url'
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                    >
                                        URL externa
                                    </button>
                                </div>

                                {imageMode === 'upload' && (
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => fileInputRef.current?.click()}
                                        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleDrop}
                                        className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed py-6 transition-colors ${
                                            dragOver ? 'border-slate-400 bg-slate-100' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                                        }`}
                                    >
                                        {previewUrl && fishForm.image instanceof File ? (
                                            <>
                                                <img src={previewUrl} alt="preview" className="absolute inset-0 h-full w-full rounded-xl object-cover opacity-80" />
                                                <div className="relative z-10 flex flex-col items-center rounded-lg bg-white/80 px-4 py-2 backdrop-blur-sm">
                                                    <CloudUpload className="mb-1 h-5 w-5 text-slate-600" />
                                                    <p className="text-xs font-medium text-slate-700">Click para cambiar imagen</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <CloudUpload className="mb-2 h-8 w-8 text-slate-400" />
                                                <p className="text-sm font-medium text-slate-700">Selecciona o arrastra una imagen</p>
                                                <p className="mt-1 text-xs text-slate-400">JPG o PNG, max 10 MB</p>
                                            </>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileSelect} />
                                    </div>
                                )}

                                {imageMode === 'url' && (
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            type="url"
                                            placeholder="https://ejemplo.com/pez.jpg"
                                            value={fishForm.imageUrl}
                                            onChange={(e) => {
                                                setFishForm((prev) => ({ ...prev, imageUrl: e.target.value }));
                                                setPreviewUrl(e.target.value || null);
                                            }}
                                            className="bg-slate-50/50 focus-visible:bg-white"
                                        />
                                        {fishForm.imageUrl && (
                                            <div className="relative h-32 overflow-hidden rounded-xl border border-slate-200">
                                                <img
                                                    src={fishForm.imageUrl}
                                                    alt="preview"
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Campos */}
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Nombre <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        value={fishForm.name}
                                        onChange={handleNameChange}
                                        placeholder="e.g. Trucha Arcoíris"
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
                                        value={fishForm.slug}
                                        onChange={handleChange}
                                        placeholder="trucha-arcoiris"
                                        className="bg-slate-50/50 font-mono text-sm focus-visible:bg-white"
                                    />
                                    <p className="text-xs text-slate-400">Generado automáticamente con el nombre</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="scientific_name" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Nombre Científico
                                    </Label>
                                    <Input
                                        id="scientific_name"
                                        name="scientific_name"
                                        value={fishForm.scientific_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Oncorhynchus mykiss"
                                        className="bg-slate-50/50 italic focus-visible:bg-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zone_id" className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        Zona <span className="text-red-500">*</span>
                                    </Label>
                                    <select
                                        id="zone_id"
                                        name="zone_id"
                                        required
                                        value={fishForm.zone_id}
                                        onChange={(e) => setFishForm((prev) => ({ ...prev, zone_id: e.target.value }))}
                                        className="w-full rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                    >
                                        <option value="">Seleccionar zona</option>
                                        {zones.map((z) => (
                                            <option key={z.id} value={z.id}>{z.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 border-t bg-slate-50/50 px-6 py-4">
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                            <Plus className="h-4 w-4" />
                            Crear pez
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
