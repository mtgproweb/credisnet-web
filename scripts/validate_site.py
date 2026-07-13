#!/usr/bin/env python3
"""Valida referencias locales, páginas declaradas y URLs limpias."""
from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO / "docs"
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
        errors.append(f"{file.relative_to(ROOT)}: referencia absoluta incompatible con GitHub Pages: {value}")
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
        text = file.read_text(encoding="utf-8")
        parser = ReferenceParser()
        parser.feed(text)
        for reference in parser.references:
            validate_reference(file, reference, errors)

    manifest_path = REPO / "content-pages.json"
    try:
        pages = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception as exc:
        pages = []
        errors.append(f"No se pudo leer content-pages.json: {exc}")

    if len(pages) != 23:
        errors.append(f"content-pages.json debe contener 23 páginas; contiene {len(pages)}")

    seen: set[str] = set()
    for page in pages:
        slug = page.get("slug", "")
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
            errors.append(f"Slug inválido: {slug!r}")
        if slug in seen:
            errors.append(f"Slug duplicado: {slug}")
        seen.add(slug)
        file = REPO / page.get("file", "")
        if not file.is_file():
            errors.append(f"Falta página declarada: {page.get('file')}")
            continue
        text = file.read_text(encoding="utf-8")
        if 'name="robots" content="noindex,follow,noarchive"' not in text:
            errors.append(f"La página pendiente no tiene noindex: {page.get('file')}")
        expected = f'https://www.credisnet.com.ar/{slug}'
        if expected not in text:
            errors.append(f"Canonical u OG URL incorrecta en {page.get('file')}")

    index = (ROOT / "index.html").read_text(encoding="utf-8")
    if re.search(r'href=["\'][^"\']*(?:/p/|\.html(?:[?#]|["\']))', index):
        errors.append("La portada contiene enlaces públicos con /p/ o .html")

    if errors:
        print("Errores encontrados:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"OK: {len(html_files)} HTML, 23 páginas pendientes y referencias locales válidas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
