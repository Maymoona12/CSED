<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class galleryNotifi extends Notification
{
    use Queueable;
    private $doctor_name;
    // private $image;
    private $folder_name;
    /**
     * Create a new notification instance.
     */
    public function __construct($doctor_name,$folder_name)
    {
        $this->doctor_name=$doctor_name;
        // $this->image=$image;
        $this->folder_name=$folder_name;
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
            'doctor_name' => $this->doctor_name,
            // 'image' => $this->$this->image,
            'folder_name' => $this->folder_name
        ];
    }
}