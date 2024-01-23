<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class cancelNotifi extends Notification
{
    use Queueable;
    private $user_id;
    private $user_name;
    private $appointment_id;
    private $start_time;

    /**
     * Create a new notification instance.
     */
    public function __construct($user_id,$user_name,$appointment_id,$start_time)
    {
        $this->user_id=$user_id;
        $this->user_name=$user_name;
        $this->appointment_id=$appointment_id;
        $this->start_time=$start_time;
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
            'user_id' =>  $this->user_id,
            'user_name' =>  $this->user_name,
            'appointment_id' =>  $this->appointment_id,
            'start_time' =>  $this->start_time,
        ];
    }
}