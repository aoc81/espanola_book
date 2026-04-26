from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]

CHAPTER_MAP = {
    "Chapter 001 Prologue.txt": "Prologue.md",
    "Chapter 01.txt": "Chapter 01.md",
    "Chapter 02.txt": "Chapter 02.md",
    "Chapter 03.txt": "Chapter 03.md",
    "Chapter 04.txt": "Chapter 04.md",
    "Chapter 05.txt": "Chapter 05.md",
    "Chapter 08.txt": "Chapter 08.md",
    "Chapter 09.txt": "Chapter 09.md",
    "Chapter 10.txt": "Chapter 10.md",
    "Chapter 12.txt": "Chapter 12.md",
    "Chapter 13.txt": "Chapter 13.md",
    "Chapter 15.txt": "Chapter 15.md",
    "Chapter 17.txt": "Chapter 17.md",
    "Chapter 19 Epilogue.txt": "Epilogue.md",
}


def edition_manifest(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "manifests" / version / language / "chapter_images.json"


def edition_image_root(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "images" / "manuscripts" / version / language


def load_json(path: Path) -> list[dict]:
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def copy_image(source_root: Path, target_root: Path, relative_path: str) -> None:
    source = source_root / relative_path
    target = target_root / relative_path
    if not source.exists():
        raise FileNotFoundError(f"Legacy image missing: {source}")
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        shutil.copy2(source, target)


def merge_legacy_images(source_version: str, source_language: str, target_version: str, target_language: str) -> None:
    source_manifest = edition_manifest(source_version, source_language)
    target_manifest = edition_manifest(target_version, target_language)
    source_root = edition_image_root(source_version, source_language)
    target_root = edition_image_root(target_version, target_language)

    current_manifest = load_json(target_manifest)
    legacy_manifest = load_json(source_manifest)
    existing_keys = {(entry["chapter_file"], entry["relative_path"]) for entry in current_manifest}

    added = 0
    for entry in legacy_manifest:
        mapped_chapter = CHAPTER_MAP.get(entry["chapter_file"])
        if not mapped_chapter:
            continue

        new_entry = dict(entry)
        new_entry["chapter_file"] = mapped_chapter
        key = (new_entry["chapter_file"], new_entry["relative_path"])
        if key in existing_keys:
            continue

        copy_image(source_root, target_root, new_entry["relative_path"])
        current_manifest.append(new_entry)
        existing_keys.add(key)
        added += 1

    target_manifest.parent.mkdir(parents=True, exist_ok=True)
    current_manifest.sort(key=lambda item: (item["chapter_file"], item["relative_path"], item["caption"]))
    target_manifest.write_text(json.dumps(current_manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Added legacy entries: {added}")
    print(f"Total manifest entries: {len(current_manifest)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Merge legacy image manifest entries into a target edition.")
    parser.add_argument("--source-version", default="v4")
    parser.add_argument("--source-language", default="en")
    parser.add_argument("--target-version", default="v4.1")
    parser.add_argument("--target-language", default="en")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    merge_legacy_images(args.source_version, args.source_language, args.target_version, args.target_language)


if __name__ == "__main__":
    main()
