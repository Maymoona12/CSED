<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\GalleryFolder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GalleryFolderController extends Controller
{
    public function createFolder(Request $request){
        $gallaryFolder = new GalleryFolder;
        $gallaryFolder->folder_name=$request->folder_name;
        $gallaryFolder->created_at=Carbon::now();
        
        $gallaryFolder->save();
        
        return response()->json(['data'=>"created successfully",'msg'=>200]);
        
    }
    public function createAlbum($id,Request $request){
        
        $album=new Album;
        $album->folder_id=$id;
        
            $image=$request->image;
            $imagename=time().'.'.$image->getClientOriginalExtension();
            $request->image->move('images',$imagename);
            
        $album->doctor_id=Auth::id();
        $album->created_at=Carbon::now();
        $album->updated_at=Carbon::now();
        $album->save();

        return response()->json(['data'=>"added successfully",'msg'=>200]);

        
        
    } 
}