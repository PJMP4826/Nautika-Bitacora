<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateZoneRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:zones,slug,'.$this->route('zone')->id,
            'description' => 'required|string',
            'region' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:10240',
            'experience_level_id' => 'nullable|string|exists:experience_levels,id',
            'rating' => 'nullable|numeric|min:0|max:5',
            'regulations' => 'nullable|string',
            'fishing_type_ids' => 'nullable|array',
            'fishing_type_ids.*' => 'string|exists:fishing_types,id',
            'season_ids' => 'nullable|array',
            'season_ids.*' => 'string|exists:seasons,id',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
