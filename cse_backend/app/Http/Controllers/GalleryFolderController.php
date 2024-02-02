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
    public function createAlbumImage(Request $request)
    {
        $user = Auth::user();
        $folderId = $request->folder_id;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = $image->getClientOriginalName();
                $image->move('..\..\Frontend\public\Images', $imageName);

                $album = new Album;
                $album->folder_id = $folderId;
                $album->image = $imageName;
                $album->doctor_id = $user->id;
                $album->created_at = now();
                $album->updated_at = now();
                $album->save();
            }

            return response()->json(['data' => 'Images added successfully', 'msg' => 200]);
        }

        return response()->json(['data' => 'No images selected for upload', 'msg' => 400]);
    }
    public function getFolders(){
        $folders=GalleryFolder::all();
        return response()->json([$folders,200]);
    }

    public function getImages(Request $request){
        $id=$request->id;
        $image=Album::where('folder_id',$id)->get();
        return response()->json($image,200);
        
    }
}