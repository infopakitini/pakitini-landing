"use client";

import { useLang } from "./LangProvider";
import OrderForm from "./OrderForm";

export default function OrderSection() {
  const { t } = useLang();

  return (
    <section id="order" style={{ background: "var(--cream)" }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="section-head">
          <span className="kicker">{t("order_kicker")}</span>
          <h2>{t("order_h2")}</h2>
          <p>{t("order_p")}</p>
        </div>

        <div className="trust-mini order-trust">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M2 10h20" />
            </svg>
            <span>{t("trust_cod")}</span>
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>{t("trust_return")}</span>
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t("trust_secure")}</span>
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span>{t("trust_support")}</span>
          </span>
        </div>

        <OrderForm />
      </div>
    </section>
  );
}
