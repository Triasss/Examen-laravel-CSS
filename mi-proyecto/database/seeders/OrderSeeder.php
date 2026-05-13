<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::first();
        $product = Product::first();

        if (! $user || ! $product) {
            return;
        }

        Order::create([
            'product_id' => $product->id,
            'user_id' => $user->id,
            'quantity' => 2,
            'total' => $product->price * 2,
            'status' => 'pending',
        ]);

        $product->decrement('stock', 2);
    }
}
