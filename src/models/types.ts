export interface Translation {
  nav: {
    home: string;
    mission: string;
    projects: string;
    events: string;
    members: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroBtn: string;
    impactTitle: string;
    impactSubtitle: string;
    impactStats: { number: string; label: string }[];
    aboutTitle: string;
    aboutText: string;
    aboutBtn: string;
    joinTitle: string;
    joinText: string;
    joinBtn: string;
    faqTitle: string;
    faqItems: { q: string; a: string }[];
    testimonialsTitle: string;
    testimonials: { quote: string; name: string; role: string }[];
  };
  mission: {
    title: string;
    subtitle: string;
    pillarTitle: string;
    pillars: { icon: string; title: string; text: string }[];
    valuesTitle: string;
    values: { icon: string; title: string; text: string }[];
  };
  projects: {
    title: string;
    subtitle: string;
    items: { title: string; location: string; year: string; description: string; tag: string }[];
  };
  events: {
    title: string;
    subtitle: string;
    upcoming: { date: string; month: string; title: string; location: string; description: string; type: string }[];
    pastTitle: string;
  };
  members: {
    title: string;
    subtitle: string;
    boardTitle: string;
    board: { name: string; role: string; program: string }[];
    joinTitle: string;
    joinText: string;
    joinBtn: string;
  };
  contact: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectOptions: string[];
    messagePlaceholder: string;
    sendBtn: string;
    successMsg: string;
    infoTitle: string;
    address: string;
    email: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    followUs: string;
    rights: string;
  };
}

export type Locale = 'fr' | 'en' | 'es';

export interface PageData {
  locale: Locale;
  t: Translation;
  page: string;
  availableLocales: { code: Locale; label: string }[];
}