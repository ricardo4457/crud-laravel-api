<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class TaskCrudController extends Controller
{
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
