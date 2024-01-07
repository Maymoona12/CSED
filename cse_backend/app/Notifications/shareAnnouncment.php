<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class shareAnnouncment extends Notification
{
    use Queueable;
    private $doctor_id;
    private $created_at;
   
    private $text_ann;
    private $file;
    /**
     * Create a new notification instance.
     */
    public function __construct($doctor_id,$created_at,$text_ann,$file)
    {
        // this->
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
            //
        ];
    }
}