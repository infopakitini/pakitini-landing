import { PRODUCT } from "./product.config";

// Builds a click-to-chat WhatsApp link pre-filled with the product name —
// no page link, just plain text — so replies land straight in context with
// no manual typing.
export function buildWhatsAppLink(lang = "en") {
  const productLine = `${PRODUCT.NAME} · ${PRODUCT.TAGLINE}`;
  const text = lang === "ar" ? `مرحباً، أريد ${productLine}` : `Hi, I want ${productLine}`;

  return `https://wa.me/${PRODUCT.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function useWhatsAppLink(lang) {
  return buildWhatsAppLink(lang);
}
