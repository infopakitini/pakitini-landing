"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";

const LangContext = createContext(null);

// Arabic is the language on every fresh page load — deliberately not
// remembered across visits (no localStorage), so the site always opens in
// Arabic regardless of what a visitor picked last time. Switching to EN
// still works normally for the current visit/session.
export function LangProvider({ children }) {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang];
    const t = (key, vars) => {
      let str = dict[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, v);
        }
      }
      return str;
    };
    return { lang, setLang, dir: lang === "ar" ? "rtl" : "ltr", t };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
