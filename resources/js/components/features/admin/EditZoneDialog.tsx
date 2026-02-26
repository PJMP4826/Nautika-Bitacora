import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ZoneCardProps } from '@/types';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: ZoneCardProps | null;
};

type ZoneFormData = {
    name: string;
    slug: string;
    region: string;
    image: string;
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
    image: '',
    types: [],
    difficulty: '',
    best_season: [],
    rating: 0,
    description: '',
    species: [],
    regulations: '',
};

export function EditZoneDialog({ open, onOpenChange, data }: Props) {
    const [zoneForm, setZoneForm] = useState<ZoneFormData>(initialState);

    // Sync when editing a different zone
    useEffect(() => {
        if (!data?.zone) return;
        setZoneForm(data.zone);
    }, [data?.zone, data?.zone.id]);

    // Optional: reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setZoneForm(initialState);
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setZoneForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!data?.zone) return;

        console.log('Updated zone:', zoneForm);

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit Zone</DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={zoneForm.name} onChange={handleChange} />
                        </Field>

                        <Field>
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" value={zoneForm.slug} onChange={handleChange} />
                        </Field>

                        <Field>
                            <Label htmlFor="region">Region</Label>
                            <Input id="region" name="region" value={zoneForm.region} onChange={handleChange} />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
