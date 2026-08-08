<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Cart\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductConfigurationController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/category/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('/category/{category:slug}/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::post('/products/{product}/estimate', [ProductConfigurationController::class, 'estimate'])->name('products.estimate');

Route::middleware('web')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{product}', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/{key}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{key}', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

    Route::get('/checkout/shipping', [CheckoutController::class, 'shipping'])->name('checkout.shipping');
    Route::post('/checkout/shipping', [CheckoutController::class, 'storeShipping'])->name('checkout.shipping.store');
    Route::get('/checkout/review', [CheckoutController::class, 'review'])->name('checkout.review');
    Route::post('/checkout/submit', [CheckoutController::class, 'submit'])->name('checkout.submit');
    Route::get('/checkout/payment', [CheckoutController::class, 'payment'])->name('checkout.payment');
    Route::post('/checkout/confirm', [CheckoutController::class, 'confirm'])->name('checkout.confirm');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/failure', [CheckoutController::class, 'failure'])->name('checkout.failure');

    Route::get('/artwork/upload/{token}', [ArtworkController::class, 'showUploadForm'])->name('artwork.upload.form');
    Route::post('/artwork/upload/{token}', [ArtworkController::class, 'upload'])->name('artwork.upload');

    Route::middleware('auth')->group(function () {
        Route::get('/account', [AccountController::class, 'dashboard'])->name('account.dashboard');
        Route::get('/account/orders', [AccountController::class, 'orders'])->name('account.orders');
        Route::get('/account/orders/{order}', [AccountController::class, 'show'])->name('account.order.show');
        Route::get('/account/orders/{order}/invoice', [AccountController::class, 'downloadInvoice'])->name('account.order.invoice');

        Route::middleware('can:access-admin')->group(function () {
            Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
            Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
            Route::get('/admin/orders/{order}', [AdminController::class, 'showOrder'])->name('admin.orders.show');
            Route::post('/admin/orders/{order}/status', [AdminController::class, 'updateOrderStatus'])->name('admin.orders.update-status');
            Route::get('/admin/customers', [AdminController::class, 'customers'])->name('admin.customers');
            Route::get('/admin/customers/{user}', [AdminController::class, 'showCustomer'])->name('admin.customers.show');
            Route::get('/admin/quotes', [AdminController::class, 'quotes'])->name('admin.quotes');
            Route::get('/admin/quotes/{quote}', [AdminController::class, 'showQuote'])->name('admin.quotes.show');
            Route::post('/admin/quotes/{quote}', [AdminController::class, 'updateQuote'])->name('admin.quotes.update');
        });
    });

    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});
