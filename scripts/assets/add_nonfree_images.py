from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image


REPO_ROOT = Path(__file__).resolve().parents[2]


NONFREE_IMAGES = [
    {
        "chapter_file": "Chapter 03.md",
        "slug": "chapter-03-v41-nonfree",
        "order": 1,
        "candidate_file": "02.png",
        "caption": "Matching forearm tattoos using the Española script logo, illustrating how formation identity was worn directly on the body within the terrace-to-trench milieu described in Chapter 3.",
        "source_name": "Babel",
        "source_url": "https://babel.ua/",
        "media_url": "https://babel.ua/static/content/cdu6y87t/thumbs/1200x630/4/9f/c4b81bd050188ff9ed550d0929efa9f4.png",
        "author": "Unknown photographer / Babel",
        "credit": "Babel image",
        "license": "Non-free editorial image",
        "file_title": "Babel image: Española forearm tattoos",
        "description": "Close-up of two fighters showing matching forearm tattoos with the Española mark.",
    },
    {
        "chapter_file": "Chapter 03.md",
        "slug": "chapter-03-v41-nonfree",
        "order": 2,
        "candidate_file": "15.jpg",
        "caption": "An armed fighter at a Mariupol stadium railing with a CSKA Moscow scarf, directly visualizing the fusion of supporter identity and wartime occupation discussed in Chapter 3.",
        "source_name": "United24 Media",
        "source_url": "https://united24media.com/",
        "media_url": "https://storage.united24media.com/thumbs/1014x676/c/72/0592b648751b032a88bfbb6ca7e1272c.jpg",
        "author": "Unknown photographer / United24 Media",
        "credit": "United24 Media",
        "license": "Non-free editorial image",
        "file_title": "United24 image: fighter with CSKA scarf",
        "description": "Armed fighter in a stadium with supporter scarves including CSKA Moscow.",
    },
    {
        "chapter_file": "Chapter 05.md",
        "slug": "chapter-05-v41-nonfree",
        "order": 1,
        "candidate_file": "05.png",
        "caption": "Pirate-flag and flare imagery in an Española-branded stadium scene, showing the outlaw visual language and choreographed spectacle described in Chapter 5.",
        "source_name": "GNET",
        "source_url": "https://gnet-research.org/",
        "media_url": "https://gnet-research.org/wp-content/uploads/2024/08/Screenshot-2024-08-09-at-10.52.22-AM-1024x615.png",
        "author": "Screenshot reproduced by GNET",
        "credit": "GNET Research",
        "license": "Non-free editorial image",
        "file_title": "GNET screenshot: pirate-flag stadium scene",
        "description": "Night stadium scene with Española branding, pirate flag, and flare.",
    },
    {
        "chapter_file": "Chapter 05.md",
        "slug": "chapter-05-v41-nonfree",
        "order": 2,
        "candidate_file": "07.png",
        "caption": "Close-up of an Española skull patch, useful for the chapter's emphasis on pirate-coded insignia and repeatable visual branding.",
        "source_name": "GNET",
        "source_url": "https://gnet-research.org/",
        "media_url": "https://gnet-research.org/wp-content/uploads/2024/08/Screenshot-2024-08-09-at-10.52.03-AM-768x578.png",
        "author": "Screenshot reproduced by GNET",
        "credit": "GNET Research",
        "license": "Non-free editorial image",
        "file_title": "GNET screenshot: Española skull patch",
        "description": "Close-up of skull insignia patch associated with Española.",
    },
    {
        "chapter_file": "Chapter 09.md",
        "slug": "chapter-09-v41-nonfree",
        "order": 1,
        "candidate_file": "09.jpg",
        "caption": "Group publicity-style image with flags, symbols, dog, and branded clothing, illustrating the kind of social-media-ready collective portraiture that sustained Española's propaganda ecosystem in Chapter 9.",
        "source_name": "Metro / social-media reproduction",
        "source_url": "https://metro.co.uk/",
        "media_url": "https://metro.co.uk/wp-content/uploads/2023/03/SEI_148344307-b280.jpg?quality=90&strip=all",
        "author": "Unknown photographer / social media via Metro",
        "credit": "Social media / Metro",
        "license": "Non-free editorial image",
        "file_title": "Metro image: group publicity portrait",
        "description": "Large group portrait with Española banners, club flags, and participants posing for circulation.",
    },
    {
        "chapter_file": "Chapter 10.md",
        "slug": "chapter-10-v41-nonfree",
        "order": 1,
        "candidate_file": "06.png",
        "caption": "Mikhail \"Pitbull\" Turkanov pictured on an artillery position, directly relevant to Chapter 10's account of visible personalities and the symbolic centrality of Pitbull.",
        "source_name": "GNET",
        "source_url": "https://gnet-research.org/",
        "media_url": "https://gnet-research.org/wp-content/uploads/2024/08/Screenshot-2024-08-09-at-10.52.16-AM-768x1167.png",
        "author": "Screenshot reproduced by GNET",
        "credit": "GNET Research",
        "license": "Non-free editorial image",
        "file_title": "GNET screenshot: Pitbull on artillery position",
        "description": "Turkanov on an artillery piece wearing a Pitbull-marked vest.",
    },
    {
        "chapter_file": "Chapter 10.md",
        "slug": "chapter-10-v41-nonfree",
        "order": 2,
        "candidate_file": "11.webp",
        "caption": "A public-facing Española speaker in branded leather jacket, useful for Chapter 10's focus on the formation's recognizable faces and event-stage persona.",
        "source_name": "Meduza",
        "source_url": "https://meduza.io/",
        "media_url": "https://meduza.io/impro/yq6XmXquGlJ4e3i2nePXI6fdJyDUnOXspek_uhtaB4E/resizing_type:fit/width:980/height:0/enlarge:1/quality:80/aHR0cHM6Ly9tZWR1/emEuaW8vaW1hZ2Uv/YXR0YWNobWVudHMv/aW1hZ2VzLzAxMS82/NjAvODUwL29yaWdp/bmFsLzhxZkhDSWJG/ZHdQLUVhaVBPZkoy/MHc.webp",
        "author": "Unknown photographer / Meduza",
        "credit": "Meduza",
        "license": "Non-free editorial image",
        "file_title": "Meduza image: branded speaker portrait",
        "description": "Speaker in an Española leather jacket at a microphone.",
    },
    {
        "chapter_file": "Chapter 11.md",
        "slug": "chapter-11-v41-nonfree",
        "order": 1,
        "candidate_file": "03.jpeg",
        "caption": "Portrait of a heavily tattooed fighter wearing Española insignia and Z-marked uniform elements, relevant to Chapter 11's discussion of far-right-adjacent aesthetics in uniform.",
        "source_name": "Substack image reproduction",
        "source_url": "https://substack.com/",
        "media_url": "https://substackcdn.com/image/fetch/$s_!MI3-!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F628f8660-44aa-41ab-81b5-43de577dee54_960x1280.jpeg",
        "author": "Unknown photographer",
        "credit": "Substack image reproduction",
        "license": "Non-free editorial image",
        "file_title": "Portrait with Española patch and Z insignia",
        "description": "Heavily tattooed fighter in black uniform with Española insignia.",
    },
    {
        "chapter_file": "Chapter 11.md",
        "slug": "chapter-11-v41-nonfree",
        "order": 2,
        "candidate_file": "14.jpg",
        "caption": "Close-up of an \"Española\" haircut tattoo, reinforcing the chapter's point that the formation's identity and extremist-coded aesthetics were inscribed directly onto the body.",
        "source_name": "Daily Sabah",
        "source_url": "https://www.dailysabah.com/",
        "media_url": "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/07/06/281190.jpg",
        "author": "Unknown photographer / Daily Sabah",
        "credit": "Daily Sabah",
        "license": "Non-free editorial image",
        "file_title": "Daily Sabah image: Española haircut tattoo",
        "description": "Close-up of shaved haircut with Española logo tattooed into the hairline.",
    },
    {
        "chapter_file": "Chapter 11.md",
        "slug": "chapter-11-v41-nonfree",
        "order": 3,
        "candidate_file": "18.jpg",
        "caption": "Portrait of a shirtless fighter displaying swastika and other extremist tattoos, included here as contextual evidence for the far-right milieu discussed in Chapter 11.",
        "source_name": "Searchlight image reproduction",
        "source_url": "https://www.searchlightmagazine.com/",
        "media_url": "https://storage.united24media.com/thumbs/720x/2/53/8224e136bd051becbea61f07317f7532.jpg",
        "author": "Unknown photographer",
        "credit": "Reproduced in reporting context",
        "license": "Non-free editorial image",
        "file_title": "Portrait with extremist tattoos",
        "description": "Fighter with multiple extremist symbols tattooed on chest and shoulders.",
    },
    {
        "chapter_file": "Chapter 13.md",
        "slug": "chapter-13-v41-nonfree",
        "order": 1,
        "candidate_file": "01.jpg",
        "caption": "Large group image from a Mariupol stadium with an oversized Española banner, directly relevant to Chapter 13's discussion of battlefield reputation and occupation-stage performance in Mariupol.",
        "source_name": "Jamestown Foundation",
        "source_url": "https://jamestown.org/",
        "media_url": "https://jamestown.org/wp-content/uploads/2024/03/pmc-espanola.jpg",
        "author": "Unknown photographer / Jamestown reproduction",
        "credit": "Jamestown Foundation",
        "license": "Non-free editorial image",
        "file_title": "Jamestown image: group in Mariupol stadium",
        "description": "Group portrait with Española banner in a stadium.",
    },
    {
        "chapter_file": "Chapter 13.md",
        "slug": "chapter-13-v41-nonfree",
        "order": 2,
        "candidate_file": "04.jpg",
        "caption": "Armed Española fighters photographed in formation, used here as a direct visual of the combat-group image attached to the brigade's battlefield reputation.",
        "source_name": "Meduza",
        "source_url": "https://meduza.io/",
        "media_url": "https://meduza.io/image/attachments/images/009/929/718/large/_aTkc1Q01R_r3v3RH7GDAw.jpg",
        "author": "Unknown photographer / Meduza",
        "credit": "Meduza",
        "license": "Non-free editorial image",
        "file_title": "Meduza image: armed fighters group",
        "description": "Group of armed fighters posing outdoors.",
    },
    {
        "chapter_file": "Chapter 13.md",
        "slug": "chapter-13-v41-nonfree",
        "order": 3,
        "candidate_file": "12.jpg",
        "caption": "Armed fighter positioned above a Russian state flag inside a damaged stadium, closely matching the Mariupol occupation-stage imagery analyzed in Chapter 13.",
        "source_name": "The Moscow Times",
        "source_url": "https://www.themoscowtimes.com/",
        "media_url": "https://static.themoscowtimes.com/image/article_1360/4f/TASS_69830991.jpg",
        "author": "TASS / reproduced by The Moscow Times",
        "credit": "TASS / The Moscow Times",
        "license": "Non-free editorial image",
        "file_title": "The Moscow Times image: fighter above Russian flag in stadium",
        "description": "Armed fighter standing above a Russian flag in a stadium setting.",
    },
    {
        "chapter_file": "Chapter 13.md",
        "slug": "chapter-13-v41-nonfree",
        "order": 4,
        "candidate_file": "13.jpg",
        "caption": "Fighter walking past a giant Española banner in a Mariupol stadium, directly illustrating how the formation turned occupied public space into a branded stage.",
        "source_name": "Daily Sabah",
        "source_url": "https://www.dailysabah.com/",
        "media_url": "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/07/06/thumbs/800x531/281154.jpg?v=1688653365",
        "author": "Unknown photographer / Daily Sabah",
        "credit": "Daily Sabah",
        "license": "Non-free editorial image",
        "file_title": "Daily Sabah image: giant banner in stadium",
        "description": "Fighter in front of oversized Española banner in a stadium.",
    },
    {
        "chapter_file": "Chapter 18.md",
        "slug": "chapter-18-v41-nonfree",
        "order": 1,
        "candidate_file": "16.jpg",
        "caption": "A tattooed Española-associated figure standing before a memorial wall of dead fighters, relevant to Chapter 18's treatment of death, commemoration, and the afterlife of the brand.",
        "source_name": "United24 Media",
        "source_url": "https://united24media.com/",
        "media_url": "https://storage.united24media.com/thumbs/1920x/4/29/2d7a8fe7f6476dca56cf5c378cb29294.jpg",
        "author": "Unknown photographer / United24 Media",
        "credit": "United24 Media",
        "license": "Non-free editorial image",
        "file_title": "United24 image: memorial wall portrait",
        "description": "Tattooed figure in uniform standing before a display of dead fighters and Española imagery.",
    },
]


