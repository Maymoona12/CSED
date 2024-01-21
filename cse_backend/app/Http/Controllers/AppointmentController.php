<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\BookAppointment;
use App\Models\User;
use App\Notifications\AppointmentNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use League\CommonMark\Renderer\Block\DocumentRenderer;

class AppointmentController extends Controller
{
    public function bookAppointment (Request $request){ // student
        $appointment=new BookAppointment;
        $appointment->student_id=Auth::id();
        $appointment->appointment_id=$request->appointment_id;
        $appointment->reason=$request->reason;
        $appointment->status=0;
        $appointment->created_at = Carbon::now();
        $appointment->updated_at = Carbon::now();
        $appointment->save();
        
        
        
        $student_name = User::where('id',$appointment->student_id)->select('name')->get();
        $app= Appointment::find($appointment->appointment_id);
        $time= Carbon::createFromFormat('H:i:s', $app->start_time)->format('g:i a');
        
        $user=User::where('id',$app->doctor_id)->get();
        
        Notification::send($user,new AppointmentNotification($appointment->student_id,$student_name,$time,$appointment->reason));
        return response($appointment,201);
    }

    public function doctorAppointments($id){ //student
        $appointment=Appointment::where('doctor_id',$id)->where('status','0')->get(); // status available
        $data = array();

        foreach ($appointment as $appointment) {
            $data[] = [
                'start_time' => Carbon::createFromFormat('H:i:s', $appointment->start_time)->format('g:i a'),
                'end_time' => Carbon::createFromFormat('H:i:s', $appointment->end_time)->format('g:i a'),
                'day' => $appointment->day,
                'app_name' =>$appointment->app_name
            ];
        }
        
        return response()->json([$data,200]); 
        
    }

    public function cancelBookApp($id){ //student
        $user_id = Auth::id();
        $book_appointment=BookAppointment::find($id)->where('student_id',$user_id)->first();
        $book_appointment->status = 2;
        $book_appointment->save();

        $appointment=Appointment::find($book_appointment->appointment_id);
        $appointment->status=0;
        $appointment->save();

        return response()->json(['canceled',200]);
    
    }
    
     
    public function acceptAppointment($id){ //doctor
        $user=Auth::user();
        if($user->role == 'doctor' || $user->role == 'admin'){
            // Book Appointments : status 0->sent, 1->reject, 2->canceled
            $book_appointment=bookAppointment::find($id);
            $book_appointment->status=1; // accept
            $book_appointment->save();
            // Appointments : status 0->available , 1-buzy , 2->blocked , 3->deleted
            $appointment=Appointment::find($book_appointment->appointment_id); 
            $appointment->status=1; // buzy
            $appointment->save(); 
        }
        
        return response()->json(['accepted',200]);
        
    
    }

    public function rejectAppointment($id){ //doctor
        $user=Auth::user();
        if($user->role == 'doctor' || $user->role == 'admin'){
            // Book Appointments : status 0->wait , 1->accept , 2->reject, 2->canceled
            $book_appointment=bookAppointment::find($id);
            $book_appointment->status=1; // accept
            $book_appointment->save();
            // Appointments : status 0->available , 1-buzy , 2->blocked , 3->deleted
            $appointment=Appointment::find($book_appointment->appointment_id); 
            $appointment->status=1; // buzy
            $appointment->save(); 
        }
        
        return response()->json(['accepted',200]);
        
    
    }

    public function myAppointments(){ //doctor
        $id=Auth::id();
        $appointments=Appointment::where('doctor_id',$id)->get();
        return response($appointments,200);        
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