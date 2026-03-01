import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { FieldConfig } from '@/components/features/admin/CatalogFormDialog';
import { CatalogFormDialog } from '@/components/features/admin/CatalogFormDialog';
import { CatalogTable } from '@/components/features/admin/CatalogTable';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import * as adminSeasons from '@/routes/admin/seasons';
import * as adminZones from '@/routes/admin/zones';
import type { Season } from '@/types';

type Props = {
    seasons: Season[];
};

export default function AdminSeasonsPage({ seasons }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<Season | null>(null);
    const [deleteItem, setDeleteItem] = useState<Season | null>(null);

    const fields: FieldConfig[] = [
        { name: 'id', label: 'ID Único (Ej: summer)', type: 'text', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'icon', label: 'Icono', type: 'text' },
    ];

    const editFields: FieldConfig[] = fields.filter((f) => f.name !== 'id');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Zonas', href: adminZones.index().url },
                { title: 'Temporadas', href: adminSeasons.index().url },
            ]}
        >
            <SuccessDialog />
            <Head title="Temporadas" />

            <div className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <CatalogTable
                        title="Temporadas"
                        data={seasons}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Nombre', accessor: 'name' },
                            { header: 'Icono', accessor: 'icon' },
                        ]}
                        onAdd={() => setCreateOpen(true)}
                        onEdit={(item) => setEditItem(item)}
                        onDelete={(item) => setDeleteItem(item)}
                    />
                </div>
            </div>

            <CatalogFormDialog<Season>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Nueva Temporada"
                description="Agrega una nueva temporada al sistema"
                fields={fields}
                submitUrl={adminSeasons.store().url}
                method="post"
            />

            <CatalogFormDialog<Season>
                open={!!editItem}
                onOpenChange={(o) => !o && setEditItem(null)}
                title="Editar Temporada"
                description="Modifica los datos de la temporada"
                fields={editFields}
                initialData={editItem}
                submitUrl={editItem ? adminSeasons.update(editItem.id).url : ''}
                method="put"
            />

            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                title={`¿Eliminar temporada "${deleteItem?.name}"?`}
                onConfirm={() => {
                    if (deleteItem) {
                        router.delete(adminSeasons.destroy(deleteItem.id).url, {
                            onSuccess: () => setDeleteItem(null),
                        });
                    }
                }}
            />
        </AppLayout>
    );
}
