<?php

namespace Tests\Unit;

use App\Jobs\SendOrderConfirmationJob;
use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use App\Services\InvoiceService;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Framework\TestCase;

class OrderConfirmationMailTest extends TestCase
{
    public function test_mail_build_contains_order_details(): void
    {
        $order = new Order();
        $order->order_number = 'ORD-123';
        $order->shipping_name = 'Test Customer';
        $order->shipping_email = 'customer@example.com';
        $order->subtotal = 100.0;
        $order->discount = 10.0;
        $order->total = 90.0;
        $order->payment_status = 'paid';
        $order->artwork_token_expires_at = new \DateTimeImmutable('2026-08-15 00:00:00');

        $mail = new OrderConfirmationMail($order, 'https://example.test/upload', 'invoices/test.pdf');
        $this->assertStringContainsString('Order confirmed', $mail->render());
    }

    public function test_invoice_service_generates_a_file_path(): void
    {
        $service = new InvoiceService();
        $order = new Order();
        $order->id = 1;
        $order->order_number = 'ORD-TEST';
        $order->shipping_name = 'Test';
        $order->subtotal = 100.0;
        $order->discount = 10.0;
        $order->total = 90.0;
        $order->created_at = new \DateTimeImmutable('2026-08-08 00:00:00');
        $order->items = collect();

        $path = $service->generate($order);
        $this->assertStringContainsString('invoices/', $path);
    }
}
