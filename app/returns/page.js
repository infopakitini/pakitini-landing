"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { PRODUCT } from "@/lib/product.config";

export default function ReturnsPage() {
  const { t } = useLang();
  const sections = ["1", "2", "3"];

  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="section-head">
            <span className="kicker">{t("legal_h")}</span>
            <h2>{t("returns_page_title")}</h2>
            <p>{t("returns_page_intro")}</p>
          </div>

          <div className="policy-body">
            {sections.map((n) => (
              <div className="policy-section" key={n}>
                <h3>{t(`returns_section${n}_h`)}</h3>
                <p>
                  {t(`returns_section${n}_p`, {
                    days: PRODUCT.RETURN_POLICY_DAYS,
                    email: PRODUCT.SUPPORT_EMAIL,
                  })}
                </p>
              </div>
            ))}
          </div>

          <p className="policy-editable-note">{t("returns_editable_note")}</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
