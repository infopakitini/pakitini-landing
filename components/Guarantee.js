"use client";

import { useLang } from "./LangProvider";

export default function Guarantee() {
  const { t } = useLang();
  return (
    <div className="guarantee">
      <section>
        <div className="wrap inner">
          <div className="seal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="kicker">{t("guarantee_kicker")}</span>
          <h2>{t("guarantee_h2")}</h2>
          <p>{t("guarantee_p")}</p>
        </div>
      </section>
    </div>
  );
}
