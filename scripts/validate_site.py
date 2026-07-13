#!/usr/bin/env python3
"""Valida referencias locales y la estructura estática del sitio."""
from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "docs"
URL_ATTRS = {"href", "src", "action", "poster", "data-src"}


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if not value:
                continue
            if name in URL_ATTRS:
                self.references.append(value)
            elif name == "srcset":
                for item in value.split(","):
                    candidate = item.strip().split()[0] if item.strip() else ""
                    if candidate:
                        self.references.append(candidate)

    handle_startendtag = handle_starttag


def validate_reference(file: Path, value: str, errors: list[str]) -> None:
    if value.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return
    if value.startswith("/"):
        errors.append(
            f"{file.relative_to(ROOT)}: referencia absoluta incompatible con subruta: {value}"
        )
        return
    target_path = unquote(parsed.path)
    if not target_path:
        return
    target = (file.parent / target_path).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        errors.append(f"{file.relative_to(ROOT)}: referencia fuera de docs/: {value}")
        return
    candidates = [target]
    if target_path.endswith("/") or target.is_dir():
        candidates.append(target / "index.html")
    if not any(candidate.exists() for candidate in candidates):
        errors.append(f"{file.relative_to(ROOT)}: no existe {value}")


def main() -> int:
    errors: list[str] = []
    html_files = sorted(ROOT.rglob("*.html"))
    if not (ROOT / "index.html").is_file():
        errors.append("Falta docs/index.html")

    for file in html_files:
        parser = ReferenceParser()
        parser.feed(file.read_text(encoding="utf-8"))
        for reference in parser.references:
            validate_reference(file, reference, errors)

    if errors:
        print("Errores encontrados:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"OK: {len(html_files)} páginas HTML y referencias locales válidas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
