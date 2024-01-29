<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FinishAppointment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $appointment;
    /**
     * Create a new job instance.
     */
    public function __construct($appointment)
    {
        $this->appointment=$appointment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (now() > $this->appointment->end_time) {
            // Update the appointment status here
            $this->appointment->update(['status' => 'expired']);
        }
    }
}