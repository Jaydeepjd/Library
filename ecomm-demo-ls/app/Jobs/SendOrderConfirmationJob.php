<?php

namespace App\Jobs;

use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use App\Services\ArtworkUploadService;
use App\Services\InvoiceService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendOrderConfirmationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Order $order)
    {
    }

    public function handle(Mailer $mailer, ArtworkUploadService $artworkUploadService, InvoiceService $invoiceService): void
    {
        if ($this->order->payment_status !== 'paid') {
            return;
        }

        $artworkToken = $this->order->artwork_token;
        if (empty($artworkToken)) {
            $artworkToken = $artworkUploadService->assignToken($this->order);
        }

        $artworkLink = route('artwork.upload.form', ['token' => $artworkToken], true);
        $invoicePath = $invoiceService->generate($this->order);

        $mailer->to($this->order->shipping_email)->send(new OrderConfirmationMail($this->order, $artworkLink, $invoicePath));
    }
}
