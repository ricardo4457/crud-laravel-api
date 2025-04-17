<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponses;

use App\Models\User;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\UserRequest;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;



class AuthController extends Controller
{
    use HttpResponses;

    public function login(AuthRequest $request)
    {

        $request->validated($request->all());

        if (!Auth::attempt($request->only('username', 'password'))) {
            return $this->error('Invalid credentials', 401);
        }

        $user = User::where('username', $request->username)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('Api Token of ' . $user->username)->plainTextToken,
        ]);
    }
    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    public function register(UserRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            $user = User::create([
                'username' => $validatedData['username'],
                'password' => Hash::make($validatedData['password']),
            ]);

            return $this->success([
                'user' => $user,
                'token' => $user->createToken('Api Token of ' . $user->username)->plainTextToken,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
