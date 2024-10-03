<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('label_note', function (Blueprint $table) {
            $table->id();
            $table->foreignId('label_id')
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('note_id')
            ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            // $table->unsignedInteger('label_id')->onDelete('cascade');
            // $table->unsignedInteger('note_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('label_note');
    }
};
