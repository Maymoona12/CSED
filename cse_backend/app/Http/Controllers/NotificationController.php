<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function  getNotifi(){
    
        $notifi =Auth()->user()->unreadnotifications;
        return response()->json([$notifi]);
    }
}