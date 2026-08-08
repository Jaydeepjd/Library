<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('product_type');
            $table->string('size')->nullable();
            $table->integer('quantity')->default(1);
            $table->text('message')->nullable();
            $table->string('status')->default('pending');
            $table->text('admin_response')->nullable();
            $table->timestamps();
            $table->index(['status', 'email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
