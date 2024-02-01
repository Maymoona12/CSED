<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use Illuminate\Console\Command;

class FinishAppointment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'finish-appointment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $appointments=Appointment::where('end_time',"<=",now())->where('status',1)->get();
        foreach ($appointments as $appointment) {
            $appointment->update(['status' => 0]); // Replace 'new_status' with the desired status
        }
        $this->info('Status updated successfully.');
    }
}