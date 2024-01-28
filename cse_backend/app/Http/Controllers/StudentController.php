<?php

namespace App\Http\Controllers;

use App\Imports\StudentImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Facades\Excel as FacadesExcel;

class StudentController extends Controller
{
    public function saveStudents(Request $request)
{
    $import = new StudentImport();
    Excel::import($import, $request->file);

    return response()->json(['imported successfully', 200]);
}
}