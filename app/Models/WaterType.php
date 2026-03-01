<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WaterType extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'icon',
    ];

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class, 'water_type_id');
    }
}
