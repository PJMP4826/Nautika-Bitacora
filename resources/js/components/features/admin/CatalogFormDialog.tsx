import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type FieldConfig = {
    name: string;
    label: string;
    type: 'text' | 'textarea';
    required?: boolean;
};

type Props<T> = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    fields: FieldConfig[];
    initialData?: Partial<T> | null;
    submitUrl: string;
    method: 'post' | 'put';
};

export function CatalogFormDialog<T extends Record<string, any>>({
    open,
    onOpenChange,
    title,
    description,
    fields,
    initialData,
    submitUrl,
    method,
}: Props<T>) {
    const [formData, setFormData] = useState<Partial<T>>({});

    useEffect(() => {
        if (open) {
            setFormData(initialData || {});
        } else {
            setFormData({});
        }
    }, [open, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => onOpenChange(false),
            onError: (errors: any) => console.error(errors),
        };

        if (method === 'post') {
            router.post(submitUrl, formData as any, options);
        } else {
            router.put(submitUrl, formData as any, options);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-6">
                        {fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <Label htmlFor={field.name} className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </Label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        required={field.required}
                                        value={formData[field.name as keyof T] as string || ''}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full resize-none rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-ring focus:outline-none"
                                    />
                                ) : (
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        required={field.required}
                                        value={formData[field.name as keyof T] as string || ''}
                                        onChange={handleChange}
                                        className="bg-slate-50/50 focus-visible:bg-white"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                            Guardar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
