import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SkipLink, ScrollToTop, Masthead } from "./components/layout/Masthead";
import { SiteFooter } from "./components/layout/SiteFooter";

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

function App() {
  return (
    <div className="app-shell">
      <SkipLink />
      <ScrollToTop />
      <Masthead />
      <Suspense fallback={<main id="main-content" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapters" element={<Navigate to="/section/chapters" replace />} />
          <Route path="/section/:sectionKey" element={<SectionPage />} />
          <Route path="/sources" element={<GalleryPage />} />
          <Route path="/read/:slug" element={<ReaderPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/codex" element={<CodexIndexPage />} />
          <Route path="/codex/book-writing-protocol" element={<BookWritingProtocolPage />} />
          <Route path="/codex/writing-behavior" element={<WritingBehaviorPage />} />
          <Route path="/codex/source-agent" element={<SourceAgentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </div>
  );
}

export default App;
