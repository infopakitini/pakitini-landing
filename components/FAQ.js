"use client";

import { useLang } from "./LangProvider";

export default function FAQ() {
  const { t } = useLang();
  const faqs = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <section id="faq" style={{ background: "var(--cream)" }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="section-head">
          <span className="kicker">{t("faq_kicker")}</span>
          <h2>{t("faq_h2")}</h2>
        </div>
        {faqs.map((n, i) => (
          <details className="faq-item" key={n} open={i === 0}>
            <summary>{t(`q${n}`)}</summary>
            <p>{t(`a${n}`)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
