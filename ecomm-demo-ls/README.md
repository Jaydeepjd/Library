# Custom Printing Ecommerce

This project is a Laravel-based custom printing ecommerce application.

## Stack
- Laravel 10+
- PHP 8.2+
- MySQL
- Tailwind CSS
- Vite
- Stripe Sandbox

## Getting started
1. Copy `.env.example` to `.env`.
2. Configure database, mail, and Stripe placeholders.
3. Run migrations once dependencies are installed.

## Stripe Sandbox testing
- Set `STRIPE_KEY`, `STRIPE_SECRET`, and `STRIPE_WEBHOOK_SECRET` in `.env`.
- Use Stripe test mode keys only.
- Do not expose secret keys in JavaScript; they are read server-side from config.
- The checkout flow creates a server-side payment reference and only marks the order as paid after a successful confirmation event.
- For local testing, use Stripe test card `4242 4242 4242 4242` with any future expiry and any CVC.

## Queue and email setup
- Set `QUEUE_CONNECTION=database` in `.env`.
- Run the queue worker locally with `php artisan queue:work`.
- Order confirmation emails are queued asynchronously after successful payment.

## Architecture notes
- Controllers for HTTP concerns
- Services for business logic
- Form requests for validation
- Policies and gates for authorization
- Jobs and mailables for queued notifications
- Blade components for reusable UI
