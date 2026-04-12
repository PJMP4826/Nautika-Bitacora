<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        // Permissions (solo fish y zone)
        $permissions = [
            'fish.view', 'fish.create', 'fish.edit', 'fish.delete',
            'zone.view', 'zone.create', 'zone.edit', 'zone.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Roles
        Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());

        Role::create(['name' => 'moderator'])->givePermissionTo([
            'fish.view', 'fish.create', 'fish.edit',
            'zone.view',
        ]);

        Role::create(['name' => 'fisher'])->givePermissionTo([
            'fish.view',
        ]);
    }
}
