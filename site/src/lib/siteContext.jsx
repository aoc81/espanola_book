import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import siteDataByLocale from "@generated-manuscripts";
import {
  DEFAULT_LOCALE,
  buildLocalePath,
  buildLocaleSwitchPath,
  globalCopy,
  normalizeLocale,
} from "./i18n";

const SiteContext = createContext(null);

export function SiteProvider({ locale, children }) {
  const normalizedLocale = normalizeLocale(locale) ?? DEFAULT_LOCALE;

  const value = useMemo(() => ({
    locale: normalizedLocale,
    siteData: siteDataByLocale[normalizedLocale] ?? siteDataByLocale[DEFAULT_LOCALE],
    siteDataByLocale,
    copy: globalCopy[normalizedLocale] ?? globalCopy[DEFAULT_LOCALE],
  }), [normalizedLocale]);

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite must be used within a SiteProvider.");
  }
  return value;
}

export function useLocalePath() {
  const { locale } = useSite();
  return (to = "/") => buildLocalePath(locale, to);
}

export function useLocaleSwitchLinks() {
  const { locale, siteDataByLocale } = useSite();
  const location = useLocation();

  return useMemo(() => Object.keys(siteDataByLocale).map((targetLocale) => ({
    locale: targetLocale,
    href: buildLocaleSwitchPath(
      locale,
      targetLocale,
      location.pathname,
      location.search,
      location.hash,
    ),
  })), [locale, location.hash, location.pathname, location.search, siteDataByLocale]);
}
