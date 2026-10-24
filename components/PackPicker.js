"use client";

import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT, PACKS, isPackInStock } from "@/lib/product.config";

// One reusable "paint splash" blob, stretched via preserveAspectRatio="none"
// to fill whatever box it's placed in (the discount badge and each active
// pack's price badge).
function SplashShape() {
  return (
    <svg className="splash-shape" viewBox="0 0 120 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10,45 C2,30 15,10 35,12 C42,-3 70,-2 78,12 C98,5 115,20 108,35 C122,42 118,65 100,68 C105,85 80,95 65,85 C55,98 25,95 20,80 C2,82 -5,60 10,45 Z" />
    </svg>
  );
}

export default function PackPicker() {
  const { lang, t } = useLang();
  const { packId, setPackId } = useOrder();
  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  return (
    <div className="picker">
      <div className="offer-banner">
        <div className="offer-ribbon">
          <span className="offer-ribbon-flame">🔥</span>
          <span className="offer-ribbon-text">
            <b>{t("offer_limited")}</b>
            <b>{t("offer_special")}</b>
          </span>
          <span className="offer-ribbon-tail" aria-hidden="true" />
        </div>
        <div className="offer-save">{t("offer_save_big")}</div>
        <div className="offer-splash offer-splash-discount">
          <SplashShape />
          <span className="splash-text">
            <span className="small">{t("offer_up_to")}</span>
            <span className="big">{t("offer_percent")}</span>
          </span>
        </div>
      </div>
      <div className="pick-title">{t("pick_title")}</div>
      {PACKS.map((pack) => {
        const inStock = isPackInStock(pack);
        const showWas = pack.wasPrice && inStock;
        const isActive = packId === pack.id;
        return (
          <label
            key={pack.id}
            className={`pick-option${isActive ? " active" : ""}${!inStock ? " out-of-stock" : ""}`}
          >
            <div className="pick-left">
              <input
                type="radio"
                name="pack"
                value={pack.id}
                checked={isActive}
                disabled={!inStock}
                onChange={() => setPackId(pack.id)}
              />
              <div>
                <div className="pick-name">
                  <span>{t(`pick_${pack.id}_name`)}</span>
                  {!inStock ? (
                    <span className="tag out-of-stock-tag">{t("out_of_stock")}</span>
                  ) : (
                    pack.badge && (
                      <span className={`tag${pack.badge === "gold" ? " gold" : ""}`}>
                        {t(`pick_${pack.id}_tag`)}
                      </span>
                    )
                  )}
                </div>
                <div className="pick-sub">{t(`pick_${pack.id}_sub`)}</div>
              </div>
            </div>
            <div className="pick-price">
              {showWas && isActive ? (
                <>
                  <div className="offer-splash price-splash">
                    <SplashShape />
                    <span className="splash-text">
                      <span className="small">{t("now_just")}</span>
                      <span className="big">
                        <span className="cur">{currency}</span> {pack.price}
                      </span>
                    </span>
                  </div>
                  <div className="was">
                    <span>{currency}</span> {pack.wasPrice}
                  </div>
                </>
              ) : (
                <>
                  {showWas && (
                    <div className="was">
                      <span>{currency}</span> {pack.wasPrice}
                    </div>
                  )}
                  <div className="amt">
                    <span>{currency}</span> {pack.price}
                  </div>
                </>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
