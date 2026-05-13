<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $projects = Project::all();

        Task::create([
            'description' => 'carrito de compras',
            'completada' => false,
            'projects_id' => $projects[0]->id,
        ]);

        Task::create([
            'description' => 'pagos',
            'completada' => false,
            'projects_id' => $projects[0]->id,
        ]);

        Task::create([
            'description' => 'users',
            'completada' => true,
            'projects_id' => $projects[0]->id,
        ]);

        Task::create([
            'description' => 'categorias',
            'completada' => true,
            'projects_id' => $projects[1]->id,
        ]);

        Task::create([
            'description' => 'stock',
            'completada' => false,
            'projects_id' => $projects[1]->id,
        ]);

        Task::create([
            'description' => 'reportes',
            'completada' => false,
            'projects_id' => $projects[1]->id,
        ]);

        Task::create([
            'description' => 'mobil',
            'completada' => true,
            'projects_id' => $projects[2]->id,
        ]);

        Task::create([
            'description' => 'notificaciones',
            'completada' => false,
            'projects_id' => $projects[2]->id,
        ]);

        Task::create([
            'description' => 'servidor',
            'completada' => false,
            'projects_id' => $projects[2]->id,
        ]);
    }
}
