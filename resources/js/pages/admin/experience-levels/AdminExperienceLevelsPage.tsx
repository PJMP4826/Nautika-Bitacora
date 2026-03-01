import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import type { FieldConfig } from '@/components/features/admin/CatalogFormDialog';
import { CatalogFormDialog } from '@/components/features/admin/CatalogFormDialog';
import { CatalogTable } from '@/components/features/admin/CatalogTable';
import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import * as adminExperienceLevels from '@/routes/admin/experience-levels';
import * as adminZones from '@/routes/admin/zones';
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
                { title: 'Zonas', href: adminZones.index().url },
                { title: 'Niveles de Experiencia', href: adminExperienceLevels.index().url },
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
                submitUrl={adminExperienceLevels.store().url}
                method="post"
            />

            <CatalogFormDialog<ExperienceLevel>
                open={!!editItem}
                onOpenChange={(o) => !o && setEditItem(null)}
                title="Editar Nivel de Experiencia"
                description="Modifica los datos del nivel de experiencia"
                fields={editFields}
                initialData={editItem}
                submitUrl={editItem ? adminExperienceLevels.update(editItem.id).url : ''}
                method="put"
            />

            <DeleteConfirmDialog
                open={!!deleteItem}
                onOpenChange={(o) => !o && setDeleteItem(null)}
                title={`¿Eliminar nivel "${deleteItem?.name}"?`}
                onConfirm={() => {
                    if (deleteItem) {
                        router.delete(adminExperienceLevels.destroy(deleteItem.id).url, {
                            onSuccess: () => setDeleteItem(null),
                        });
                    }
                }}
            />
        </AppLayout>
    );
}
