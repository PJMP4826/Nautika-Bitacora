<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('region')->nullable();
            $table->string('image')->nullable();
            $table->enum('water_type', ['mar', 'rio', 'lago']);
            $table->boolean('active')->default(true);
            $table->string('experience_level_id', 20)->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->text('regulations')->nullable();
            $table->timestamps();
        });

        Schema::table('zones', function (Blueprint $table) {
            $table->foreign('experience_level_id')
                ->references('id')
                ->on('experience_levels')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('zones', function (Blueprint $table) {
            $table->dropForeign(['experience_level_id']);
        });
        Schema::dropIfExists('zones');
    }
};
