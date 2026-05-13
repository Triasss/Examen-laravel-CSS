<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task as TaskModel;

class Task extends Controller
{
    public function index()
    {
        $tasks = TaskModel::all();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'nullable|string',
            'completada'  => 'boolean',
            'projects_id' => 'required|integer|exists:projects,id',
        ]);
        $task = TaskModel::create($request->all());
        return response()->json($task);
    }

    public function show(TaskModel $task)
    {
        return response()->json($task);
    }

    public function update(Request $request, TaskModel $task)
    {
        $request->validate([
            'description' => 'nullable|string',
            'completada'  => 'sometimes|boolean',
            'projects_id' => 'sometimes|required|integer|exists:projects,id',
        ]);
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy(TaskModel $task)
    {
        $task->delete();
        return response()->json(['message' => 'Tarea eliminada']);
    }
}
