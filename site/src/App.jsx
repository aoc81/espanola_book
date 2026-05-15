import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { SkipLink, ScrollToTop, RouteAnalytics, Masthead } from "./components/layout/Masthead";
import { SiteFooter } from "./components/layout/SiteFooter";
import siteDataByLocale from "@generated-manuscripts";
import { detectPreferredLocale, buildLocalePath, normalizeLocale } from "./lib/i18n";
import { SiteProvider } from "./lib/siteContext";

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const SectionPage = lazy(() => import("./pages/SectionPage").then((module) => ({ default: module.SectionPage })));
const GalleryPage = lazy(() => import("./pages/GalleryPage").then((module) => ({ default: module.GalleryPage })));
const ReaderPage = lazy(() => import("./pages/ReaderPage").then((module) => ({ default: module.ReaderPage })));
const DownloadPage = lazy(() => import("./pages/DownloadPage").then((module) => ({ default: module.DownloadPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const CodexIndexPage = lazy(() => import("./pages/CodexPages").then((module) => ({ default: module.CodexIndexPage })));
const BookWritingProtocolPage = lazy(() => import("./pages/CodexPages").then((module) => ({ default: module.BookWritingProtocolPage })));
const WritingBehaviorPage = lazy(() => import("./pages/CodexPages").then((module) => ({ default: module.WritingBehaviorPage })));
const SourceAgentPage = lazy(() => import("./pages/CodexPages").then((module) => ({ default: module.SourceAgentPage })));
const EditorInChiefPage = lazy(() => import("./pages/CodexPages").then((module) => ({ default: module.EditorInChiefPage })));

function PreferredLocaleRedirect({ to = "/" }) {
  return <Navigate to={buildLocalePath(detectPreferredLocale(), to)} replace />;
}

function LegacyReadRedirect() {
  const { slug } = useParams();
  const targetLocale = detectPreferredLocale();
  const englishDoc = siteDataByLocale.en.documents.find((document) => document.slug === slug);
  const mappedDoc = englishDoc
    ? siteDataByLocale[targetLocale].documents.find((document) => document.id === englishDoc.id)
    : null;
  const localizedSlug = mappedDoc?.slug ?? slug;
  return <Navigate to={buildLocalePath(targetLocale, `/read/${localizedSlug}`)} replace />;
}

function LegacySectionRedirect() {
  const { sectionKey } = useParams();
  return <Navigate to={buildLocalePath(detectPreferredLocale(), `/section/${sectionKey}`)} replace />;
}

function LocalizedShell() {
  const { locale } = useParams();
  const location = useLocation();
  const normalizedLocale = normalizeLocale(locale);

  if (!normalizedLocale) {
    const withoutFirstSegment = `/${location.pathname.split("/").slice(2).join("/")}`.replace(/\/+/g, "/");
    return <Navigate to={buildLocalePath(detectPreferredLocale(), withoutFirstSegment === "/" ? "/" : withoutFirstSegment)} replace />;
  }

  return (
    <SiteProvider locale={normalizedLocale}>
      <div className="app-shell">
        <SkipLink />
        <ScrollToTop />
        <RouteAnalytics />
        <Masthead />
        <div className="app-main-shell">
          <Suspense fallback={<main id="main-content" className="route-fallback" />}>
            <>
              <Outlet />
              <SiteFooter />
            </>
          </Suspense>
        </div>
      </div>
    </SiteProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PreferredLocaleRedirect />} />
      <Route path="/chapters" element={<PreferredLocaleRedirect to="/chapters" />} />
      <Route path="/section/:sectionKey" element={<LegacySectionRedirect />} />
      <Route path="/sources" element={<PreferredLocaleRedirect to="/sources" />} />
      <Route path="/read/:slug" element={<LegacyReadRedirect />} />
      <Route path="/download" element={<PreferredLocaleRedirect to="/download" />} />
      <Route path="/contact" element={<PreferredLocaleRedirect to="/contact" />} />
      <Route path="/codex" element={<PreferredLocaleRedirect to="/codex" />} />
      <Route path="/codex/book-writing-protocol" element={<PreferredLocaleRedirect to="/codex/book-writing-protocol" />} />
      <Route path="/codex/writing-behavior" element={<PreferredLocaleRedirect to="/codex/writing-behavior" />} />
      <Route path="/codex/source-agent" element={<PreferredLocaleRedirect to="/codex/source-agent" />} />
      <Route path="/codex/editor-in-chief" element={<PreferredLocaleRedirect to="/codex/editor-in-chief" />} />

      <Route path="/:locale" element={<LocalizedShell />}>
        <Route index element={<HomePage />} />
        <Route path="chapters" element={<Navigate to="../section/chapters" replace />} />
        <Route path="section/:sectionKey" element={<SectionPage />} />
        <Route path="sources" element={<GalleryPage />} />
        <Route path="read/:slug" element={<ReaderPage />} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="codex" element={<CodexIndexPage />} />
        <Route path="codex/book-writing-protocol" element={<BookWritingProtocolPage />} />
        <Route path="codex/writing-behavior" element={<WritingBehaviorPage />} />
        <Route path="codex/source-agent" element={<SourceAgentPage />} />
        <Route path="codex/editor-in-chief" element={<EditorInChiefPage />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>

      <Route path="*" element={<PreferredLocaleRedirect />} />
    </Routes>
  );
}

export default App;
