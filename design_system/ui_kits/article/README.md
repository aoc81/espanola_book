# Article Kit — NYT-style long-form investigation

A high-fidelity recreation of an investigative long-form article surface,
in the style of NYT's Visual Investigations / Op-Doc long-reads, applied
to Española.

## Components

- `Masthead.jsx` — top brand bar with edition meta strip
- `CoverHero.jsx` — full-bleed dossier cover with overprinted wordmark
- `Dek.jsx` — eyebrow + headline + standfirst + byline block
- `BodyParagraph.jsx`, `DropCapParagraph.jsx`
- `PullQuote.jsx`
- `Figure.jsx` — full-bleed photograph with mono caption
- `EvidenceCard.jsx` — sidebar evidence callout (paper card)
- `ChapterMark.jsx` — section divider with chapter numeral
- `Footer.jsx`

`index.html` assembles a representative chapter of the investigation —
masthead → cover → dek → body with drop cap → figure → pull quote →
evidence card → chapter mark → next chapter teaser.
