import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { FieldConfig } from '@/components/features/admin/CatalogFormDialog';
import { CatalogFormDialog } from '@/components/features/admin/CatalogFormDialog';
import { CatalogTable } from '@/components/features/admin/CatalogTable';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import * as adminFishingTypes from '@/routes/admin/fishing-types';
import * as adminZones from '@/routes/admin/zones';
import type { FishingType } from '@/types';


type Props = {
    fishingTypes: FishingType[];
};

export default function AdminFishingTypesPage({ fishingTypes }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<FishingType | null>(null);
    const [deleteItem, setDeleteItem] = useState<FishingType | null>(null);

    const fields: FieldConfig[] = [
        { name: 'id', label: 'ID Único', type: 'text', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'icon', label: 'Icono', type: 'text' },
        { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    ];

    const editFields: FieldConfig[] = fields.filter((f) => f.name !== 'id');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Zonas', href: adminZones.index().url },
                { title: 'Estilos de Pesca', href: adminFishingTypes.index().url },
            ]}
        >
            <SuccessDialog />
            <Head title="Estilos de Pesca" />

            <div className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <CatalogTable
                        title="Estilos de Pesca"
                        data={fishingTypes}
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

            <CatalogFormDialog<FishingType>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Nuevo Estilo de Pesca"
                description="Agrega un nuevo estilo de pesca al sistema"
                fields={fields}
                submitUrl={adminFishingTypes.store().method}
                method="post"
            />

            <CatalogFormDialog<FishingType>
                open={!!editItem}
                onOpenChange={(o) => !o && setEditItem(null)}
                title="Editar Estilo de Pesca"
                description="Modifica los datos del estilo de pesca"
                fields={editFields}
                initialData={editItem}
                submitUrl={editItem ? adminFishingTypes.update(editItem.id).url : ''}
                method="put"
            />

            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                title={`¿Eliminar estilo "${deleteItem?.name}"?`}
                onConfirm={() => {
                    if (deleteItem) {
                        router.delete(adminFishingTypes.destroy(deleteItem.id).url, {
                            onSuccess: () => setDeleteItem(null),
                        });
                    }
                }}
            />
        </AppLayout>
    );
}
