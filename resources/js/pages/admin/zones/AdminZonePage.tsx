import { Head } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import { ZoneAdminCard } from '@/components/features/admin/ZoneAdminCard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import * as adminZones from '@/routes/admin/zones';
import type { BreadcrumbItem, ZoneViewProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Zonas',
        href: adminZones.index().url,
    },
];

const ZoneList = ({ zones, experienceLevels, fishingTypes }: ZoneViewProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SuccessDialog />
            <Head title="Zonas" />
            <div className="min-h-screen bg-slate-900">
                <div className="animate-fade-in mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl pt-7">
                        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <h1 className="mb-3 text-4xl font-bold text-slate-900">Zonas</h1>
                            </div>

                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                                <Button className="bg-blue-600">
                                    <Pencil className="h-4 w-4" />
                                    Crear una zona
                                </Button>
                                <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                                    {zones.length} Zonas Documentadas
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {zones.map((zone) => (
                                <ZoneAdminCard key={zone.id} zone={zone} experienceLevels={experienceLevels} fishingTypes={fishingTypes} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ZoneList;
