# Credisnet Web

Sitio estático preparado para probarse en **GitHub Pages** y publicarse después en **Cloudflare Pages**.

## URLs limpias

Las 16 páginas conservan el slug original detectado en Blogger, pero se publican sin `/p/` y sin `.html`.

Ejemplo:

```text
Blogger: /p/quienes-somos-credisnet.html
Nueva:   /quienes-somos-credisnet
Archivo: docs/quienes-somos-credisnet/index.html
```

GitHub Pages puede resolver primero la carpeta con una barra final; cada página elimina esa barra de la dirección visible mediante `history.replaceState`, por lo que se muestra la URL limpia.

## Estructura

```text
.
├── .github/workflows/pages.yml
├── docs/
│   ├── index.html
│   ├── quienes-somos-credisnet/index.html
│   ├── ... 15 páginas adicionales
│   ├── css/ js/ img/ icons/
│   ├── _headers y _redirects
│   └── sitemap.xml
├── scripts/validate_site.py
├── scripts/prepare_github_pages.py
├── PAGINAS-PENDIENTES.md
└── content-pages.json
```

No existe una carpeta `docs/p/`. Las rutas viejas solo aparecen en `_redirects` para enviarlas a las URLs nuevas cuando el sitio pase a Cloudflare Pages.

## GitHub Pages

1. Subir el contenido a la rama `main`.
2. En `Settings → Pages`, seleccionar **GitHub Actions**.
3. Esperar que el workflow termine en verde.
4. Abrir `https://mtgproweb.github.io/credisnet-web/`.

Ejemplo de página pendiente:

`https://mtgproweb.github.io/credisnet-web/quienes-somos-credisnet`

## Probar localmente

```bash
python scripts/validate_site.py
python -m http.server 8000 --directory docs
```

## Cloudflare Pages

- Rama: `main`
- Framework preset: `None`
- Build command: vacío
- Build output directory: `docs`
