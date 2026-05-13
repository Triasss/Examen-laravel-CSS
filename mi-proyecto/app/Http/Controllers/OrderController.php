<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with('product.category')
            ->where('user_id', auth()->id())
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($data['product_id']);

        if ($product->stock < $data['quantity']) {
            return response()->json(['message' => 'Stock insuficiente'], 422);
        }

        $order = Order::create([
            'product_id' => $product->id,
            'user_id' => auth()->id(),
            'quantity' => $data['quantity'],
            'total' => $product->price * $data['quantity'],
            'status' => 'pending',
        ]);

        $product->decrement('stock', $data['quantity']);

        return $order->load('product.category');
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        return $order->load('product.category');
    }

    public function update(Request $request, Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
            'status' => 'nullable|in:pending,paid,cancelled',
        ]);

        $product = Product::findOrFail($order->product_id);
        $quantityDiff = $data['quantity'] - $order->quantity;

        if ($quantityDiff > 0 && $product->stock < $quantityDiff) {
            return response()->json(['message' => 'Stock insuficiente para actualizar la orden'], 422);
        }

        if ($quantityDiff !== 0) {
            if ($quantityDiff > 0) {
                $product->decrement('stock', $quantityDiff);
            } else {
                $product->increment('stock', abs($quantityDiff));
            }
        }

        $order->quantity = $data['quantity'];
        $order->total = $product->price * $data['quantity'];

        if (isset($data['status'])) {
            $order->status = $data['status'];
        }

        $order->save();

        return $order->load('product.category');
    }

    public function destroy(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $product = Product::findOrFail($order->product_id);
        $product->increment('stock', $order->quantity);
        $order->delete();

        return response()->json(['message' => 'Orden eliminada']);
    }
}
