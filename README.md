# Credisnet Web

Sitio estático preparado para probarse en **GitHub Pages** y publicarse después en **Cloudflare Pages** sin cambiar la estructura de URLs.

## Estructura

```text
.
├── .github/workflows/pages.yml  # Validación y publicación automática
├── docs/                        # Sitio que se publica
│   ├── index.html               # Página principal
│   ├── css/ js/ img/ icons/
│   └── nombre-de-pagina/index.html
├── scripts/validate_site.py     # Comprueba enlaces y archivos locales
└── scripts/prepare_github_pages.py # Genera la vista de prueba no indexable
```

Las páginas usan carpetas con `index.html`, por ejemplo:

- `docs/quienes-somos/index.html` → `/quienes-somos/`
- `docs/prestamos-policia-bonaerense/index.html` → `/prestamos-policia-bonaerense/`

No existe ninguna ruta `/p/` heredada de Blogger.

## Publicar la prueba en GitHub Pages

1. Subir **el contenido de este paquete**, no el ZIP, a la raíz de la rama `main`.
2. En GitHub abrir `Settings → Pages`.
3. En `Build and deployment → Source`, seleccionar **GitHub Actions**.
4. Abrir la pestaña `Actions` y comprobar que finalice correctamente el flujo **Validar y publicar en GitHub Pages**.
5. El workflow publica una copia temporal con `noindex`, para que la prueba no compita con el dominio definitivo en buscadores.
6. La prueba quedará disponible en:

   `https://mtgproweb.github.io/credisnet-web/`

> GitHub Pages para repositorios privados requiere un plan que admita Pages privado. El sitio publicado sigue siendo accesible públicamente.

## Probar localmente

Desde la raíz del repositorio:

```bash
python scripts/validate_site.py
python -m http.server 8000 --directory docs
```

Abrir `http://localhost:8000/`.

## Publicar después en Cloudflare Pages

Conectar el mismo repositorio y usar:

- Rama de producción: `main`
- Framework preset: `None`
- Build command: vacío
- Build output directory: `docs`

La carpeta `docs/` ya contiene `_headers` y `_redirects` para Cloudflare Pages.

## Reemplazar contenido de páginas

Para actualizar una página, editar su archivo `docs/<ruta>/index.html`. Conviene conservar el nombre de la carpeta para mantener la URL y el posicionamiento.
