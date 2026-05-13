<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Category::insert([
            ['name' => 'Electrónica', 'description' => 'Dispositivos y accesorios electrónicos.', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Papelería', 'description' => 'Material de oficina y artículos de papelería.', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Hogar', 'description' => 'Productos para el hogar y decoración.', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
