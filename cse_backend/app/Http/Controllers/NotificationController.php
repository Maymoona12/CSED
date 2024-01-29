<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function  getNotifiAnn(){
    
        $notifi =Auth()->user()->notifications->where('type','App\Notifications\shareAnnouncment');
        $count=$notifi->count();
        return response()->json([$count,$notifi]);
    }
    
    public function getNotifiApp(){
        $notifi =Auth()->user()->notifications->where('type','!=','App\Notifications\shareAnnouncment');
        $count=$notifi->count();
        return response()->json(["count"=>$count,"notifi"=>$notifi]);
    }
    
    public function markNotifi($id){
    Auth()->user()->notifications->where('id',$id)->markAsRead();
     
   }
}