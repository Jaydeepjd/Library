import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

// Placeholder imagery until real product photography (sourced from
// a2zprintinghub.com per the assignment brief) is dropped into /public/images.
const placeholderImage = (seed: string) =>
  JSON.stringify([`https://picsum.photos/seed/${seed}/900/700`]);

async function main() {
  // --- Categories -----------------------------------------------------
  const backdrops = await prisma.category.create({
    data: { name: "Backdrops & Media Walls", slug: "backdrops-media-walls" },
  });
  const tensionBackdrops = await prisma.category.create({
    data: {
      name: "Tension Fabric Backdrops",
      slug: "tension-fabric-backdrops",
      parentId: backdrops.id,
    },
  });
  const stepRepeat = await prisma.category.create({
    data: {
      name: "Step & Repeat Backdrops",
      slug: "step-repeat-backdrops",
      parentId: backdrops.id,
    },
  });

  const tradeShow = await prisma.category.create({
    data: { name: "Trade Show & Exhibition", slug: "trade-show-exhibition" },
  });
  const popUpDisplays = await prisma.category.create({
    data: {
      name: "Pop Up Displays",
      slug: "pop-up-displays",
      parentId: tradeShow.id,
    },
  });
  const tableCovers = await prisma.category.create({
    data: {
      name: "Table Covers",
      slug: "table-covers",
      parentId: tradeShow.id,
    },
  });

  const signage = await prisma.category.create({
    data: { name: "Signage & Banners", slug: "signage-banners" },
  });
  const vinylBanners = await prisma.category.create({
    data: {
      name: "Vinyl Banners",
      slug: "vinyl-banners",
      parentId: signage.id,
    },
  });
  const hangingBanners = await prisma.category.create({
    data: {
      name: "Hanging Banners",
      slug: "hanging-banners",
      parentId: signage.id,
    },
  });

  // --- Products ---------------------------------------------------------
  const productSeeds = [
    {
      name: "Tension Fabric Backdrop Wall",
      slug: "tension-fabric-backdrop-wall",
      categoryId: tensionBackdrops.id,
      basePrice: 189,
      isFeatured: true,
      description:
        "Custom-printed tension fabric backdrop with a lightweight aluminum frame. Wrinkle-resistant dye-sublimation print, tool-free setup.",
      materials: [
        { label: "Standard Polyester (matte)", priceModifier: 0 },
        { label: "Blockout Fabric", priceModifier: 35 },
        { label: "Premium Stretch Satin", priceModifier: 55 },
      ],
    },
    {
      name: "Step & Repeat Backdrop",
      slug: "step-and-repeat-backdrop",
      categoryId: stepRepeat.id,
      basePrice: 129,
      isFeatured: true,
      description:
        "Repeating logo backdrop for media walls and press events, printed on wrinkle-free fabric or vinyl.",
      materials: [
        { label: "Vinyl", priceModifier: 0 },
        { label: "Wrinkle-Free Fabric", priceModifier: 25 },
      ],
    },
    {
      name: "Retractable Pop Up Banner Stand",
      slug: "retractable-pop-up-banner-stand",
      categoryId: popUpDisplays.id,
      basePrice: 99,
      isFeatured: true,
      description:
        "All-in-one retractable banner stand with carry bag. Ships ready to install, no tools required.",
      materials: [
        { label: "Standard Vinyl", priceModifier: 0 },
        { label: "Premium Scratch-Resistant Laminate", priceModifier: 20 },
      ],
    },
    {
      name: "Custom Fitted Table Cover",
      slug: "custom-fitted-table-cover",
      categoryId: tableCovers.id,
      basePrice: 149,
      isFeatured: false,
      description:
        "Fitted stretch table cover with full-color dye-sublimation print, machine washable.",
      materials: [
        { label: "Stretch Polyester", priceModifier: 0 },
        { label: "Premium Spandex", priceModifier: 18 },
      ],
    },
    {
      name: "Outdoor Vinyl Banner",
      slug: "outdoor-vinyl-banner",
      categoryId: vinylBanners.id,
      basePrice: 39,
      isFeatured: true,
      description:
        "Weatherproof 13oz vinyl banner with reinforced hems and grommets, ideal for outdoor advertising.",
      materials: [
        { label: "13oz Vinyl", priceModifier: 0 },
        { label: "18oz Heavy Duty Vinyl", priceModifier: 15 },
        { label: "Mesh (wind-resistant)", priceModifier: 12 },
      ],
    },
    {
      name: "Hanging Fabric Banner",
      slug: "hanging-fabric-banner",
      categoryId: hangingBanners.id,
      basePrice: 159,
      isFeatured: false,
      description:
        "Double-sided hanging fabric banner for overhead signage in venues and trade show halls.",
      materials: [
        { label: "Single-Sided Fabric", priceModifier: 0 },
        { label: "Double-Sided Fabric", priceModifier: 40 },
      ],
    },
  ];

  const products = [];
  for (const p of productSeeds) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        categoryId: p.categoryId,
        basePrice: p.basePrice,
        isFeatured: p.isFeatured,
        description: p.description,
        images: placeholderImage(p.slug),
        materialOptions: { create: p.materials },
      },
      include: { materialOptions: true },
    });
    products.push(product);
  }

  // --- Promo codes --------------------------------------------------------
  await prisma.promoCode.create({
    data: { code: "WELCOME10", type: "PERCENT", value: 10, active: true },
  });
  await prisma.promoCode.create({
    data: { code: "SAVE20", type: "FIXED", value: 20, active: true },
  });

  // --- Users ------------------------------------------------------------
  const adminPasswordHash = await bcrypt.hash("Admin@12345", 10);
  await prisma.user.create({
    data: {
      name: "Site Admin",
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  const customerPasswordHash = await bcrypt.hash("Customer@12345", 10);
  const customer = await prisma.user.create({
    data: {
      name: "Jane Customer",
      email: "customer@example.com",
      passwordHash: customerPasswordHash,
      role: "CUSTOMER",
      emailVerifiedAt: new Date(),
    },
  });

  // --- Sample order with an artwork upload token ------------------------
  const sampleProduct = products[0];
  const material = sampleProduct.materialOptions[0];
  const unitPrice = sampleProduct.basePrice + material.priceModifier;

  const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      status: "PROCESSING",
      subtotal: unitPrice,
      discount: 0,
      total: unitPrice,
      shippingName: "Jane Customer",
      shippingLine1: "123 Main St",
      shippingCity: "Las Vegas",
      shippingState: "NV",
      shippingPostal: "89123",
      shippingCountry: "US",
      paypalOrderId: "SAMPLE-PAYPAL-ORDER-ID",
      uploadToken: "sample-upload-token-1234567890",
      uploadTokenExpiresAt: sevenDaysFromNow,
      items: {
        create: [
          {
            productId: sampleProduct.id,
            materialOptionId: material.id,
            widthIn: 96,
            heightIn: 80,
            quantity: 1,
            unitPrice,
            lineTotal: unitPrice,
          },
        ],
      },
    },
    include: { items: true },
  });

  await prisma.artworkUpload.create({
    data: {
      orderItemId: order.items[0].id,
    },
  });

  // --- Sample quote request ----------------------------------------------
  await prisma.quoteRequest.create({
    data: {
      name: "Bulk Buyer Co.",
      email: "buyer@example.com",
      productType: "Tension Fabric Backdrop Wall",
      size: "10ft x 8ft",
      quantity: 25,
      message: "Need pricing for a 25-unit trade show order, event in 6 weeks.",
    },
  });

  console.log("Seed complete:");
  console.log(`  Admin login:    admin@example.com / Admin@12345`);
  console.log(`  Customer login: customer@example.com / Customer@12345`);
  console.log(`  Products seeded: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
