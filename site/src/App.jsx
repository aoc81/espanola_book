import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Archive,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  Home,
  Library,
  Menu,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Share2,
  Square,
  Sun,
  Type,
  Volume2,
} from "lucide-react";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import siteData from "@generated-manuscript";

function groupBySection(documents) {
  return documents.reduce((groups, document) => {
    const key = document.sectionTitle;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(document);
    return groups;
  }, {});
}

function useDocumentNavigation(slug) {
  const index = siteData.documents.findIndex((document) => document.slug === slug);
  return {
    current: siteData.documents[index] ?? null,
    previous: index > 0 ? siteData.documents[index - 1] : null,
    next: index >= 0 && index < siteData.documents.length - 1 ? siteData.documents[index + 1] : null,
  };
}

function getDocumentSearchText(document) {
  const blockText = document.blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return block.lines.join(" ");
      }

      if (block.type === "subheading") {
        return block.text;
      }

      if (block.type === "list" || block.type === "links") {
        return block.items
          .map((item) => {
            if (typeof item === "string") {
              return item;
            }

            return `${item.label ?? ""} ${item.url ?? ""}`;
          })
          .join(" ");
      }

      return "";
    })
    .join(" ");

  return `${document.title} ${document.excerpt} ${document.sectionTitle} ${document.fileName} ${blockText}`.toLowerCase();
}

