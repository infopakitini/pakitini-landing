"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { packId } = useOrder();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes (e.g. tapping a link
  // that navigates to "/" from another page).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function goToSection(id) {
    setMenuOpen(false);
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
          <div className="announce-info">
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
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="wrap">
          <div className="logo">
            <img src="/images/logo-header.png" alt="Pakitini" className="logo-img-header" />
          </div>
          <div className={`nav-links${menuOpen ? " open" : ""}`}>
            <a onClick={() => goToSection("how")}>{t("nav_how")}</a>
            <a onClick={() => goToSection("reviews")}>{t("nav_reviews")}</a>
            <a onClick={() => goToSection("faq")}>{t("nav_faq")}</a>
            <div className="lang-toggle nav-lang-mobile">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
                EN
              </button>
              <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>
                العربية
              </button>
            </div>
          </div>
          <div className="nav-right">
            <div className="lang-toggle nav-lang-toggle">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
                EN
              </button>
              <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>
                العربية
              </button>
            </div>
            {pathname !== "/order" && (
              <button className="cart-btn" onClick={() => router.push(`/order?pack=${packId}`)}>
                {t("nav_order")}
              </button>
            )}
            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? t("menu_close") : t("menu_open")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
