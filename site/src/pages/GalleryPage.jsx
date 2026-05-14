import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import siteData from "@generated-manuscript";
import { displayLicenseLabel } from "../lib/siteUtils";
const REFERENCE_LINKS = [
  {
    section: "Core reporting & investigations",
    items: [
      { outlet: "BBC News Russian", title: "Армия на полставки", url: "https://www.bbc.com/russian/news-67454788" },
      { outlet: "Cherta Media", title: "Кто такие ЧВК «Эспаньола»? Фанаты на войне", url: "https://cherta.media/story/fans-of-war/" },
      { outlet: "Current Time / Radio Svoboda", title: "ASTRA: Командира «Эспаньолы» Орлова убили, вероятно, при задержании", url: "https://www.svoboda.org/a/astra-komandir-espanjoly-orlov-byl-ubit-pri-popytke-zaderzhaniya/33630161.html" },
      { outlet: "El País English", title: "Russian ultranationalism, inflamed by the killing of the hooligan commander 'Spaniard'", url: "https://english.elpais.com/international/2025-12-23/russian-ultranationalism-inflamed-by-the-killing-of-the-hooligan-commander-spaniard.html" },
      { outlet: "The Guardian", title: "Warning to others: murky death of militia leader as Kremlin reasserts control", url: "https://www.theguardian.com/world/2025/dec/24/militia-leader-murky-death-stanislav-orlov-russia-kremlin-control" },
      { outlet: "The Insider", title: "Российская бригада «Эспаньола»... объявила о расформировании", url: "https://theins.ru/news/285526" },
      { outlet: "Kyiv Post", title: "'Espanola,' Russian Ultras Militia in Ukraine, Disbands", url: "https://www.kyivpost.com/post/61407" },
      { outlet: "Meduza", title: "'It's clear the system doesn't need smart people': Russian paramilitary group of soccer fans announces disbandment", url: "https://meduza.io/en/feature/2025/10/06/it-s-clear-the-system-doesn-t-need-smart-people" },
      { outlet: "Meduza", title: "The neo-Nazi de-Nazifiers", url: "https://meduza.io/en/feature/2023/03/14/the-neo-nazi-de-nazifiers" },
      { outlet: "Meduza", title: "Española's patron revealed", url: "https://meduza.io/en/feature/2024/03/04/espanola-s-patron-revealed" },
      { outlet: "Meduza", title: "Russian military intelligence develops new mercenary deployment scheme", url: "https://meduza.io/en/news/2025/07/16/russian-military-intelligence-develops-new-mercenary-deployment-scheme" },
      { outlet: "Meduza", title: "В войне в Украине участвует бригада «Эспаньола»", url: "https://meduza.io/feature/2024/09/07/v-voyne-v-ukraine-uchastvuet-batalon-espanola-sformirovannyy-preimuschestvenno-iz-rossiyskih-futbolnyh-fanatov-fotografii" },
      { outlet: "Metro", title: "Who are the Russian football hooligans fighting for Putin in Ukraine?", url: "https://metro.co.uk/2024/11/07/russian-football-hooligans-fighting-putin-ukraine-21952544/" },
      { outlet: "The Moscow Times", title: "Leader of Far-Right Russian Group Fighting in Ukraine Dies in Unknown Circumstances", url: "https://www.themoscowtimes.com/2025/12/19/leader-of-far-right-russian-group-fighting-in-ukraine-dies-in-unknown-circumstances-a91492" },
      { outlet: "Novaya Gazeta Europe", title: "Появились «футболисты» в окопах под огнем", url: "https://novayagazeta.eu/articles/2023/08/13/poiavilis-futbolisty-v-okopakh-pod-ognem" },
      { outlet: "Novaya Gazeta Europe", title: "Командир-200", url: "https://novayagazeta.eu/articles/2025/12/20/komandir-200" },
      { outlet: "RTVI", title: "Командир «Эспаньолы» Станислав Орлов жив", url: "https://rtvi.com/stories/komandir-espanoly-stanislav-orlov-zhiv/" },
    ],
  },
  {
    section: "Analytical, registry & contextual sources",
    items: [
      { outlet: "amalantra.ru", title: "Бригада «Эспаньола»: участие в СВО, состав, численность и рекрутинг", url: "https://amalantra.ru/brigada-espanola/" },
      { outlet: "Daily Sabah", title: "Battle on pitch: Russian football ultras take arms in Mariupol", url: "https://www.dailysabah.com/sports/football/battle-on-pitch-russian-football-ultras-take-arms-in-mariupol" },
      { outlet: "Defence Intelligence of Ukraine", title: "Putin's 'United Russia' Party intensifying recruitment into its own private army", url: "https://gur.gov.ua/en/content/partiia-putina-iedinaia-rossiia-aktyvizuie-rekrutynh-u-vlasnu-pryvatnu-armiiu.html" },
      { outlet: "Dialnet", title: "La Amenaza Hooligan", url: "https://dialnet.unirioja.es/servlet/articulo?codigo=9879235" },
      { outlet: "Evocation", title: "Stanislav Orlov of Espanyol kills Ukrainian civilians", url: "https://evocation.info/en/stanislav-orlov/" },
      { outlet: "GNET", title: "Española: Russia's Far-Right Hooligan Militia and Its Online Activities", url: "https://gnet-research.org/2024/08/09/espanola-russias-far-right-hooligan-militia-and-its-online-activities/" },
      { outlet: "GUR / War & Sanctions", title: "Defence Intelligence and Center for Countering Disinformation — Kremlin Propagandists data", url: "https://gur.gov.ua/en/content/warsanctions-hur-mo-ukrainy-ta-tsentr-protydii-dezinformatsii-publikuiut-dani-16-kremlivskykh-propahandystiv-ta-voienkoriv" },
      { outlet: "ISW", title: "Russian Offensive Campaign Assessment, December 9, 2024", url: "https://understandingwar.org/research/russia-ukraine/russian-offensive-campaign-assessment-december-9-2024/" },
      { outlet: "Jamestown Foundation", title: "Española: Russia's Premier Soccer Paramilitary Group", url: "https://jamestown.org/espanola-russias-premier-soccer-paramilitary-group/" },
      { outlet: "Jamestown Foundation", title: "Mikhail 'Pitbull' Turkanov: The Rise of Russian Soccer Hooligan Unit 'Española'", url: "https://jamestown.org/mikhail-pitbull-turkanov-the-rise-of-russian-soccer-hooligan-unit-espanola-in-ukraine/" },
      { outlet: "Jamestown Foundation", title: "Kremlin Continues to Eliminate PMCs and Semi-Autonomous Volunteer Units", url: "https://jamestown.org/kremlin-continues-to-eliminate-pmcs-and-semi-autonomous-volunteer-units/" },
      { outlet: "Jamestown Foundation", title: "Alekseev Assassination Attempt Reveals Russian Security Service Cracks", url: "https://jamestown.org/alekseev-assassination-attempt-reveals-russian-security-service-cracks/" },
      { outlet: "MEMRI (archive)", title: "Neo-Nazi Espanola Brigade Raise Funds for Drones", url: "https://archive.is/2025.05.20-004748/https://www.memri.org/dttm/neo-nazi-espanola-brigade-raise-funds-drones-and-other-equipment-through-charitable-foundation" },
      { outlet: "Meduza", title: "Why does GRU need a PMC? Meet the private military company 'Redut'", url: "https://meduza.io/en/feature/2023/10/13/why-does-gru-need-a-pmc" },
      { outlet: "RFE/RL / Schemes / Systema", title: "How Russia's GRU Set Up A Fake Private Military Company For Its War In Ukraine", url: "https://www.rferl.org/amp/russia-gru-fake-private-military-company-ukraine-redut-investigation/32630705.html" },
      { outlet: "Novaya Gazeta Europe", title: "Women at war", url: "https://novayagazeta.eu/articles/2023/08/08/women-at-war-en" },
      { outlet: "OpenSanctions", title: "PMC ESPANIOLA", url: "https://www.opensanctions.org/entities/NK-2wFskUeZg9ziFcgR2fdQvu/" },
      { outlet: "OpenSanctions", title: "Mikhail Victorovich TURKANOV", url: "https://www.opensanctions.org/entities/NK-Nq3i9YUmEA8FvbkkfqFXDw/" },
      { outlet: "Searchlight", title: "Mixed fortunes for Russia's far right assets", url: "https://searchlightmagazine.com/2024/09/mixed-fortunes-for-russias-far-right-assets/" },
      { outlet: "TASS", title: "'Españole' handed a robotic turret with a Kalashnikov machine gun for combat testing", url: "https://tass.ru/armiya-i-opk/20401107" },
      { outlet: "UNITED24 Media", title: "Putin's Use of Private Military Companies To Wage Terror on Ukraine", url: "https://united24media.com/war-in-ukraine/putins-use-of-private-military-companies-to-wage-terror-on-ukraine-3071" },
      { outlet: "UNITED24 Media", title: "UK Imposes 46 New Sanctions on Russia, Targeting Wagner Group and Mercenary Networks", url: "https://united24media.com/latest-news/uk-imposes-46-new-sanctions-on-russia-targeting-wagner-group-and-mercenary-networks-3574" },
      { outlet: "Ukrainian War & Sanctions", title: "FEDOTOV Ivan Dmitrievich", url: "https://war-sanctions.gur.gov.ua/en/sport/persons/29437" },
      { outlet: "Ukrainska Pravda", title: "Russian Redut Private Military Company recruits women into assault units", url: "https://www.pravda.com.ua/eng/news/2023/11/28/7430714/" },
      { outlet: "Wikipedia", title: "Espanola (brigade)", url: "https://en.wikipedia.org/wiki/Espanola_(brigade)" },
      { outlet: "Wikipedia (RU)", title: "Эспаньола (бригада)", url: "https://ru.wikipedia.org/wiki/%D0%AD%D1%81%D0%BF%D0%B0%D0%BD%D1%8C%D0%BE%D0%BB%D0%B0_(%D0%B1%D1%80%D0%B8%D0%B3%D0%B0%D0%B4%D0%B0)" },
    ],
  },
  {
    section: "Telegram channels",
    items: [
      { outlet: "Española — primary channel", title: "spainrus", url: "https://t.me/spainrus" },
      { outlet: "Española — public archive", title: "t.me/s/spainrus", url: "https://t.me/s/spainrus" },
      { outlet: "Affiliated — combat & field material", title: "marine_esp", url: "https://t.me/marine_esp" },
      { outlet: "Affiliated — fighter-facing content", title: "nashi_parnii", url: "https://t.me/nashi_parnii" },
      { outlet: "Affiliated — Turkanov-associated", title: "olympicPitbull", url: "https://t.me/olympicPitbull" },
      { outlet: "Affiliated — female-facing recruitment", title: "valkyriyaESP", url: "https://t.me/valkyriyaESP" },
    ],
  },
  {
    section: "Other consulted sources",
    items: [
      { outlet: "UK Government", title: "Russia sanctions notice, 7 November 2024", url: "https://assets.publishing.service.gov.uk/media/672c6d07abb279b2de1e8cc0/Notice_Russia_071124.pdf" },
      { outlet: "UK Government", title: "Russia sanctions notice, 22 February 2024", url: "https://assets.publishing.service.gov.uk/media/65d729912ab2b300117596d9/Notice_Russia_220224.pdf" },
      { outlet: "U.S. Department of the Treasury", title: "Treasury Targets Russian Proxy Wagner Group as a Transnational Criminal Organization", url: "https://home.treasury.gov/news/press-releases/jy1296" },
      { outlet: "EUR-Lex", title: "Council Implementing Regulation (EU) 2023/2871", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL_202302871" },
      { outlet: "Telemetr", title: "Española / spainrus channel statistics", url: "https://telemetr.me/content/spainrus" },
      { outlet: "TASS", title: "88th brigade / Española weapons-testing reporting", url: "https://tass.ru/armiya-i-opk/21676993" },
      { outlet: "TASS", title: "Española combat reporting", url: "https://tass.ru/armiya-i-opk/22806653" },
      { outlet: "TASS", title: "Española and Volunteer Corps reporting", url: "https://tass.ru/armiya-i-opk/22914349" },
      { outlet: "TASS", title: "Española and Volunteer Corps reporting (follow-up)", url: "https://tass.ru/armiya-i-opk/22932687" },
      { outlet: "TASS", title: "Española brigade reorganization reporting", url: "https://tass.ru/armiya-i-opk/25245119" },
      { outlet: "TASS", title: "Española brigade reorganization follow-up", url: "https://tass.ru/armiya-i-opk/25247045" },
      { outlet: "TASS", title: "Interview mentioning Española operations", url: "https://tass.ru/interviews/19538089" },
      { outlet: "iStories", title: "Española patronage / Viktor Shendrik reporting", url: "https://istories.media/stories/2024/03/04/espaniola/" },
      { outlet: "iStories", title: "Reporting on recruitment of women into assault units", url: "https://istories.media/news/2023/11/28/vazhnie-istorii-uznali-o-nabore-zhenshchin-v-shturmovie-otryadi/" },
      { outlet: "iStories", title: "Reporting on the death of Stanislav Orlov", url: "https://istories.media/news/2025/12/19/umer-sozdatel-i-komandir-dobrovolcheskoi-brigadi-espanola-stanislav-orlov-ispanets/" },
      { outlet: "Novaya Gazeta Europe", title: "Mikhail Turkanov's award", url: "https://novayagazeta.eu/articles/2023/02/06/storonniki-neonatsista-i-boitsa-mma-mikhaila-turkanova-soobshchili-o-vruchenii-emu-ordena-muzhestva-na-voine-v-ukraine-news" },
      { outlet: "InformNapalm", title: "Why Surkov Needs a Private Army: Union of Donbas Volunteers", url: "https://informnapalm.org/en/surkov-needs-private-army-union-donbas-volunteers-reserve-russian-guard/" },
      { outlet: "InformNapalm (RU)", title: "Зачем Суркову частная армия СДД", url: "https://informnapalm.org/34880-zachem-surkovu-chastnaya-armiya-sdd/" },
      { outlet: "RBC Companies", title: "Fondo 'Española' registry entry", url: "https://companies.rbc.ru/id/1247700574120-fond-espanola/" },
      { outlet: "ARA", title: "Española, la unidad de ultras del fútbol ruso que lucha en Ucrania", url: "https://es.ara.cat/internacional/europa/espanola-unidad-ultras-futbol-ruso-lucha-ucrania_1_4713788.html" },
      { outlet: "RTVI", title: "Жизнь и смерть командира Испанца, построившего легендарную Эспаньолу", url: "https://rtvi.com/stories/zhizn-i-smert-komandira-ispancza-postroivshego-legendarnuyu-espanolu/" },
      { outlet: "La Razón", title: "De estrella de fútbol a combatiente en la brigada Española de Putin", url: "https://www.larazon.es/deportes/estrella-futbol-combatiente-brigada-espanola-putin_202303166412b91f7262e50001ad1990.html" },
      { outlet: "Komsomolskaya Pravda", title: "MotoGuard / Española-related public activity", url: "https://www.kp.ru/daily/27731/5121009/" },
      { outlet: "Molfar", title: "What is Española? Neo-Nazis and ultras in the Russian army", url: "https://molfar.com/en/blog/espanola-brigade-russian-neo-nazis-and-ultras" },
    ],
  },
];

export function GalleryPage() {
  const allImages = siteData.documents.flatMap((doc) =>
    doc.images.map((img) => ({ ...img, docTitle: doc.title, docSlug: doc.slug }))
  );
  const [showAllImages, setShowAllImages] = useState(false);
  const visibleImages = showAllImages ? allImages : allImages.slice(0, 16);

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div className="page-crumb" style={{ paddingTop: 12, paddingBottom: 12, background: "var(--paper-0)" }}>
        <div className="page-crumb__inner">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span>Section III</span>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>Sources & Image References</span>
          <span className="page-crumb__spacer" />
          <span style={{ color: "var(--classified)" }}>● {siteData.stats.imageCount} image refs · 44 sources · 75 links</span>
        </div>
      </div>

      {/* hero */}
      <section className="page-section" style={{ position: "relative", paddingTop: 72, paddingBottom: 48, borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div className="page-section__inner">
          <div className="page-eyebrow-row">
            <div className="eyebrow">Section · 03 · Appendices</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>The Evidence Room</div>
          </div>

          <div className="page-intro__grid page-intro__grid--auto">
            <div>
              <div className="page-intro__title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.82, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 18 }}>
                SOURCES.
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0, maxWidth: 800 }}>
                Every claim in this book is traced to a primary source, intercepted transmission, or open-source verification. Below: image references, source-handling protocol, and appendix documents.
              </h2>
            </div>

            <div style={{ paddingBottom: 12 }}>
              <div style={{ borderTop: "3px double var(--ink-1)", borderBottom: "3px double var(--ink-1)" }}>
                {[
                  ["Image references", String(siteData.stats.imageCount)],
                  ["Sources", "44"],
                  ["Reference links", "75"],
                ].map(([label, value], i, arr) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, padding: "12px 4px", borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    <span style={{ color: "var(--ink-3)" }}>{label}</span>
                    <span style={{ color: "var(--ink-0)", fontWeight: 700 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* reference links */}
      <section className="page-section" style={{ paddingTop: 72, paddingBottom: 88, borderBottom: "1px solid var(--paper-edge)" }}>
        <div className="page-section__inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 48 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Reference Links ✦</span>
            <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            <span className="mono" style={{ color: "var(--ink-3)" }}>75 links · 44 sources</span>
          </div>
          <div style={{ display: "grid", gap: 48 }}>
            {REFERENCE_LINKS.map((group) => (
              <div key={group.section}>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center", gap: 18, marginBottom: 20 }}>
                  <span className="eyebrow">{group.section}</span>
                  <span style={{ height: 1, background: "var(--paper-edge)" }} />
                </div>
                <div style={{ border: "1px solid var(--paper-edge)", background: "var(--paper-1)" }}>
                  {group.items.map((item, i) => (
                    <div key={item.url} className="gallery-source-row" style={{ padding: "14px 18px", borderBottom: i === group.items.length - 1 ? "none" : "1px solid var(--paper-edge)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>{item.outlet}</span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-0)", textDecoration: "none", borderBottom: "1px solid var(--paper-edge)" }}>
                        {item.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* image grid */}
      {allImages.length > 0 && (
        <section className="page-section" style={{ paddingTop: 56, paddingBottom: 72 }}>
          <div className="page-section__inner">
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 32 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Image References ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
              <span className="mono" style={{ color: "var(--ink-3)" }}>{allImages.length} items</span>
            </div>
            <div className="gallery-image-grid">
              {visibleImages.map((img, i) => (
                <GalleryImageCard key={`${img.publicPath}-${i}`} img={img} index={i} />
              ))}
            </div>
            {!showAllImages && allImages.length > 16 && (
              <div style={{ marginTop: 48, textAlign: "center" }}>
                <button
                  onClick={() => setShowAllImages(true)}
                  style={{ border: "1px solid var(--ink-1)", background: "transparent", color: "var(--ink-1)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", padding: "0 18px", height: 44, cursor: "pointer" }}
                >
                  ▾ {allImages.length - 16} more references
                </button>
              </div>
            )}
          </div>
        </section>
      )}

    </main>
  );
}
function GalleryImageCard({ img, index }) {
  return (
    <article style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: -10, left: 24, width: 56, height: 16, background: "rgba(212,200,170,0.7)", border: "1px solid rgba(28,26,22,0.08)", zIndex: 2 }} />
      <div style={{ background: "var(--paper-2)", border: "1px solid var(--ink-1)", boxShadow: "0 16px 28px -18px rgba(20,17,13,0.4)" }}>
        <div style={{ position: "relative", height: 200, overflow: "hidden", borderBottom: "1px solid var(--ink-1)" }}>
          <img src={img.publicPath} alt={img.caption ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.5) contrast(1.1) sepia(0.15) brightness(0.92)" }} />
          <div style={{ position: "absolute", bottom: 8, right: 8, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--paper-0)", letterSpacing: "0.06em", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
            FIG. {String(index + 1).padStart(2, "0")}
          </div>
        </div>
        <div style={{ padding: "10px 14px", background: "var(--paper-1)", borderBottom: "1px solid var(--paper-edge)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "55%" }}>{img.docTitle?.slice(0, 20)}{img.docTitle?.length > 20 ? "…" : ""}</span>
          <span style={{ color: "var(--classified)" }}>{img.source_name?.slice(0, 14) ?? "Reference"}</span>
        </div>
        <div style={{ padding: "14px 14px 16px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 13, lineHeight: 1.5, color: "var(--ink-1)", margin: "0 0 12px", minHeight: 56 }}>
            {img.caption?.slice(0, 100)}{img.caption?.length > 100 ? "…" : ""}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 10, borderTop: "1px solid var(--paper-edge)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            <div>
              <div style={{ fontSize: 8, letterSpacing: "0.2em", marginBottom: 2 }}>SOURCE</div>
              <div style={{ color: "var(--ink-1)" }}>{img.source_name?.slice(0, 16) ?? "—"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 8, letterSpacing: "0.2em", marginBottom: 2 }}>LICENSE</div>
              <div style={{ color: "var(--ink-1)" }}>{displayLicenseLabel(img.license)}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

