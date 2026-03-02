import { Head } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { CreateFishDialog } from '@/components/features/admin/fish/CreateFishDialog';
import { FishAdminCard } from '@/components/features/admin/fish/FishAdminCard';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import * as adminFish from '@/routes/admin/fish';
import type { BreadcrumbItem, FishType, Zone } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fish',
        href: adminFish.index().url,
    },
];

type Props = {
    fish: FishType[];
    zones: Zone[];
};

const AdminFishPage = ({ fish, zones }: Props) => {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SuccessDialog />
            <CreateFishDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                zones={zones}
            />
            <Head title="Zonas" />
            <div className="min-h-screen bg-slate-900">
                <div className="animate-fade-in mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl pt-7">
                        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <h1 className="mb-3 text-4xl font-bold text-slate-900">Peces</h1>
                            </div>

                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                                <Button className="bg-blue-600" onClick={() => setCreateOpen(true)}>
                                    <Pencil className="h-4 w-4" />
                                    Crear un Pez
                                </Button>
                                <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                                    {fish.length} Peces Documentadas
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {fish.map((fish) => (
                                <FishAdminCard fish={fish} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminFishPage;
