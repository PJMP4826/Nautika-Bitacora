import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { CatalogFormDialog, FieldConfig } from '@/components/features/admin/CatalogFormDialog';
import { CatalogTable } from '@/components/features/admin/CatalogTable';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import type { WaterType } from '@/types';

type Props = {
    waterTypes: WaterType[];
};

export default function AdminWaterTypesPage({ waterTypes }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<WaterType | null>(null);
    const [deleteItem, setDeleteItem] = useState<WaterType | null>(null);

    const fields: FieldConfig[] = [
        { name: 'id', label: 'ID (Ej: mar, rio)', type: 'text', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'icon', label: 'Icono', type: 'text' },
    ];

    const editFields: FieldConfig[] = fields.filter((f) => f.name !== 'id');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Zonas', href: route('admin.zones.index') },
                { title: 'Tipos de Agua', href: route('admin.water-types.index') },
            ]}
        >
            <SuccessDialog />
            <Head title="Tipos de Agua" />

            <div className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <CatalogTable
                        title="Tipos de Agua"
                        data={waterTypes}
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

            <CatalogFormDialog<WaterType>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Nuevo Tipo de Agua"
                description="Agrega un nuevo tipo de agua al sistema"
                fields={fields}
                submitUrl={route('admin.water-types.store')}
                method="post"
            />

            <CatalogFormDialog<WaterType>
                open={!!editItem}
                onOpenChange={(o) => !o && setEditItem(null)}
                title="Editar Tipo de Agua"
                description="Modifica los datos del tipo de agua"
                fields={editFields}
                initialData={editItem}
                submitUrl={editItem ? route('admin.water-types.update', { water_type: editItem.id }) : ''}
                method="put"
            />

            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                title={`¿Eliminar tipo de agua "${deleteItem?.name}"?`}
                onConfirm={() => {
                    if (deleteItem) {
                        router.delete(route('admin.water-types.destroy', { water_type: deleteItem.id }), {
                            onSuccess: () => setDeleteItem(null),
                        });
                    }
                }}
            />
        </AppLayout>
    );
}
