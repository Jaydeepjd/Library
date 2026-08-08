<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtworkUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'artwork' => ['required', 'file', 'mimetypes:application/pdf,image/png,application/postscript,application/octet-stream', 'extensions:pdf,png,ai', 'max:51200'],
        ];
    }
}
