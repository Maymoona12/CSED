<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class getDoctorController extends Controller
{
    public function getAllDoctors(){
        
        $user=Auth::user();
        
            $doctors=User::where('account_status',0)->where(function($fun){
            $fun->where('role','admin')->orWhere('role','doctor');
        })->get();
            return response($doctors,200);
        
        
    }


    public function showDoctor($id){
        $doctor=User::where(function($query){
            $query->where('role',"doctor")->orWhere('role',"admin");
        })->find($id);
        return response($doctor,200);
    }


    public function search($name){
        $doctor=User::where('account_status',0)->where(function($query){
            $query->where('role',"doctor")->orWhere('role',"admin");
        })->where('name',"like",'%'.$name.'%')->get();
        return response($doctor,200);
    }

}