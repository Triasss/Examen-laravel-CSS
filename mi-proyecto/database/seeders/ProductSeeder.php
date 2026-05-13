<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        Product::insert([
            ['category_id' => $categories['Electrónica']->id, 'name' => 'Auriculares inalámbricos', 'price' => 59.99, 'stock' => 20, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => $categories['Electrónica']->id, 'name' => 'Cargador rápido USB-C', 'price' => 24.90, 'stock' => 35, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => $categories['Papelería']->id, 'name' => 'Cuaderno A4', 'price' => 3.50, 'stock' => 100, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => $categories['Papelería']->id, 'name' => 'Bolígrafo negro', 'price' => 1.20, 'stock' => 200, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => $categories['Hogar']->id, 'name' => 'Lámpara de mesa', 'price' => 18.75, 'stock' => 15, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => $categories['Hogar']->id, 'name' => 'Juego de platos', 'price' => 45.00, 'stock' => 10, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
