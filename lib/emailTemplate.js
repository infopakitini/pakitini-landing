import { PRODUCT } from "./product.config";

const DELIVERY_TIME_LABELS = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  custom: "Custom",
};

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function infoRow(label, value) {
  return `
    <tr>
      <td style="padding:4px 0;color:#6E6462;font-size:12.5px;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:4px 0;color:#151315;font-size:13.5px;font-weight:600;">${value}</td>
    </tr>`;
}

// Renders the order as a formatted email: business + customer details, an
// itemized line-item table, and totals. Used for two different audiences:
// - recipient "owner": an internal "new order received" notification (the
//   permanent order record, since there's no database in this project) —
//   deliberately not framed as an invoice, since it isn't one.
// - recipient "customer": the actual invoice/receipt emailed to the buyer.
export function buildOrderEmailHtml(order) {
  const {
    orderId,
    createdAt,
    itemLabel,
    pieces,
    total,
    currency,
    name,
    phone,
    email,
    address,
    city,
    deliveryTimeLabel,
    notes,
    recipient = "owner",
  } = order;

  const isCustomer = recipient === "customer";
  const badgeText = isCustomer ? "YOUR INVOICE" : "NEW ORDER RECEIVED";
  const metaLabel = isCustomer ? "INVOICE NO." : "ORDER NO.";
  const introHtml = isCustomer
    ? `<tr>
        <td style="padding:22px 28px 0;">
          <p style="margin:0;font-size:14px;color:#151315;">Thank you for your order, ${escapeHtml(name)}! Here's your invoice for your records. Our team will contact you shortly to confirm.</p>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#FBF8F6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF8F6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E4EAE6;">

            <!-- Header -->
            <tr>
              <td style="background:#151315;padding:24px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color:#fff;font-size:20px;font-weight:700;letter-spacing:0.04em;">${escapeHtml(PRODUCT.NAME)}</td>
                    <td align="right" style="color:#C99A2E;font-size:13px;font-weight:700;letter-spacing:0.05em;">${badgeText}</td>
                  </tr>
                </table>
              </td>
            </tr>

            ${introHtml}

            <!-- Order meta -->
            <tr>
              <td style="padding:22px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:11px;color:#6E6462;letter-spacing:0.05em;font-weight:700;">${metaLabel}</div>
                      <div style="font-size:16px;color:#151315;font-weight:700;">${escapeHtml(orderId)}</div>
                    </td>
                    <td align="right">
                      <div style="font-size:11px;color:#6E6462;letter-spacing:0.05em;font-weight:700;">DATE &amp; TIME</div>
                      <div style="font-size:13.5px;color:#151315;font-weight:600;">${escapeHtml(createdAt)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Bill to / Deliver to -->
            <tr>
              <td style="padding:22px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="vertical-align:top;">
                      <div style="font-size:11px;color:#1F6F4A;letter-spacing:0.05em;font-weight:700;margin-bottom:8px;">BILL TO</div>
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        ${infoRow("Name:", escapeHtml(name))}
                        ${infoRow("Phone:", escapeHtml(phone))}
                        ${infoRow("Email:", escapeHtml(email))}
                      </table>
                    </td>
                    <td width="50%" style="vertical-align:top;">
                      <div style="font-size:11px;color:#1F6F4A;letter-spacing:0.05em;font-weight:700;margin-bottom:8px;">DELIVER TO</div>
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        ${infoRow("Address:", escapeHtml(address))}
                        ${infoRow("City / Area:", escapeHtml(city))}
                        ${infoRow("Preferred Time:", escapeHtml(deliveryTimeLabel))}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Line items -->
            <tr>
              <td style="padding:24px 28px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:2px solid #151315;font-size:11px;color:#6E6462;letter-spacing:0.05em;font-weight:700;">ITEM</td>
                    <td align="center" style="padding:10px 0;border-bottom:2px solid #151315;font-size:11px;color:#6E6462;letter-spacing:0.05em;font-weight:700;">PIECES</td>
                    <td align="right" style="padding:10px 0;border-bottom:2px solid #151315;font-size:11px;color:#6E6462;letter-spacing:0.05em;font-weight:700;">PRICE</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #E4EAE6;font-size:14px;color:#151315;font-weight:600;">${escapeHtml(PRODUCT.NAME)} — ${escapeHtml(itemLabel)}</td>
                    <td align="center" style="padding:14px 0;border-bottom:1px solid #E4EAE6;font-size:14px;color:#151315;">${pieces}</td>
                    <td align="right" style="padding:14px 0;border-bottom:1px solid #E4EAE6;font-size:14px;color:#151315;font-weight:700;">${currency} ${total}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Totals -->
            <tr>
              <td style="padding:0 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td></td>
                    <td width="220">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:14px 0 4px;font-size:13.5px;color:#6E6462;">Subtotal</td>
                          <td align="right" style="padding:14px 0 4px;font-size:13.5px;color:#151315;">${currency} ${total}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0;border-top:2px solid #151315;font-size:15px;color:#151315;font-weight:700;">Total Due</td>
                          <td align="right" style="padding:12px 0;border-top:2px solid #151315;font-size:17px;color:#1F6F4A;font-weight:700;">${currency} ${total}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Payment + notes -->
            <tr>
              <td style="padding:8px 28px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E7F3EC;border-radius:6px;">
                  <tr>
                    <td style="padding:12px 16px;font-size:13.5px;color:#134E33;font-weight:700;">
                      ${
                        isCustomer
                          ? `Payment Method: Cash on Delivery — pay ${currency} ${total} in cash when your order arrives.`
                          : `Payment Method: Cash on Delivery — collect ${currency} ${total} from the customer on delivery.`
                      }
                    </td>
                  </tr>
                </table>
                ${
                  notes
                    ? `<div style="margin-top:14px;font-size:12.5px;color:#6E6462;"><b style="color:#151315;">Order Notes:</b> ${escapeHtml(notes)}</div>`
                    : ""
                }
              </td>
            </tr>

            <tr>
              <td style="background:#FBF8F6;padding:14px 28px;text-align:center;border-top:1px solid #E4EAE6;">
                <span style="color:#6E6462;font-size:12px;">This order was placed on the ${escapeHtml(PRODUCT.NAME)} landing page.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export { DELIVERY_TIME_LABELS };
