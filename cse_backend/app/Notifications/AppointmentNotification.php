<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentNotification extends Notification
{
    use Queueable;
    private $student_id;
    private $student_name;
    private $time;
    private $reason;

   
    public function __construct($student_id,$student_name,$time,$reason)
    {
        $this->student_id=$student_id;
        $this->student_name=$student_name;
        $this->time=$time;
        $this->reason=$reason;
    }

    
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    
    public function toArray(object $notifiable): array
    {
        return [
            'student_id' => $this->student_id,
            'student_name' => $this->student_name,
            'time' => $this->time,
            'reason' => $this->reason  
        ];
    }
}