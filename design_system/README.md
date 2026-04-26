# Española — Editorial Design System

A long-form investigative editorial system for **Española**, the Russian
paramilitary unit that began as a Hooligans Union of football ultras and
evolved into a distinctive private military formation fighting in Ukraine.

The system marries the sober, archival rigor of a **New York Times
investigation** (long-form Op-Doc / Visual Investigations style) with the
**dossier and propaganda visual grammar** of the Russia–Ukraine war:
typewritten case files, redacted lines, classified stamps, half-tone
combat photography, Cyrillic stencils, flare-orange football pyrotechnics
on bone paper.

## Source Material

- **uploads/ChatGPT Image Apr 25, 2026, 09_47_49 AM.png** — the cover
  artwork (copied to `assets/cover-hero.png`). Distressed black map of
  Belarus / Poland / Ukraine, weathered "ESPAÑOLA" wordmark in Oswald-style
  condensed display type, dossier metadata block in mono, hooligan in
  patched jacket facing a bombed-out cityscape with surveillance drones,
  ultras with flares (left), camo-clad fighters with kalashnikovs raised
  (right). Single source — no codebase, no Figma.
- The brief: *"Professional look and feel in the way the New York Times
  investigates long-form articles are presented, mixed with the
  Russia–Ukraine war and propaganda style."*

> **Subject background (from open-source reporting):** Española is a unit
> of Russian volunteers, founded in 2022, recruited largely from the
> Hooligans Union and football-ultra fanbases of clubs like Spartak
> Moscow, CSKA, and Zenit. Their visual identity leans on skulls,
> medieval banners, hooligan firm aesthetics, and orthodox / nationalist
> imagery. The design system treats them as a **subject of journalism**,
> not a brand to celebrate — every component is built for *reporting on*
> them, not *for* them.

---

## Index

| File / Folder | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography. |
| `colors_and_type.css` | Color and typography tokens (CSS vars, semantic classes). |
| `SKILL.md` | Skill manifest for downstream agents (Claude Code compatible). |
| `assets/` | Logos, hero image, textures, paper backgrounds. |
| `fonts/` | Webfont references (Google Fonts substitutes — see CAVEATS). |
| `preview/` | Cards rendered in the Design System tab. |
| `ui_kits/article/` | NYT-style long-form investigation kit (web). |
| `ui_kits/dossier/` | Intelligence-file / case-folder kit (dark). |
| `slides/` | *(omitted — no slide template was provided in the brief)* |

---

## CONTENT FUNDAMENTALS

The voice is **investigative journalism, not advocacy**. Every line is
written as if it could be cited in a Pulitzer entry: factual, sourced,
cool. We never glorify the subject; we never editorialize cheaply
either. Restraint is the brand.

### Voice & tone

- **Third person, past tense.** Reporters don't say "we" or "you."
  Subjects are referred to by full name on first mention, surname after.
- **Concrete over abstract.** Numbers, dates, place names, ranks, unit
  designators. *"On 14 February 2024, near Kreminna, a six-man assault
  team…"* — never *"in early 2024, somewhere in Donbas, fighters…"*.
- **Cold, not lurid.** Violence is documented, not dramatized.
- **Subject-aware.** Russian terms appear in italics with translation:
  *shtorm-Z, dobrovoltsy* ("volunteers"). Cyrillic only when the source
  uses it.
- **Skeptical sourcing.** Open-source claims are flagged: "according to
  intercepted radio traffic published by…", "Española's own Telegram
  channel claims…".

### Casing & punctuation

