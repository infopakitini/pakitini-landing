"use client";

import { useLang } from "./LangProvider";

export default function DimensionsSection() {
  const { t } = useLang();
  const dims = [
    { b: "12.5cm", key: "dim1" },
    { b: "6.3cm", key: "dim2" },
    { b: "4.0cm", key: "dim3" },
    { b: "95mm", key: "dim4" },
  ];

  return (
    <section style={{ background: "var(--cream)" }}>
      <div className="wrap split">
        <div className="visual">
          <img src="/images/dimensions.webp" alt="" />
        </div>
        <div>
          <span className="kicker">{t("compact_kicker")}</span>
          <h2>{t("compact_h2")}</h2>
          <p>{t("compact_p")}</p>
          <div className="dims dims-inline">
            {dims.map((d) => (
              <div className="dim" key={d.key}>
                <b>{d.b}</b>
                <span>{t(d.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
