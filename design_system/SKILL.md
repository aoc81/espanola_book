---
name: espanola-design
description: Use this skill to generate well-branded interfaces and assets for Española — a long-form NYT-style investigative editorial system applied to the Russian "Española" paramilitary unit. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## At-a-glance

- **Two synchronized modes:** PAPER (bone `#f5f1ea` + ink black) for long-form articles; DOSSIER (deep black `#0a0907` + bone) for case-file surfaces.
- **Type:** Old Standard TT (serif body/headlines, NYT-Imperial substitute), Oswald (display/cover/stamps), Special Elite (typewriter/dossier metadata), JetBrains Mono (data/coords).
- **One red:** `--classified` `#b81d13` — never pure red, never UI chrome, only stamps + eyebrows + marks.
- **Sharp corners** (0–2px radii). **Hairline + double rules** divide content. **No emoji, no marketing voice.**
- **Tone:** investigative journalism — third-person, past-tense, sourced, restrained. Subject is reported on, never celebrated.

See `colors_and_type.css` for tokens, `README.md` for full content + visual foundations, and `ui_kits/{article,dossier}/` for high-fidelity recreations.
