<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RejectNotifi extends Notification
{
    use Queueable;
    private $doctor_id;
    private $doctor_name;
    private $appointment_id;
    private $start_time;
    private $day;
    

    public function __construct($doctor_id,$doctor_name,$appointment_id,$start_time,$day)
    {
        $this->doctor_id=$doctor_id;
        $this->doctor_name=$doctor_name;
        $this->appointment_id=$appointment_id;
        $this->start_time=$start_time;
        $this->day=$day;
    }

    
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    
    
    public function toArray(object $notifiable): array
    {
        return [
            'doctor_id' => $this->doctor_id,
            'doctor_name' => $this->doctor_name,
            'appointment_id' => $this->appointment_id,
            'start_time' => $this->start_time,
            'day' =>$this->day 
        ];
    }
}