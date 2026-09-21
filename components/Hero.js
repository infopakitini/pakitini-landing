"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT } from "@/lib/product.config";
import PackPicker from "./PackPicker";

export default function Hero() {
  const { lang, t } = useLang();
  const { packId, total } = useOrder();
  const [activeThumb, setActiveThumb] = useState(0);
  const router = useRouter();
  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  function goToOrder() {
    router.push(`/order?pack=${packId}`);
  }

  return (
    <header className="hero" id="hero">
      <div className="wrap">
        <div className="hero-copy">
          <div className="badge-viral">{t("badge_viral")}</div>
          <div className="kicker-sm">{t("kicker_sm")}</div>
          <h1>{t("hero_h1")}</h1>
          <div className="rating-row">
            <span className="stars">★★★★★</span> <span>{t("rating_text")}</span>
          </div>

          <ul className="bullets">
            {["bullet1", "bullet2", "bullet3", "bullet4"].map((key) => (
              <li key={key}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          <PackPicker />

          <div className="cod-banner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M2 10h20" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>{t("cod_banner_pre")}</span>&nbsp;
            <span>
              {currency} {total}
            </span>
            &nbsp;<span>{t("cod_banner_post")}</span>
          </div>

          <button className="checkout-btn" onClick={goToOrder}>
            {t("checkout_pre")} {currency} {total} {t("checkout_post")}
          </button>
          <div className="cod-fine">{t("cod_fine")}</div>

          <div className="trust-mini">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
              </svg>
              <span>{t("trust1")}</span>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
              <span>{t("trust2")}</span>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9Z" />
              </svg>
              <span>{t("trust3")}</span>
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>{t("trust4")}</span>
            </span>
          </div>
        </div>

        <div className="gallery">
          <div className="gallery-main">
            <img src={PRODUCT.THUMBNAILS[activeThumb]} alt={PRODUCT.NAME} />
          </div>
          <div className="gallery-thumbs">
            {PRODUCT.THUMBNAILS.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`thumb${i === activeThumb ? " active" : ""}`}
                onClick={() => setActiveThumb(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
