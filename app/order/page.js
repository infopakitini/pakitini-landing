"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSection from "@/components/OrderSection";
import { useOrder } from "@/components/OrderProvider";
import { PACKS, isPackInStock } from "@/lib/product.config";

// Reads ?pack=<id> so the order page shows the right price/pack even on a
// fresh load or a shared/bookmarked link, not just when navigated to from
// the pack picker on the home page.
function PackFromQuery() {
  const searchParams = useSearchParams();
  const { setPackId } = useOrder();

  useEffect(() => {
    const packId = searchParams.get("pack");
    const pack = PACKS.find((p) => p.id === packId);
    if (pack && isPackInStock(pack)) {
      setPackId(pack.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

export default function OrderPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <PackFromQuery />
      </Suspense>
      <OrderSection />
      <Footer />
    </>
  );
}
