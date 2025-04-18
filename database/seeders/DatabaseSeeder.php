<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory()
            ->count(10)
            ->create();


        $users->each(function ($user) {
            Task::factory()
                ->count(5)
                ->create(['user_id' => $user->id]);
        });

        Task::factory()
            ->count(20)
            ->create();
    }
}
