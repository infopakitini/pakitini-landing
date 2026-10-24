"use client";

import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT, PACKS, isPackInStock } from "@/lib/product.config";

export default function PackPicker() {
  const { lang, t } = useLang();
  const { packId, setPackId } = useOrder();
  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  return (
    <div className="picker">
      <div className="offer-banner">
        <span className="offer-badge">🔥 {t("offer_badge")}</span>
        <span className="offer-save">{t("offer_save_big")}</span>
        <span className="offer-discount">{t("offer_discount")}</span>
      </div>
      <div className="pick-title">{t("pick_title")}</div>
      {PACKS.map((pack) => {
        const inStock = isPackInStock(pack);
        return (
          <label
            key={pack.id}
            className={`pick-option${packId === pack.id ? " active" : ""}${!inStock ? " out-of-stock" : ""}`}
          >
            <div className="pick-left">
              <input
                type="radio"
                name="pack"
                value={pack.id}
                checked={packId === pack.id}
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
              {pack.wasPrice && inStock && (
                <>
                  {packId === pack.id && <div className="now-just">{t("now_just")}</div>}
                  <div className="was">
                    <span>{currency}</span> {pack.wasPrice}
                  </div>
                </>
              )}
              <div className="amt">
                <span>{currency}</span> {pack.price}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
