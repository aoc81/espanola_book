from __future__ import annotations

import argparse
import csv
import json
import re
import time
from html import unescape
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.request import Request, urlopen

from PIL import Image


REPO_ROOT = Path(__file__).resolve().parents[2]
USER_AGENT = "CodexBookBuilder/1.0 (research use)"

IMAGE_PLAN = [
    {
        "chapter_file": "Chapter 001 Prologue.txt",
        "slug": "prologue",
        "file_title": "File:Cathedral of Christ the Saviour 2024.jpg",
        "caption": "Cathedral of Christ the Saviour in Moscow, the setting used in the book's opening funeral scene.",
    },
    {
        "chapter_file": "Chapter 01.txt",
        "slug": "chapter-01",
        "file_title": "File:Манежная 2010.jpg",
        "caption": "Manezhnaya Square during the December 2010 nationalist supporter unrest referenced in Chapter 1.",
    },
    {
        "chapter_file": "Chapter 02.txt",
        "slug": "chapter-02",
        "file_title": "File:Arena CSKA.jpg",
        "caption": "CSKA Arena in Moscow, relevant to the club milieu from which Stanislav Orlov emerged.",
    },
    {
        "chapter_file": "Chapter 03.txt",
        "slug": "chapter-03",
        "file_title": "File:PFC CSKA Moscow fans.jpg",
        "caption": "CSKA supporters in the stands, illustrating the supporter culture discussed in Chapter 3.",
    },
    {
        "chapter_file": "Chapter 04.txt",
        "slug": "chapter-04",
        "file_title": "File:Donetsk and Luhansk People Republics en.jpg",
        "caption": "Map of the Russian-backed separatist entities in Donetsk and Luhansk during the first Donbas war.",
    },
    {
        "chapter_file": "Chapter 04.txt",
        "slug": "chapter-04",
        "file_title": "File:Damaged apartment building in Donetsk, July 14, 2014.jpg",
        "caption": "Damage in Donetsk in July 2014, illustrating the war environment treated as a laboratory in Chapter 4.",
    },
    {
        "chapter_file": "Chapter 08.txt",
        "slug": "chapter-08",
        "file_title": "File:Russian-railways-headquarters-moscow-june-2014.jpg",
        "caption": "Russian Railways headquarters in Moscow, relevant to the patronage and funding discussion in Chapter 8.",
    },
    {
        "chapter_file": "Chapter 09.txt",
        "slug": "chapter-09",
        "file_title": "File:Telegram 2019 Logo.svg",
        "caption": "Telegram's logo, relevant to the platform-centered propaganda ecosystem described in Chapter 9.",
    },
    {
        "chapter_file": "Chapter 12.txt",
        "slug": "chapter-12",
        "file_title": "File:FPV drones support of the Dnepr Grouping of Forces (2).png",
        "caption": "FPV-drone imagery associated with Russian battlefield adaptation, relevant to Chapter 12.",
    },
    {
        "chapter_file": "Chapter 13.txt",
        "slug": "chapter-13",
        "file_title": "File:Russian bombing of Mariupol.jpg",
        "caption": "Destruction in Mariupol, one of the major battlefields tied to Española's wartime reputation.",
    },
    {
        "chapter_file": "Chapter 13.txt",
        "slug": "chapter-13",
        "file_title": "File:Battle of Bakhmut 3.jpg",
        "caption": "Bakhmut during the battle, another key battlefield discussed in Chapter 13.",
    },
    {
        "chapter_file": "Chapter 13.txt",
        "slug": "chapter-13",
        "file_title": "File:Avdiivka after Russian bombing, 2024-01-18 (01).jpg",
        "caption": "Avdiivka after Russian bombing in January 2024, relevant to the final battlefield case in Chapter 13.",
    },
    {
        "chapter_file": "Chapter 15.txt",
        "slug": "chapter-15",
        "file_title": "File:Yevgeny Prigozhin (13-06-2023).jpg",
        "caption": "Yevgeny Prigozhin, whose death and Wagner's collapse frame the restructuring context in Chapter 15.",
    },
    {
        "chapter_file": "Chapter 15.txt",
        "slug": "chapter-15",
        "file_title": "File:Memorial to PMC Wagner leadership in Moscow (27-08-2023).jpg",
        "caption": "A memorial to Wagner leaders in Moscow, relevant to the post-Wagner climate discussed in Chapter 15.",
    },
    {
        "chapter_file": "Chapter 17.txt",
        "slug": "chapter-17",
        "file_title": "File:Moscow - 2025 - Russian Ministry of Defence - Side view (3).jpg",
        "caption": "The Russian Ministry of Defence building in Moscow, relevant to the state's reassertion described in Chapter 17.",
    },
    {
        "chapter_file": "Chapter 17.txt",
        "slug": "chapter-17",
        "file_title": "File:National Guard of Russia.svg",
        "caption": "The emblem of the Russian National Guard, relevant to the state's coercive monopoly discussed in Chapter 17.",
    },
    {
        "chapter_file": "Chapter 19 Epilogue.txt",
        "slug": "chapter-19-epilogue",
        "file_title": "File:Kremlin Senate building on 2016-08-03.jpg",
        "caption": "The Kremlin Senate building, used here as a state-centered visual for the epilogue.",
    },
]


