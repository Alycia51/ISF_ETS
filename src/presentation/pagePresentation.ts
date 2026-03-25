import { Locale, PageData, Translation } from '../models/types';
import { fr } from '../models/translations/fr';
import { en } from '../models/translations/en';
import { es } from '../models/translations/es';

const translations: Record<Locale, Translation> = { fr, en, es };

const availableLocales = [
  { code: 'fr' as Locale, label: 'FR' },
  { code: 'en' as Locale, label: 'EN' },
  { code: 'es' as Locale, label: 'ES' },
];

export class PagePresentation {
  static getLocale(raw?: string): Locale {
    if (raw === 'en' || raw === 'es') return raw;
    return 'fr';
  }

  static buildPageData(locale: Locale, page: string): PageData {
    return {
      locale,
      t: translations[locale],
      page,
      availableLocales,
    };
  }
}