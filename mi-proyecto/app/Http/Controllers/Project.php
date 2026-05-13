<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project as ProjectModel;

class Project extends Controller
{
    public function index()
    {
        $projects = ProjectModel::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'users_id'    => 'required|integer|exists:users,id',
            'fecha_inicio'=> 'required|date',
            'fecha_fin'   => 'required|date',
        ]);
        $project = ProjectModel::create($request->all());
        return response()->json($project);
    }

    public function show(ProjectModel $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, ProjectModel $project)
    {
        $request->validate([
            'nombre'      => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'users_id'    => 'sometimes|required|integer|exists:users,id',
            'fecha_inicio'=> 'sometimes|required|date',
            'fecha_fin'   => 'sometimes|required|date',
        ]);
        $project->update($request->all());
        return response()->json($project);
    }
}