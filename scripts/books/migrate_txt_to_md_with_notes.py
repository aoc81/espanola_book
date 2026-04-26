from __future__ import annotations

from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


FILES = [
    "Front Matter 00 Title and Edition.txt",
    "Chapter 00 Index.txt",
    "Front Matter 01 Author Note.txt",
    "Front Matter 02 Methodology and Limitations.txt",
    "Front Matter 03 Note on AI Assistance.txt",
    "Front Matter 04 Note on Naming and Terminology.txt",
    "Chapter 001 Prologue.txt",
    "Chapter 01.txt",
    "Chapter 02.txt",
    "Chapter 03.txt",
    "Chapter 04.txt",
    "Chapter 05.txt",
    "Chapter 06.txt",
    "Chapter 07.txt",
    "Chapter 08.txt",
    "Chapter 09.txt",
    "Chapter 10.txt",
    "Chapter 11.txt",
    "Chapter 12.txt",
    "Chapter 13.txt",
    "Chapter 14.txt",
    "Chapter 15.txt",
    "Chapter 16.txt",
    "Chapter 17.txt",
    "Chapter 18.txt",
    "Chapter 19 Epilogue.txt",
    "Appendix Source Notes.txt",
    "Appendix Reference Links Guide.txt",
]


NOTE_PREFIX = {
    "Chapter 001 Prologue.txt": "pro",
    "Chapter 01.txt": "ch01",
    "Chapter 02.txt": "ch02",
    "Chapter 03.txt": "ch03",
    "Chapter 04.txt": "ch04",
    "Chapter 05.txt": "ch05",
    "Chapter 06.txt": "ch06",
    "Chapter 07.txt": "ch07",
    "Chapter 08.txt": "ch08",
    "Chapter 09.txt": "ch09",
    "Chapter 10.txt": "ch10",
    "Chapter 11.txt": "ch11",
    "Chapter 12.txt": "ch12",
    "Chapter 13.txt": "ch13",
    "Chapter 14.txt": "ch14",
    "Chapter 15.txt": "ch15",
    "Chapter 16.txt": "ch16",
    "Chapter 17.txt": "ch17",
    "Chapter 18.txt": "ch18",
    "Chapter 19 Epilogue.txt": "epi",
}


