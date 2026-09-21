"use client";

import { useLang } from "./LangProvider";

export default function EverydaySection() {
  const { t } = useLang();
  return (
    <section style={{ background: "var(--cream)" }}>
      <div className="wrap split">
        <div>
          <span className="kicker">{t("everyday_kicker")}</span>
          <h2>{t("everyday_h2")}</h2>
          <p>{t("everyday_p1")}</p>
          <p>{t("everyday_p2")}</p>
        </div>
        <div className="visual">
          <img src="/images/prod-1.webp" alt="" />
        </div>
      </div>
    </section>
  );
}
