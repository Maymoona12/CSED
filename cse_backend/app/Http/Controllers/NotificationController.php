<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function  getNotifiAnn(){
    
        $notifi =Auth()->user()->notifications->where('type','App\Notifications\shareAnnouncment');
        return response()->json([$notifi]);
    }
    
    public function getNotifiApp(){
        $notifi =Auth()->user()->notifications->where('type','!=','App\Notifications\shareAnnouncment');
        return response()->json([$notifi]);
    }
    
    public function markNotifi($id){
    Auth()->user()->notifications->where('id',$id)->markAsRead();
     
   }
}