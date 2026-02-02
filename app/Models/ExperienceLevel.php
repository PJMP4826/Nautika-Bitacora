<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExperienceLevel extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'description',
    ];

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class, 'experience_level_id');
    }
}
