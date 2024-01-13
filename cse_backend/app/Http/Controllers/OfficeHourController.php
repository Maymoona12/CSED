<?php

namespace App\Http\Controllers;

use App\Models\OfficeHour;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfficeHourController extends Controller
{
    public function createOfficeHour(Request $request){
        $officeHour = new OfficeHour;
        $officeHour->doctor_id=Auth::id(); 
        $officeHour->start_time=$request->start_time;
        $officeHour->finish_time=$request->finish_time;
        $officeHour->day=$request->day;
        $officeHour->app_name=$request->app_name;
        $officeHour->time_devision=$request->time_devision;
        $officeHour->created_at = Carbon::now();
        $officeHour->updated_at = Carbon::now();
        $officeHour->save();
        return response()->json([$officeHour,201]);

    }
}