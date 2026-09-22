# Pakitini — Cash on Delivery Landing Page

A single-product, Cash-on-Delivery landing page built with Next.js. No online
payment, no accounts, no database — a customer picks a pack, fills in
delivery details on a dedicated order page, and two emails go out: a plain
order notification to the business, and a formatted invoice to the customer.
Both are sent through Gmail's own SMTP (free, no domain required). Supports
English and Arabic (full RTL).

## Stack

- Next.js 16 (App Router, JavaScript)
- Plain CSS (no framework) — all styles in `app/globals.css`
- [Nodemailer](https://nodemailer.com) over Gmail SMTP for order emails — no
  third-party email API, no domain to buy or verify
- [Zod](https://zod.dev) for request validation (shared by client + server)
- No database — the owner notification email *is* the order record (v1 by design)

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
  api/order/route.js  POST handler: validates, resolves price server-side, emails via Gmail SMTP
lib/
  product.config.js   <-- EDIT THIS to change product name/pack prices/images/description
  translations.js     <-- EDIT THIS to change any English/Arabic copy
  validation.js        shared client + server validation rules
  orderId.js           order ID generator (COD-YYYYMMDD-XXXX)
  emailTemplate.js      the HTML email template — different framing for the
                        owner notification vs. the customer's invoice copy
  mailer.js             sends mail via Gmail SMTP (nodemailer)
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
GMAIL_USER=infopakitini@gmail.com
GMAIL_APP_PASSWORD=
FROM_NAME=Pakitini
ORDER_RECEIVER_EMAIL=infopakitini@gmail.com
```

- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — the Gmail account emails are sent
  from, authenticated with an **App Password** (not the account's normal
  login password). One-time setup on that Google account:
  1. Turn on 2-Step Verification: https://myaccount.google.com/security
  2. Create an App Password: https://myaccount.google.com/apppasswords
     — copy the 16-character value into `GMAIL_APP_PASSWORD`
- `ORDER_RECEIVER_EMAIL` is your business inbox — the plain "new order
  received" notification lands here (this is the actual order record; see
  §15 below).
- The customer separately receives their own invoice copy, emailed to
  whatever address they typed in the order form — no domain, no third-party
  email API, and it works for any recipient (unlike a shared sandbox sending
  domain, which is typically restricted to your own inbox until a custom
  domain is verified).

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
   **Project → Settings → Environment Variables** and add the same variables
   from `.env.example`:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `FROM_NAME`
   - `ORDER_RECEIVER_EMAIL`
4. Click **Deploy**. The order form's `/api/order` endpoint runs as a
   Vercel serverless function automatically — nothing needs to "stay running."

### Connecting your own domain

In the Vercel project, go to **Settings → Domains**, add your domain, and
follow Vercel's DNS instructions (usually an `A` record to Vercel's IP or a
`CNAME` for a subdomain). Once verified, update `metadataBase` in
`app/layout.js` to your real domain for correct SEO/social preview URLs.

## What's intentionally not included (v1)

- No database — orders exist only as the owner notification email.
- No online payment methods — Cash on Delivery only.
- No accounts, wishlist, cart page, or multi-product catalog.
- No order-management dashboard — read new orders from the inbox.

## Analytics (optional, later)

There's no analytics wired up by default. To add Meta Pixel / GA4 / TikTok
Pixel later, drop their script tags into `app/layout.js` inside `<body>`.
"# pakitini" 
