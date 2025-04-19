<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use HttpResponses;


    public function search(Request $request)
    {
        $query = $request->input('query');
        $tasks = Task::where('user_id', Auth::user()->id)
        ->where('title', 'LIKE', "%{$query}%")
        ->get();

        return TaskResource::collection($tasks);
    }
}

