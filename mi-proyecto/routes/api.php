<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Project as ProjectController;
use App\Http\Controllers\Task as TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth')->group(function () {

        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Projects
        Route::get('/projects',           [ProjectController::class, 'index']);
        Route::post('/projects',          [ProjectController::class, 'store']);
        Route::get('/projects/{project}', [ProjectController::class, 'show']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);

        // Tasks
        Route::get('/tasks',          [TaskController::class, 'index']);
        Route::post('/tasks',         [TaskController::class, 'store']);
        Route::get('/tasks/{task}',   [TaskController::class, 'show']);
        Route::put('/tasks/{task}',   [TaskController::class, 'update']);
        Route::delete('/tasks/{task}',[TaskController::class, 'destroy']);

    });

});
