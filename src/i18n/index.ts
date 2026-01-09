import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import { storage } from "../services/storage";
import en from "./resources/en/common.json";
import zhCN from "./resources/zh-CN/common.json";

const LANGUAGE_STORAGE_KEY = "app.language";

export const SUPPORTED_LANGUAGES = ["en", "zh-CN"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: { common: en },
  "zh-CN": { common: zhCN }
};

let initPromise: Promise<void> | null = null;

function resolveLanguage(value: string | null | undefined): SupportedLanguage {
  if (!value) {
    return "en";
  }

  if (value.startsWith("zh")) {
    return "zh-CN";
  }

  if (value.startsWith("en")) {
    return "en";
  }

  return "en";
}

export async function initI18n() {
  if (i18n.isInitialized) {
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      const stored = await storage.getItem(LANGUAGE_STORAGE_KEY);
      const deviceLang = Localization.getLocales()[0]?.languageTag;
      const language = resolveLanguage(stored ?? deviceLang);

      await i18n.use(initReactI18next).init({
        resources,
        lng: language,
        fallbackLng: "en",
        defaultNS: "common",
        ns: ["common"],
        interpolation: { escapeValue: false }
      });
    })();
  }

  return initPromise;
}

export async function setLanguage(language: SupportedLanguage) {
  await i18n.changeLanguage(language);
  await storage.setItem(LANGUAGE_STORAGE_KEY, language);
}

export default i18n;
