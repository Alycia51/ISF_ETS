import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/context/I18nContext';
import { useScrolledNavbar } from '@/hooks/useScrolledNavbar';

export const Navbar: React.FC = () => {
  const { locale, t, availableLocales, localizePath, setLocale } = useI18n();
  const isScrolled = useScrolledNavbar(60);
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'about' | 'projects' | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setIsLangMenuOpen(false);
  }, [location.pathname]);

  // Handle outside click & scroll closing
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentPath = location.pathname;
  const isHomeActive = currentPath === `/${locale}` || currentPath === `/${locale}/`;
  const isAboutActive =
    currentPath.startsWith(`/${locale}/mission`) || currentPath.startsWith(`/${locale}/membres`);
  const isProjectsActive =
    currentPath.startsWith(`/${locale}/realisations`) || currentPath.startsWith(`/${locale}/projects`);
  const isEventsActive = currentPath.startsWith(`/${locale}/evenements`);
  const isPartnersActive = currentPath.startsWith(`/${locale}/partenaires`);
  const isBlogActive = currentPath.startsWith(`/${locale}/blogue`);
  const isContactActive = currentPath.startsWith(`/${locale}/contact`);

  const toggleDropdown = (name: 'about' | 'projects') => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <Link to={`/${locale}`} className="logo" aria-label={t.common.homeAria}>
          <img src="/images/logo.png" alt="ISF ÉTS" />
          <span className="logo-text">
            <span className="l1">ISF</span>
            <span className="l2">ÉTS</span>
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          id="navToggle"
          className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          type="button"
          aria-label={t.common.menu}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav Links */}
        <ul id="navLinks" className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to={`/${locale}`}
              className={isHomeActive ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
          </li>

          {/* Dropdown À propos */}
          <li className={`nav-item-dropdown ${openDropdown === 'about' ? 'open' : ''}`}>
            <button
              type="button"
              className={`nav-dropdown-btn ${isAboutActive ? 'active' : ''}`}
              aria-expanded={openDropdown === 'about'}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('about');
              }}
            >
              {t.nav.about}
              <span className="nav-dropdown-arrow"> ▾</span>
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to={localizePath('/mission')}
                className={currentPath === `/${locale}/mission` ? 'active' : ''}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.mission}
              </Link>
              <Link
                to={localizePath('/membres')}
                className={currentPath === `/${locale}/membres` ? 'active' : ''}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.members}
              </Link>
            </div>
          </li>

          {/* Dropdown Réalisations */}
          <li className={`nav-item-dropdown ${openDropdown === 'projects' ? 'open' : ''}`}>
            <button
              type="button"
              className={`nav-dropdown-btn ${isProjectsActive ? 'active' : ''}`}
              aria-expanded={openDropdown === 'projects'}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('projects');
              }}
            >
              {t.nav.projects}
              <span className="nav-dropdown-arrow"> ▾</span>
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to={localizePath('/realisations/notre-histoire')}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.projectsDropdown.histoire}
              </Link>
              <Link
                to={localizePath('/realisations/carrieres')}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.projectsDropdown.carrieres}
              </Link>
              <Link
                to={localizePath('/realisations/regards')}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.projectsDropdown.regards}
              </Link>
              <Link
                to={localizePath('/realisations/collecte')}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.projectsDropdown.collecte}
              </Link>
              <Link
                to={localizePath('/realisations/autres')}
                onClick={() => {
                  setOpenDropdown(null);
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.nav.projectsDropdown.autres}
              </Link>
            </div>
          </li>

          <li>
            <Link
              to={localizePath('/evenements')}
              className={isEventsActive ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.events}
            </Link>
          </li>
          <li>
            <Link
              to={localizePath('/partenaires')}
              className={isPartnersActive ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.partners}
            </Link>
          </li>
          <li>
            <Link
              to={localizePath('/blogue')}
              className={isBlogActive ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.blog}
            </Link>
          </li>
          <li>
            <Link
              to={localizePath('/contact')}
              className={`nav-cta ${isContactActive ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
          </li>

          {/* Mobile Language switch links */}
          <li className="nav-langs-mobile">
            {availableLocales.map((loc) => (
              <button
                key={loc.code}
                type="button"
                className={`lang-option ${locale === loc.code ? 'active' : ''}`}
                onClick={() => {
                  setLocale(loc.code);
                  setIsMobileMenuOpen(false);
                }}
              >
                {loc.label}
              </button>
            ))}
          </li>
        </ul>

        {/* Desktop Language Dropdown */}
        <div ref={langDropdownRef} className="lang-dropdown">
          <button
            id="langToggle"
            className="lang-btn"
            type="button"
            aria-label={t.common.language}
            aria-expanded={isLangMenuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsLangMenuOpen((prev) => !prev);
            }}
          >
            🌐
          </button>
          <div id="langMenu" className={`lang-menu ${isLangMenuOpen ? 'open' : ''}`}>
            {availableLocales.map((loc) => (
              <button
                key={loc.code}
                type="button"
                className={`lang-option ${locale === loc.code ? 'active' : ''}`}
                onClick={() => {
                  setLocale(loc.code);
                  setIsLangMenuOpen(false);
                }}
              >
                <span>{loc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

