import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import fr from "./i18n/fr.json";
import ar from "./i18n/ar.json";

const STORAGE_KEY = "souli_lang";

const getInitialLang = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  const nav = navigator.language?.toLowerCase() || "en";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("ar")) return "ar";
  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar }
  },
  lng: getInitialLang(),
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export const setLanguage = async (lng: "en" | "fr" | "ar") => {
  await i18n.changeLanguage(lng);
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

export default i18n;
