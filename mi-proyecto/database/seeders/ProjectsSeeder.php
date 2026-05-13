<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::first();

        Project::create([
            'nombre' => 'Tienda',
            'descripcion' => 'compras y pagos',
            'users_id' => $user->id,
            'fecha_inicio' => now(),
            'fecha_fin' => now()->addMonths(3),
        ]);

        Project::create([
            'nombre' => 'Invetarismo',
            'descripcion' => 'inventario de productos',
            'users_id' => $user->id,
            'fecha_inicio' => now(),
            'fecha_fin' => now()->addMonths(2),
        ]);

        Project::create([
            'nombre' => 'Tareas',
            'descripcion' => 'gestionar',
            'users_id' => $user->id,
            'fecha_inicio' => now(),
            'fecha_fin' => now()->addMonths(4),
        ]);
    }
}
