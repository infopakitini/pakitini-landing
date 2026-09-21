"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { PRODUCT } from "@/lib/product.config";

export default function StickyBar() {
  const { lang, t } = useLang();
  const { packId, total } = useOrder();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero");
      if (!hero) return;
      setShow(window.scrollY > hero.offsetHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cart${show ? " show" : ""}`}>
      <div className="info">
        <b>
          {PRODUCT.NAME} — {t(`pick_${packId}_name`)}
        </b>
        <span>
          {currency} {total}
        </span>
      </div>
      <button type="button" onClick={() => router.push(`/order?pack=${packId}`)}>
        {t("sticky_btn")}
      </button>
    </div>
  );
}
