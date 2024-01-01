<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BookAppointment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function add_appointment(Request $request){

        $appointment=new Appointment;
        
        $appointment->doctor_id=Auth::id();
        $appointment->status=0;
        $appointment->start_time=$request->start_time;
        $appointment->finish_time=$request->finish_time;
        $appointment->day=$request->day;
        $appointment->app_name=$request->app_name;
        $appointment->created_at = Carbon::now();
        $appointment->updated_at = Carbon::now();
        $appointment->save();
        return response($appointment,201);
        
    
    }


    public function edit_appointment(Request $request,$id){

        $appointment=Appointment::find($id);
        
        $appointment->status=$request->status;
        $appointment->start_time=$request->start_time;
        $appointment->finish_time=$request->finish_time;
        $appointment->day=$request->day;
        $appointment->app_name=$request->app_name;
        
        $appointment->updated_at = Carbon::now();
        $appointment->update();
        return response($appointment,201);
        
    }

    public function bookAppointment (Request $request){
        $appointment=new BookAppointment;
        $appointment->student_id=Auth::id();
        $appointment->appointment_id=$request->appointment_id;
        $appointment->reason=$request->reason;
        $appointment->status=0;
        $appointment->created_at = Carbon::now();
        $appointment->updated_at = Carbon::now();
        $appointment->save();
        
        return response($appointment,201);
    }

    public function AcceptOrRejectAppointment($id,$status){

        $appointment=bookAppointment::find($id);
        $appointment->status=$status;
        $appointment->save();

        return response($appointment,200);
        
    
    }
}