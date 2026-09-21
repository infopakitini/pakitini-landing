"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";

const LangContext = createContext(null);

function readStoredLang() {
  try {
    const stored = window.localStorage.getItem("pakitini_lang");
    return stored === "ar" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem("pakitini_lang", lang);
    } catch {
      // storage unavailable — non-fatal, language just won't persist
    }
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
