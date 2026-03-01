<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Season;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeasonsAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/seasons/AdminSeasonsPage', [
            'seasons' => Season::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:seasons,id|max:255',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        Season::create($validated);

        return redirect()->back()->with('success', 'Temporada creada correctamente.');
    }

    public function update(Request $request, Season $season)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $season->update($validated);

        return redirect()->back()->with('success', 'Temporada actualizada correctamente.');
    }

    public function destroy(Season $season)
    {
        $season->delete();

        return redirect()->back()->with('success', 'Temporada eliminada correctamente.');
    }
}
