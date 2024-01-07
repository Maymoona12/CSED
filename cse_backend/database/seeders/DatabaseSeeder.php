<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'reg_no' => '201811430',
            'name' => 'Thaer sammar',
            'email' => 'thaer@ptuk.com',
            'password'=> '123456789',
            'office_no' => '1',
            'phone_no' => '0598399738',
            'role' => 'admin'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201811431',
            'name' => 'Mohammed khalil',
            'email' => 'mohammed@ptuk.com',
            'password'=> '123456789',
            'office_no' => '2',
            'phone_no' => '0598399739',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201811432',
            'name' => 'Malak tabeasheh',
            'email' => 'malak@ptuk.com',
            'password'=> '123456789',
            'phone_no' => '0598399731',
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201811433',
            'name' => 'Fatima tabeasheh',
            'email' => 'fatima@ptuk.com',
            'password'=> '123456789',
            'phone_no' => '0598399732',
        ]);
    }
}