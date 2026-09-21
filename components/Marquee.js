"use client";

import { useLang } from "./LangProvider";

export default function Marquee() {
  const { t } = useLang();
  const items = [t("mq1"), t("mq2"), t("mq3"), t("mq4")];
  const track = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            <span>{item}</span>
            <span>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
