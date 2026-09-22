"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { useOrder } from "@/components/OrderProvider";
import { PRODUCT, DEFAULT_PACK_ID, getDefaultInStockPackId } from "@/lib/product.config";
import { readOrderSuccess } from "@/lib/orderSuccess";

export default function OrderSuccessPage() {
  const { lang, t } = useLang();
  const { setPackId } = useOrder();
  const router = useRouter();
  const [data, setData] = useState(undefined); // undefined = not checked yet

  useEffect(() => {
    setData(readOrderSuccess());
  }, []);

  useEffect(() => {
    if (data === null) router.replace("/");
  }, [data, router]);

  function placeAnotherOrder() {
    setPackId(getDefaultInStockPackId() ?? DEFAULT_PACK_ID);
    router.push("/");
  }

  if (!data) return null;

  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;
  const deliveryLabel =
    data.deliveryTime === "custom" ? data.customDeliveryTime : t(`delivery_${data.deliveryTime}`);

  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div className="order-success">
            <div className="order-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3>{t("success_title")}</h3>
            <p>{t("success_body")}</p>
            <p className="order-success-email-note">
              {t("success_email_note", { email: data.email })}
            </p>
            <div className="order-success-card">
              <div className="row">
                <span>{t("success_order_id")}</span>
                <b>{data.orderId}</b>
              </div>
              <div className="row">
                <span>{t("order_summary_product")}</span>
                <b>
                  {PRODUCT.NAME} — {t(`pick_${data.packId}_name`)}
                </b>
              </div>
              <div className="row">
                <span>{t("order_summary_qty")}</span>
                <b>{data.quantity}</b>
              </div>
              <div className="row">
                <span>{t("order_summary_total")}</span>
                <b>
                  {currency} {data.total}
                </b>
              </div>
              <div className="row">
                <span>{t("field_name")}</span>
                <b>{data.name}</b>
              </div>
              <div className="row">
                <span>{t("field_phone")}</span>
                <b>{data.phone}</b>
              </div>
              <div className="row">
                <span>{t("field_city")}</span>
                <b>{data.city}</b>
              </div>
              <div className="row">
                <span>{t("field_delivery_time")}</span>
                <b>{deliveryLabel}</b>
              </div>
            </div>
            <button type="button" className="checkout-btn" onClick={placeAnotherOrder}>
              {t("success_new_order")}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
