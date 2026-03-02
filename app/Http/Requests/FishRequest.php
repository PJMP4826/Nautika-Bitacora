<?php

namespace App\Http\Requests;

use App\Models\Fish;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FishRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var Fish|null $fish */
        $fish = $this->route('fish');
        $fishId = $this->route('fish')?->id;
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('fish')->ignore($fishId),
            ],
            'scientific_name' => ['nullable', 'string', 'max:255'],
            'zone_id' => ['required', 'integer', 'exists:zones,id'],
            'image' => ['nullable', 'image', 'max:10240'], // max 10MB
            'image_url' => [$isUpdate ? 'nullable' : 'required_without:image', 'url'],
        ];

    }
}
