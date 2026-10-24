import { PRODUCT } from "./product.config";

// The real live domain is paki-tini.com (with a hyphen) — not "Pakitini.com",
// which isn't ours and would 404 for a customer who typed it.
const SITE_DOMAIN = "paki-tini.com";

// Builds a click-to-chat WhatsApp link pre-filled with a greeting — no page
// link beyond the domain mention, just plain text — so replies land straight
// in context with no manual typing.
export function buildWhatsAppLink(lang = "ar") {
  const text =
    lang === "ar"
      ? `مرحباً بفريق ${PRODUCT.NAME}! 👋 وجدت موقعكم ${SITE_DOMAIN} وأنا مهتم بمنتجاتكم. هل يمكنكم تزويدي بمزيد من التفاصيل والأسعار؟ 😊`
      : `Hi ${PRODUCT.NAME}! 👋 I found you on ${SITE_DOMAIN} and I'm interested in your products. Could you please share more details and pricing? 😊`;

  return `https://wa.me/${PRODUCT.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function useWhatsAppLink(lang) {
  return buildWhatsAppLink(lang);
}
