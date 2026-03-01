<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WaterType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WaterTypesAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/water-types/AdminWaterTypesPage', [
            'waterTypes' => WaterType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:water_types,id|max:255',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        WaterType::create($validated);

        return redirect()->back()->with('success', 'Tipo de agua creado correctamente.');
    }

    public function update(Request $request, WaterType $waterType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $waterType->update($validated);

        return redirect()->back()->with('success', 'Tipo de agua actualizado correctamente.');
    }

    public function destroy(WaterType $waterType)
    {
        $waterType->delete();

        return redirect()->back()->with('success', 'Tipo de agua eliminado correctamente.');
    }
}
