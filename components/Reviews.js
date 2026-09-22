"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import { PRODUCT } from "@/lib/product.config";

function ReviewCard({ stars, body, who, photos }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  return (
    <div className="review-card">
      {photos && photos.length > 0 && (
        <div className="review-card-photo">
          <img src={photos[active]} alt="" loading="lazy" />
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="review-photo-nav prev"
                aria-label="Previous photo"
                onClick={() => setActive((i) => (i - 1 + photos.length) % photos.length)}
              >
                ‹
              </button>
              <button
                type="button"
                className="review-photo-nav next"
                aria-label="Next photo"
                onClick={() => setActive((i) => (i + 1) % photos.length)}
              >
                ›
              </button>
              <div className="review-photo-dots">
                {photos.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`dot${i === active ? " active" : ""}`}
                    aria-label={`Photo ${i + 1}`}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="review-card-body">
        <div className="stars">{stars}</div>
        <p>{t(body)}</p>
        <div className="who">
          <span className="who-name">{t(who)}</span>
          <span className="who-verified">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {t("verified_buyer")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const photos = PRODUCT.REVIEW_PHOTOS || [];
  const reviews = [
    { stars: "★★★★☆", body: "review1", who: "who1", photos: photos.slice(0, 2) },
    { stars: "★★★★★", body: "review2", who: "who2", photos: photos.slice(2, 4) },
    { stars: "★★★★★", body: "review3", who: "who3", photos: photos.slice(4, 6) },
  ];

  return (
    <section id="reviews">
      <div className="wrap">
        <div className="rating-summary">
          <div className="rating-summary-top">
            <span className="rating-summary-star">★</span>
            <span className="rating-summary-avg">{PRODUCT.RATING_AVERAGE}</span>
          </div>
          <div className="rating-summary-count">{t("reviews_count", { count: PRODUCT.RATING_TOTAL })}</div>

          <div className="rating-bars">
            {PRODUCT.RATING_BREAKDOWN.map((row) => (
              <div className="rating-bar-row" key={row.stars}>
                <span className="rating-bar-stars">{"★".repeat(row.stars)}{"☆".repeat(5 - row.stars)}</span>
                <span className="rating-bar-track">
                  <span
                    className="rating-bar-fill"
                    style={{ width: `${PRODUCT.RATING_TOTAL ? (row.count / PRODUCT.RATING_TOTAL) * 100 : 0}%` }}
                  />
                </span>
                <span className="rating-bar-count">({row.count})</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "12.5px", marginBottom: 24 }}>
          {t("reviews_note")}
        </p>
        <div className="review-grid">
          {reviews.map((r) => (
            <ReviewCard key={r.who} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
