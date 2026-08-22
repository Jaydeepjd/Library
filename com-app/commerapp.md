# Technology Stack — What's Used and Why

This document explains every major technology in this project and the reasoning behind each
choice. The original assignment brief specified Laravel + MySQL; this build uses a different,
agreed-upon stack (React/Next.js + SQLite) — this file is the "why" behind that stack and every
library layered on top of it.

## Quick Reference Table

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | React-based, but with built-in SSR/SSG/routing needed to hit the SEO + Core Web Vitals requirements a plain SPA can't reach |
| Language | **TypeScript** | Catches data-shape mistakes (wrong field name, null handling) at compile time across a codebase with a lot of shared types between client and server |
| Styling | **Tailwind CSS v4** | Fast to build and restyle a whole design system (this project was restyled twice) without hand-writing and naming CSS files |
| Database | **SQLite** | Explicitly requested for this build — zero setup, a single file, no separate DB server to run |
| ORM | **Prisma 7** (`@prisma/adapter-better-sqlite3`) | Type-safe queries generated from the schema; the driver-adapter model is how Prisma 7 talks to SQLite |
| Auth | **bcryptjs + jose (JWT cookies)** | A small, fully custom, dependency-light auth flow — easy to read end-to-end for a project this size, no external auth service needed |
| Validation | **Zod** | Validates form input and Server Action payloads with types inferred automatically, instead of hand-written `if` checks |
| Payments | **PayPal Sandbox** (`@paypal/react-paypal-js` + REST API) | The assignment's payment gateway requirement; sandbox mode needs no real money to test |
| Email | **Nodemailer** | SMTP is standard and swappable — same code path works with a free test inbox (Ethereal) locally and a real provider (SES, Resend, etc.) in production |
| File storage | **Node `fs`** (local disk) | Artwork uploads don't need cloud storage at this scale; a token-gated local folder keeps the security model simple to reason about |
| Invoices | **@react-pdf/renderer** | Generates a real downloadable PDF using React component syntax, run server-side in a route handler |
| Cart state | **Zustand** (+ `persist`) | A cart that survives a page refresh without needing a database table, using ~20 lines of code instead of Redux/Context boilerplate |
| Admin charts | **Recharts** | The revenue dashboard's monthly bar chart, without hand-rolling SVG chart math |
| "Controllers" | **Next.js Server Actions** | Functions like `createOrder`, `login`, `uploadArtwork` run only on the server and are called directly from forms/components — no separate REST/API layer to define and keep in sync |

## Why Next.js Instead of a Plain React SPA

This was the first and most consequential decision. A plain React app (Create React App or Vite
+ React Router) renders everything in the browser after a blank page loads — that's a real
problem for two requirements in the brief:

- **"SEO-friendly URLs, no query strings"** — needs the server to know what page is being
  requested and render real HTML for it, not a client-side router figuring it out after the JS
  loads.
- **"Core Web Vitals 100/100 (Mobile + Desktop)"** — Largest Contentful Paint in particular is
  hard to hit from a client-rendered SPA, because the browser has to download and execute a JS
  bundle before *anything* meaningful appears on screen.

Next.js's App Router renders pages on the server by default (React Server Components), sends
real HTML immediately, and only ships JavaScript for the interactive parts (mega menu, cart,
price calculator, checkout). That's the direct reason the homepage, category pages, and product
pages are Server Components with small "islands" of client-side interactivity, rather than one
big client-rendered app.

## Why SQLite via Prisma's Driver Adapter (Not a Connection String)

Prisma 6 and earlier let you put a SQLite file path directly in `schema.prisma`. **Prisma 7
removed that** — SQLite access now goes through an explicit driver adapter
(`@prisma/adapter-better-sqlite3`) constructed in code (`src/lib/prisma.ts`). This project is on
Prisma 7, so that's the only supported path; it's mentioned here because it's a genuine "gotcha"
if you're used to older Prisma docs/tutorials.

## Why a Custom Auth Flow Instead of NextAuth/Auth.js

The brief specifically wants **email/password registration with an email-verification step**,
tracked with a `Role` (customer/admin) on the `User` table. That's a small, well-defined flow:
hash the password (bcryptjs), sign a session token (jose/JWT) into an httpOnly cookie, and store
a one-time verification token with an expiry. Pulling in a full auth framework would add
configuration surface (providers, adapters, callbacks) for a flow that's actually simpler to
just read top-to-bottom in `src/lib/actions/auth.ts` and `src/lib/session.ts`.

## Why Server Actions Instead of a REST/API Layer

The original brief's Laravel structure implies controllers and routes for each operation (place
order, update order status, submit quote, etc.). Next.js Server Actions are the direct
equivalent in this stack: an `async function` marked `"use server"` that runs only on the
server, is fully type-checked end-to-end (no manually-kept-in-sync `fetch` + API route + request
type), and can be called straight from a `<form action={...}>` or a button's `onClick`. Every
"controller action" in this app — `registerAction`, `createCheckoutPaypalOrder`,
`captureCheckoutOrder`, `uploadArtworkAction`, `updateOrderStatusAction`, and so on — lives in
`src/lib/actions/`.

## Why PayPal Specifically

The brief allowed **Stripe OR PayPal**, both in sandbox/test mode. PayPal was the chosen option
for this build. The integration has two halves:
- `@paypal/react-paypal-js` renders the actual Pay button in the browser.
- The server (`src/lib/paypal.ts`) independently creates the PayPal order and captures payment
  via PayPal's REST API — the checkout total is *recomputed from the database* on the server
  before either of those calls, so a tampered client-side price can never reach PayPal or get
  written to an `Order` row.

## Why Local Disk for Artwork Instead of S3/Cloud Storage

At this project's scale (a scoped assignment, not a production SaaS), a cloud storage bucket
adds an external account, credentials, and a billing dependency for no real benefit over a
folder on disk (`storage/artwork/`) gated by a random, expiring token stored in the database.
The upload/download code path is intentionally isolated in
`src/lib/actions/artwork.ts` so swapping it for S3 later is a contained change, not a rewrite.

## Where This Stack Diverges From the Original Laravel Brief

| Laravel concept | This project's equivalent |
|---|---|
| Controllers | Server Actions (`src/lib/actions/*.ts`) |
| Blade views | React Server Components (`src/app/**/page.tsx`) |
| Eloquent models/migrations | Prisma schema + migrations (`prisma/schema.prisma`) |
| Laravel Breeze/Sanctum | Custom bcrypt + JWT-cookie session (`src/lib/auth.ts`, `src/lib/session.ts`) |
| Laravel Jobs (queued emails) | Plain `async` calls inside Server Actions — acceptable at this scale, called out as a known simplification in `README.md` |
| MySQL | SQLite (via Prisma driver adapter) |
