"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { useOrder } from "./OrderProvider";
import { validateOrder } from "@/lib/validation";
import { PRODUCT, DEFAULT_PACK_ID } from "@/lib/product.config";
import { getSavedCustomer, saveCustomer } from "@/lib/savedCustomer";
import PackPicker from "./PackPicker";

const FIELD_ERROR_KEYS = {
  name: "err_name",
  phone: "err_phone",
  email: "err_email",
  address: "err_address",
  city: "err_city",
  deliveryTime: "err_delivery_time",
  customDeliveryTime: "err_custom_time",
};

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  deliveryTime: "",
  customDeliveryTime: "",
  notes: "",
  honeypot: "",
};

export default function OrderForm() {
  const { lang, t } = useLang();
  const { packId, setPackId, quantity, total } = useOrder();
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [successData, setSuccessData] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const currency = lang === "ar" ? PRODUCT.CURRENCY_AR : PRODUCT.CURRENCY;

  // Pre-fill from a previous order on this device, if any.
  useEffect(() => {
    const saved = getSavedCustomer();
    if (saved) setForm((f) => ({ ...f, ...saved }));
  }, []);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;

    const payload = { ...form, packId };
    const result = validateOrder(payload);

    if (!result.success) {
      setErrors(result.fieldErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "submit_failed");
      }

      saveCustomer(result.data);

      // Fires only if a Meta Pixel is configured (see components/MetaPixel.js) —
      // reports the completed COD order as a Purchase for ad optimization.
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", {
          value: data.total,
          currency: PRODUCT.CURRENCY,
          content_name: PRODUCT.NAME,
          content_ids: [result.data.packId],
          num_items: data.quantity,
        });
      }

      setSuccessData({
        orderId: data.orderId,
        packId: result.data.packId,
        name: result.data.name,
        phone: result.data.phone,
        email: result.data.email,
        city: result.data.city,
        deliveryTime: result.data.deliveryTime,
        customDeliveryTime: result.data.customDeliveryTime,
        quantity: data.quantity,
        total: data.total,
      });
      setStatus("success");
    } catch {
      setSubmitError(t("err_submit_failed"));
      setStatus("error");
    }
  }

  function goToProductPage() {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
    setSuccessData(null);
    setSubmitError("");
    setPackId(DEFAULT_PACK_ID);
    router.push("/");
  }

  if (status === "success" && successData) {
    const deliveryLabel =
      successData.deliveryTime === "custom"
        ? successData.customDeliveryTime
        : t(`delivery_${successData.deliveryTime}`);

    return (
      <div className="order-success">
        <div className="order-success-icon">✓</div>
        <h3>{t("success_title")}</h3>
        <p>{t("success_body")}</p>
        <p className="order-success-email-note">
          {t("success_email_note", { email: successData.email })}
        </p>
        <div className="order-success-card">
          <div className="row">
            <span>{t("success_order_id")}</span>
            <b>{successData.orderId}</b>
          </div>
          <div className="row">
            <span>{t("order_summary_product")}</span>
            <b>
              {PRODUCT.NAME} — {t(`pick_${successData.packId}_name`)}
            </b>
          </div>
          <div className="row">
            <span>{t("order_summary_qty")}</span>
            <b>{successData.quantity}</b>
          </div>
          <div className="row">
            <span>{t("order_summary_total")}</span>
            <b>
              {currency} {successData.total}
            </b>
          </div>
          <div className="row">
            <span>{t("field_name")}</span>
            <b>{successData.name}</b>
          </div>
          <div className="row">
            <span>{t("field_phone")}</span>
            <b>{successData.phone}</b>
          </div>
          <div className="row">
            <span>{t("field_city")}</span>
            <b>{successData.city}</b>
          </div>
          <div className="row">
            <span>{t("field_delivery_time")}</span>
            <b>{deliveryLabel}</b>
          </div>
        </div>
        <button type="button" className="checkout-btn" onClick={goToProductPage}>
          {t("success_new_order")}
        </button>
      </div>
    );
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <div className="order-summary-card">
        <div className="order-summary-title">{t("order_summary_title")}</div>
        <div className="order-summary-row">
          <span>{t("order_summary_product")}</span>
          <span>{PRODUCT.NAME}</span>
        </div>
        <PackPicker />
        <div className="order-summary-row">
          <span>{t("order_summary_qty")}</span>
          <span>{quantity}</span>
        </div>
        <div className="order-summary-row total">
          <span>{t("order_summary_total")}</span>
          <span>
            {currency} {total}
          </span>
        </div>
        <div className="order-summary-row">
          <span>{t("order_summary_payment")}</span>
          <span>{t("payment_cod")}</span>
        </div>
      </div>

      <div className="form-grid">
        <Field
          label={t("field_name")}
          error={errors.name && t(FIELD_ERROR_KEYS.name)}
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            autoComplete="name"
          />
        </Field>

        <Field
          label={t("field_phone")}
          error={errors.phone && t(FIELD_ERROR_KEYS.phone)}
        >
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+971 5X XXX XXXX"
          />
        </Field>

        <Field
          label={t("field_email")}
          error={errors.email && t(FIELD_ERROR_KEYS.email)}
        >
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            autoComplete="email"
          />
        </Field>

        <Field
          label={t("field_city")}
          error={errors.city && t(FIELD_ERROR_KEYS.city)}
        >
          <input
            type="text"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            autoComplete="address-level2"
          />
        </Field>

        <Field
          label={t("field_address")}
          error={errors.address && t(FIELD_ERROR_KEYS.address)}
          full
        >
          <textarea
            rows={2}
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            autoComplete="street-address"
          />
        </Field>

        <Field
          label={t("field_delivery_time")}
          error={errors.deliveryTime && t(FIELD_ERROR_KEYS.deliveryTime)}
          full
        >
          <div className="delivery-time-options">
            {["morning", "afternoon", "evening", "custom"].map((val) => (
              <label
                key={val}
                className={`delivery-chip${form.deliveryTime === val ? " active" : ""}`}
              >
                <input
                  type="radio"
                  name="deliveryTime"
                  value={val}
                  checked={form.deliveryTime === val}
                  onChange={() => updateField("deliveryTime", val)}
                />
                {t(`delivery_${val}`)}
              </label>
            ))}
          </div>
          {form.deliveryTime === "custom" && (
            <input
              type="text"
              className="custom-time-input"
              value={form.customDeliveryTime}
              onChange={(e) => updateField("customDeliveryTime", e.target.value)}
              placeholder={t("field_custom_time_placeholder")}
            />
          )}
          {errors.customDeliveryTime && (
            <div className="field-error">{t(FIELD_ERROR_KEYS.customDeliveryTime)}</div>
          )}
        </Field>

        <Field label={t("field_notes")} full>
          <textarea
            rows={2}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder={t("field_notes_placeholder")}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <input
        type="text"
        name="company"
        value={form.honeypot}
        onChange={(e) => updateField("honeypot", e.target.value)}
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status === "error" && submitError && (
        <div className="cart-error show">{submitError}</div>
      )}

      <button type="submit" className="checkout-btn" disabled={status === "submitting"}>
        {status === "submitting" ? t("placing_order_btn") : t("place_order_btn")}
      </button>
    </form>
  );
}

function Field({ label, error, full, children }) {
  return (
    <div className={`field${full ? " field-full" : ""}${error ? " field-invalid" : ""}`}>
      <label>{label}</label>
      {children}
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
