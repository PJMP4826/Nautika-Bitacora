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
        Schema::table('zones', function (Blueprint $table) {
            $table->dropColumn('water_type');
            $table->string('water_type_id')->nullable();
            $table->foreign('water_type_id')->references('id')->on('water_types')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('zones', function (Blueprint $table) {
            $table->dropForeign(['water_type_id']);
            $table->dropColumn('water_type_id');
            $table->string('water_type')->nullable();
        });
    }
};
