# Repository Structure

This repository uses a version-first layout.

## Canonical manuscript paths

- `manuscripts/v1/en/contents/`
- `manuscripts/v2/en/contents/`
- `manuscripts/v3/en/contents/`
- `manuscripts/v4/en/contents/`
- `manuscripts/v4/en/legacy-txt/`
- `manuscripts/v4.1/en/contents/`
- `manuscripts/v4.1/es/contents/`
- `manuscripts/v4.1/fr/contents/`

Each manuscript edition keeps authored Markdown only in `contents/`.
For `v1`–`v3`, the repository preserves the original draft text layout as archival content rather than trying to retrofit those drafts into the later chapter/file conventions.

## Canonical asset paths

- `assets/manifests/<version>/<language>/chapter_images.json`
- `assets/images/manuscripts/<version>/<language>/pictures/...`
- `assets/images/covers/...`
- `assets/images/shared/...`

The manifest is canonical metadata. Image files live separately under `assets/images/...`.

## Script layout

- `scripts/books/` — DOCX building and legacy manuscript conversion
- `scripts/assets/` — image ingestion, merge, and fetch tooling
- `scripts/website/` — manuscript-to-site generation

Scripts should take explicit edition parameters instead of hardcoding legacy roots such as `v4.1/contents` or `v4.1-es/`.

## Website and design assets

- `site/` is the active website application source
- `build/site/` contains generated manuscript data and copied public assets for the site build
- `design_system/` remains top-level because it is shared design infrastructure rather than website-only code

Legacy `html/` material is non-canonical and should not be used as a source path.

## Generated output

- `build/docx/<version>/<language>/...`
- `build/site/generated-manuscript.js`
- `build/site/public/...`

Generated output is not source of truth and should not be committed.
