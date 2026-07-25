<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AssignAdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cambia este correo por el del usuario que quieres hacer admin
        $adminEmail = 'faustojaviermendozaperez.tareas@gmail.com';
        $user = User::where('email', $adminEmail)->first();
        if ($user) {
            $user->assignRole('admin');
            $this->command->info("Rol 'admin' asignado a {$user->email}");
        } else {
            $this->command->warn("Usuario con email {$adminEmail} no encontrado.");
        }
    }
}