TAG_RE = re.compile(r"<[^>]+>")


def strip_html(value: str) -> str:
    return re.sub(r"\s+", " ", TAG_RE.sub("", unescape(value or ""))).strip()


def fetch_metadata(file_title: str) -> dict:
    return fetch_metadata_batch([file_title])[file_title]


def fetch_metadata_batch(file_titles: list[str]) -> dict[str, dict]:
    url = (
        "https://commons.wikimedia.org/w/api.php?action=query&format=json"
        "&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1000"
        "&titles=" + "|".join(quote(title) for title in file_titles)
    )
    req = Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(6):
        try:
            with urlopen(req, timeout=90) as resp:
                data = json.load(resp)
            break
        except HTTPError as exc:
            if exc.code != 429 or attempt == 5:
                raise
            time.sleep(15 + attempt * 15)

    results: dict[str, dict] = {}
    for page in data.get("query", {}).get("pages", {}).values():
        info = (page.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata") or {}
        thumb_url = info.get("thumburl") or info.get("url")
        if not thumb_url:
            continue
        results[page.get("title")] = {
            "page_title": page.get("title"),
            "description_url": info.get("descriptionurl"),
            "media_url": thumb_url,
            "width": info.get("thumbwidth") or info.get("width"),
            "height": info.get("thumbheight") or info.get("height"),
            "author": strip_html((meta.get("Artist") or {}).get("value", "")) or "Unknown",
            "credit": strip_html((meta.get("Credit") or {}).get("value", "")),
            "license": strip_html((meta.get("LicenseShortName") or {}).get("value", "")) or "Unknown",
            "license_url": strip_html((meta.get("LicenseUrl") or {}).get("value", "")),
            "description": strip_html((meta.get("ImageDescription") or {}).get("value", "")),
        }
    return results


def guess_extension(media_url: str) -> str:
    return ".png"


def download_file(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_size > 0:
        normalize_image(destination)
        return
    req = Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(6):
        try:
            with urlopen(req, timeout=120) as resp:
                destination.write_bytes(resp.read())
            normalize_image(destination)
            time.sleep(5)
            return
        except HTTPError as exc:
            if exc.code != 429 or attempt == 5:
                raise
            time.sleep(30 + attempt * 30)


def normalize_image(path: Path) -> None:
    suffix = path.suffix.lower()
    with Image.open(path) as image:
        if suffix in {".jpg", ".jpeg"}:
            if image.mode != "RGB":
                image = image.convert("RGB")
            image.save(path, format="JPEG", quality=92)
        elif suffix == ".png":
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA")
            image.save(path, format="PNG")


def image_root(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "images" / "manuscripts" / version / language


def manifest_json_path(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "manifests" / version / language / "chapter_images.json"


def manifest_csv_path(version: str, language: str) -> Path:
    return image_root(version, language) / "pictures" / "image_manifest.csv"


def build_manifest(version: str, language: str) -> list[dict]:
    manifest: list[dict] = []
    counters: dict[str, int] = {}
    metadata_by_title = fetch_metadata_batch([item["file_title"] for item in IMAGE_PLAN])
    base_dir = image_root(version, language)

    for item in IMAGE_PLAN:
        chapter_file = item["chapter_file"]
        counters[chapter_file] = counters.get(chapter_file, 0) + 1
        order = counters[chapter_file]

        metadata = metadata_by_title[item["file_title"]]
        extension = guess_extension(metadata["media_url"])
        filename = f"{order:02d}{extension}"
        relative_path = Path("pictures") / item["slug"] / filename
        absolute_path = base_dir / relative_path
        download_file(metadata["media_url"], absolute_path)

        manifest.append(
            {
                "chapter_file": chapter_file,
                "caption": item["caption"],
                "relative_path": str(relative_path).replace("\\", "/"),
                "source_name": "Wikimedia Commons",
                "source_url": metadata["description_url"],
                "media_url": metadata["media_url"],
                "author": metadata["author"],
                "credit": metadata["credit"],
                "license": metadata["license"],
                "license_url": metadata["license_url"],
                "file_title": metadata["page_title"],
                "width": metadata["width"],
                "height": metadata["height"],
                "description": metadata["description"],
            }
        )

    return manifest


def load_existing_manifest(version: str, language: str) -> list[dict]:
    manifest_path = manifest_json_path(version, language)
    if not manifest_path.exists():
        return []
    return json.loads(manifest_path.read_text(encoding="utf-8"))


def merge_preserved_entries(manifest: list[dict], version: str, language: str) -> list[dict]:
    preserved: list[dict] = []
    existing = load_existing_manifest(version, language)
    generated_keys = {(entry["chapter_file"], entry["caption"]) for entry in manifest}

    for entry in existing:
        key = (entry["chapter_file"], entry["caption"])
        if key in generated_keys:
            continue
        if not entry.get("freely_licensed", True) or entry.get("source_name") != "Wikimedia Commons":
            preserved.append(entry)

    return manifest + preserved


def write_manifest(manifest: list[dict], version: str, language: str) -> None:
    pictures_dir = image_root(version, language) / "pictures"
    manifest_json = manifest_json_path(version, language)
    manifest_csv = manifest_csv_path(version, language)
    pictures_dir.mkdir(parents=True, exist_ok=True)
    manifest_json.parent.mkdir(parents=True, exist_ok=True)
    manifest_json.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    with manifest_csv.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "chapter_file",
                "relative_path",
                "caption",
                "source_name",
                "source_url",
                "author",
                "credit",
                "license",
                "license_url",
                "file_title",
                "media_url",
                "width",
                "height",
                "description",
                "freely_licensed",
            ],
        )
        writer.writeheader()
        writer.writerows(manifest)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch freely licensed manuscript images into the canonical asset tree.")
    parser.add_argument("--version", default="v4")
    parser.add_argument("--language", default="en")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    pictures_dir = image_root(args.version, args.language) / "pictures"
    pictures_dir.mkdir(parents=True, exist_ok=True)
    manifest = build_manifest(args.version, args.language)
    manifest = merge_preserved_entries(manifest, args.version, args.language)
    write_manifest(manifest, args.version, args.language)
    print(f"Downloaded {len(manifest)} images.")
    print(manifest_json_path(args.version, args.language))


if __name__ == "__main__":
    main()
