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
            'reg_no' => '201811',
            'name' => 'Dr.Thaer Sammar',
            'email' => 'thaer.sammar@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            'office_no' => 'H313',
            'photo'=>'thaer.png',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'admin'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201812',
            'name' => 'Dr.Mohammed Khalil',
            'email' => 'm.khalil@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            'office_no' => 'H316',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201813',
            'name' => 'Dr.Nael Salman',
            'email' => 'n.salman@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            'office_no' => 'H314',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201814',
            'name' => 'Dr.Anas Melhem',
            'email' => 'a.melhem@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            'office_no' => 'H307',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201815',
            'name' => 'Dr.Yousef Daraghmi',
            'email' => 'y.awwad@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Associate Professor',
            'office_no' => 'H312',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201816',
            'name' => 'Dr.Yazeed Sleet',
            'email' => 'y.sleet@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Lecturer',
            'office_no' => 'H311',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201817',
            'name' => 'Dr.Rami Yousef',
            'email' => 'r.yousuf@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201818',
            'name' => 'Dr.Osama Hamed',
            'email' => 'osama.hamed@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201819',
            'name' => 'Dr.Osama Safarini',
            'email' => 'osama.safarini@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201820',
            'name' => 'Dr.Nagham Hamad',
            'email' => 'nagham.hamad@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Engineering Lecturer',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201821',
            'name' => '.Dr.Shatha AbuShanab',
            'email' => 'shatha.abushanab@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Assistant Professor',
            'office_no' => 'H310',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201822',
            'name' => 'Dr.May Zakarneh',
            'email' => 'm.zakarneh@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Lecturer',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201823',
            'name' => 'Dr.Dema Sawalha',
            'email' => 'dema.sawalha@ptuk.edu.ps',
            'password'=> '123456789',
            'education_level' => 'Lecturer',
            // 'phone_no' => '+970 9 2688199',
            'role' => 'doctor'
        ]);

        \App\Models\User::factory()->create([
            'reg_no' => '201811432',
            'name' => 'Malak tabeasheh',
            'email' => 'malak@ptuk.edu.com',
            'password'=> '123456789',
            'phone_no' => '0598399731',
        ]);
        
        \App\Models\User::factory()->create([
            'reg_no' => '201811433',
            'name' => 'Fatima omar',
            'email' => 'fatima@ptuk.edu.com',
            'password'=> '123456789',
            'phone_no' => '0598399732',
        ]);
    }
}