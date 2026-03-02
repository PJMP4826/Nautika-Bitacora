<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FishRequest;
use App\Models\Fish;
use App\Services\HomeDataService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FishAdminController extends Controller
{
    public function __construct(private readonly HomeDataService $dataService) {}

    public function index(): Response
    {
        $fish = Fish::query()
            ->with(['zone.fishingTypes:id', 'zone.seasons:id', 'zone.experienceLevel:id', 'zone.fish:id,zone_id,name'])
            ->orderBy('name')
            ->get()
            ->map(fn (Fish $fish) => $this->fishToArray($fish))
            ->values()
            ->all();

        return Inertia::render('admin/fish/AdminFishPage', [
            'fish' => $fish,
            'zones' => $this->dataService->getZones(),
        ]);
    }

    public function store(FishRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('fish', 'public');
        } elseif ($request->filled('image_url')) {
            $data['image'] = $request->input('image_url');
        }

        Fish::create($data);

        return redirect()->back()->with('success', 'Fish created successfully.');
    }

    public function update(FishRequest $request, Fish $fish): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($fish->image && ! filter_var($fish->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($fish->image);
            }
            $data['image'] = $request->file('image')->store('fish', 'public');
        } elseif ($request->filled('image_url')) {
            $data['image'] = $request->input('image_url');
        }

        $fish->update($data);

        return redirect()->back()->with('success', 'Fish updated successfully.');
    }

    public function destroy(Fish $fish): RedirectResponse
    {
        if ($fish->image && ! filter_var($fish->image, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($fish->image);
        }

        $fish->delete();

        return redirect()->back()->with('success', 'Fish deleted successfully.');
    }

    private function fishToArray(Fish $fish): array
    {
        $zone = $fish->zone;
        $zoneArray = $zone ? [
            'id' => $zone->id,
            'name' => $zone->name,
            'slug' => $zone->slug,
            'region' => $zone->region,
            'image' => $zone->image,
            'types' => $zone->fishingTypes->pluck('id')->values()->all(),
            'difficulty' => $zone->experienceLevel?->id,
            'best_season' => $zone->seasons->pluck('id')->values()->all(),
            'rating' => $zone->rating !== null ? (float) $zone->rating : null,
            'description' => $zone->description,
            'species' => $zone->fish->pluck('name')->values()->all(),
            'regulations' => $zone->regulations,
        ] : null;

        return [
            'name' => $fish->name,
            'slug' => $fish->slug,
            'image' => $fish->image,
            'scientific_name' => $fish->scientific_name,
            'zone' => $zoneArray,
        ];
    }
}
