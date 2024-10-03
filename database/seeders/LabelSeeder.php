<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Label;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Crear categorias de ejemplo
        $labels = [
            ['name' => 'Trabajo'],
            ['name' => 'Personal'],
            ['name' => 'Estudio'],
            ['name' => 'Ocio'],
            ['name' => 'Deportes']
        ];

        //Insertar las categorias en la tabla
        foreach ($labels as $label) {
            Label::create($label);
        }
    }
}
