<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FishingType extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'icon',
        'description',
    ];

    public function zones(): BelongsToMany
    {
        return $this->belongsToMany(Zone::class, 'fishing_type_zone');
    }
}
