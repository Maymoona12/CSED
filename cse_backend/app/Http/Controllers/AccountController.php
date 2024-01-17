<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function EditAccount(Request $request){
        $user = $request->user();
        $user->education_level = $request->education_level;
        $user->office_no = $request->office_no;
        $user->phone_no = $request->phone_no;
        $user->email = $request->email;
        $user->save();
        
        if ($user) {
            return response()->json(['status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    
    }
}