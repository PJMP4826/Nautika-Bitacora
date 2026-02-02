<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'region',
        'image',
        'water_type',
        'active',
        'experience_level_id',
        'rating',
        'regulations',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'rating' => 'decimal:1',
        ];
    }

    public function experienceLevel(): BelongsTo
    {
        return $this->belongsTo(ExperienceLevel::class, 'experience_level_id');
    }

    public function seasons(): BelongsToMany
    {
        return $this->belongsToMany(Season::class, 'zone_season');
    }

    public function fishingTypes(): BelongsToMany
    {
        return $this->belongsToMany(FishingType::class, 'fishing_type_zone');
    }

    public function fish(): HasMany
    {
        return $this->hasMany(Fish::class);
    }
}
