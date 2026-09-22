import { useEffect, useState } from "react";
import { PRODUCT } from "./product.config";

// Builds a click-to-chat WhatsApp link pre-filled with the product name and
// (once known) a link back to the page the customer was on, so replies land
// straight in context with no manual typing. `pageUrl` is omitted during
// server rendering (and the client's first paint) so the two match exactly —
// see useWhatsAppLink below for how the real URL gets filled in afterward.
export function buildWhatsAppLink(lang = "en", pageUrl = "") {
  const productLine = `${PRODUCT.NAME} · ${PRODUCT.TAGLINE}`;
  const suffix = pageUrl ? `\n${pageUrl}` : "";
  const text = lang === "ar" ? `مرحباً، أريد ${productLine}${suffix}` : `Hi, I want ${productLine}${suffix}`;

  return `https://wa.me/${PRODUCT.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Client-only: fills in the current page URL after mount, avoiding an
// SSR/client hydration mismatch (the server can't know window.location).
export function useWhatsAppLink(lang) {
  const [href, setHref] = useState(() => buildWhatsAppLink(lang));

  useEffect(() => {
    setHref(buildWhatsAppLink(lang, window.location.href));
  }, [lang]);

  return href;
}
