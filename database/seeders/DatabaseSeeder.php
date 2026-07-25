<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Roles y permisos deben existir antes de poder asignarlos a nadie.
        $this->call(
            RolesAndPermissionsSeeder::class
        );
        $this->call(
            BaseDataSeeder::class
        );
        $this->call(
            ZoneSeeder::class
        );

        // Defensivo: si el usuario con ese email ya se registró, le da admin.
        // Si no, solo imprime un warning y sigue (no rompe el seed completo).
        $this->call(
            AssignAdminRoleSeeder::class
        );
    }
}