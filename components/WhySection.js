"use client";

import { useLang } from "./LangProvider";

export default function WhySection() {
  const { t } = useLang();
  const cards = [
    { icon: "⏱️", h: "card1_h", p: "card1_p" },
    { icon: "🧲", h: "card2_h", p: "card2_p" },
    { icon: "🔌", h: "card3_h", p: "card3_p" },
    { icon: "💧", h: "card4_h", p: "card4_p" },
  ];
  const stats = [
    { b: "3 sec", key: "stat1" },
    { b: "300+", key: "stat2" },
    { b: "USB-C", key: "stat3" },
    { b: "95 mm", key: "stat4" },
  ];

  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t("why_kicker")}</span>
          <h2>{t("why_h2")}</h2>
        </div>
        <div className="why-grid">
          {cards.map((c) => (
            <div className="why-card" key={c.h}>
              <div className="icon">{c.icon}</div>
              <div>
                <h4>{t(c.h)}</h4>
                <p>{t(c.p)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="stat-row">
          {stats.map((s) => (
            <div className="stat" key={s.key}>
              <b>{s.b}</b>
              <span>{t(s.key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