SOURCE_CHAINS = {
    "Chapter 001 Prologue.txt": [
        "The Guardian, \"Warning to others: murky death of militia leader as Kremlin reasserts control\"; EL PAIS English, \"Russian ultranationalism, inflamed by the killing of the hooligan commander 'Spaniard'\"; Current Time / Radio Svoboda, \"ASTRA: Командира «Эспаньолы» Орлова убили...\"; local archives in `sources/`.",
        "Meduza, \"В войне в Украине участвует бригада «Эспаньола»...\"; GNET, \"Española: Russia's Far-Right Hooligan Militia and Its Online Activities\"; archived Telegram material in `https://t.me/spainrus`.",
        "BBC News Russian, \"Армия на полставки\"; Jamestown Foundation, \"Española: Russia's Premier Soccer Paramilitary Group\"; Ukrainska Pravda, \"Russian Redut Private Military Company recruits women...\".",
        "Cherta Media, \"Кто такие ЧВК «Эспаньола»? Фанаты на войне\"; Novaya Gazeta Europe, \"Появились «футболисты» в окопах под огнем\"; BBC News Russian, \"Армия на полставки\".",
        "Novaya Gazeta Europe, \"Появились «футболисты»...\"; Jamestown Foundation, \"Española: Russia's Premier Soccer Paramilitary Group\"; source notes in `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
        "BBC News Russian, \"Армия на полставки\"; Meduza, \"Española's patron revealed\"; Jamestown Foundation, \"Española: Russia's Premier Soccer Paramilitary Group\".",
        "Authorial synthesis from the source chains listed in `manuscripts/v4/en/contents/Appendix Source Notes.md`, especially the reporting on subcultural recruitment, Redut-linked administration, public fundraising, and later state pressure.",
        "The Insider, \"Российская бригада «Эспаньола»... объявила о расформировании\"; Kyiv Post, \"'Espanola,' Russian Ultras Militia in Ukraine, Disbands\"; The Moscow Times, \"Leader of Far-Right Russian Group Fighting in Ukraine Dies...\".",
        "Source sequence synthesized from Chapter 18 source chains and `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
    ],
    "Chapter 01.txt": [
        "Cherta Media, \"Кто такие ЧВК «Эспаньола»? Фанаты на войне\"; BBC News Russian, \"Армия на полставки\"; contextual local archive files in `sources/`.",
        "Cherta/Meduza reporting on Russian football-hooligan subculture; Dialnet local PDF `sources/Dialnet-LaAmenazaHooligan-9879235.pdf`.",
        "Cherta Media and BBC News Russian reporting on supporter culture, nationalism, and wartime mobilization; source notes in `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
        "BBC News Russian, \"Армия на полставки\"; Cherta Media, \"Кто такие ЧВК «Эспаньола»?\".",
        "Cherta Media and broader archive material on Fan ID, stadium-control measures, and supporter migration into wartime milieus.",
        "Authorial synthesis from Cherta Media, BBC News Russian, and local archive material listed under Prologue and Chapter 1 in `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
        "Source-backed synthesis from Cherta Media and BBC News Russian; treated as an analytical claim rather than a direct quote from a single source.",
        "Authorial synthesis from the chapter's supporter-culture source chain.",
    ],
    "Chapter 02.txt": [
        "Novaya Gazeta Europe, \"Появились «футболисты» в окопах под огнем\"; Jamestown Foundation, \"Española: Russia's Premier Soccer Paramilitary Group\"; Evocation, \"Stanislav Orlov of Espanyol kills Ukrainian civilians\".",
        "Novaya Gazeta Europe and Jamestown reporting on Orlov's CSKA / Red-Blue Warriors milieu.",
        "Biographical details remain attributed to overlapping profiles and analytical reporting in Novaya Gazeta Europe, Jamestown, and local archive material.",
        "Novaya Gazeta Europe; Jamestown Foundation; BBC News Russian reporting on Donbas volunteer structures.",
        "Jamestown Foundation and Novaya Gazeta Europe on Skull and Bones / reconnaissance-detachment claims around Horlivka and Debaltseve.",
        "BBC News Russian, \"Армия на полставки\"; Jamestown Foundation; local archive references to the Union of Donbas Volunteers.",
        "Jamestown Foundation and intelligence-style local archive material; treated as allegation rather than established fact.",
        "Authorial synthesis from the Orlov biography source chain.",
    ],
    "Chapter 03.txt": [
        "Cherta Media, Meduza photo feature, Regnum photo essay, and archived Telegram material on cross-club supporter identity inside Española.",
        "Meduza, \"В войне в Украине участвует бригада «Эспаньола»...\"; Regnum photo essay; Telegram archive `https://t.me/spainrus`.",
        "Authorial synthesis from supporter-culture sources and brigade self-presentation.",
        "Regnum photo essay; archived Telegram material; Novaya Gazeta Europe and Jamestown reporting on Orlov's supporter biography.",
        "Source notes in `manuscripts/v4/en/contents/Appendix Source Notes.md`; public record is treated as insufficient for detailed internal social mapping.",
        "Authorial synthesis from Cherta Media, Regnum, Meduza, and Telegram source chains.",
        "Authorial synthesis from the chapter's terrace-to-trench source chain.",
    ],
    "Chapter 04.txt": [
        "Novaya Gazeta Europe, Jamestown Foundation, and BBC News Russian on Orlov, Donbas, Horlivka, and semi-formal volunteer ecosystems.",
        "Novaya Gazeta Europe; Jamestown Foundation; BBC News Russian on Horlivka, Igor Bezler-linked structures, and mixed authority in Donbas.",
        "Jamestown Foundation and Novaya Gazeta Europe on Skull and Bones, Horlivka, Debaltseve, and reconnaissance-detachment claims.",
        "BBC News Russian and source notes on the first Donbas war's half-visible volunteer, sponsor, and administrative structures.",
        "BBC News Russian; Jamestown Foundation; local archive material on the Union of Donbas Volunteers and post-2014 veteran structures.",
        "Authorial synthesis from reporting on anti-Azov rhetoric, football-derived militants, and Donbas propaganda frames.",
        "Authorial synthesis from the chapter's Donbas source chain.",
    ],
    "Chapter 05.txt": [
        "Archived Telegram material in `https://t.me/spainrus`; GNET, \"Española: Russia's Far-Right Hooligan Militia and Its Online Activities\"; Regnum photo essay.",
        "Authorial synthesis from naming, branding, and founder-myth evidence in Telegram, Regnum, and Jamestown sources.",
        "GNET; Regnum photo essay; archived Telegram material on pirate/skull imagery and unit visual presentation.",
        "Regnum photo essay; archived Telegram material; Cherta/Meduza reporting on Horlivka youth-football and civic-facing branding.",
        "GNET; Meduza/Cherta; archived Telegram material on anti-Azov framing and symbolic counterforce rhetoric.",
        "Authorial synthesis from the chapter's branding source chain.",
        "Authorial transition based on Chapter 6 source chains.",
    ],
    "Chapter 06.txt": [
        "Cherta Media, \"Кто такие ЧВК «Эспаньола»? Фанаты на войне\"; Meduza and local archive material on military and humanitarian faces of the brigade.",
        "Cherta Media / Meduza reporting on Ilya Khanin, Alexey Trifonov, aid appeals, and support-broker roles.",
        "Cherta Media reporting on the Horlivka football project and brigade-branded youth outreach in occupied territory.",
        "Archived Telegram material in `https://t.me/spainrus`; Cherta/Meduza reporting on aid appeals and military logistics framed as humanitarian support.",
        "Authorial synthesis from Cherta/Meduza reporting and archived platform material.",
        "Authorial synthesis from the chapter's humanitarian-wing source chain.",
    ],
    "Chapter 07.txt": [
        "BBC News Russian, \"Армия на полставки\"; Jamestown Foundation; Ukrainska Pravda on Redut-linked recruitment and contracts.",
        "BBC News Russian; Jamestown Foundation; Ukrainska Pravda reporting on Redut-linked arrangements and recruitment.",
        "Authorial synthesis from Redut-linked contracting reports and brigade self-presentation.",
        "BBC News Russian; Ukrainska Pravda, \"Russian Redut Private Military Company recruits women...\"; archived Telegram recruitment material.",
        "Ukrainska Pravda and BBC News Russian on contract terms, pay, training periods, and compensation scales.",
        "BBC News Russian and Jamestown analysis on Redut, Ministry of Defense-linked structures, and opaque command architecture.",
        "Authorial synthesis from the chapter's Redut source chain.",
        "Authorial transition based on Chapter 8 patronage source chains.",
    ],
    "Chapter 08.txt": [
        "Meduza, \"Española's patron revealed\"; archived Telegram material and source notes on fundraising, drones, gear, and support infrastructure.",
        "Archived Telegram material in `https://t.me/spainrus`; MEMRI archive capture; Meduza/Cherta reporting on fundraising and humanitarian language.",
        "Meduza summary of iStories reporting, \"Española's patron revealed,\" on Viktor Shendrik, Russian Railways, and the Rotenberg orbit.",
        "Meduza / iStories reporting; analytical framing from `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
        "Authorial synthesis from public fundraising and patronage reporting.",
        "MEMRI archive capture; archived Telegram material; Meduza/Cherta source chains on foundations, campaigns, and intermediaries.",
        "Authorial synthesis from Meduza/iStories, BBC Redut reporting, and local archive material.",
        "Authorial synthesis from the chapter's funding source chain.",
    ],
    "Chapter 09.txt": [
        "Archived Telegram material in `https://t.me/spainrus`, `marine_esp.txt`, `nashi_parnii.txt`, `olympicPitbull.txt`, and `valkyriyaESP.txt`; GNET on online activities.",
        "Archived Telegram material and GNET analysis on memorial posts, fundraising appeals, recruitment notices, combat clips, and commander messages.",
        "Authorial synthesis from archived Telegram recruitment and propaganda material.",
        "GNET; Meduza photo feature; archived Telegram material on supporter-coded language, memorial culture, specialist posts, and external amplification.",
        "Methodological rule from `manuscripts/v4/en/contents/Appendix Source Notes.md`; Telegram and VK treated as evidence of self-presentation, timing, rhetoric, and claims rather than independent verification of battlefield performance.",
        "Authorial synthesis from the platform-source chain.",
        "Authorial transition based on Chapter 10 personality/source chains.",
    ],
    "Chapter 10.txt": [
        "Jamestown Foundation, \"Mikhail 'Pitbull' Turkanov...\"; KP.ru; Vzglyad; Regnum photo essay; Donetsk News Agency; Meduza photo feature.",
        "Novaya Gazeta Europe and Jamestown reporting on Orlov's founder role, Donbas experience, and callsign-derived formation identity.",
        "Jamestown Foundation, \"Mikhail 'Pitbull' Turkanov...\"; GNET and Meduza/Cherta material on far-right-associated symbolism.",
        "KP.ru profile material; Regnum photo essay; local image manifest references to Andrei Solomatin.",
        "Cherta/Meduza reporting on Khanin and support brokerage; GNET and local archive material on Teddy Boy Greg and external amplification.",
        "Authorial synthesis from the chapter's visible-personality source chain.",
    ],
    "Chapter 11.txt": [
        "GNET; Meduza/Cherta; Jamestown Foundation; MEMRI archive capture; archived Telegram material on far-right symbolism, rhetoric, and visual evidence.",
        "GNET; Meduza photo feature; Jamestown reporting on tattoos, coded imagery, and Turkanov's public image.",
        "GNET; Meduza/Cherta; Jamestown on Española, Rusich, Russian Imperial Movement-adjacent environments, and relevant differences.",
        "Authorial synthesis from far-right source chains and official war-rhetoric context.",
        "Authorial synthesis from reporting on Russian official denazification rhetoric and tolerated far-right-adjacent wartime actors.",
        "Source-weighting rule from `manuscripts/v4/en/contents/Appendix Source Notes.md`; ideological composition remains unresolved in open sources.",
    ],
    "Chapter 12.txt": [
        "Archived Telegram recruitment material; Meduza photo feature; KP.ru; Ukrainska Pravda; Jamestown analysis on specialist roles and technical self-presentation.",
        "Methodological caution from `manuscripts/v4/en/contents/Appendix Source Notes.md`; brigade self-presentation treated as promotional unless corroborated.",
        "Meduza photo feature; archived Telegram material; KP.ru and Jamestown reporting on drones, electronic warfare, reconnaissance, and specialist vocabulary.",
        "Ukrainska Pravda; archived Telegram recruitment material; Meduza reporting on specialists, medics, drone operators, and technical roles.",
        "Authorial synthesis from technical-adaptation source chains.",
        "Source-weighting rule from `manuscripts/v4/en/contents/Appendix Source Notes.md`; public archive does not validate every tactical boast.",
        "Authorial synthesis from the chapter's reputation and technical-source chain.",
        "Authorial transition based on Chapter 13 battlefield-source chains.",
    ],
    "Chapter 13.txt": [
        "Meduza photo feature; Jamestown Foundation; archived Telegram material; ISW contextual reporting on the war's recognizable battlefield geography.",
        "Meduza and Jamestown reporting on Española's Mariupol association; Russian anti-Azov / denazification framing treated as propaganda context.",
        "Meduza photo feature; Jamestown; archived Telegram material on Bakhmut association and reputational use.",
        "Meduza photo feature; archived Telegram material; ISW contextual reporting on Avdiivka and later battlefield claims.",
        "Source-weighting rule from `manuscripts/v4/en/contents/Appendix Source Notes.md`; battlefield reputation distinguished from fully verified tactical performance.",
        "Authorial synthesis from battlefield-reputation source chains.",
        "Authorial synthesis from the chapter's battlefield source chains.",
        "Authorial transition based on Chapter 14 administrative-source chains.",
    ],
    "Chapter 14.txt": [
        "BBC News Russian; Meduza/iStories; Jamestown; archived Telegram material on founder myth, branding, donors, contracts, and patronage.",
        "Archived Telegram material; GNET; Meduza reporting on specialist, brotherhood, experimentation, and mission language.",
        "BBC News Russian on Redut-linked contracts; Meduza/iStories on patronage; Jamestown on changing administrative language.",
        "Authorial comparison with Wagner based on Jamestown and BBC reporting on irregular and semi-private wartime structures.",
        "Authorial synthesis from the chapter's hybrid-formation source chains.",
        "Authorial synthesis from post-Wagner source chains developed in Chapter 15.",
    ],
    "Chapter 15.txt": [
        "Jamestown Foundation, \"Kremlin Continues to Eliminate PMCs and Semi-Autonomous Volunteer Units\"; BBC News Russian; contextual reporting on Wagner's June 2023 mutiny.",
        "BBC News Russian; Jamestown; Meduza/iStories reporting on Redut-linked contracting, founder myth, and governable irregular structures.",
        "Jamestown Foundation on post-Wagner consolidation and military intelligence / Ministry of Defense-linked proxy environments.",
        "Authorial comparison based on public reporting on Akhmat and Española as different managed wartime brands.",
        "Authorial synthesis from post-Wagner consolidation, supporter-milieu, and Redut source chains.",
        "Authorial synthesis from the chapter's post-Wagner source chain.",
    ],
    "Chapter 16.txt": [
        "GNET; Meduza/Cherta; Jamestown; archived Telegram material on public visibility, recruitment, donor attention, and scrutiny.",
        "Jamestown and local archive material on reported Akhmat friction; treated as unevenly sourced and analytically useful rather than settled fact.",
        "OpenSanctions, \"PMC ESPANIOLA\"; GNET; Meduza/Cherta; Jamestown on patrons, Redut, far-right associations, and international reporting.",
        "Authorial synthesis from public-platform evidence and investigative reconstruction risks.",
        "Authorial synthesis from visibility, donor, and media-source chains.",
        "Authorial synthesis from reporting on formation rivalries, patronage, and institutional competition.",
        "Authorial synthesis from Chapter 16 exposure source chain.",
        "Authorial transition based on Chapter 17 state-recapture source chains.",
    ],
    "Chapter 17.txt": [
        "Jamestown Foundation, \"Kremlin Continues to Eliminate PMCs and Semi-Autonomous Volunteer Units\"; BBC News Russian; The Guardian and EL PAIS on later state pressure.",
        "BBC News Russian and Jamestown on Redut-linked arrangements as mechanisms of supervision and recapture.",
        "Jamestown Foundation, \"Alekseev Assassination Attempt Reveals Russian Security Service Cracks\"; Jamestown post-Wagner consolidation reporting.",
        "The Insider; Kyiv Post; archived Telegram material; Jamestown analysis on 88th brigade / Volunteer Corps / Dobrokor labels.",
        "Authorial synthesis from contracts, specialist functions, founder myth, and post-Wagner state-pressure source chains.",
        "Authorial synthesis from state-management and branded-constituency source chains.",
        "Authorial synthesis from broader authoritarian-war and irregular-force source chains.",
        "Authorial synthesis from Chapter 17 and Chapter 18 endgame source chains.",
    ],
    "Chapter 18.txt": [
        "The Insider, \"Российская бригада «Эспаньола»... объявила о расформировании\"; Kyiv Post, \"'Espanola,' Russian Ultras Militia in Ukraine, Disbands\"; archived Telegram statement material in `https://t.me/spainrus`.",
        "Authorial synthesis from The Insider, Kyiv Post, and brigade statement material on post-announcement decomposition.",
        "RTVI, \"Командир «Эспаньолы» Станислав Орлов жив\"; Current Time / Radio Svoboda on ASTRA reporting; local archive material on Tsargrad/pro-war rumor circulation.",
        "The Moscow Times; Current Time / Radio Svoboda / ASTRA; Novaya Gazeta Europe, \"Командир-200\"; The Guardian; EL PAIS English.",
        "Novaya Gazeta Europe, \"Командир-200\"; Current Time / Radio Svoboda / ASTRA; RTVI; The Guardian; EL PAIS English.",
        "Authorial synthesis from contradictory reporting and the methodological caution in `manuscripts/v4/en/contents/Appendix Source Notes.md`.",
        "The Insider; Kyiv Post; The Moscow Times; Current Time / ASTRA; Novaya Gazeta Europe; The Guardian; EL PAIS English.",
        "Authorial synthesis from the Chapter 18 source chain.",
        "Authorial synthesis from the full book source chain.",
    ],
    "Chapter 19 Epilogue.txt": [
        "Authorial synthesis from `manuscripts/v4/en/contents/Appendix Source Notes.md` and the chapter-level source chains across the manuscript.",
        "Authorial synthesis from Cherta/Meduza, BBC News Russian, Jamestown, Meduza/iStories, archived Telegram material, and Chapter 18 endgame reporting.",
        "Authorial synthesis from recruitment, fundraising, patronage, and media-source chains.",
        "Authorial synthesis from the book's recurring evidence on founder myth, symbols, named dead, and horizontal loyalties.",
        "Authorial synthesis from Chapter 18 and post-Wagner state-pressure source chains.",
        "Authorial synthesis from the full manuscript source apparatus.",
    ],
}


