<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\User;
use App\Notifications\shareAnnouncment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class AnnouncementController extends Controller
{
    public function createAnnouncement(Request $request){
        
        $announcement = new Announcement;
        $announcement->doctor_id=Auth::id();
        $announcement->text_ann=$request->text_ann;
        $announcement->file=$request->file;
        // $announcement->img=$request->img;
        $announcement->created_at = Carbon::now();
        $announcement->updated_at = Carbon::now();
        $announcement->save();
        
        $users=User::where('role','student');
        Notification::send($users,new shareAnnouncment($announcement->doctor_id,$announcement->created_at,$announcement->text_ann,$announcement->file));
        
        return response($announcement,200);
        
    }
    public function allAnnouncement(){
        $announcements=Announcement::all();
        return response($announcements,200);
    }
}