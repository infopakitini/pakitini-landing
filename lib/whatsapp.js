import { PRODUCT } from "./product.config";
import { translations } from "./translations";

// Builds a click-to-chat WhatsApp link pre-filled with the product name —
// no page link, just plain text — so replies land straight in context with
// no manual typing. Reuses kicker_sm's existing Arabic product name/tagline
// translation so the whole message is in one language, not mixed.
export function buildWhatsAppLink(lang = "ar") {
  const productLine = translations[lang]?.kicker_sm ?? `${PRODUCT.NAME} · ${PRODUCT.TAGLINE}`;
  const text = lang === "ar" ? `مرحباً، أريد ${productLine}` : `Hi, I want ${productLine}`;

  return `https://wa.me/${PRODUCT.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function useWhatsAppLink(lang) {
  return buildWhatsAppLink(lang);
}
