<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['category_slug' => 'business-cards', 'name' => 'Premium Matte Business Cards', 'slug' => 'premium-matte-business-cards', 'short_description' => 'Elegant matte finish cards.', 'description' => 'High quality business cards with premium matte finish.', 'base_price' => 89.00, 'featured' => true],
            ['category_slug' => 'business-cards', 'name' => 'Gloss Business Cards', 'slug' => 'gloss-business-cards', 'short_description' => 'Bright glossy cards.', 'description' => 'Glossy business cards for sharp color output.', 'base_price' => 79.00, 'featured' => false],
            ['category_slug' => 'brochures', 'name' => 'Tri-Fold Brochure', 'slug' => 'tri-fold-brochure', 'short_description' => 'Custom tri-fold brochures.', 'description' => 'Professional brochures with premium print quality.', 'base_price' => 129.00, 'featured' => true],
            ['category_slug' => 'brochures', 'name' => 'A4 Leaflet Pack', 'slug' => 'a4-leaflet-pack', 'short_description' => 'Cost-effective A4 leaflets.', 'description' => 'Compact A4 leaflets for promotions.', 'base_price' => 95.00, 'featured' => false],
            ['category_slug' => 'posters', 'name' => 'A3 Poster Print', 'slug' => 'a3-poster-print', 'short_description' => 'Bold A3 posters.', 'description' => 'Large format posters for displays and events.', 'base_price' => 149.00, 'featured' => true],
            ['category_slug' => 'posters', 'name' => 'A2 Event Poster', 'slug' => 'a2-event-poster', 'short_description' => 'High-impact A2 poster.', 'description' => 'Perfect for launches and music events.', 'base_price' => 119.00, 'featured' => false],
            ['category_slug' => 'signage', 'name' => 'Foam Board Sign', 'slug' => 'foam-board-sign', 'short_description' => 'Professional display sign.', 'description' => 'Durable foam board signage for retail environments.', 'base_price' => 159.00, 'featured' => true],
            ['category_slug' => 'signage', 'name' => 'Acrylic Signage', 'slug' => 'acrylic-signage', 'short_description' => 'Modern acrylic signage.', 'description' => 'Sleek acrylic signage for premium interiors.', 'base_price' => 189.00, 'featured' => false],
            ['category_slug' => 'labels', 'name' => 'Product Labels', 'slug' => 'product-labels', 'short_description' => 'Custom product labels.', 'description' => 'Versatile labels for packaging and product identification.', 'base_price' => 69.00, 'featured' => false],
            ['category_slug' => 'labels', 'name' => 'Shipping Labels', 'slug' => 'shipping-labels', 'short_description' => 'Durable shipping labels.', 'description' => 'Weather-resistant labels for logistics.', 'base_price' => 59.00, 'featured' => false],
            ['category_slug' => 'banners', 'name' => 'Vinyl Banner', 'slug' => 'vinyl-banner', 'short_description' => 'Outdoor vinyl banners.', 'description' => 'Weatherproof banners for storefronts and events.', 'base_price' => 179.00, 'featured' => true],
            ['category_slug' => 'banners', 'name' => 'Mesh Banner', 'slug' => 'mesh-banner', 'short_description' => 'Wind resistant banners.', 'description' => 'Ideal for building wraps and outdoor installs.', 'base_price' => 199.00, 'featured' => false],
            ['category_slug' => 'stickers', 'name' => 'Die Cut Stickers', 'slug' => 'die-cut-stickers', 'short_description' => 'Custom die-cut stickers.', 'description' => 'High-adhesion stickers for packaging and promotion.', 'base_price' => 49.00, 'featured' => false],
            ['category_slug' => 'stickers', 'name' => 'Clear Sticker Sheets', 'slug' => 'clear-sticker-sheets', 'short_description' => 'Transparent sticker sheets.', 'description' => 'Perfect for branding on glass and packaging.', 'base_price' => 54.00, 'featured' => false],
            ['category_slug' => 'packaging', 'name' => 'Mailer Boxes', 'slug' => 'mailer-boxes', 'short_description' => 'Luxury mailer boxes.', 'description' => 'Premium packaging boxes for product delivery.', 'base_price' => 229.00, 'featured' => true],
            ['category_slug' => 'packaging', 'name' => 'Packing Tape', 'slug' => 'packing-tape', 'short_description' => 'Branded packing tape.', 'description' => 'Customized tape for shipping and fulfillment.', 'base_price' => 39.00, 'featured' => false],
            ['category_slug' => 'business-cards', 'name' => 'Textured Business Cards', 'slug' => 'textured-business-cards', 'short_description' => 'Luxury textured cards.', 'description' => 'Raised texture with premium stock.', 'base_price' => 109.00, 'featured' => false],
            ['category_slug' => 'brochures', 'name' => 'Pocket Brochure', 'slug' => 'pocket-brochure', 'short_description' => 'Compact pocket brochures.', 'description' => 'Ideal for handouts and product guides.', 'base_price' => 99.00, 'featured' => false],
            ['category_slug' => 'posters', 'name' => 'Canvas Poster', 'slug' => 'canvas-poster', 'short_description' => 'Gallery-style canvas print.', 'description' => 'Canvas posters for premium display.', 'base_price' => 219.00, 'featured' => false],
            ['category_slug' => 'signage', 'name' => 'Window Decals', 'slug' => 'window-decals', 'short_description' => 'Custom window decals.', 'description' => 'Easy install decals for storefronts.', 'base_price' => 89.00, 'featured' => false],
        ];

        foreach ($products as $productData) {
            $category = Category::query()->where('slug', $productData['category_slug'])->firstOrFail();
            Product::query()->firstOrCreate(['slug' => $productData['slug']], [
                'category_id' => $category->id,
                'name' => $productData['name'],
                'slug' => $productData['slug'],
                'short_description' => $productData['short_description'],
                'description' => $productData['description'],
                'base_price' => $productData['base_price'],
                'featured' => $productData['featured'],
                'status' => true,
            ]);
        }
    }
}
