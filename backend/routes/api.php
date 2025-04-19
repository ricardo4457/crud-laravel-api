<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Task\TaskCrudController;
use App\Http\Controllers\Api\Task\TaskController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected API routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('tasks', TaskCrudController::class);
    Route::post('/tasks/search', [TaskController::class, 'search']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
