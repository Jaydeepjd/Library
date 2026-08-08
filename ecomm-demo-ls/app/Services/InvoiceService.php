<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Str;

class InvoiceService
{
    public function generate(Order $order): string
    {
        $path = 'invoices/' . $order->id . '-' . Str::uuid() . '.pdf';
        $content = $this->buildInvoiceHtml($order);
        $fullPath = storage_path('app/private/' . $path);
        $directory = dirname($fullPath);
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        file_put_contents($fullPath, $content);

        return $path;
    }

    private function buildInvoiceHtml(Order $order): string
    {
        $items = $order->items()->get();
        $rows = '';
        foreach ($items as $item) {
            $rows .= sprintf(
                '<tr><td>%s</td><td>%s × %s</td><td>%s</td><td>%s</td><td>$%.2f</td></tr>',
                e($item->product_name),
                e($item->width),
                e($item->height),
                e($item->material),
                e($item->quantity),
                (float) $item->total_price
            );
        }

        return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Invoice</title></head>
<body style="font-family:Arial, sans-serif; padding:24px;">
<h1>Invoice</h1>
<p><strong>Store:</strong> CustomPrint</p>
<p><strong>Customer:</strong> {$order->shipping_name}</p>
<p><strong>Order:</strong> {$order->order_number}</p>
<p><strong>Date:</strong> {$order->created_at->format('Y-m-d')}</p>
<table style="width:100%; border-collapse:collapse; margin-top:16px;">
  <thead><tr><th align="left">Product</th><th align="left">Dimensions</th><th align="left">Material</th><th align="left">Qty</th><th align="left">Price</th></tr></thead>
  <tbody>{$rows}</tbody>
</table>
<p style="margin-top:16px"><strong>Subtotal:</strong> \\$ {$order->subtotal}</p>
<p><strong>Discount:</strong> \\$ {$order->discount}</p>
<p><strong>Total:</strong> \\$ {$order->total}</p>
</body></html>
HTML;
    }
}
