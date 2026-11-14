# Mundo Biker — Landing

Landing de una sola página para **Mundo Biker**, taller de personalización y estética automotriz en CDMX. Construida con Astro estático, TypeScript estricto, CSS nativo y JavaScript vanilla.

La intención del cliente vive en `MUNDOBIKER.md`; el sistema visual en `DESIGN.md`; las reglas de ingeniería en `AGENTS.md`.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build estático en dist/
npm run preview   # previsualiza el build
npm run check     # astro check
```

Requiere Node.js 22.12 o superior (Astro 6).

> **Nota de seguridad:** la versión fijada es Astro 6.4.8 porque el entorno actual usa Node 22.22.1. `npm audit` reporta advisories en Astro <= 7.4.6; la corrección requiere Astro 7.4.12 y Node >= 22.23.4. Al actualizar Node, hay que subir Astro y repetir la verificación.

## Despliegue en Vercel

El proyecto es estático y no necesita adaptador de Astro.

1. Importa el repositorio en Vercel.
2. Framework: **Astro**. Build command: `npm run build`. Output directory: `dist`.
3. Define `PUBLIC_SITE_URL` en Production con el dominio final, sin slash al final. Si no se define, se usa `VERCEL_PROJECT_PRODUCTION_URL`.
4. `vercel.json` aplica headers de seguridad y cache para `/fonts`, `/_astro` y `og-image.jpg`.
5. `vercel.json` también fija `cleanUrls` y `trailingSlash: false`.

```bash
npx vercel        # preview
npx vercel --prod # producción
```

Cuando conectes el dominio del cliente, actualiza `PUBLIC_SITE_URL` para que canonical, Open Graph y sitemap apunten al dominio correcto. `business.domain` sigue reservado para el dato de negocio.

## Preview en redes

- `og-image.jpg` es 1200x630, pesa menos de 100 KB y se sirve desde `/og-image.jpg`.
- `Base.astro` publica Open Graph y Twitter Card con título, descripción e imagen absolutos.
- La imagen y la URL usan `PUBLIC_SITE_URL` o, en Vercel, `VERCEL_PROJECT_PRODUCTION_URL`.
- Después de desplegar, valida con Meta Sharing Debugger, LinkedIn Post Inspector o X Card Validator. Las redes cachean: fuerza el re-scrape si cambias dominio o imagen.

## Marca

- `public/logo.webp` es el logo principal con fondo transparente; `public/logo.png` es el fallback para navegadores sin WebP.
- El header usa el emblema + wordmark y el footer el emblema completo.

## Imágenes de servicios

Estructura: `public/images/services/<service-id>/NN.webp`.

IDs canónicos: `polarizado`, `pelicula-seguridad`, `full-wrap`, `calcomanias`, `accesorios`, `pulido-faros`, `estetica-general`, `iluminacion-sonido`.

Disponibles: `polarizado/01-05.webp` y `full-wrap/01-05.webp`. Los originales de `Assets/` quedaron con los mismos nombres alineados.

## Estructura

```
/
├── MUNDOBIKER.md
├── AGENTS.md
├── DESIGN.md
├── README.md
├── astro.config.ts
├── vercel.json              # build, headers y cache para Vercel
├── .env.example             # PUBLIC_SITE_URL
├── .nvmrc                   # Node 22
├── public/
│   ├── favicon.svg
│   ├── logo.webp             # logo transparente (principal)
│   ├── logo.png              # fallback del logo
│   ├── og-image.jpg
│   ├── images/services/      # polarizado/ y full-wrap/ (01-05.webp)
│   └── fonts/               # Orbitron, Chakra Petch, Space Mono, Permanent Marker
└── src/
    ├── layouts/Base.astro
    ├── pages/index.astro
    ├── pages/robots.txt.ts
    ├── components/ui/       # botones, marquesina, sticker, loader, WhatsApp
    ├── components/sections/ # header, hero, servicios, proceso, galería, testimonios, contacto, footer
    ├── components/svg/      # iconos de servicio, ciudad, firma
    ├── scripts/             # lightbox, menú, formulario, efectos
    ├── styles/              # tokens.css, global.css, effects.css
    └── data/                # business.ts, services.ts, site.ts
