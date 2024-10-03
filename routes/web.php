<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('{any}', function () {
    return view('welcome'); // O la vista principal donde carga Vue.js
})->where('any', '.*');
