import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Locale, Translation } from '@/types';
import { translations, availableLocales } from '@/locales';
import i18n from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  t: Translation;
  availableLocales: typeof availableLocales;
  setLocale: (targetLocale: Locale) => void;
  localizePath: (path: string, targetLocale?: Locale) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active locale: check route param or URL pathname
  const locale: Locale = useMemo(() => {
    const raw = params.lang || location.pathname.split('/')[1];
    if (raw === 'en' || raw === 'es') return raw;
    return 'fr';
  }, [params.lang, location.pathname]);

  // Synchronize i18next & html lang attribute
  useEffect(() => {
    i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t: Translation = useMemo(() => {
    return translations[locale] || translations.fr;
  }, [locale]);

  // Generate localized path
  const localizePath = (path: string, targetLocale: Locale = locale) => {
    // Strip any leading locale if present
    const cleanPath = path.replace(/^\/(?:fr|en|es)(?=\/|$)/, '') || '';
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    return normalized === '/' ? `/${targetLocale}` : `/${targetLocale}${normalized}`;
  };

  const setLocale = (targetLocale: Locale) => {
    if (targetLocale === locale) return;
    const cleanPath = location.pathname.replace(/^\/(?:fr|en|es)(?=\/|$)/, '') || '';
    const newPath = cleanPath === '' ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
    navigate(newPath + location.search + location.hash);
  };

  const value = useMemo(
    () => ({
      locale,
      t,
      availableLocales,
      setLocale,
      localizePath,
    }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

