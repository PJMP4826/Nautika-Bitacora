<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fish extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'image',
        'scientific_name',
        'zone_id',
    ];

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}
