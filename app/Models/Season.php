<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Season extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'icon',
    ];

    public function zones(): BelongsToMany
    {
        return $this->belongsToMany(Zone::class, 'zone_season')
            ->withTimestamps(false);
    }
}
