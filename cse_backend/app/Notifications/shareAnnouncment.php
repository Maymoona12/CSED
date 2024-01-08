<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class shareAnnouncment extends Notification
{
    use Queueable;
    private $doctor_id;
    private $title;
    private $text_ann;
    private $file;
    private $created_at;
    /**
     * Create a new notification instance.
     */
    public function __construct($doctor_id,$title,$text_ann,$file,$created_at)
    {
         $this->doctor_id=$doctor_id;        
         $this->title=$title;
         $this->text_ann=$text_ann;
         $this->file=$file;
         $this->created_at = $created_at;
         
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

   
    public function toArray(object $notifiable): array
    {
        return [
            'doctor_id' => $this->doctor_id,
            'doctor_name' => Auth::user()->name,
            'title' => $this->title,
            'text_ann' => $this->text_ann,
            'file' => $this->file,
            'created_at' => $this->created_at,
        ];
    }
}