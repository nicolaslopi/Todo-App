<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NoteController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

//Rutas abiertas
Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);

//Rutas protegidas
Route::middleware('auth:api')->group( function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('logout', [AuthController::class, 'logout']);
    // Route::get('notes', [NoteController::class, 'index']);
    // Route::get('notes/create', [NoteController::class, 'create']);
    // Route::post('notes', [NoteController::class, 'store']);
    // Route::post('notes', [NoteController::class, 'store']);
    Route::resource('notes', NoteController::class);
});

// Route::group([
//     "middleware" => ["auth:api"]
// ], function () {
//     Route::get('profile', [AuthController::class, 'profile']);
//     Route::get('logout', [AuthController::class, 'logout']);
//     Route::get('notes', [NoteController::class, 'index']);
// });

