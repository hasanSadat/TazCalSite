export const languages = [
  { code: 'en', name: 'English', dir: 'ltr' as const, bcp47: 'en-US' },
  { code: 'fa', name: 'فارسی', dir: 'rtl' as const, bcp47: 'fa-IR' },
  { code: 'ar', name: 'العربية', dir: 'rtl' as const, bcp47: 'ar-SA' },
  { code: 'es', name: 'Español', dir: 'ltr' as const, bcp47: 'es-ES' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' as const, bcp47: 'de-DE' },
  { code: 'fr', name: 'Français', dir: 'ltr' as const, bcp47: 'fr-FR' },
  { code: 'ru', name: 'Русский', dir: 'ltr' as const, bcp47: 'ru-RU' },
];

export const defaultLocale = 'en';

export type Locale = (typeof languages)[number]['code'];
export type Direction = 'ltr' | 'rtl';

export function getLocale(code: string): (typeof languages)[number] {
  return languages.find((l) => l.code === code) || languages[0];
}

export function getDir(code: string): Direction {
  return getLocale(code).dir;
}

export function getBcp47(code: string): string {
  return getLocale(code).bcp47;
}

export function formatNumber(value: number, locale: string): string {
  const bcp47 = getBcp47(locale);
  try {
    return new Intl.NumberFormat(bcp47).format(value);
  } catch {
    return String(value);
  }
}

export function formatDate(date: Date | string, locale: string): string {
  const bcp47 = getBcp47(locale);
  const d = typeof date === 'string' ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat(bcp47, { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  } catch {
    return d.toDateString();
  }
}

export function formatCurrency(value: number, locale: string, currency = 'USD'): string {
  const bcp47 = getBcp47(locale);
  try {
    return new Intl.NumberFormat(bcp47, { style: 'currency', currency }).format(value);
  } catch {
    return `$${value}`;
  }
}

export function detectBrowserLocale(): Locale | null {
  if (typeof navigator === 'undefined') return null;
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  const match = languages.find((l) => l.code === browserLang);
  return match ? (match.code as Locale) : null;
}
