<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\OfficeHour;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Type\Integer;

class OfficeHourController extends Controller
{
    public function createOfficeHour(Request $request){

        
        
        $officeHour = new OfficeHour;
        $officeHour->doctor_id=Auth::id(); 
        $officeHour->start_time=Carbon::createFromFormat('g:i A', $request->start_time)->format('H:i');
        $officeHour->finish_time=Carbon::createFromFormat('g:i A', $request->finish_time)->format('H:i');
        $officeHour->day=$request->day;
        $officeHour->app_name=$request->app_name;
        $officeHour->time_devision=$request->time_devision;
        $officeHour->created_at = Carbon::now();
        $officeHour->updated_at = Carbon::now();
        $officeHour->save();
        
        for ($current_time = Carbon::parse($officeHour->start_time);
         $current_time < Carbon::parse($officeHour->finish_time); ) {
            
            $appointment=new Appointment;
            $appointment->doctor_id=Auth::id();
            $appointment->status =0;
            $appointment->start_time = $current_time->toTimeString();
            $current_time = $current_time->addMinutes($officeHour->time_devision);
            $end_time = $current_time->toTimeString();
            
            $appointment->end_time = $end_time;
            $appointment->day = $officeHour->day;
            $appointment->app_name = $officeHour->app_name;
            $appointment->save();
        }
        return response()->json(['Appointments created successfully',201]);

    }
}