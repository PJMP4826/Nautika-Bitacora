<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fishing_type_zone', function (Blueprint $table) {
            $table->string('fishing_type_id', 30);
            $table->foreignId('zone_id')->constrained()->cascadeOnDelete();
            $table->primary(['fishing_type_id', 'zone_id']);

            $table->foreign('fishing_type_id')
                ->references('id')
                ->on('fishing_types')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fishing_type_zone');
    }
};
