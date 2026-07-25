import { DeleteConfirmDialog } from '@/components/features/admin/DeleteConfirmDialog';
import { SuccessDialog } from '@/components/features/admin/SuccessDialog';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

interface Role {
    name: string;
}

interface Props {
    users: User[];
    roles: Role[];
    flash: {
        success?: string;
        error?: string;
    };
}

export default function AdminUsersPage() {
    const { users, roles, flash } = usePage<Props>().props;
    const [selectedRoles, setSelectedRoles] = useState<Record<number, string>>({});

    useEffect(() => {
        const initial: Record<number, string> = {};
        users.forEach((user) => {
            initial[user.id] = user.roles[0] || '';
        });
        setSelectedRoles(initial);
    }, [users]);

    const handleRoleChange = (userId: number, role: string) => {
        setSelectedRoles((prev) => ({ ...prev, [userId]: role }));
    };

    const handleSave = (userId: number) => {
        router.post(`/admin/users/${userId}/role`, {
            role: selectedRoles[userId],
        });
    };

    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const handleDelete = (user: User) => {
        setDeleteUser(user);
    };

    const confirmDelete = () => {
        if (deleteUser) {
            router.delete(`/admin/users/${deleteUser.id}`, {
                onSuccess: () => setDeleteUser(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Usuarios', href: '/admin/users' }]}>
            <SuccessDialog />
            <Head title="Usuarios" />

            <div className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-900">Usuarios</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Nombre</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">Rol</th>
                                        <th className="px-6 py-3 text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="transition-colors hover:bg-slate-50">
                                            <td className="px-6 py-4 text-slate-700">{user.name}</td>
                                            <td className="px-6 py-4 text-slate-700">{user.email}</td>
                                            <td className="px-6 py-4 text-slate-700">
                                                <select
                                                    className="rounded border border-slate-300 px-2 py-1"
                                                    value={selectedRoles[user.id] ?? ''}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    <option value="">Selecciona un rol</option>
                                                    {roles.map((role) => (
                                                        <option key={role.name} value={role.name}>
                                                            {role.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="flex justify-end gap-2 px-6 py-4 text-right">
                                                <button
                                                    className="rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
                                                    onClick={() => handleSave(user.id)}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    className="flex items-center rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                                                    title="Eliminar usuario"
                                                    onClick={() => handleDelete(user)}
                                                >
                                                    <Trash2 className="mr-1 inline-block" />
                                                </button>
                                            </td>
                                            <DeleteConfirmDialog
                                                open={!!deleteUser}
                                                onOpenChange={(o) => !o && setDeleteUser(null)}
                                                title={deleteUser ? `¿Eliminar usuario "${deleteUser.name}"?` : ''}
                                                description="Esta acción eliminará el usuario de forma permanente."
                                                onConfirm={confirmDelete}
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
