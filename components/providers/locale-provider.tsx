'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { languages, defaultLocale, type Locale, type Direction, detectBrowserLocale } from '@/lib/i18n';
import { translate, type TranslationDict } from '@/lib/translations';

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (code: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('tazcal-locale') : null;
    if (stored && languages.some((l) => l.code === stored)) {
      setLocaleState(stored as Locale);
    } else {
      const detected = detectBrowserLocale();
      if (detected) setLocaleState(detected);
    }
  }, []);

  const setLocale = useCallback((code: Locale) => {
    setLocaleState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tazcal-locale', code);
    }
  }, []);

  const dir = languages.find((l) => l.code === locale)?.dir || 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value: LocaleContextValue = {
    locale,
    dir,
    setLocale,
    t: (key: string) => translate(locale, key),
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
