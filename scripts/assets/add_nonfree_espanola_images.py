from __future__ import annotations

import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image


BASE_DIR = Path(__file__).resolve().parent
MANIFEST_PATH = BASE_DIR / "chapter_images.json"
USER_AGENT = "CodexBookBuilder/1.0 (research use)"


NONFREE_IMAGES = [
    {
        "chapter_file": "Chapter 001 Prologue.txt",
        "slug": "prologue-nonfree",
        "order": 2,
        "download_url": "https://iv.kommersant.ru/Issues.photo/NEWS/2025/12/19/KMO_141501_11285_1_t222_172900.jpg",
        "caption": "Archival portrait of Stanislav Orlov (\"Ispanets\"), relevant to the opening funeral scene and the book's framing of the founder.",
        "source_name": "Kommersant / RIA Novosti",
        "source_url": "https://www.kommersant.ru/doc/8312381",
        "author": "Sergey Averin / RIA Novosti",
        "license": "Non-free editorial image",
        "credit": "Фото: Сергей Аверин / РИА Новости",
        "file_title": "Kommersant photo: Stanislav Orlov",
        "description": "Stanislav Orlov.",
    },
    {
        "chapter_file": "Chapter 02.txt",
        "slug": "chapter-02-nonfree",
        "order": 2,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_16783603247366_normal.JPG",
        "caption": "Regnum photo of battalion commander Stanislav Orlov (\"Ispanets\"), directly relevant to Chapter 2.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: combat commander Ispanets",
        "description": "Battalion commander Ispanets.",
    },
    {
        "chapter_file": "Chapter 03.txt",
        "slug": "chapter-03-nonfree",
        "order": 2,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_1678360324624_normal.JPG",
        "caption": "Sticker wall with multiple football-club insignia in an Española position, relevant to the supra-club identity described in Chapter 3.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: club stickers in Española quarters",
        "description": "Stickers of different football clubs in the battalion's quarters.",
    },
    {
        "chapter_file": "Chapter 03.txt",
        "slug": "chapter-03-nonfree",
        "order": 3,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_16783603244777_normal.JPG",
        "caption": "Española fighters playing football in downtime, directly illustrating the subcultural continuity discussed in Chapter 3.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: fighters playing football",
        "description": "In their free time the fighters can play football.",
    },
    {
        "chapter_file": "Chapter 05.txt",
        "slug": "chapter-05-nonfree",
        "order": 1,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_16783603248176_normal.JPG",
        "caption": "The battalion flag of Española, relevant to the formation's branding and iconography in Chapter 5.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: Española battalion flag",
        "description": "The battalion flag of Española.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 1,
        "download_url": "https://www.kp.ru/share/i/4/3096137/",
        "caption": "KP.ru photo of deputy commander Andrey \"Soloma\" Solomatin with special correspondent Dmitry Steshin, relevant to the visible personalities discussed in Chapter 10.",
        "source_name": "KP.ru",
        "source_url": "https://www.kp.ru/daily/27725.5/5152066/",
        "author": "Dmitry Steshin",
        "license": "Non-free editorial image",
        "credit": "Фото: Дмитрий Стешин / KP.ru",
        "file_title": "KP photo: Andrey \"Soloma\" Solomatin",
        "description": "Special correspondent Dmitry Steshin and Española deputy commander Andrey \"Soloma\" Solomatin.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 2,
        "download_url": "https://meduza.io/image/attachments/images/010/442/452/elarge/M0a7X2dHZJoq6FXWqy9JMQ.jpg",
        "caption": "Soldiers of the Española brigade in the \"Melodia\" information-analytical center, relevant to the visible public faces and media ecosystem around the formation.",
        "source_name": "Meduza photo feature",
        "source_url": "https://meduza.io/feature/2024/09/07/v-voyne-v-ukraine-uchastvuet-batalon-espanola-sformirovannyy-preimuschestvenno-iz-rossiyskih-futbolnyh-fanatov-fotografii",
        "author": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "license": "Non-free editorial image",
        "credit": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "file_title": "Meduza photo: soldiers in Melodia center",
        "description": "Military personnel from the Española brigade in the Melodia center on Ukrainian territory.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 3,
        "download_url": "https://img.vz.ru/upimg/236/2365904.png",
        "caption": "Portrait of Mikhail \"Pitbull\" Turkanov published with a Vzglyad interview on Española's motorcycle assault tactics.",
        "source_name": "Vzglyad",
        "source_url": "https://vz.ru/society/2024/9/25/1288933.html",
        "author": "Video still published by Vzglyad",
        "license": "Non-free editorial image",
        "credit": "Михаил «Питбуль» Турканов. Фото: кадр из видео",
        "file_title": "Vzglyad image: Mikhail Turkanov",
        "description": "Mikhail 'Pitbull' Turkanov.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 4,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_16783603241778_normal.JPG",
        "caption": "Andrey Solomatin visiting Española with humanitarian aid, reinforcing the chapter's focus on visible personalities around the brigade.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: Solomatin with humanitarian aid",
        "description": "The famous Solomatin arrived at the battalion with humanitarian aid.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 5,
        "download_url": "https://cdn.regnum.ru/uploads/pictures/news/2023/03/09/regnum_picture_16783603249779_normal.JPG",
        "caption": "Two named Española fighters, \"Shaitan\" and \"Crazy,\" from the Regnum photo essay, adding more direct brigade portraiture to Chapter 10.",
        "source_name": "Regnum photo essay",
        "source_url": "https://regnum.ru/photo/3787564",
        "author": "Alexander Dimitrovsky / Regnum",
        "license": "Non-free editorial image",
        "credit": "Фото: Александр Дмитровский © ИА REGNUM",
        "file_title": "Regnum photo: Shaitan and Crazy",
        "description": "Left to right, fighters 'Shaitan' and 'Crazy'.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 6,
        "download_url": "https://dan-news.ru/storage/c/2024/05/28/1716909298_665284_95.jpg",
        "caption": "Composite portrait of Valkyria, presented in a Donetsk News Agency profile about her move from ballet to assault-medic service, adding another named brigade face to Chapter 10.",
        "source_name": "Donetsk News Agency",
        "source_url": "https://dan-news.ru/exclusive/pozyvnoj-valkirija-ot-piterskoj-baleriny-do-zamkomandira-shturmovoj-roty/",
        "author": "DAN",
        "license": "Non-free editorial image",
        "credit": "Фото: DAN",
        "file_title": "DAN profile image: Valkyria",
        "description": "Valkyria shown in ballet and combat settings.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 7,
        "download_url": "https://cdn4.telesco.pe/file/vXP6Rt5dz2u0SWw3WKEQMo8Z-NFmh4iG9owImPx-tBcaIv2-glXiCN5x6LeJ0F4yz-8KZQy3u-mnYS4FJSxZk_NBg4hbXoHqnBLcCGJrC_BuRfCGO6ozDCIjau2TiTHQ-C4CrHqFJuBj5pUVN5-jWkTpPCmFDWdeYGvOxVX8WeZtB1G4o-jez-jskcLYT_VGGmCMznfGUEfG29OlHLIBG9YPY0fdD4Jj-mjaAeLUkYcOi96Cx5HCz6MYkJrCb1cSzYvZ3HMJ85JK2fBNhHYNVJgTk52mCP3aS-gk7m0sveoYv2lVXv7JcMJlKPu0wD48-jl3sDofJQ1-c40FNnOnvg",
        "caption": "Video still of the Española medic Kubinets, used here as a direct named brigade portrait from the formation's wider Telegram ecosystem.",
        "source_name": "Telegram / Potomstvenny network",
        "source_url": "https://t.me/s/spainrus?before=2805",
        "author": "Unknown photographer; redistributed via Telegram",
        "license": "Non-free source-attributed image",
        "credit": "Telegram video still",
        "file_title": "Telegram still: Kubinets",
        "description": "Kubinets in a medical room, from a Telegram-distributed video still.",
    },
    {
        "chapter_file": "Chapter 10.txt",
        "slug": "chapter-10",
        "order": 8,
        "download_url": "https://i.ytimg.com/vi/j8P-PLV-BR0/maxresdefault.jpg",
        "caption": "Composite report image featuring several Española fighters and personalities from the Mariupol and Azovstal report \"Razgovory o kazhdom\", giving Chapter 10 a more visibly collective battalion image.",
        "source_name": "YouTube / Potomstvenny",
        "source_url": "https://youtu.be/j8P-PLV-BR0",
        "author": "Potomstvenny channel thumbnail",
        "license": "Non-free source-attributed image",
        "credit": "YouTube report thumbnail",
        "file_title": "YouTube thumbnail: Razgovory o kazhdom - Española",
        "description": "Composite thumbnail with several Española fighters and symbols.",
    },
    {
        "chapter_file": "Chapter 12.txt",
        "slug": "chapter-12-nonfree",
        "order": 2,
        "download_url": "https://meduza.io/image/attachments/images/010/442/484/elarge/TB1EIp3dr-rZRbIBsukISg.jpg",
        "caption": "Española fighters preparing a drone, directly relevant to the technical adaptation and military experimentation discussed in Chapter 12.",
        "source_name": "Meduza photo feature",
        "source_url": "https://meduza.io/feature/2024/09/07/v-voyne-v-ukraine-uchastvuet-batalon-espanola-sformirovannyy-preimuschestvenno-iz-rossiyskih-futbolnyh-fanatov-fotografii",
        "author": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "license": "Non-free editorial image",
        "credit": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "file_title": "Meduza photo: fighters preparing a drone",
        "description": "Fighters of the Española brigade preparing a drone in an unspecified location in Ukraine.",
    },
    {
        "chapter_file": "Chapter 12.txt",
        "slug": "chapter-12-nonfree",
        "order": 3,
        "download_url": "https://s11.stc.yc.kpcdn.net/share/i/12/14192616/wr-960.webp",
        "caption": "KP.ru image of an Española serviceman launching a drone during field testing of new UAV systems, reinforcing the brigade-level technical adaptation discussed in Chapter 12.",
        "source_name": "KP.ru",
        "source_url": "https://www.kp.ru/online/news/6123147/",
        "author": "KP.ru",
        "license": "Non-free editorial image",
        "credit": "Фото: KP.ru",
        "file_title": "KP photo: Española drone testing",
        "description": "Española serviceman with a drone during UAV testing.",
    },
    {
        "chapter_file": "Chapter 13.txt",
        "slug": "chapter-13-nonfree",
        "order": 4,
        "download_url": "https://meduza.io/image/attachments/images/010/442/492/elarge/HIpKSENqc5Fm4I9BdWr8uQ.jpg",
        "caption": "Española fighters on a combat position in Ukraine, directly illustrating the battlefield role described in Chapter 13.",
        "source_name": "Meduza photo feature",
        "source_url": "https://meduza.io/feature/2024/09/07/v-voyne-v-ukraine-uchastvuet-batalon-espanola-sformirovannyy-preimuschestvenno-iz-rossiyskih-futbolnyh-fanatov-fotografii",
        "author": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "license": "Non-free editorial image",
        "credit": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "file_title": "Meduza photo: fighters on position",
        "description": "Fighters of the Española brigade on a position in an unspecified location in Ukraine.",
    },
    {
        "chapter_file": "Chapter 13.txt",
        "slug": "chapter-13-nonfree",
        "order": 5,
        "download_url": "https://meduza.io/image/attachments/images/010/442/460/elarge/-542ah-aZCwD42_IrNqaWQ.jpg",
        "caption": "An Española soldier firing a D-30 howitzer, directly relevant to the brigade's battlefield activity in Chapter 13.",
        "source_name": "Meduza photo feature",
        "source_url": "https://meduza.io/feature/2024/09/07/v-voyne-v-ukraine-uchastvuet-batalon-espanola-sformirovannyy-preimuschestvenno-iz-rossiyskih-futbolnyh-fanatov-fotografii",
        "author": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "license": "Non-free editorial image",
        "credit": "Sergey Bobylev / RIA Novosti / Sputnik / Profimedia",
        "file_title": "Meduza photo: D-30 howitzer fire",
        "description": "A Russian serviceman from the Española brigade firing a D-30 howitzer.",
    },
]


def download_and_convert(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    req = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=120) as resp:
        raw = resp.read()
    temp = destination.with_suffix(".tmp")
    temp.write_bytes(raw)
    with Image.open(temp) as image:
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA")
        image.save(destination, format="PNG")
    temp.unlink(missing_ok=True)


def load_manifest() -> list[dict]:
    if MANIFEST_PATH.exists():
        return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    return []


def main() -> None:
    manifest = load_manifest()

    existing = {(entry["chapter_file"], entry["caption"]) for entry in manifest}
    for item in NONFREE_IMAGES:
        key = (item["chapter_file"], item["caption"])
        if key in existing:
            continue

        relative_path = Path("pictures") / item["slug"] / f"{item['order']:02d}.png"
        absolute_path = BASE_DIR / relative_path
        download_and_convert(item["download_url"], absolute_path)

        manifest.append(
            {
                "chapter_file": item["chapter_file"],
                "caption": item["caption"],
                "relative_path": str(relative_path).replace("\\", "/"),
                "source_name": item["source_name"],
                "source_url": item["source_url"],
                "media_url": item["download_url"],
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

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Manifest entries: {len(manifest)}")


if __name__ == "__main__":
    main()
