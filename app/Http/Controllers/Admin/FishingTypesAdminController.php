<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FishingType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FishingTypesAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/fishing-types/AdminFishingTypesPage', [
            'fishingTypes' => FishingType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:fishing_types,id|max:255',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        FishingType::create($validated);

        return redirect()->back()->with('success', 'Estilo de pesca creado correctamente.');
    }

    public function update(Request $request, FishingType $fishingType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        $fishingType->update($validated);

        return redirect()->back()->with('success', 'Estilo de pesca actualizado correctamente.');
    }

    public function destroy(FishingType $fishingType)
    {
        $fishingType->delete();

        return redirect()->back()->with('success', 'Estilo de pesca eliminado correctamente.');
    }
}
