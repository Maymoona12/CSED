<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\getDoctorController;
use App\Http\Controllers\PasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/edit_profile',[AccountController::class,'EditAccount']);
Route::post('/change_password',[PasswordController::class,'changePassword']);

Route::get('/all_doctors',[getDoctorController::class,'getAllDoctors']);
Route::get('/doctor/{id}',[getDoctorController::class,'showDoctor']);
Route::get('/search/{name}',[getDoctorController::class,'search']);

Route::post('/add_appointment',[AppointmentController::class,'add_appointment']);
Route::post('/edit_appointment/{id}',[AppointmentController::class,'edit_appointment']);
Route::post('/book_app',[AppointmentController::class,'bookAppointment']);
Route::post('/AcceptOrRegict/{id}/{status}',[AppointmentController::class,'AcceptOrRejectAppointment']);
Route::get('/officehour/{id}',[AppointmentController::class,'getOfficeHour']);

Route::post('/createAnnouncement',[AnnouncementController::class,'createAnnouncement']);
Route::get('/all_announcement',[AnnouncementController::class,'allAnnouncement']);