def convert_image(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA")
        image.save(destination, format="PNG")


def manifest_path(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "manifests" / version / language / "chapter_images.json"


def image_root(version: str, language: str) -> Path:
    return REPO_ROOT / "assets" / "images" / "manuscripts" / version / language


def candidates_dir(version: str, language: str) -> Path:
    return image_root(version, language) / "pictures" / "nonfree-candidates"


def load_manifest(path: Path) -> list[dict]:
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return []


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Append non-free image entries to an edition manifest.")
    parser.add_argument("--version", default="v4.1")
    parser.add_argument("--language", default="en")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    manifest_file = manifest_path(args.version, args.language)
    root = image_root(args.version, args.language)
    candidates = candidates_dir(args.version, args.language)

    manifest = load_manifest(manifest_file)
    existing = {(entry["chapter_file"], entry["caption"]) for entry in manifest}

    for item in NONFREE_IMAGES:
        key = (item["chapter_file"], item["caption"])
        if key in existing:
            continue

        source_path = candidates / item["candidate_file"]
        if not source_path.exists():
            raise FileNotFoundError(f"Missing candidate image: {source_path}")

        relative_path = Path("pictures") / item["slug"] / f"{item['order']:02d}.png"
        destination_path = root / relative_path
        convert_image(source_path, destination_path)

        manifest.append(
            {
                "chapter_file": item["chapter_file"],
                "caption": item["caption"],
                "relative_path": str(relative_path).replace("\\", "/"),
                "source_name": item["source_name"],
                "source_url": item["source_url"],
                "media_url": item["media_url"],
                "author": item["author"],
                "credit": item["credit"],
                "license": item["license"],
                "license_url": "",
                "file_title": item["file_title"],
                "width": None,
                "height": None,
                "description": item["description"],
                "freely_licensed": False,
            }
        )

    manifest_file.parent.mkdir(parents=True, exist_ok=True)
    manifest_file.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Manifest entries: {len(manifest)}")


if __name__ == "__main__":
    main()
