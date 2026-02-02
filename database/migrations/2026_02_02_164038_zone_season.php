<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zone_season', function (Blueprint $table) {
            $table->foreignId('zone_id')->constrained()->cascadeOnDelete();
            $table->string('season_id', 20);
            $table->primary(['zone_id', 'season_id']);

            $table->foreign('season_id')
                ->references('id')
                ->on('seasons')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zone_season');
    }
};
