import type { Locale } from '@/lib/i18n';
import { en, type TranslationDict } from './en';
import { fa } from './fa';
import { ar } from './ar';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';
import { ru } from './ru';

export const dictionaries: Record<Locale, TranslationDict> = { en, fa, ar, es, de, fr, ru };

export function translate(locale: Locale, key: string): string {
  const dict = dictionaries[locale] || dictionaries.en;
  return dict[key as keyof TranslationDict] || en[key as keyof TranslationDict] || key;
}

export type { TranslationDict } from './en';
