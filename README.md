# Credisnet Web — estructura final

Sitio estático preparado para probar en **GitHub Pages** y publicar después en **Cloudflare Pages**.

## Estado

- Portada funcional dentro de `docs/index.html`.
- 23 páginas internas con slugs definitivos.
- Todas las páginas internas muestran `Contenido pendiente` y usan `noindex`.
- No existen URLs públicas con `/p/` ni terminadas en `.html`.
- Las direcciones históricas se conservan únicamente como redirecciones.

## Archivos de control

- `URLS-DEFINITIVAS.md`: lista cerrada de rutas.
- `PAGINAS-PENDIENTES.md`: checklist para incorporar contenido.
- `content-pages.json`: inventario estructurado de páginas.
- `docs/_redirects`: migración de URLs para Cloudflare Pages.

## GitHub Pages

1. Subir todo a la rama `main`.
2. En `Settings → Pages`, seleccionar **GitHub Actions**.
3. Esperar que el workflow termine en verde.
4. Abrir `https://mtgproweb.github.io/credisnet-web/`.

## Cloudflare Pages

- Rama de producción: `main`
- Framework preset: `None`
- Build command: vacío
- Build output directory: `docs`

## Validación local

```bash
python scripts/validate_site.py
python -m http.server 8000 --directory docs
```
