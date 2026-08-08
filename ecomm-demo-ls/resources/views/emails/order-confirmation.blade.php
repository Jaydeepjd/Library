<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial, sans-serif; color:#111827;">
<h2>Order confirmed</h2>
<p>Hi {{ $order->shipping_name }},</p>
<p>Your order <strong>{{ $order->order_number }}</strong> has been confirmed.</p>
<h3>Order summary</h3>
<ul>
  @foreach ($order->items as $item)
    <li>{{ $item->product_name }} — {{ $item->width }} × {{ $item->height }} ft, {{ $item->material }}, Qty {{ $item->quantity }}</li>
  @endforeach
</ul>
<p><strong>Subtotal:</strong> ${{ number_format($order->subtotal, 2) }}</p>
<p><strong>Discount:</strong> ${{ number_format($order->discount, 2) }}</p>
<p><strong>Total:</strong> ${{ number_format($order->total, 2) }}</p>
<p><strong>Payment status:</strong> {{ $order->payment_status }}</p>
<p><strong>Artwork upload link:</strong> <a href="{{ $artworkLink }}">Upload artwork</a></p>
<p><strong>Upload expires:</strong> {{ $order->artwork_token_expires_at?->format('Y-m-d H:i') }}</p>
<p><strong>Invoice:</strong> <a href="{{ url('storage/' . $invoicePath) }}">Download invoice</a></p>
</body>
</html>
