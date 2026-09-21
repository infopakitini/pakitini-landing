"use client";

import { useLang } from "./LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function KitchenGallery() {
  const { t } = useLang();
  const videos = PRODUCT.KITCHEN_VIDEOS;
  const hasVideos = videos && videos.length > 0;

  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t("kitchens_kicker")}</span>
          <h2>{t("kitchens_h2")}</h2>
        </div>
        <div className="kitchen-grid">
          {hasVideos
            ? videos.slice(0, 4).map((src) => (
                <video
                  key={src}
                  className="ph kitchen-video"
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ))
            : [0, 1, 2, 3].map((i) => <div className="ph" key={i} />)}
        </div>
      </div>
    </section>
  );
}
