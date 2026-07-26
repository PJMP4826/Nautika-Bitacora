<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\StoreZoneRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StoreZoneRequestTest extends TestCase
{
    private array $rules;

    protected function setUp(): void
    {
        parent::setUp();
        $this->rules = (new StoreZoneRequest())->rules();
    }

    /** @test */
    public function it_fails_if_name_is_missing()
    {
        $data = $this->getValidData(['name' => '']);
        
        $validator = Validator::make($data, $this->rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    /** @test */
    public function it_fails_if_slug_is_missing()
    {
        $data = $this->getValidData(['slug' => '']);
        
        $validator = Validator::make($data, $this->rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('slug', $validator->errors()->toArray());
    }

    /** @test */
    public function it_fails_if_rating_is_invalid()
    {
        $data = $this->getValidData(['rating' => 6]); // Max 5
        
        $validator = Validator::make($data, $this->rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('rating', $validator->errors()->toArray());
    }

    /** @test */
    public function it_fails_if_fishing_type_ids_is_not_an_array()
    {
        $data = $this->getValidData(['fishing_type_ids' => 'not-an-array']);
        
        $validator = Validator::make($data, $this->rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('fishing_type_ids', $validator->errors()->toArray());
    }

    /**
     * Helper para obtener datos válidos mínimos (ignorando exists/unique para este test unitario)
     */
    private function getValidData(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Cabo Esperanza',
            'slug' => 'cabo-esperanza',
            'description' => 'Una descripción válida',
            'water_type_id' => 'sea',
        ], $overrides);
    }
}