KNOWN_SUBHEADINGS = {
    "General note on platform material",
    "Prologue and Chapter 1",
    "Chapter 3",
    "Chapter 2 and Chapter 4",
    "Chapter 5 and Chapter 9",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
    "Chapter 10",
    "Chapter 11",
    "Chapter 12 and Chapter 13",
    "Chapter 15, Chapter 16, and Chapter 17",
    "Chapter 18",
    "Epilogue",
    "Core reporting and investigations",
    "Analytical, registry, and contextual sources",
    "Platform and channel sources",
    "Local-only or unresolved archive items",
    "Editorial baseline",
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")


def should_annotate(file_name: str, paragraph: str) -> bool:
    return file_name in NOTE_PREFIX and paragraph.strip() and not paragraph.lstrip().startswith("- ")


def normalize_source_note(source: str) -> str:
    telegram_urls = "Telegram channel material at https://t.me/spainrus"
    telegram_multi_urls = (
        "Telegram channel material at https://t.me/spainrus, https://t.me/marine_esp, "
        "https://t.me/nashi_parnii, https://t.me/olympicPitbull, and https://t.me/valkyriyaESP"
    )
    replacements = [
        (
            "Archived Telegram material in `https://t.me/spainrus`, `marine_esp.txt`, `nashi_parnii.txt`, `olympicPitbull.txt`, and `valkyriyaESP.txt`",
            telegram_multi_urls,
        ),
        ("archived Telegram statement material in `https://t.me/spainrus`", "Telegram statement material at https://t.me/spainrus"),
        ("archived Telegram material in `https://t.me/spainrus`", telegram_urls),
        ("Archived Telegram material in `https://t.me/spainrus`", telegram_urls),
        ("Telegram archive `https://t.me/spainrus`", telegram_urls),
        ("archived Telegram recruitment material", "Telegram recruitment material at https://t.me/spainrus"),
        ("Archived Telegram recruitment material", "Telegram recruitment material at https://t.me/spainrus"),
        ("archived Telegram recruitment and propaganda material", "Telegram recruitment and propaganda material at https://t.me/spainrus"),
        ("archived Telegram material", telegram_urls),
        ("Archived Telegram material", telegram_urls),
    ]
    normalized = source
    for old, new in replacements:
        normalized = normalized.replace(old, new)
    return normalized


def is_url(line: str) -> bool:
    stripped = line.strip()
    return stripped.startswith("http://") or stripped.startswith("https://")


def should_be_subheading(line: str) -> bool:
    return line.strip() in KNOWN_SUBHEADINGS


def convert_file(legacy_dir: Path, contents_dir: Path, file_name: str) -> None:
    text = read_text(legacy_dir / file_name)
    lines = [line.rstrip() for line in text.split("\n")]
    output: list[str] = []
    footnotes: list[tuple[str, str]] = []
    prefix = NOTE_PREFIX.get(file_name)
    note_sources = SOURCE_CHAINS.get(file_name, [])
    paragraph_index = 0
    first_content = True
    paragraph: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph, paragraph_index
        if not paragraph:
            return
        paragraph_text = "\n".join(paragraph)
        if should_annotate(file_name, paragraph_text):
            paragraph_index += 1
            note_id = f"{prefix}-{paragraph_index:03d}"
            source = normalize_source_note(note_sources[min(paragraph_index - 1, len(note_sources) - 1)])
            paragraph[-1] = f"{paragraph[-1]}[^{note_id}]"
            footnotes.append((note_id, source))
        output.extend(paragraph)
        paragraph = []

    telegram_line_replacements = {
        "Official Española Telegram archive page saved in the project.": "Official Española Telegram public archive page.",
        "Telegram text archives preserved locally in `sources/telegram/channels/`:": "Telegram channel URLs used for platform-source references:",
        "`marine_esp.txt`": "https://t.me/marine_esp",
        "`nashi_parnii.txt`": "https://t.me/nashi_parnii",
        "`olympicPitbull.txt`": "https://t.me/olympicPitbull",
        "`spainrus.txt`": "https://t.me/spainrus",
        "`valkyriyaESP.txt`": "https://t.me/valkyriyaESP",
        "These Telegram text files were used primarily as evidence of internal language, self-presentation, symbolism, fundraising rhetoric, and public claims. They should not be treated as stand-alone verification for disputed factual claims.": "These Telegram channels were used primarily as evidence of internal language, self-presentation, symbolism, fundraising rhetoric, and public claims. They should not be treated as stand-alone verification for disputed factual claims.",
    }

    for line in lines:
        if file_name == "Appendix Reference Links Guide.txt":
            line = telegram_line_replacements.get(line.strip(), line)
        if first_content and line.strip():
            output.append(f"# {line.strip()}")
            first_content = False
            continue

        if not line.strip():
            flush_paragraph()
            output.append("")
            continue

        if not line.lstrip().startswith("- ") and should_be_subheading(line):
            flush_paragraph()
            output.append(f"## {line.strip()}")
            continue

        paragraph.append(line.replace("archived Telegram and adjacent material", "Telegram and adjacent material").replace("archived Telegram material", "Telegram channel material"))

    flush_paragraph()

    while output and output[-1] == "":
        output.pop()
    if footnotes:
        output.append("")
        for note_id, source in footnotes:
            output.append(f"[^{note_id}]: {source}")

    contents_dir.mkdir(parents=True, exist_ok=True)
    (contents_dir / file_name).with_suffix(".md").write_text("\n".join(output) + "\n", encoding="utf-8")


def main() -> None:
    legacy_dir = REPO_ROOT / "manuscripts" / "v4" / "en" / "legacy-txt"
    contents_dir = REPO_ROOT / "manuscripts" / "v4" / "en" / "contents"
    for file_name in FILES:
        convert_file(legacy_dir, contents_dir, file_name)


if __name__ == "__main__":
    main()

