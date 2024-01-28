<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\GalleryFolder;
use App\Models\User;
use App\Notifications\galleryNotifi;
use Carbon\Carbon;
use Illuminate\Http\Request;
// use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification ;

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
        $user=Auth::user();
        $album=new Album;
        $album->folder_id=$id;
        
            $image=$request->image;
            $imagename=time().'.'.$image->getClientOriginalExtension();
            $request->image->move('images',$imagename);
            
        $album->image=$imagename;
        $album->doctor_id=Auth::id();
        $album->created_at=Carbon::now();
        $album->updated_at=Carbon::now();
        $album->save();
        
        $gallaryFolder = GalleryFolder::find($album->folder_id);
        // $user_name = User::where('id',$user->id)->select('name')->get();
        $users=User::where('id','!=',$user->id)->get();
        Notification::send($users,new galleryNotifi($user->name,$gallaryFolder->folder_name));
        
        return response()->json(['data'=>"added successfully",'msg'=>200]);

        
        
    } 

    public function getFolders(){
        $folders=GalleryFolder::all();
        return response()->json([$folders,200]);
    }

    public function getImages(Request $request){
        $id=$request->id;
        
        $images=Album::where('folder_id',$id)->get();
        return response()->json([$images,200]);
        
    }
}