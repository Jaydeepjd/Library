<?php

namespace Tests\Unit;

use App\Models\Order;
use App\Services\ArtworkUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;

class ArtworkUploadServiceTest extends TestCase
{
    protected ArtworkUploadService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ArtworkUploadService();
    }

    public function test_valid_pdf_is_accepted(): void
    {
        $file = new UploadedFile(__FILE__, 'sample.pdf', 'application/pdf', null, true);
        $this->service->assertFileIsAllowed($file);
        $this->assertTrue(true);
    }

    public function test_valid_png_is_accepted(): void
    {
        $file = new UploadedFile(__FILE__, 'sample.png', 'image/png', null, true);
        $this->service->assertFileIsAllowed($file);
        $this->assertTrue(true);
    }

    public function test_valid_ai_is_accepted(): void
    {
        $file = new UploadedFile(__FILE__, 'sample.ai', 'application/postscript', null, true);
        $this->service->assertFileIsAllowed($file);
        $this->assertTrue(true);
    }

    public function test_invalid_extension_is_rejected(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $file = new UploadedFile(__FILE__, 'sample.exe', 'application/octet-stream', null, true);
        $this->service->assertFileIsAllowed($file);
    }

    public function test_large_file_is_rejected(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $file = new UploadedFile(__FILE__, 'sample.pdf', 'application/pdf', 60 * 1024 * 1024, true);
        $this->service->assertFileIsAllowed($file);
    }

    public function test_expired_token_is_rejected(): void
    {
        $order = new Order();
        $order->payment_status = 'paid';
        $order->artwork_token = 'abc';
        $order->artwork_token_expires_at = Carbon::now()->subDay();

        $this->assertFalse($this->service->isTokenValid($order, 'abc'));
    }

    public function test_invalid_token_is_rejected(): void
    {
        $order = new Order();
        $order->payment_status = 'paid';
        $order->artwork_token = 'abc';
        $order->artwork_token_expires_at = Carbon::now()->addDay();

        $this->assertFalse($this->service->isTokenValid($order, 'xyz'));
    }
}
