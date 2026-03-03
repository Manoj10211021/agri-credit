import React, { createContext, useContext, useMemo, useState } from "react";
import en from "../locales/en/common.json";
import kn from "../locales/kn/common.json";

const LanguageContext = createContext(null);

const resources = { en, kn };

const getValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : path), obj);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("app_language") || "kn");

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  const value = useMemo(() => ({
    language,
    changeLanguage,
    t: (key) => getValue(resources[language] || resources.kn, key),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
