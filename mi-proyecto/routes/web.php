<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login.page');
});

Route::get('/login-page', function () {
    return view('login');
})->name('login.page');

Route::get('/register-page', function () {
    return view('register');
})->name('register.page');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard.page');

    Route::get('/categories-page', function () {
        return view('categories');
    })->name('categories.page');

    Route::get('/products-page', function () {
        return view('products');
    })->name('products.page');

    Route::get('/orders-page', function () {
        return view('orders');
    })->name('orders.page');
});
