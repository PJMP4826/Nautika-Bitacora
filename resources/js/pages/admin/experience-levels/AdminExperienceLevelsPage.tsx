import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { CatalogFormDialog, FieldConfig } from '@/components/features/admin/CatalogFormDialog';
import { CatalogTable } from '@/components/features/admin/CatalogTable';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import type { ExperienceLevel } from '@/types';

type Props = {
    experienceLevels: ExperienceLevel[];
};

export default function AdminExperienceLevelsPage({ experienceLevels }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<ExperienceLevel | null>(null);
    const [deleteItem, setDeleteItem] = useState<ExperienceLevel | null>(null);

    const fields: FieldConfig[] = [
        { name: 'id', label: 'ID Único', type: 'text', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    ];

    const editFields: FieldConfig[] = fields.filter((f) => f.name !== 'id');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Zonas', href: route('admin.zones.index') },
                { title: 'Niveles de Experiencia', href: route('admin.experience-levels.index') },
            ]}
        >
            <SuccessDialog />
            <Head title="Niveles de Experiencia" />

            <div className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <CatalogTable
                        title="Niveles de Experiencia"
                        data={experienceLevels}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Nombre', accessor: 'name' },
                            { header: 'Descripción', accessor: 'description' },
                        ]}
                        onAdd={() => setCreateOpen(true)}
                        onEdit={(item) => setEditItem(item)}
                        onDelete={(item) => setDeleteItem(item)}
                    />
                </div>
            </div>

            <CatalogFormDialog<ExperienceLevel>
                open={createOpen}
                onOpenChange={setCreateOpen}
                title="Nuevo Nivel de Experiencia"
                description="Agrega un nuevo nivel de experiencia al sistema"
                fields={fields}
                submitUrl={route('admin.experience-levels.store')}
                method="post"
            />

            <CatalogFormDialog<ExperienceLevel>
                open={!!editItem}
                onOpenChange={(o) => !o && setEditItem(null)}
                title="Editar Nivel de Experiencia"
                description="Modifica los datos del nivel de experiencia"
                fields={editFields}
                initialData={editItem}
                submitUrl={editItem ? route('admin.experience-levels.update', { experienceLevel: editItem.id }) : ''}
                method="put"
            />

            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                title={`¿Eliminar nivel "${deleteItem?.name}"?`}
                onConfirm={() => {
                    if (deleteItem) {
                        router.delete(route('admin.experience-levels.destroy', { experienceLevel: deleteItem.id }), {
                            onSuccess: () => setDeleteItem(null),
                        });
                    }
                }}
            />
        </AppLayout>
    );
}
