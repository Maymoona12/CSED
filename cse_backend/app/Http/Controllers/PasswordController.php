<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:3|confirmed|different:old_password',
            // 'new_password_confirmation' => 'required|same:new_password',
        ]);

        if (Hash::check($request->old_password, $user->password)) {
            $user->password = bcrypt($request->new_password);
            $user->save();

            return response()->json(['message' => 'Password changed successfully'], 200);
        } else {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }
    }
        
        
        
    
}