"use client";

import { useLang } from "./LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function Reviews() {
  const { t } = useLang();
  const photos = PRODUCT.REVIEW_PHOTOS;
  const reviews = [
    { stars: "★★★★☆", body: "review1", who: "who1" },
    { stars: "★★★★★", body: "review2", who: "who2" },
    { stars: "★★★★★", body: "review3", who: "who3" },
  ];

  return (
    <section id="reviews">
      <div className="wrap">
        <div className="review-summary">
          <div className="big">4.9</div>
          <div>
            <div className="stars">★★★★★</div>
            <div style={{ fontSize: "13.5px", color: "var(--muted)", fontWeight: 600 }}>
              {t("reviews_count")}
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "12.5px", marginBottom: 24 }}>
          {t("reviews_note")}
        </p>
        <div className="review-grid">
          {reviews.map((r) => (
            <div className="review-card" key={r.who}>
              <div className="stars">{r.stars}</div>
              <p>{t(r.body)}</p>
              <div className="who">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{t(r.who)}</span>
              </div>
            </div>
          ))}
        </div>

        {photos && photos.length > 0 && (
          <>
            <h3 className="review-photos-title">{t("reviews_photos_title")}</h3>
            <div className="review-photos-grid">
              {photos.map((src) => (
                <div className="review-photo" key={src}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
