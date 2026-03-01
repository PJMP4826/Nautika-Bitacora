import { Pencil, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

export type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type Props<T extends { id: string | number }> = {
    title: string;
    data: T[];
    columns: Column<T>[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onAdd: () => void;
};

export function CatalogTable<T extends { id: string | number }>({
    title,
    data,
    columns,
    onEdit,
    onDelete,
    onAdd,
}: Props<T>) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                        <tr>
                            {columns.map((col) => (
                                <th key={String(col.accessor)} className="px-6 py-3 text-left">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((row) => (
                            <tr key={row.id} className="transition-colors hover:bg-slate-50">
                                {columns.map((col) => (
                                    <td key={String(col.accessor)} className="px-6 py-4 text-slate-700">
                                        {col.render ? col.render(row[col.accessor], row) : String(row[col.accessor] ?? '')}
                                    </td>
                                ))}
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" variant="ghost" onClick={() => onEdit(row)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => onDelete(row)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {data.length === 0 && <div className="py-12 text-center text-slate-400">No hay registros aún</div>}
            </div>
        </div>
    );
}
