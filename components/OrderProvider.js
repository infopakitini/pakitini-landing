"use client";

import { createContext, useContext, useState } from "react";
import { DEFAULT_PACK_ID, getPackById } from "@/lib/product.config";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [packId, setPackId] = useState(DEFAULT_PACK_ID);
  const pack = getPackById(packId);

  const value = {
    packId,
    setPackId,
    pack,
    quantity: pack.pieces,
    total: pack.price,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
