"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT } from "@/lib/product.config";
import { useWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  const { lang, t } = useLang();
  const { packId } = useOrder();
  const router = useRouter();
  const pathname = usePathname();
  const whatsappHref = useWhatsAppLink(lang);

  function goToSection(id) {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo">
              {PRODUCT.LOGO ? (
                <img src={PRODUCT.LOGO} alt={PRODUCT.NAME} className="logo-img logo-img-invert" />
              ) : (
                <>
                  Pak<span className="dot">i</span>t<span className="dot">i</span>ni
                </>
              )}
            </div>
            <p className="about">{t("footer_about")}</p>
            <div className="cod-footer-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M2 10h20" />
              </svg>
              <span>{t("cod_footer")}</span>
            </div>
          </div>
          <div>
            <h5>{t("shop_h")}</h5>
            <ul>
              <li><a onClick={() => router.push(`/order?pack=${packId}`)}>{t("shop1")}</a></li>
              <li><a onClick={() => goToSection("how")}>{t("shop2")}</a></li>
              <li><a onClick={() => goToSection("reviews")}>{t("shop3")}</a></li>
              <li><a onClick={() => goToSection("faq")}>{t("shop4")}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t("support_h")}</h5>
            <ul>
              <li><a onClick={() => router.push("/returns")}>{t("support1")}</a></li>
              <li><a onClick={() => goToSection("faq")}>{t("support2")}</a></li>
              <li><a href={whatsappHref} target="_blank" rel="noreferrer">{t("support3")}</a></li>
              <li><a href={`mailto:${PRODUCT.SUPPORT_EMAIL}`}>{t("support4")}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t("copyright", { year: PRODUCT.BRAND_COPYRIGHT_YEAR })}</span>
          <span>
            {t("legal_privacy")} · {t("legal_terms")} ·{" "}
            <a onClick={() => router.push("/returns")}>{t("legal_returns")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
