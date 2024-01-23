<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentNotification extends Notification
{
    use Queueable;
    private $bookApp_id;
    private $student_id;
    private $student_name;
    private $time;
    private $day;
    private $date;
    private $reason;

   
    public function __construct($bookApp_id,$student_id,$student_name,$time,$day,$date,$reason)
    {
        $this->bookApp_id=$bookApp_id;
        $this->student_id=$student_id;
        $this->student_name=$student_name;
        $this->time=$time;
        $this->day=$day;
        $this->date=$date;
        $this->reason=$reason;
    }

    
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    
    public function toArray(object $notifiable): array
    {
        return [
            'bookApp-id' => $this->bookApp_id,
            'student_id' => $this->student_id,
            'student_name' => $this->student_name,
            'time' => $this->time,
            'day' => $this->day,
            'date' => $this->date,
            'reason' => $this->reason  
        ];
    }
}