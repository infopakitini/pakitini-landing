# Pakitini — Cash on Delivery Landing Page

A single-product, Cash-on-Delivery landing page built with Next.js. No online
payment, no accounts, no database — a customer picks a pack, fills in
delivery details on a dedicated order page, and the order is emailed to the
business via [Resend](https://resend.com) as a formatted invoice. Supports
English and Arabic (full RTL).

## Stack

- Next.js 16 (App Router, JavaScript)
- Plain CSS (no framework) — all styles in `app/globals.css`
- [Resend](https://resend.com) for transactional order emails
- [Zod](https://zod.dev) for request validation (shared by client + server)
- No database — the order email *is* the order record (v1 by design)

## Pages

- `/` — the marketing landing page (hero, pack picker, benefits, FAQ, etc.)
- `/order?pack=<standard|pro|family>` — the dedicated checkout page (order
  summary + delivery form). Every "Order Now" button/link on `/` sends the
  customer here with the selected pack in the URL, so the page shows the
  right price even on a fresh load, reload, or shared/bookmarked link — it
  doesn't depend on client-side state carried over from the home page.

## Project structure

```
app/
  layout.js          fonts, <html lang/dir>, SEO metadata
  page.js            the landing page (marketing sections)
  order/page.js      the checkout page (reads ?pack= from the URL)
  globals.css         all styling
  api/order/route.js  POST handler: validates, resolves price server-side, emails via Resend
lib/
  product.config.js   <-- EDIT THIS to change product name/pack prices/images/description
  translations.js     <-- EDIT THIS to change any English/Arabic copy
  validation.js        shared client + server validation rules
  orderId.js           order ID generator (COD-YYYYMMDD-XXXX)
  emailTemplate.js      the invoice-style HTML email sent for each new order
  savedCustomer.js      remembers a customer's own details in localStorage so
                        the order form auto-fills on a return visit (this
                        device only — never sent anywhere but the order form)
components/           all UI sections (Hero, PackPicker, OrderForm, Footer, etc.)
public/images/        real product photos, logo, and kitchen-use videos
```

## Editing the product

Everything about the product lives in **`lib/product.config.js`**:
`NAME`, `TAGLINE`, `PRICE`, `OLD_PRICE`, `CURRENCY`, `IMAGE`, `THUMBNAILS`,
`DESCRIPTION`, `MAX_QUANTITY`, `WHATSAPP_NUMBER`, `SUPPORT_EMAIL`, etc.
Change it there — nothing else needs to be touched.

All customer-facing text (headlines, FAQ, buttons, error messages, the
success screen) lives in **`lib/translations.js`** as `en` / `ar` objects.

## Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
ORDER_RECEIVER_EMAIL=infopakitini@gmail.com
FROM_EMAIL=onboarding@resend.dev
```

- Get `RESEND_API_KEY` from the [Resend dashboard](https://resend.com/api-keys).
- `ORDER_RECEIVER_EMAIL` is your business inbox — every new order's invoice
  email lands here. This can be a normal Gmail address like
  `infopakitini@gmail.com`.
- `FROM_EMAIL` is the address Resend sends **as**, and it **cannot** be a
  Gmail/Yahoo/Outlook address — Resend requires a domain you own and verify
  via DNS, since nobody can verify ownership of `gmail.com`. Use the shared
  sandbox `onboarding@resend.dev` while testing (works immediately); once you
  buy a domain, verify it in Resend and switch to `orders@yourdomain.com`.
  The order email's Reply-To is always set to the customer's email, so
  replying from your Gmail inbox reaches the customer directly either way.

Then:

```bash
npm run dev
```

Open http://localhost:3000. If the env vars aren't set, the order form will
fail gracefully with a retry message instead of pretending to succeed.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New → Project** and import
   that repository. Vercel auto-detects Next.js — no build config needed.
3. Before the first deploy (or right after, then redeploy), go to
   **Project → Settings → Environment Variables** and add the same three
   variables from `.env.example`:
   - `RESEND_API_KEY`
   - `ORDER_RECEIVER_EMAIL`
   - `FROM_EMAIL`
4. Click **Deploy**. The order form's `/api/order` endpoint runs as a
   Vercel serverless function automatically — nothing needs to "stay running."

### Connecting your own domain

In the Vercel project, go to **Settings → Domains**, add your domain, and
follow Vercel's DNS instructions (usually an `A` record to Vercel's IP or a
`CNAME` for a subdomain). Once verified, update `metadataBase` in
`app/layout.js` to your real domain for correct SEO/social preview URLs.

## What's intentionally not included (v1)

- No database — orders exist only as the email sent via Resend.
- No online payment methods — Cash on Delivery only.
- No accounts, wishlist, cart page, or multi-product catalog.
- No order-management dashboard — read new orders from the inbox.

## Analytics (optional, later)

There's no analytics wired up by default. To add Meta Pixel / GA4 / TikTok
Pixel later, drop their script tags into `app/layout.js` inside `<body>`.
"# pakitini" 
