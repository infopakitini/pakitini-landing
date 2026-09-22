import nodemailer from "nodemailer";

let transporter = null;

// Sends mail through Gmail's own SMTP using an App Password — this lets
// order emails genuinely come from a real @gmail.com address with no
// domain to buy or verify, unlike a third-party email API's shared sending
// domain (which can only deliver to the account owner's own address until
// a custom domain is verified).
function getTransporter() {
  if (transporter) return transporter;

  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  return transporter;
}

export async function sendMail({ to, replyTo, subject, html }) {
  const t = getTransporter();
  if (!t) throw new Error("mailer_not_configured");

  await t.sendMail({
    from: `"${process.env.FROM_NAME || "Pakitini"}" <${process.env.GMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });
}
