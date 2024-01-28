<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Student extends Model
{
    use HasFactory;
    protected $fillable=['reg_no','name'];
    public static function getAllStudent(){
        $result=DB::table('students')
        ->select('id','reg_no','name')
        ->get()->toArray();
        return $result;
    }
}