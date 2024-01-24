<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BookAppointment;
use App\Models\User;
use App\Notifications\AppointmentNotification;
use App\Notifications\cancelNotifi;
use App\Notifications\RejectNotifi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use League\CommonMark\Renderer\Block\DocumentRenderer;

class AppointmentController extends Controller
{
    public function bookAppointment (Request $request){ // student
        $book_appointment=new BookAppointment;
        $book_appointment->student_id=Auth::id();
        $book_appointment->appointment_id=$request->appointment_id;
        $book_appointment->reason=$request->reason;
        $book_appointment->status=0;
        $book_appointment->created_at = Carbon::now();
        $book_appointment->updated_at = Carbon::now();
        $book_appointment->save();
    
        
        
        
        $student_name = User::where('id',$book_appointment->student_id)->select('name')->get();
        $app= Appointment::find($book_appointment->appointment_id);
        $app->status=1;
        $app->save();
        $time= Carbon::createFromFormat('H:i:s', $app->start_time)->format('g:i a');
        
        $user=User::where('id',$app->doctor_id)->get();
        
        Notification::send($user,new AppointmentNotification($book_appointment->id,$book_appointment->student_id,$student_name,$time,$app->day,$app->created_at,$book_appointment->reason));
        return response($book_appointment,201);
    }
    

    public function doctorAppointments($id){ //student
        $appointment=Appointment::where('doctor_id',$id)->where('status','0')->get(); // status available
        $data = array();
//
        foreach ($appointment as $appointment) {
            $data[] = [
                'id' => $appointment->id,
                'start_time' => Carbon::createFromFormat('H:i:s', $appointment->start_time)->format('g:i a'),
                'end_time' => Carbon::createFromFormat('H:i:s', $appointment->end_time)->format('g:i a'),
                'day' => $appointment->day,
                'app_name' =>$appointment->app_name
            ];
        }
        
        return response()->json([$data,200]); 
        
    }

    

    public function cancelBookApp($id){ //student
        $user=Auth::user();
        $user_id = Auth::id();
        $book_appointment=BookAppointment::find($id)->where('student_id',$user_id)->first();
        $book_appointment->status = 2;//cancel
        $book_appointment->save();

        $appointment=Appointment::find($book_appointment->appointment_id);
        $appointment->status=0;//available
        $appointment->save();

        $users=User::where('id',$appointment->doctor_id)->get();
        Notification::send($users,new cancelNotifi($user_id,$user->name,$appointment->id,$appointment->start_time));

        return response()->json(['canceled',200]);
    
    }
    
     
    public function rejectAppointment($id){ //doctor
        $user=Auth::user();
        if($user->role == 'doctor' || $user->role == 'admin'){
            // Book Appointments : status 0->sent, 1->reject, 2->canceled
            $book_appointment=bookAppointment::find($id);
            $book_appointment->status=1; // reject
            $book_appointment->save();
            // Appointments : status 0->available , 1-buzy , 2->blocked 
            $appointment=Appointment::find($book_appointment->appointment_id); 
            $appointment->status=0; // available
            $appointment->save(); 
        }
        $users=User::where('id',$book_appointment->student_id)->get();
        Notification::send($users,new RejectNotifi($user->id,$user->name,$appointment->id,$appointment->start_time));
        
        return response()->json(['rejected',200]);
        
    
    }

    
    public function myAppointments(){ //doctor كل المواعيد
        $id=Auth::id();
        $appointments=Appointment::where('doctor_id',$id)->get();
        $data = array();

        foreach ($appointments as $appointments) {
            $data[] = [
                'id' => $appointments->id,
                'start_time' => Carbon::createFromFormat('H:i:s', $appointments->start_time)->format('g:i a'),
                'end_time' => Carbon::createFromFormat('H:i:s', $appointments->end_time)->format('g:i a'),
                'day' => $appointments->day,
                'app_name' =>$appointments->app_name
            ];
        }
        return response($data,200);        
    }

    public function myBookedAppointments(){ //doctor
        $id=Auth::id();
        $appointments=Appointment::where('doctor_id',$id)->where('status',1)->get();
        $data = array();

        foreach ($appointments as $appointments) {
            $data[] = [
                'id' => $appointments->id,
                'start_time' => Carbon::createFromFormat('H:i:s', $appointments->start_time)->format('g:i a'),
                'end_time' => Carbon::createFromFormat('H:i:s', $appointments->end_time)->format('g:i a'),
                'day' => $appointments->day,
                'app_name' =>$appointments->app_name
            ];
        }
        return response($data,200);        
    }

    public function deleteApp($id){
        $appointment=Appointment::find($id);
        $appointment->delete();
        return response()->json(['deleted',200]);        
        
    }

    public function blockedApp($id){
        $appointment=Appointment::find($id);
        $appointment->status=2;
        $appointment->save();
        return response()->json(['blocked',200]);
    }
}