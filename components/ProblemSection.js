"use client";

import { useLang } from "./LangProvider";

export default function ProblemSection() {
  const { t } = useLang();
  return (
    <>
      <section>
        <div className="wrap split">
          <div>
            <span className="kicker">{t("problem_kicker")}</span>
            <h2>{t("problem_h2")}</h2>
            <p>{t("problem_p1")}</p>
            <p>{t("problem_p2")}</p>
          </div>
          <div className="visual">
            <img src="/images/prod-3.webp" alt="" />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream)" }}>
        <div className="wrap split">
          <div className="visual">
            <img src="/images/sq_mm.webp" alt="" />
          </div>
          <div>
            <span className="kicker">{t("compare_kicker")}</span>
            <h2>{t("compare_h2")}</h2>
            <p>{t("compare_p")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
