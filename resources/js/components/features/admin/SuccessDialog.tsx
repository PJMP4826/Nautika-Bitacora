import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type {PageProps} from '@/types';

export function SuccessDialog() {
    const { flash } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) setOpen(true);
    }, [flash?.success]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>✅ {flash?.success}</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