function App() {
  return (
    <div className="app-shell">
      <SkipLink />
      <ScrollToTop />
      <Masthead />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/read/:slug" element={<ReaderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Skip to content
    </a>
  );
}

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead__inner">
        <Link to="/" className="masthead__brand">
          <span className="masthead__meta">Case File · UKR-ESP-17</span>
          <img src="/marks/espanola-wordmark.svg" alt="Española wordmark" className="masthead__wordmark" />
          <span className="masthead__title">{siteData.titlePage.title}</span>
        </Link>
        <nav className="masthead__nav" aria-label="Primary">
          <NavLink to="/" end>
            <Home size={14} aria-hidden="true" />
            Overview
          </NavLink>
          <Link to="/#reader-index">
            <Menu size={14} aria-hidden="true" />
            Contents
          </Link>
          <Link to="/#book-sections">
            <Library size={14} aria-hidden="true" />
            Sections
          </Link>
          <Link to="/read/appendix-reference-links-guide">
            <BookOpen size={14} aria-hidden="true" />
            Sources
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const lastReadSlug = typeof window !== "undefined" ? window.localStorage.getItem("last-read-slug") : "";
  const lastRead = siteData.documents.find((document) => document.slug === lastReadSlug);

  const filteredDocuments = useMemo(() => {
    return siteData.documents.filter((document) => {
      if (activeGroup !== "all" && document.kind !== activeGroup) {
        return false;
      }

      if (!deferredQuery) {
        return true;
      }

      const haystack = getDocumentSearchText(document);
      return haystack.includes(deferredQuery);
    });
  }, [activeGroup, deferredQuery]);

  return (
    <main id="main-content">
      <Hero lastRead={lastRead} />
      <PromotionalIntro />
      <SectionGateways />

      <section className="search-panel" id="reader-index">
        <div>
          <span className="esp-eyebrow">Reader Index</span>
          <h2 className="esp-h2">Choose a section or search across the full manuscript.</h2>
          <div className="segment-control" role="tablist" aria-label="Document type">
            {[
              ["all", "All"],
              ["front-matter", "Front Matter"],
              ["chapter", "Chapters"],
              ["appendix", "Appendices"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={activeGroup === value ? "segment-control__button segment-control__button--active" : "segment-control__button"}
                onClick={() => setActiveGroup(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <label className="search-panel__field">
          <span className="search-panel__label">Search titles and excerpts</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pitbull, Donbas, propaganda, Redut..."
          />
        </label>
      </section>

      <section className="contents-list" aria-label="Book contents">
        {!filteredDocuments.length ? (
          <div className="empty-state">
            <span className="esp-eyebrow">No matches</span>
            <p>No document title or excerpt matches the current search.</p>
          </div>
        ) : null}
        {siteData.groups.map((group) => {
          const documents = filteredDocuments.filter((document) => group.documents.some((item) => item.slug === document.slug));
          if (!documents.length) {
            return null;
          }

          return (
            <section key={group.key} className="contents-group" id={`section-${group.key}`}>
              <div className="contents-group__header">
                <span className="esp-eyebrow">{group.title}</span>
                <h3 className="contents-group__title">{group.title === "Narrative" ? "Chapters" : group.title}</h3>
              </div>
              <div className="contents-group__list">
                {documents.map((document) => (
                  <DocumentRow key={document.slug} document={document} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}

function PromotionalIntro() {
  return (
    <section className="promo-section">
      <div className="promo-section__text">
        <span className="esp-eyebrow">Open-source book edition</span>
        <h2>
          A documented account of how a Russian football-ultra milieu became a branded wartime formation.
        </h2>
        <p>
          The book follows Española from supporter culture and the first Donbas war into recruitment, propaganda,
          battlefield reputation, patronage, state control, and the uncertainty around the formation's end.
        </p>
      </div>
      <div className="promo-section__meta" aria-label="Edition details">
        <div>
          <span>Edition</span>
          <strong>{siteData.edition.version.toUpperCase()}</strong>
        </div>
        <div>
          <span>Reading Units</span>
          <strong>{siteData.stats.documentCount}</strong>
        </div>
        <div>
          <span>Images</span>
          <strong>{siteData.stats.imageCount}</strong>
        </div>
      </div>
    </section>
  );
}

function SectionGateways() {
  const gateways = [
    {
      key: "front-matter",
      eyebrow: "Front Matter",
      title: "How to read the book",
      description: "Author note, methodology, AI assistance disclosure, and terminology notes.",
      icon: FileText,
    },
    {
      key: "chapters",
      eyebrow: "Chapters",
      title: "The narrative investigation",
      description: "From the stadium and Donbas to recruitment, branding, combat reputation, and state reabsorption.",
      icon: BookOpen,
    },
    {
      key: "appendices",
      eyebrow: "Appendices",
      title: "Sources and reference links",
      description: "Reader-facing source notes, reference links, and source-handling context.",
      icon: Archive,
    },
  ];

  return (
    <section className="section-gateways" id="book-sections">
      <div className="section-gateways__header">
        <span className="esp-eyebrow">Book Sections</span>
        <h2 className="esp-h2">Enter by section, then move through the reader.</h2>
      </div>
      <div className="section-gateways__list">
        {gateways.map((gateway) => {
          const group = siteData.groups.find((item) => item.key === gateway.key);
          const firstDocument = group?.documents[0];
          const Icon = gateway.icon;

          return (
            <article key={gateway.key} className="section-gateway">
              <Icon size={24} aria-hidden="true" />
              <div className="section-gateway__body">
                <span>{gateway.eyebrow}</span>
                <h3>{gateway.title}</h3>
                <p>{gateway.description}</p>
              </div>
              <div className="section-gateway__actions">
                <a href={`#section-${gateway.key}`}>{group?.documents.length ?? 0} items</a>
                {firstDocument ? (
                  <Link to={`/read/${firstDocument.slug}`}>
                    Open
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Hero({ lastRead }) {
  const feature = siteData.documents.find((document) => document.title.includes("Prologue")) ?? siteData.documents[0];

  return (
    <section className="hero">
      <img src="/design-system/cover-hero.png" alt="" className="hero__image" />
      <div className="hero__overlay" />
      <div className="hero__meta hero__meta--left">
        <div>FILE: E-1127/23</div>
        <div>STATUS: OPEN SOURCE EDITION</div>
        <div>FORMAT: VITE / REACT DOSSIER</div>
      </div>
      <div className="hero__meta hero__meta--right">
        <div>{siteData.stats.documentCount} reading units</div>
        <div>{siteData.stats.imageCount} image references</div>
        <div>Sources and image credits preserved</div>
      </div>
      <div className="hero__stamp">Delo No. 17.02</div>
      <div className="hero__content">
        <span className="esp-eyebrow">Long-Form Investigation</span>
        <h1 className="hero__title">{siteData.titlePage.title}</h1>
        <p className="hero__dek">{siteData.titlePage.lines[0]}</p>
        <div className="hero__actions">
          {feature ? (
            <Link className="button button--solid" to={`/read/${feature.slug}`}>
              <BookOpen size={16} aria-hidden="true" />
              Start Reading
            </Link>
          ) : null}
          {lastRead ? (
            <Link className="button" to={`/read/${lastRead.slug}`}>
              <ChevronRight size={16} aria-hidden="true" />
              Continue
            </Link>
          ) : null}
          <a className="button" href="#reader-index">
            <Search size={16} aria-hidden="true" />
            Browse Contents
          </a>
        </div>
      </div>
    </section>
  );
}

function DocumentRow({ document }) {
  return (
    <article className="document-row">
      <span className="document-row__meta">{document.readingMinutes} min</span>
      <h4>{document.title}</h4>
      <p>{document.excerpt}</p>
      <div className="document-row__actions">
        <span>{document.images.length} images</span>
        <Link to={`/read/${document.slug}`}>
          Read
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function SiteFooter() {
  const prologue = siteData.documents.find((document) => document.title.includes("Prologue"));
  const sourceNotes = siteData.documents.find((document) => document.title.includes("Source Notes"));
  const referenceLinks = siteData.documents.find((document) => document.title.includes("Reference Links"));
  const authorNote = siteData.documents.find((document) => document.title.includes("Author"));

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src="/marks/espanola-wordmark.svg" alt="" />
          <p>{siteData.titlePage.title} is presented here as a web reader built from the canonical manuscript edition and its source notes.</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          {prologue ? <Link to={`/read/${prologue.slug}`}>Start reading</Link> : null}
          {authorNote ? <Link to={`/read/${authorNote.slug}`}>Author note</Link> : null}
          {sourceNotes ? <Link to={`/read/${sourceNotes.slug}`}>Source notes</Link> : null}
          {referenceLinks ? <Link to={`/read/${referenceLinks.slug}`}>Reference links</Link> : null}
        </nav>
        <div className="site-footer__meta">
          <span>Open-source release candidate</span>
          <span>{siteData.stats.documentCount} documents</span>
          <span>{siteData.stats.imageCount} image references</span>
        </div>
      </div>
    </footer>
  );
}

function ReaderPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { current, previous, next } = useDocumentNavigation(slug);
  const [fontScale, setFontScale] = useState(1);
  const [readerMode, setReaderMode] = useState("paper");
  const progress = useReadingProgress();

  useEffect(() => {
    if (current) {
      window.localStorage.setItem("last-read-slug", current.slug);
    }
  }, [current]);

  if (!current) {
    return <Navigate to="/" replace />;
  }

  const groupedDocuments = groupBySection(siteData.documents);

  return (
    <main
      id="main-content"
      className={readerMode === "dossier" ? "reader-layout reader-layout--dossier" : "reader-layout"}
      style={{ "--reader-font-scale": fontScale }}
    >
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <ReaderControls
        current={current}
        fontScale={fontScale}
        setFontScale={setFontScale}
        readerMode={readerMode}
        setReaderMode={setReaderMode}
      />
      <aside className="reader-sidebar">
        <div className="reader-sidebar__sticky">
          <span className="esp-eyebrow">Book Navigation</span>
          <h2 className="reader-sidebar__title">{siteData.titlePage.title}</h2>
          <div className="reader-sidebar__index">
            {Object.entries(groupedDocuments).map(([sectionTitle, documents]) => (
              <div key={sectionTitle} className="reader-sidebar__group">
                <h3>{sectionTitle}</h3>
                {documents.map((document) => (
                  <Link
                    key={document.slug}
                    to={`/read/${document.slug}`}
                    className={document.slug === current.slug ? "reader-sidebar__link reader-sidebar__link--active" : "reader-sidebar__link"}
                  >
                    <span>{document.title}</span>
                    <span>{document.readingMinutes}m</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <article className="reader-article">
        <div className="reader-mobile-nav">
          <label>
            <span>Current document</span>
            <select value={current.slug} onChange={(event) => navigate(`/read/${event.target.value}`)}>
              {siteData.documents.map((document) => (
                <option key={document.slug} value={document.slug}>
                  {document.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <header className="reader-article__header">
          <span className="esp-eyebrow">{current.sectionTitle}</span>
          <h1 className="esp-h1">{current.title}</h1>
          <div className="reader-article__meta">
            <span>{current.readingMinutes} min read</span>
            <span>{current.images.length} images</span>
            <span>{current.fileName}</span>
          </div>
        </header>

        <div className="reader-body">
          {current.blocks.map((block, index) => (
            <BlockRenderer key={`${current.slug}-${index}`} block={block} isLead={index === 0} />
          ))}
        </div>

        {current.images.length ? <ImageGallery title={current.title} images={current.images} /> : null}

        <nav className="chapter-nav" aria-label="Document navigation">
          {previous ? (
            <Link to={`/read/${previous.slug}`} className="chapter-nav__card">
              <span className="esp-eyebrow">Previous</span>
              <ChevronLeft size={18} aria-hidden="true" />
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link to={`/read/${next.slug}`} className="chapter-nav__card chapter-nav__card--next">
              <span className="esp-eyebrow">Next</span>
              <ChevronRight size={18} aria-hidden="true" />
              <strong>{next.title}</strong>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
}

function documentToSpeechText(document) {
  const blockText = document.blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return block.lines.join(" ");
      }

      if (block.type === "subheading") {
        return block.text;
      }

      if (block.type === "list") {
        return block.items.join(". ");
      }

      return "";
    })
    .filter(Boolean);

  return [document.sectionTitle, document.title, ...blockText].join(". ");
}

function ReaderControls({ current, fontScale, setFontScale, readerMode, setReaderMode }) {
  const [speechState, setSpeechState] = useState("idle");
  const [speechMessage, setSpeechMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const speechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  useEffect(() => {
    setSpeechState("idle");
    setSpeechMessage("");

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [current.slug]);

  useEffect(() => {
    if (!shareMessage) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setShareMessage(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [shareMessage]);

  const startReading = () => {
    if (!speechSupported) {
      setSpeechMessage("Voice reading is not available in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(documentToSpeechText(current));
    utterance.rate = 0.92;
    utterance.pitch = 0.98;
    utterance.onend = () => {
      setSpeechState("idle");
      setSpeechMessage("");
    };
    utterance.onerror = () => {
      setSpeechState("idle");
      setSpeechMessage("Voice reading stopped by the browser.");
    };

    setSpeechState("speaking");
    setSpeechMessage("Reading aloud");
    window.speechSynthesis.speak(utterance);
  };

  const pauseReading = () => {
    if (!speechSupported) {
      return;
    }

    if (speechState === "speaking") {
      window.speechSynthesis.pause();
      setSpeechState("paused");
      setSpeechMessage("Paused");
      return;
    }

    window.speechSynthesis.resume();
    setSpeechState("speaking");
    setSpeechMessage("Reading aloud");
  };

  const stopReading = () => {
    if (!speechSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    setSpeechState("idle");
    setSpeechMessage("");
  };

  const copyLink = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setShareMessage("Link copied");
    } catch {
      setShareMessage("Copy failed");
    }
  };

  const shareDocument = async () => {
    const url = window.location.href;
    const shareData = {
      title: current.title,
      text: `Read "${current.title}" from ${siteData.titlePage.title}.`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareMessage("Shared");
        return;
      } catch {
        return;
      }
    }

    await copyLink();
  };

  return (
    <div className="reader-toolbar" aria-label="Reader tools">
      <div className="reader-controls">
        <span className="reader-toolbar__label">Display</span>
        <button type="button" onClick={() => setFontScale((value) => Math.max(0.92, Number((value - 0.06).toFixed(2))))}>
          <Minus size={16} aria-hidden="true" />
          <span>Type</span>
        </button>
        <div className="reader-controls__value" aria-label={`Text scale ${Math.round(fontScale * 100)} percent`}>
          <Type size={16} aria-hidden="true" />
          {Math.round(fontScale * 100)}%
        </div>
        <button type="button" onClick={() => setFontScale((value) => Math.min(1.22, Number((value + 0.06).toFixed(2))))}>
          <Plus size={16} aria-hidden="true" />
          <span>Type</span>
        </button>
        <button type="button" onClick={() => setReaderMode((value) => (value === "paper" ? "dossier" : "paper"))}>
          <Sun size={16} aria-hidden="true" />
          <span>{readerMode === "paper" ? "Dossier" : "Paper"}</span>
        </button>
      </div>

      <div className="reader-controls">
        <span className="reader-toolbar__label">Listen</span>
        <button type="button" onClick={startReading} disabled={!speechSupported} aria-pressed={speechState === "speaking"}>
          {speechState === "speaking" ? <Volume2 size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          <span>{speechState === "idle" ? "Read" : "Restart"}</span>
        </button>
        <button type="button" onClick={pauseReading} disabled={!speechSupported || speechState === "idle"}>
          <Pause size={16} aria-hidden="true" />
          <span>{speechState === "paused" ? "Resume" : "Pause"}</span>
        </button>
        <button type="button" onClick={stopReading} disabled={!speechSupported || speechState === "idle"}>
          <Square size={14} aria-hidden="true" />
          <span>Stop</span>
        </button>
        {speechMessage ? <span className="reader-toolbar__status">{speechMessage}</span> : null}
      </div>

      <div className="reader-controls">
        <span className="reader-toolbar__label">Share</span>
        <button type="button" onClick={shareDocument}>
          <Share2 size={16} aria-hidden="true" />
          <span>Share</span>
        </button>
        <button type="button" onClick={copyLink}>
          {shareMessage === "Link copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          <span>Copy Link</span>
        </button>
        {shareMessage ? <span className="reader-toolbar__status">{shareMessage}</span> : null}
      </div>
    </div>
  );
}

function BlockRenderer({ block, isLead }) {
  if (block.type === "subheading") {
    return <h2 className="article-subheading">{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul className="article-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "links") {
    return (
      <div className="article-links" id="reader-sources">
        {block.items.map((item) => (
          <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        ))}
      </div>
    );
  }

  if (block.type === "paragraph") {
    const text = block.lines.join(" ");
    if (isLead) {
      return <p className="article-paragraph article-paragraph--lead esp-dropcap">{text}</p>;
    }
    return <p className="article-paragraph">{text}</p>;
  }

  return null;
}

function ImageGallery({ title, images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="image-gallery">
      <div className="image-gallery__header">
        <span className="esp-eyebrow">Supporting Images</span>
        <h2 className="esp-h2">Visual references attached to {title}</h2>
      </div>
      <div className="image-gallery__grid">
        {images.map((image) => (
          <figure key={`${image.relative_path}-${image.caption}`} className="image-card">
            <button type="button" className="image-card__button" onClick={() => setSelectedImage(image)}>
              <img src={image.publicPath} alt={image.caption} loading="lazy" />
            </button>
            <figcaption>
              <p className="image-card__caption">{image.caption}</p>
              <p className="image-card__credit">
                <strong>Source:</strong> {image.source_name}
              </p>
              <p className="image-card__credit">
                <strong>Author:</strong> {image.author}
              </p>
              <p className="image-card__credit">
                <strong>License:</strong> {image.license}
              </p>
              {!image.freely_licensed ? (
                <p className="image-card__credit">
                  <strong>Rights:</strong> source-attributed only; not freely licensed.
                </p>
              ) : null}
              {image.source_url ? (
                <a href={image.source_url} target="_blank" rel="noreferrer" className="image-card__link">
                  View original
                </a>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
      {selectedImage ? <ImageLightbox image={selectedImage} onClose={() => setSelectedImage(null)} /> : null}
    </section>
  );
}

function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button type="button" className="lightbox__backdrop" onClick={onClose} aria-label="Close image preview" />
      <div className="lightbox__panel">
        <button type="button" className="lightbox__close" onClick={onClose}>
          Close
        </button>
        <img src={image.publicPath} alt={image.caption} />
        <p>{image.caption}</p>
      </div>
    </div>
  );
}

export default App;