- Headlines: **Sentence case** for body headings ("How a hooligan firm
  became a military formation"); **ALL CAPS** only for the cover
  wordmark, dossier stamps, and section dividers.
- Em dashes — used freely, NYT-style — for parenthetical asides.
- Smart quotes: " " ' '. Never straight quotes in body copy.
- Numbers: spell out one through nine; numerals for 10+. Always numerals
  for ages, dates, military designations, casualty counts.
- "I" vs "you": **neither.** Reporters are invisible.

### Vibe / no-fly list

- ✅ Archival, forensic, restrained, weighty, slow-paced, paper-textured.
- ✅ Mono captions under photos. Tiny coordinates. Citation footnotes.
- ✅ Pull quotes pulled from primary sources (intercepts, interviews).
- ❌ No emoji. Ever.
- ❌ No exclamation marks in body copy.
- ❌ No marketing voice ("Discover the story of…", "Join us as we…").
- ❌ No first-person plural editorial "we."
- ❌ No tabloid framing ("SHOCKING", "BRUTAL").

### Examples

**Good (eyebrow + dek):**
> CASE FILE · UKR-ESP-17 · UPDATED 14.02.2024
>
> # Inside Española: How a Russian football firm became a paramilitary brand
>
> *Born in the terraces of Spartak Moscow, the unit has built one of
> the war's most recognizable visual identities — and one of its most
> opaque chains of command.*

**Bad:**
> 🔥 The CRAZIEST story you'll read this year! We dive deep into
> Russia's most badass private army…

**Photo caption (good):**
> *A volunteer with the Española formation, identified by call-sign
> "Skif", at a forward position east of Kreminna. Photograph released
> by the unit's own press service; date and location verified by
> [Outlet] using satellite imagery.*

---

## VISUAL FOUNDATIONS

### The two modes

The system runs in **two synchronized modes** that share tokens but
invert ink and paper:

1. **PAPER mode** — bone (`--paper-0` `#f5f1ea`) page, ink-black type.
   The default. Long-form articles, the body of the investigation.
   Reads like the print edition of a serious newspaper.
2. **DOSSIER mode** — deep black (`--dossier-0` `#0a0907`) page,
   bone type. Used for the cover, chapter openers, and the
   intelligence-file UI kit. Reads like a declassified folder.

### Color

- **Paper / Ink** is the entire foundation. Everything else is an
  accent. The palette has *one* warm bone (`#f5f1ea`), one near-black
  (`#0d0c0a`), and a 4-step ink ramp for hierarchy.
- **`--classified` `#b81d13`** is the only red. It's an aged red — never
  pure `#ff0000`. Used for stamps, the dek's eyebrow, hairline accents,
  and pull-quote marks. Treat it like the NYT's red T — sparingly, with
  weight.
- **`--flare` `#d94c2a`** appears once or twice per article — for
  pyrotechnic / hooligan moments only. Never UI chrome.
- **`--field-green`, `--map-blue`, `--highlighter`** are reserved for
  data viz, maps, and annotated documents.
- No gradients in UI chrome. The only gradients allowed are
  **photographic protection gradients** (black-to-transparent over hero
  imagery so headline text remains legible).

### Type

- **Display:** Oswald (condensed grotesque) — stands in for the cover
  artwork's stencil-lite condensed face. Used for the cover, section
  numerals, eyebrows, and dossier stamps. ALL CAPS, tight tracking.
- **Body / Headlines:** Old Standard TT — a Modern serif close in spirit
  to NYT's Cheltenham/Imperial. Used for h1/h2, body, pull quotes.
- **Mono / Typewriter:** Special Elite — typewriter face, used for
  metadata strips, case-file headers, photo captions of evidence,
  redactions. *This is the dossier voice.*
- **Mono / Data:** JetBrains Mono — for coordinates, timestamps, tabular
  data. Cleaner and more legible than Special Elite at small sizes.

### Backgrounds & textures

- The default page background is bone paper (`--paper-0`), optionally
  overlaid with a **subtle paper grain** (we use a CSS `noise.svg`
  fractal-noise filter at 0.04 opacity).
- Hero / chapter images are **full-bleed**, desaturated to ~30%, with a
  protection gradient bottom-up.
- Combat / archival photography is **black-and-white with warm sepia
  shift** (`sepia(0.15) saturate(0.5)`). Color images are reserved for
  evidence callouts.
- No stock illustrations. Ever. Photography only, or typographic
  composition.

### Animation

- **Slow, archival, deliberate.** All transitions: 400–700ms,
  `cubic-bezier(0.2, 0.7, 0.1, 1)` (ease-out-soft).
- **No bounces, no springs.** This is a newspaper, not a SaaS app.
- Page transitions: cross-fade (300ms) plus a 1px translate-up on enter.
- Hover on links: underline thickens from 1px → 2px in 150ms; **no
  color change**.
- "Stamp" reveals (the rotated CLASSIFIED badge) animate in with a
  300ms scale-from-1.05 + 4° rotation snap.

### Hover / press states

- **Links (body):** underline 1px, ink-color. Hover: underline 2px +
  ink color stays. Press: opacity 0.7.
- **Buttons (paper mode):** 1px ink border, no fill, ink type. Hover:
  fill turns ink, type turns paper (full inversion). Press: shrink 2%.
- **Cards (article tiles):** hover lifts shadow-paper to a slightly
  longer drop; the headline gains a 1px ink underline.
- Never use `:hover` color changes that introduce a new hue. Stay in
  the ink/paper duotone.

### Borders, rules & radii

- **Radii are 0–2px.** This is documents. Sharp corners. The only
  rounded elements are photographic crops and the rare data-viz pill.
- **Hairline rules** (`1px solid --rule`) divide sections. **Double
  rules** (`3px double --ink-1`) bracket pull quotes.
- **No shadows on UI chrome** in paper mode. Shadows are reserved for
  the *physical paper* metaphor — `shadow-paper` simulates a sheet
  resting on a desk.

### Shadows

- `--shadow-paper` — a hint of weight under article cards, only.
- `--shadow-dossier` — a deep, hard drop on dossier-mode cards. Suggests
  the folder is sitting on a desk under a lamp.
- Inner shadows: not used.

### Transparency, blur, layering

- **Transparency** is used in two places only:
  1. Protection gradients on hero photography (black 0→0.7 alpha).
  2. The 0.04-alpha paper-noise overlay.
- **Backdrop blur** is not used. This is a print system at heart.
- **Layering** is photographic — images sit *behind* text, separated by
  a protection gradient. Cards do not overlap.

### Imagery

- Black-and-white with a **warm sepia shift** is default.
- One color image per article max — usually the lead photograph, color
  reserved for emphasis.
- Combat / archival photography: high contrast, deep blacks, warm grain.
- **Half-tone treatment** is allowed for portraits in dossier mode
  (CSS `filter: contrast(1.4) grayscale(1)` + a tiled half-tone PNG).
- **Stamps & overlays** can be composited over photos: rotated, slightly
  off-register, in `--classified` red.

### Layout rules

- The grid is **12 columns**, 80px max gutter, NYT-style. Body copy
  occupies a center 6-column measure (~640px) at desktop.
- **Wide assets** (photos, pull quotes, maps) break out to 8, 10, or
  full-bleed 12 columns.
- **Marginalia** (footnotes, source citations, coordinates) live in a
  right-rail column in mono.
- Left-aligned everything. Centered text only on the cover and dedicated
  chapter openers.
- Vertical rhythm follows a 24px baseline.

### Cards

- Paper mode card: **bone-2 surface, no border, soft paper shadow**,
  2px radius, 24–32px padding, hairline rule above the headline.
- Dossier mode card: **dossier-1 surface, 1px `--dossier-rule` border,
  hard shadow**, 0px radius, mono header strip across the top with case
  number + status pill.

---

## ICONOGRAPHY

The system uses **three icon registers**, in order of preference:

1. **Lucide (CDN)** — for all UI chrome (navigation, buttons, controls).
   Stroke 1.5, sharp ends, monoline. Loaded from
   `https://unpkg.com/lucide@latest`. We chose Lucide because its
   stroke-based, restrained line work matches the editorial register —
   nothing playful, nothing rounded-cute. *FLAGGED: this is a
   substitution; no in-house icon set was provided.*
2. **Custom SVG seal/insignia** (in `assets/marks/`) — the Española
   skull-and-banner mark, the case-file ribbon, the redaction bar, the
   classified stamp. These are **brand marks**, not icons; they appear
   at fixed sizes and are never recolored.
3. **Cyrillic / typographic glyphs** as section markers — `§ ¶ † ‡ № ✦`.
   The Cyrillic numero sign **№** is used for case-file numbers
   ("ДЕЛО №17.02"). Used as design elements, with restraint.

**No emoji.** Ever. Emoji are categorically inappropriate for this
subject matter. The system's lint rule should reject them.

**Photographic icons** (small portraits framed in a black hairline) are
preferred over avatar emoji or initials when representing people.

The single piece of in-house imagery — `assets/cover-hero.png` — is
treated as the sole canonical cover artwork. Do not regenerate or
restyle it. Crop and over-typeset only.

---

## CAVEATS & SUBSTITUTIONS

- **Fonts are Google-Fonts substitutes.** The cover artwork uses a
  custom distressed condensed face — Oswald is the closest royalty-free
  Google Font match in proportion and weight, but it lacks the print
  distress. *If a real font file is available (e.g. Druk Wide, Anton,
  or a custom stencil), drop a `.woff2` in `fonts/` and update
  `colors_and_type.css`'s `--font-display` declaration.*
- **No real codebase or Figma was provided** — only the cover
  illustration. UI kits are inferred from the visual brief plus the NYT
  long-form references it cites.
- **Iconography:** Lucide is a stand-in for an in-house set. Flag for
  the user.
- **Subject sensitivity:** the system contains no propaganda — it is
  designed to *report on* propaganda, with the cool detachment of a
  newsroom. Tone/voice rules above are non-negotiable.
