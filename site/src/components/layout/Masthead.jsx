import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocalizedNavLink } from "./LocalizedLink";
import { localeLabels, setStoredPreferredLocale } from "../../lib/i18n";
import { useLocaleSwitchLinks, useSite } from "../../lib/siteContext";
export function SkipLink() {
  return <a className="skip-link" href="#main-content">Skip to content</a>;
}

export function ScrollToTop() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) { element.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);
  return null;
}

export function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  return null;
}

export function Masthead() {
  const { copy, locale } = useSite();
  const switchLinks = useLocaleSwitchLinks();

  return (
    <header className="masthead">
      <div className="masthead__strip">
        <div className="masthead__strip-inner">
          <nav className="masthead__nav" aria-label="Primary">
            <LocalizedNavLink to="/" end>{copy.nav.overview}</LocalizedNavLink>
            <LocalizedNavLink to="/section/front-matter">{copy.nav.frontMatter}</LocalizedNavLink>
            <LocalizedNavLink to="/chapters">{copy.nav.chapters}</LocalizedNavLink>
            <LocalizedNavLink to="/sources">{copy.nav.sources}</LocalizedNavLink>
            <LocalizedNavLink to="/codex">{copy.nav.codex}</LocalizedNavLink>
            <LocalizedNavLink to="/download">{copy.nav.download}</LocalizedNavLink>
            <LocalizedNavLink to="/contact">{copy.nav.contact}</LocalizedNavLink>
          </nav>
          <div className="locale-switcher" aria-label={copy.language}>
            {switchLinks.map(({ locale: targetLocale, href }) => (
              <Link
                key={targetLocale}
                to={href}
                className={targetLocale === locale ? "locale-switcher__link locale-switcher__link--active" : "locale-switcher__link"}
                onClick={() => setStoredPreferredLocale(targetLocale)}
                lang={targetLocale}
              >
                {localeLabels[targetLocale]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

