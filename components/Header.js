"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT } from "@/lib/product.config";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { packId } = useOrder();
  const router = useRouter();
  const pathname = usePathname();

  function goToSection(id) {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <>
      <div className="announce">
        <div className="wrap">
          <span className="chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M2 10h20" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>{t("announce_cod")}</span>
          </span>
          <span className="sep">·</span>
          <span className="chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="6" width="14" height="11" rx="1" />
              <path d="M15 10h4l3 3v4h-7z" />
              <circle cx="6" cy="18" r="1.6" />
              <circle cx="17.5" cy="18" r="1.6" />
            </svg>
            <span>{t("announce_delivery")}</span>
          </span>
          <div className="lang-toggle">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>
              العربية
            </button>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="wrap">
          <div className="logo">
            {PRODUCT.LOGO ? (
              <img src={PRODUCT.LOGO} alt={PRODUCT.NAME} className="logo-img" />
            ) : (
              <>
                Pak<span className="dot">i</span>t<span className="dot">i</span>ni
              </>
            )}
          </div>
          <div className="nav-links">
            <a onClick={() => goToSection("how")}>{t("nav_how")}</a>
            <a onClick={() => goToSection("reviews")}>{t("nav_reviews")}</a>
            <a onClick={() => goToSection("faq")}>{t("nav_faq")}</a>
          </div>
          {pathname !== "/order" && (
            <button className="cart-btn" onClick={() => router.push(`/order?pack=${packId}`)}>
              {t("nav_order")}
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
