<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TaskCrudController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(
            Task::where('user_id', Auth::user()->id)->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $request->validated($request->all());

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => Auth::user()->id,
        ]);

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if (Auth::user()->id !== $task->user_id) {
            return $this->error('', 'You are not authorized to view this task', 403);
        }
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {

        if (Auth::user()->id !== $task->user_id) {
            return $this->error('', 'You are not authorized to edit this task', 403);
        }
        $task->update($request->all());

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (Auth::user()->id !== $task->user_id) {
            return $this->error('', 'You are not authorized to edit this task', 403);
        }
        $task->delete();
        return response('Task deleted SuccesFully', 204);
    }


}
