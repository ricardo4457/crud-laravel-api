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
        try {
            $credentials = $request->only('username', 'password');

            if (Auth::attempt($credentials)) {

                $request->session()->regenerate();

                return response()->json([
                    'message' => 'Login successful',
                    'user' => Auth::user(),
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
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

            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
