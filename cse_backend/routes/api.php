<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\GalleryFolderController;
use App\Http\Controllers\getDoctorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfficeHourController;
use App\Http\Controllers\PasswordController;
use App\Models\Appointment;
use App\Models\OfficeHour;
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

Route::get('/all_doctors',[getDoctorController::class,'getAllDoctors']);//student
Route::get('/doctor/{id}',[getDoctorController::class,'showDoctor']);//student
Route::get('/search/{name}',[getDoctorController::class,'search']);//student
Route::post('/delete_account/{id}',[AccountController::class,'deleteAccount']);//admin

Route::post('/office_hour',[OfficeHourController::class,'createOfficeHour']);//doctor
Route::post('/book_app',[AppointmentController::class,'bookAppointment']);//student
Route::post('/reject_appointment',[AppointmentController::class,'rejectAppointment']);//doctor
Route::post('/cancel_book_app/{id}',[AppointmentController::class,'cancelBookApp']);//student
Route::get('/my_appointments',[AppointmentController::class,'myAppointments']);//doctor
Route::get('/my_booked_app',[AppointmentController::class,'myBookedAppointments']);
Route::get('/doctor_appointments/{id}',[AppointmentController::class,'doctorAppointments']);//student
Route::post('/delete_app',[AppointmentController::class,'deleteApp']);//doctor
Route::post('/blocked_app',[AppointmentController::class,'blockedApp']);//doctor
Route::post('/unblocked_app',[AppointmentController::class,'unblockedApp']);//doctor


Route::get('/get_notifi_ann',[NotificationController::class,'getNotifiAnn']);
Route::get('/get_notifi_app', [NotificationController::class, 'getNotifiApp']);

Route::post('/createAnnouncement',[AnnouncementController::class,'createAnnouncement']);//doctor
Route::get('/all_announcement',[AnnouncementController::class,'allAnnouncement']);//all

Route::post('/create_folder',[GalleryFolderController::class,'createFolder']);
Route::post('/add_images/{id}',[GalleryFolderController::class,'createAlbum']);