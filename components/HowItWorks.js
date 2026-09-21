"use client";

import { useLang } from "./LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function HowItWorks() {
  const { t } = useLang();
  const steps = [
    { num: "01", title: t("step1_title"), p: t("step1_p") },
    { num: "02", title: t("step2_title"), p: t("step2_p") },
    { num: "03", title: t("step3_title"), p: t("step3_p") },
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
          {steps.map((s, i) => (
            <div className="step" key={s.num}>
              <div className="step-visual">
                <img src={PRODUCT.STEP_IMAGES[i]} alt={s.title} />
              </div>
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
