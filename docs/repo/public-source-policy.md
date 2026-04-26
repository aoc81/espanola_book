# Public Source Policy

The repository separates reader-facing source material from local-only archival material.

## Public, intended for git

- `sources/links/` — curated public URLs and reader-facing source-link material
- `sources/research-notes/` — analyst notes that are safe to publish
- `sources/telegram/` — channel-derived text material and structured extraction that is appropriate for publication
- manuscript appendices under `manuscripts/.../contents/`

## Local-only or selectively published

- `sources/archives/` — raw local archive captures, saved HTML/PDF files, and similar preservation material

This directory is separated because it can create copyright, size, or sensitivity problems for a public GitHub repository. Manuscript notes may still describe these materials conceptually, but the repository should not rely on them as tracked build artifacts.

## Generated material

- DOCX files under `build/docx/`
- generated site content and copied pictures under `build/site/`

These should be reproducible from the tracked manuscript, asset manifests, and scripts.
