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
            <ReviewCard key={r.who} {...r} />
          ))}
        </div>

        {photos.length > 0 && (
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
