import { fr } from './fr';
import { en } from './en';
import { es } from './es';
import { Locale, Translation } from '@/types';

export const translations: Record<Locale, Translation> = { fr, en, es };

export const availableLocales: { code: Locale; label: string; name: string }[] = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
];

export { fr, en, es };

