# PrintCraft — Custom Printing eCommerce

A custom printing & display products storefront: browse products with custom size/material
configuration, checkout with PayPal (sandbox), upload artwork after payment, track orders, and
manage everything from an admin dashboard.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Prisma + SQLite**, as an
alternative stack to the original Laravel/MySQL brief — see [Architecture notes](#architecture-notes)
for why.

## Tech Stack

| Component | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Components + Server Actions) |
| Styling | Tailwind CSS |
| Database | SQLite, via Prisma ORM (`@prisma/adapter-better-sqlite3`) |
| Auth | Custom credentials auth — bcrypt password hashing, signed JWT session cookie (`jose`), email verification tokens |
| Payment | PayPal Sandbox (`@paypal/react-paypal-js` + PayPal REST API) |
| Email | Nodemailer (SMTP; use [Ethereal](https://ethereal.email/create) for local dev) |
| File storage | Local disk (`storage/artwork/`), served only through a token-gated upload flow |
| Invoice PDF | `@react-pdf/renderer` |
| Charts | Recharts (admin revenue dashboard) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Paste it into `SESSION_SECRET` in `.env`.

### 3. PayPal Sandbox setup

The app needs PayPal **sandbox** credentials to process test payments:

1. Go to <https://developer.paypal.com/dashboard/> and log in (or create a free developer account).
2. Under **Sandbox → Accounts**, confirm you have a default business (merchant) and personal
   (buyer) test account — PayPal creates these automatically for new developer accounts.
3. Go to **Apps & Credentials**, make sure the **Sandbox** toggle (not Live) is selected, click
   **Create App**, and give it any name.
4. Copy the generated **Client ID** and **Secret** into `.env`:
   ```
   PAYPAL_CLIENT_ID="..."
   PAYPAL_CLIENT_SECRET="..."
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="..."   # same Client ID, exposed to the browser
   ```
5. At checkout, log in with the sandbox **personal (buyer)** account's email/password to pay.

Without these set, the checkout page still renders but shows a "PayPal not configured" notice
instead of the payment button.

### 4. Email (optional for local dev)

Order confirmations, verification links, and quote notifications are sent via SMTP. For local
testing without a real mail server, create a free inbox at
[ethereal.email/create](https://ethereal.email/create) and paste the generated SMTP credentials
into `.env` (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`). Every send logs a preview URL to the
terminal. If left blank, mail sending will fail silently (caught and logged) — it won't block
registration, checkout, etc.

### 5. Set up the database

```bash
npx prisma migrate dev   # creates dev.db and applies the schema
npm run db:seed          # seeds categories, products, promo codes, demo users, a sample order
```

Seeded logins:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `Admin@12345` |
| Customer | `customer@example.com` | `Customer@12345` |

Seeded promo codes: `WELCOME10` (10% off), `SAVE20` ($20 off).

### 6. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

## Project Structure

```
prisma/schema.prisma        Data model (User, Category, Product, Order, ArtworkUpload, ...)
prisma/seed.ts               Demo data seeder
src/app/                     Routes (App Router) — storefront, account, admin, checkout, API-less
                              server actions
src/components/              UI components, grouped by feature (layout, product, cart, checkout,
                              auth, artwork, admin, quote)
src/lib/actions/             Server Actions (auth, checkout, artwork upload, admin, quote, promo)
src/lib/data/                Read-only Prisma query helpers used by pages
src/lib/{prisma,auth,session,pricing,paypal,email}.ts   Core server utilities
storage/artwork/             Uploaded artwork files (gitignored; created at runtime)
```

## Key Flows

- **Custom pricing**: `src/lib/pricing.ts` derives a per-square-foot rate from each product's
  base price (anchored to an 8ft × 8ft reference size), applies the selected material's price
  modifier, then a quantity-based bulk discount (5% at 5+, 10% at 10+, 15% at 25+). This same
  function runs both client-side (live price preview) and server-side (authoritative order total)
  — the server never trusts a client-submitted price.
- **Checkout → PayPal**: `src/lib/actions/checkout.ts` recomputes the cart total server-side,
  creates a PayPal order, and on approval captures payment before creating the `Order` in the
  database — payment is verified before anything is persisted.
- **Artwork upload**: on successful checkout, one shared secure upload link is generated per
  order (`Order.uploadToken`, expires in 7 days — see `ARTWORK_LINK_EXPIRY_DAYS`), shown on the
  Thank You page and emailed. The link leads to a page listing one upload slot per order item
  (PDF/PNG/AI, 50MB max). The same link/token is reused for the authenticated "re-upload from
  account order history" flow, so the rule is consistent everywhere: one upload per item, until
  the 7-day window closes.

## Known Simplifications

This was built to a scoped assignment brief, not a production system. Notable simplifications:

- **Cart** is stored client-side (localStorage via Zustand), not a server-side cart table — it's
  converted into real `Order`/`OrderItem` rows only at successful checkout.
- **Currency/country selector** in the header is display-only; there's no multi-currency payment
  processing.
- **"Jobs/Queue"** (order emails, notifications) run as plain `async` calls inside Server Actions
  rather than a real background queue — acceptable at this scale, called out here since the
  original Laravel brief specified Laravel Jobs.
- **Admin dashboard** aggregates revenue/top-products in application code (small dataset), not
  SQL-level aggregation — fine for a seeded demo, would need revisiting at real scale.

## Architecture Notes

The original brief specified Laravel + MySQL. This build uses **Next.js + SQLite** instead
(agreed direction for this assignment). A few decisions worth calling out:

- Next.js was chosen over a plain React SPA specifically because of the brief's **SEO-friendly
  URLs (no query strings)** and **Core Web Vitals 100/100** requirements — both are realistic
  with Server Components + `next/image` + `next/font`, and much harder to hit from a pure
  client-rendered SPA.
- SQLite access uses Prisma 7's driver-adapter model (`@prisma/adapter-better-sqlite3`) — Prisma
  7 no longer reads the datasource URL directly from `schema.prisma` for SQLite; the adapter is
  constructed explicitly in `src/lib/prisma.ts`.
- **Do not deploy this to a serverless/edge platform (e.g. Vercel functions) as-is** — their
  filesystem is ephemeral/read-only outside `/tmp`, so the SQLite file and uploaded artwork
  wouldn't persist. This is set up to run as a normal long-running Node process (`npm run
  build && npm run start`) on a host with a persistent disk (e.g. Railway, Render, a VPS) — see
  below.

## Performance / SEO

- Server Components by default; only interactive islands (mega menu, price calculator, cart,
  checkout, admin controls) are Client Components.
- `next/image` for all product imagery (auto AVIF/WebP + explicit dimensions → CLS stays at 0).
- `next/font` for zero layout shift on font load.
- Per-page `generateMetadata()` for dynamic titles/descriptions; `/robots.txt` and `/sitemap.xml`
  are generated from the live category/product data.
- Homepage, category, and product pages use ISR (`revalidate = 60`) so repeat visits are served
  from cache.
- **PageSpeed Insights screenshot (100/100 Mobile + Desktop)** — pending: run
  `npm run build && npm run start` against a deployed/public URL and capture from
  <https://pagespeed.web.dev/>, then add the screenshot here.

## Deliverables Checklist

- [x] GitHub-ready repo with MVC-style structure (Server Actions in place of controllers)
- [x] `.env.example` with every required key documented
- [x] `README.md` with local setup instructions (this file)
- [x] PayPal sandbox setup documented above
- [x] Database seeder (categories, products, users, a sample order)
- [ ] PageSpeed Insights screenshot — add once deployed
- [ ] Loom/screen recording of the artwork upload flow — record after PayPal sandbox keys are in
      place, walking through: sign up → verify email → add to cart → checkout → pay with sandbox
      PayPal → Thank You page → artwork upload link → upload a file → account order history
      shows it as uploaded.

## Hosting

Not yet deployed (by design — see conversation with the requester: build and validate locally
first). When ready: containerize with `npm run build` + `npm run start`, mount a persistent
volume for `dev.db` and `storage/artwork/`, and deploy to Railway or Render (both free-tier
options that support persistent disks and long-running Node processes, unlike serverless
platforms — see [Architecture Notes](#architecture-notes)).
