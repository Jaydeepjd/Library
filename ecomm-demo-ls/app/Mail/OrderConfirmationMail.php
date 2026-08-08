<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Order $order, public string $artworkLink, public string $invoicePath)
    {
    }

    public function build()
    {
        return $this->subject('Your order confirmation')->view('emails.order-confirmation')->with([
            'order' => $this->order,
            'artworkLink' => $this->artworkLink,
            'invoicePath' => $this->invoicePath,
        ]);
    }
}
