<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExperienceLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceLevelsAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experience-levels/AdminExperienceLevelsPage', [
            'experienceLevels' => ExperienceLevel::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:experience_levels,id|max:255',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        ExperienceLevel::create($validated);

        return redirect()->back()->with('success', 'Nivel de experiencia creado correctamente.');
    }

    public function update(Request $request, ExperienceLevel $experienceLevel)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $experienceLevel->update($validated);

        return redirect()->back()->with('success', 'Nivel de experiencia actualizado correctamente.');
    }

    public function destroy(ExperienceLevel $experienceLevel)
    {
        $experienceLevel->delete();

        return redirect()->back()->with('success', 'Nivel de experiencia eliminado correctamente.');
    }
}
