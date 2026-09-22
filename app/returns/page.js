"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function ReturnsPage() {
  const { t } = useLang();
  const router = useRouter();
  const items = ["1", "2", "3", "4", "5", "6", "7"];
  const days = PRODUCT.RETURN_POLICY_DAYS;

  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <button type="button" className="back-link" onClick={goBack}>
            <svg className="flip-rtl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("back_button")}
          </button>

          <div className="section-head">
            <span className="kicker">{t("legal_h")}</span>
            <h2>{t("returns_page_title", { days })}</h2>
          </div>

          <ol className="policy-list">
            {items.map((n) => (
              <li key={n}>{t(`returns_item${n}`, { days })}</li>
            ))}
          </ol>
        </div>
      </section>
      <Footer />
    </>
  );
}
