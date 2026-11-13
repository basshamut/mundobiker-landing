# Proposal

## Why

Mundo Biker, taller de personalización y estética automotriz en CDMX, no tiene una presencia web que convierta. La mayoría de sus clientes llega desde el móvil y necesita una vía directa a WhatsApp o a una cotización. El brief (`MUNDOBIKER.md`), el proceso (`AGENTS.md`) y el sistema visual (`DESIGN.md`) ya están definidos; falta construir la primera versión funcional de la landing.

## What Changes

- Crear el proyecto Astro estático con TypeScript estricto, sin SSR y sin frameworks de UI.
- Implementar el sistema de diseño: tokens, tipografía autoalojada, glow, formas con esquinas cortadas, texturas y límites de contraste medidos.
- Construir las 8 secciones vigentes: header, hero, servicios, proceso, galería, testimonios, contacto y footer. El configurador de wrap y el comparador antes/después quedan fuera de esta versión.
- Añadir la banda de transición con la marquesina de neón entre el hero y los servicios.
- Renderizar los 8 servicios desde una única fuente de datos, cada uno con su icono SVG, color neón y descripción.
- Implementar las interacciones: lightbox de galería, menú móvil y validación del formulario.
- Centralizar los datos de negocio y los enlaces de WhatsApp en `src/data/business.ts`, con placeholders visibles para lo que el cliente aún no ha entregado.
- Implementar SEO técnico: `title`, `meta description`, Open Graph, Twitter Card, `robots.txt`, sitemap y JSON-LD `LocalBusiness`.
- Implementar los efectos cyberpunk con CSS, respetando `prefers-reduced-motion`, el límite de 3 parpadeos por segundo y la reducción de efectos en móvil.
- Añadir loader, cursor personalizado y modo apagón.
- Marcar como placeholders la galería y como ejemplos las reseñas de muestra; no inventar identidades reales.

No hay cambios incompatibles: el repositorio solo contiene documentación y OpenSpec, no existe código previo.

## Capabilities

### New Capabilities

- `site-foundation`: proyecto Astro estático, layout base, SEO y datos estructurados, fuentes, tokens, estilos globales, responsive y rendimiento base.
- `service-catalog`: modelo de los 8 servicios y su presentación en grid asimétrico con icono, color y glow propios.
- `landing-sections`: estructura y contenido de header, hero, marquesina, proceso, galería, testimonios, contacto y footer.
- `interactive-showcase`: lightbox de galería, operable con ratón, táctil y teclado.
- `conversion-flow`: CTAs de WhatsApp con mensaje prellenado, formulario de contacto, botón flotante y datos de negocio centralizados.
- `motion-and-resilience`: efectos visuales CSS, loader, cursor, modo apagón y degradación accesible.

### Modified Capabilities

Ninguna. El proyecto no tiene specs previas.

## Impact

- **Nuevo proyecto:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/` y `public/`.
- **Dependencias:** `astro`, `@astrojs/sitemap`, `@astrojs/check` y `typescript`. Sin React, Svelte, Tailwind ni librerías de animación.
- **Datos:** `src/data/business.ts` (única fuente de verdad) y `src/data/services.ts`.
- **Assets:** favicon, `og-image.jpg` y fuentes `.woff2`, con placeholders donde falte material.
- **Documentación:** se respetan `MUNDOBIKER.md`, `AGENTS.md` y `DESIGN.md`; cualquier conflicto se resuelve según la precedencia documentada.
- **Fuera de alcance de esta versión:** configurador de wrap, comparador antes/después, silueta de auto en el hero, sonido opcional, mecanismo definitivo de envío del formulario, analytics, destino de despliegue, fotos y testimonios reales, y automatización de pruebas E2E.
- **Riesgo:** los datos de negocio incompletos (WhatsApp, dirección, horario, redes y dominio) se muestran como placeholder visible y bloquean la publicación final, no la construcción.