```

## Datos de negocio

Todos los datos viven en `src/data/business.ts`. WhatsApp, dirección y horario ya están cargados. Cada dato pendiente mantiene su flag en `pending`:

- La UI muestra el nombre de las redes y marca los links como pendientes; el dominio y el correo siguen pendientes.
- No se genera sitemap ni canonical si no hay URL de sitio resuelta.
- El build emite un warning cuando falta `PUBLIC_SITE_URL` y no hay URL de Vercel.
- Los enlaces de WhatsApp usan `https://wa.me/525663697644` con el mensaje codificado.

### Pendientes

- Links o handles de Instagram y TikTok.
- Dominio definitivo y `PUBLIC_SITE_URL` de producción.
- Fotos reales de los servicios restantes (polarizado y full wrap ya están).
- Reseñas reales autorizadas (las actuales son ejemplos marcados).
- Mecanismo definitivo del formulario (backend propio o servicio externo).
- Mapa interactivo (iframe) si se decide sustituir el mapa estático.
- Analytics y medición de conversiones.
- Actualizar Node y Astro para cerrar los advisories de `npm audit`.

## Decisiones de la versión 1

- **Alcance:** esta versión omite el configurador de wrap, el comparador antes/después, la silueta de auto del hero y el sonido opcional.
- **Formulario:** valida en cliente y abre WhatsApp en una pestaña nueva con el mensaje compuesto. No envía datos a terceros.
- **Reseñas:** las tarjetas actuales son ejemplos de diseño, marcados como muestra; se sustituyen por reseñas reales antes de publicar.
- **Galería:** fotos reales de polarizado y full wrap; los demás servicios se suman cuando haya material.
- **Mapa:** SVG estático con enlace a indicaciones de Google Maps. Sin iframes ni cookies de terceros.
- **Fuentes:** cuatro familias autoalojadas con subset latino y pesos mínimos.
- **Efectos:** CSS con `transform`/`opacity`; `IntersectionObserver` pausa animaciones fuera de pantalla.
- **Modo apagón:** Konami o cinco activaciones del logo en dos segundos.

## Accesibilidad y movimiento

- `prefers-reduced-motion` desactiva glitch, flicker, lluvia, parallax, marquesina en movimiento, loader y cursor personalizado.
- El cursor personalizado solo aparece con puntero fino y nunca reemplaza al nativo.
- El loader es fail-open: si el JS falla, el CSS lo oculta a los 7.2 s; si el JS está desactivado, nunca se muestra. Dura ~6.6 s, muestra el logo de fondo y se puede omitir con el botón o `Esc`.
- Foco visible en todos los controles; lightbox y menú son operables con teclado.
- Sin JavaScript, el contenido sigue visible y una barra de navegación alternativa enlaza las secciones.

### Medición de parpadeo

- `neon-flicker` recorre 8 s con dos caídas de opacidad (20 % y 63 %): 0.25 parpadeos por segundo.
- `neon-ignite` es una animación de entrada de 1.7 s con tres caídas: ~1.8 por segundo.
- Ambas quedan por debajo del límite de 3 por segundo.

## Verificación

```bash
npx astro check
npm run build
npm run preview
```

Comprobaciones realizadas con Playwright:

- Sin scroll horizontal en 360, 390, 768, 1024 y 1440 px.
- Un solo `h1`.
- Lightbox con `Esc` y foco restaurado.
- Menú móvil con `Esc`, formulario vacío con foco en el primer error y envío válido abriendo WhatsApp con el mensaje compuesto.
- Konami y cinco clics del logo alternan el modo apagón.
- Reduced motion sin lluvia, marquesina ni cursor.
- Sin errores de consola.

## OpenSpec

El cambio que originó esta versión está en `openspec/changes/build-mundo-biker-landing/`. Cuando el trabajo esté cerrado, se puede archivar con el flujo de OpenSpec.
