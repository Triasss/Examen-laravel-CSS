<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return view('dashboard');
    } else {
        return redirect()->route('login.page');
    }
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

    // Projects
    Route::get('/project/index', function () {
        return view('project.index');
    })->name('project.index');

    Route::get('/project/create', function () {
        return view('project.create');
    })->name('project.create');

    Route::get('/project/show/{id}', function ($id) {
        return view('project.show', ['id' => $id]);
    })->name('project.show');

    Route::get('/project/edit/{id}', function ($id) {
        return view('project.edit', ['id' => $id]);
    })->name('project.edit');

    // Tasks
    Route::get('/task/index', function () {
        return view('task.index');
    })->name('task.index');

    Route::get('/task/create', function () {
        return view('task.create');
    })->name('task.create');

    Route::get('/task/show/{id}', function ($id) {
        return view('task.show', ['id' => $id]);
    })->name('task.show');

    Route::get('/task/edit/{id}', function ($id) {
        return view('task.edit', ['id' => $id]);
    })->name('task.edit');

});
