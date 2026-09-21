"use client";

import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT, PACKS } from "@/lib/product.config";

export default function PackPicker() {
  const { lang, t } = useLang();
  const { packId, setPackId } = useOrder();
  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  return (
    <div className="picker">
      <div className="pick-title">{t("pick_title")}</div>
      {PACKS.map((pack) => (
        <label
          key={pack.id}
          className={`pick-option${packId === pack.id ? " active" : ""}`}
        >
          <div className="pick-left">
            <input
              type="radio"
              name="pack"
              value={pack.id}
              checked={packId === pack.id}
              onChange={() => setPackId(pack.id)}
            />
            <div>
              <div className="pick-name">
                <span>{t(`pick_${pack.id}_name`)}</span>
                {pack.badge && (
                  <span className={`tag${pack.badge === "gold" ? " gold" : ""}`}>
                    {t(`pick_${pack.id}_tag`)}
                  </span>
                )}
              </div>
              <div className="pick-sub">{t(`pick_${pack.id}_sub`)}</div>
            </div>
          </div>
          <div className="pick-price">
            <div className="amt">
              <span>{currency}</span> {pack.price}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
