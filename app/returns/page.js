"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function ReturnsPage() {
  const { t } = useLang();
  const items = ["1", "2", "3", "4", "5", "6", "7"];
  const days = PRODUCT.RETURN_POLICY_DAYS;

  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
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
