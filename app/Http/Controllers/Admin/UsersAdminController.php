<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UsersAdminController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        $roles = Role::all(['name']);
        return Inertia::render('admin/users/AdminUsersPage', [
            'users' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name'),
                ];
            }),
            'roles' => $roles,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);
        $user->syncRoles([$request->role]);
        return redirect()->back()->with('success', 'Rol actualizado correctamente.');
    }
}
