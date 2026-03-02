<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FishRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:fish,slug,'.$this->fish?->id],
            'scientific_name' => ['nullable', 'string', 'max:255'],
            'zone_id' => ['required', 'exists:zones,id'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'image_url' => ['nullable', 'url', 'max:500'],
        ];
    }
}
