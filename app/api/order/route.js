import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrder } from "@/lib/validation";
import { generateOrderId } from "@/lib/orderId";
import { buildOrderEmailHtml, DELIVERY_TIME_LABELS } from "@/lib/emailTemplate";
import { PRODUCT, getPackById } from "@/lib/product.config";

export const runtime = "nodejs";

// Best-effort in-memory rate limit. Resets on cold start — this is a
// spam speed bump, not a durable limiter (no DB in this project).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  const result = validateOrder(body);
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: "validation_failed", fieldErrors: result.fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  // Honeypot filled in => treat as bot, pretend success without emailing.
  if (data.honeypot) {
    return NextResponse.json({ success: true, orderId: generateOrderId() });
  }

  const { RESEND_API_KEY, ORDER_RECEIVER_EMAIL, FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ORDER_RECEIVER_EMAIL || !FROM_EMAIL) {
    console.error("Order API misconfigured: missing Resend env vars");
    return NextResponse.json({ success: false, error: "server_misconfigured" }, { status: 500 });
  }

  // Price is always resolved server-side from packId — never trust a
  // client-supplied price or total.
  const pack = getPackById(data.packId);
  const orderId = generateOrderId();
  const createdAt = new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" });
  const deliveryTimeLabel =
    data.deliveryTime === "custom" ? data.customDeliveryTime : DELIVERY_TIME_LABELS[data.deliveryTime];

  const emailFields = {
    orderId,
    createdAt,
    itemLabel: pack.labelEn,
    pieces: pack.pieces,
    total: pack.price,
    currency: PRODUCT.CURRENCY,
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    city: data.city,
    deliveryTimeLabel,
    notes: data.notes,
  };

  const resend = new Resend(RESEND_API_KEY);

  // The owner notification is the actual order record — its delivery is
  // required for the request to count as a success.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ORDER_RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `New Order Received — ${orderId} (${PRODUCT.CURRENCY} ${pack.price})`,
      html: buildOrderEmailHtml({ ...emailFields, recipient: "owner" }),
    });

    if (error) {
      console.error("Owner notification email failed:", error);
      return NextResponse.json({ success: false, error: "email_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Owner notification email threw:", err);
    return NextResponse.json({ success: false, error: "email_failed" }, { status: 502 });
  }

  // The customer's invoice copy is best-effort — a failure here shouldn't
  // undo an order that's already been recorded via the owner email above.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: ORDER_RECEIVER_EMAIL,
      subject: `Your ${PRODUCT.NAME} Order Invoice — ${orderId}`,
      html: buildOrderEmailHtml({ ...emailFields, recipient: "customer" }),
    });
    if (error) console.error("Customer invoice email failed:", error);
  } catch (err) {
    console.error("Customer invoice email threw:", err);
  }

  return NextResponse.json({
    success: true,
    orderId,
    quantity: pack.pieces,
    total: pack.price,
  });
}
