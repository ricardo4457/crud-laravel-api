<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->unique()->userName,
            'password' => static::$password ??= Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Configure the model factory to use a specific password.
     */
    public function withPassword(string $password): static
    {
        return $this->state(fn(array $attributes) => [
            'password' => Hash::make($password),
        ]);
    }
}
