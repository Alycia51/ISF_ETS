export interface ImpactStat {
  number: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Pillar {
  icon: string;
  title: string;
  text: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

export interface ProjectPartner {
  name: string;
  logo: string;
}

export interface ProjectEdition {
  year: string;
  cover: string;
  photos: string[];
}

export interface ProjectSectionPhoto {
  src: string;
  caption: string;
}

export interface ProjectSection {
  title: string;
  photos: ProjectSectionPhoto[];
}

export interface UpcomingEvent {
  date: string;
  month: string;
  title: string;
  location: string;
  description: string;
  type: string;
}

export interface BoardMember {
  name: string;
  role: string;
  program: string;
  photo?: string;
  linkedin?: string;
}

export interface PodcastItem {
  title: string;
  guest: string;
  description: string;
  longDescription?: string;
  members?: string[];
  url: string;
  thumbnail: string;
}

export interface PartnerPost {
  partner: string;
  format: string;
  title: string;
  excerpt: string;
  text: string;
  video?: string;
  image?: string;
}

export interface PackageTier {
  name: string;
  price: string;
  perks: string[];
}

export interface PackageTableRow {
  label: string;
  values: string[];
}

export interface PackageTableSection {
  title: string;
  rows: PackageTableRow[];
}

export interface LegacyProjectItem {
  tag: string;
  location: string;
  year: string;
  title: string;
  description: string;
}

export interface CommonTranslation {
  close: string;
  previous: string;
  next: string;
  menu: string;
  language: string;
  homeAria: string;
  comingSoon: string;
  about: string;
  ourPartners: string;
  watchPodcast: string;
  participatingMembers: string;
  watchEpisodeTitle: string;
  contactSectionTitle: string;
  gala: string;
  conference: string;
  collection: string;
}

export interface Translation {
  common: CommonTranslation;
  nav: {
    home: string;
    about: string;
    mission: string;
    members: string;
    projects: string;
    events: string;
    partners: string;
    blog: string;
    contact: string;
    projectsDropdown: {
      histoire: string;
      carrieres: string;
      regards: string;
      collecte: string;
      autres: string;
    };
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroBtn: string;
    impactTitle: string;
    impactSubtitle: string;
    impactStats: ImpactStat[];
    aboutTitle: string;
    aboutText: string;
    aboutBtn: string;
    joinTitle: string;
    joinText: string;
    joinBtn: string;
    donateBtn: string;
    faqTitle: string;
    faqItems: FaqItem[];
    testimonialsTitle: string;
    testimonials: Testimonial[];
  };
  mission: {
    title: string;
    subtitle: string;
    pillarTitle: string;
    pillars: Pillar[];
    valuesTitle: string;
    values: ValueItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    items?: LegacyProjectItem[];
    categories: {
      histoire: {
        label: string;
        title: string;
        subtitle: string;
        description: string;
        partners: ProjectPartner[];
        photos: string[];
        video?: string;
        gala?: string[];
        conference?: string[];
      };
      carrieres: {
        label: string;
        title: string;
        subtitle: string;
        description: string;
        partners: ProjectPartner[];
        photos: string[];
      };
      regards: {
        label: string;
        title: string;
        subtitle: string;
        description: string;
        partners: ProjectPartner[];
        photos: string[];
      };
      collecte: {
        label: string;
        title: string;
        subtitle: string;
        description: string;
        partners: ProjectPartner[];
        photos: string[];
        video?: string;
        editions?: ProjectEdition[];
      };
      autres: {
        label: string;
        title: string;
        subtitle: string;
        description: string;
        partners: ProjectPartner[];
        photos: string[];
        video?: string;
        sections?: ProjectSection[];
      };
    };
  };
  events: {
    title: string;
    subtitle: string;
    upcoming: UpcomingEvent[];
    pastTitle: string;
  };
  members: {
    title: string;
    subtitle: string;
    boardTitle: string;
    board: BoardMember[];
    joinTitle: string;
    joinText: string;
    joinBtn: string;
  };
  blog: {
    title: string;
    subtitle: string;
    introText: string;
    podcasts: PodcastItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sending: string;
    successMsg: string;
    errorMissingFields: string;
    errorSend: string;
    errorNetwork: string;
    infoTitle: string;
    addressLabel: string;
    address: string;
    emailLabelSidebar: string;
    email: string;
  };
  partners: {
    badge: string;
    heroTitle: string;
    heroAccent: string;
    heroText: string;
    joinBtn: string;
    packagesBtn: string;
    handLabel: string;
    partnerSingular: string;
    partnerPlural: string;
    orHandLabel: string;
    visitSite: string;
    tiers: {
      diamant: { eyebrow: string; title: string };
      or: { eyebrow: string; title: string };
      argent: { eyebrow: string; title: string };
      bronze: { eyebrow: string; title: string };
      special: { eyebrow: string; title: string };
    };
    orSlot: {
      hiddenTitle: string;
      hiddenHint: string;
      title: string;
      text: string;
      btn: string;
    };
    vlog: {
      eyebrow: string;
      title: string;
      text: string;
      readMore: string;
      watch: string;
      empty: string;
    };
    posts: PartnerPost[];
    packages: {
      title: string;
      text: string;
      show: string;
      hide: string;
      header: string;
      included: string;
      notIncluded: string;
      tiers: PackageTier[];
      table: PackageTableSection[];
    };
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
  partnersList: Partner[];
}

export type PartnerTier = 'diamant' | 'or' | 'argent' | 'bronze' | 'special';

export interface Partner {
  name: string;
  tier: PartnerTier;
  initials: string;
  logo?: string;
  url?: string;
}

