<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    public function createAnnouncement(Request $request){
        
        $announcement = new Announcement;
        $announcement->doctor_id=Auth::id();
        $announcement->text_ann=$request->text_ann;
        $announcement->file=$request->file;
        $announcement->img=$request->img;
        $announcement->created_at = Carbon::now();
        $announcement->updated_at = Carbon::now();
        $announcement->save();
        return response($announcement,200);
        
    }
}