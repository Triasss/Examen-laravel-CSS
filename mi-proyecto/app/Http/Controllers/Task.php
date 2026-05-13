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

    public function show(TaskModel $task)
    {
        return response()->json($task);
    }

}
