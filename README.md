# Hispaniola

Repository for the Española book project, its public manuscript editions, the DOCX build pipeline, the website reader, source-link appendices, and the supporting design/methodology material.

## License

This repository is licensed under `CC BY-NC 4.0` for non-commercial reuse:
https://creativecommons.org/licenses/by-nc/4.0/

## Repository layout

- `manuscripts/` — canonical book editions by version and language
- `assets/` — image manifests, manuscript image trees, covers, and shared visual assets
- `scripts/` — shared book, asset, and website build tooling
- `site/` — Vite + React web reader
- `sources/` — source links, research notes, Telegram-derived material, and local-only archives
- `docs/` — methodology, editorial guidance, repo structure, and codex guidance
- `design_system/` — reusable visual system and uploaded cover assets
- `build/` — generated DOCX and generated website content/assets

`site/` is the active web application. `design_system/` stays separate because it serves both the website and the book-production workflow.

See [docs/repo/structure.md](docs/repo/structure.md) for the canonical path conventions and [docs/repo/public-source-policy.md](docs/repo/public-source-policy.md) for what is public versus local-only.

## Common commands

Build the English v4.1 DOCX:

```bash
python scripts/books/build_docx.py --version v4.1 --language en
```

Build the English v4.1 PDF:

```bash
python scripts/books/build_pdf.py --version v4.1 --language en
```

Build the Spanish or French editions:

```bash
python scripts/books/build_docx.py --version v4.1 --language es
python scripts/books/build_docx.py --version v4.1 --language fr
```

Run the website:

```bash
cd site
npm install
npm run dev
```

The site generator reads from `manuscripts/v4.1/en/contents` by default and writes generated assets to `build/site/`.

## Version handling

- `manuscripts/v1/en`, `manuscripts/v2/en`, and `manuscripts/v3/en` are archived draft stages
- `manuscripts/v4/en` is the archival source-backed edition with legacy TXT retained separately
- `manuscripts/v4.1/en`, `es`, and `fr` are the canonical structured public editions
