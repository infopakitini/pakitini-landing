"use client";

import { useLang } from "./LangProvider";

export default function HowItWorks() {
  const { t } = useLang();
  const steps = [
    {
      num: "01",
      title: t("step1_title"),
      p: t("step1_p"),
      icon: (
        <svg className="flip-rtl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12h13M11 6l6 6-6 6" />
        </svg>
      ),
    },
    {
      num: "02",
      title: t("step2_title"),
      p: t("step2_p"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l4 2" />
        </svg>
      ),
    },
    {
      num: "03",
      title: t("step3_title"),
      p: t("step3_p"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t("how_kicker")}</span>
          <h2>{t("how_h2")}</h2>
          <p>{t("how_p")}</p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-visual">{s.icon}</div>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
