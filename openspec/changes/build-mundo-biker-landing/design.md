# Design

## Context

Repositorio greenfield: solo existen `MUNDOBIKER.md` (intención), `AGENTS.md` (proceso), `DESIGN.md` (sistema visual) y OpenSpec. No hay `package.json`, código ni assets. La construcción parte de cero y debe respetar la precedencia documentada: brief > `DESIGN.md` (visual) > `AGENTS.md` (ingeniería).

Restricciones que condicionan el enfoque:

- Sitio estático de una sola página, mobile-first, sin SSR.
- Sin frameworks de UI ni librerías pesadas.
- La mayoría del tráfico es móvil y el objetivo es contacto por WhatsApp.
- Varios datos de negocio y todo el material fotográfico siguen sin existir.

Ver `proposal.md` para la motivación y `specs/` para el comportamiento exigido. Este documento no repite esos requisitos.

## Goals / Non-Goals

**Goals:**

- Entregar una primera versión completa y navegable de las 8 secciones vigentes y los 8 servicios.
- Centralizar datos y estilos para que el contenido real se pueda sustituir sin tocar componentes.
- Mantener el coste de JavaScript bajo y los efectos en CSS siempre que sea posible.
- Dejar la puerta abierta a fotos, datos y backend reales sin rehacer la arquitectura.

**Non-Goals:**

- Elegir el proveedor definitivo del formulario, analytics o despliegue.
- Publicar con datos de negocio inventados o material fotográfico de stock.
- Implementar autenticación, CMS, i18n o múltiples páginas.
- Automatizar pruebas E2E; la verificación es manual con Playwright y Lighthouse.

## Decisions

### D1. Astro estático con TypeScript estricto

Astro genera HTML estático y permite componentes reutilizables sin hidratar React/Svelte. Se usa `output: 'static'`, TypeScript estricto y `<script>` de Astro para módulos de interacción.

- **Alternativas:** HTML + JS a mano (más control, peor mantenibilidad); Next.js/Vite + React (sobrecoste de runtime y contrario al brief).
- **Consecuencia:** cero islas por defecto; el JS solo se carga donde hay interacción real.

### D2. Composición por secciones y datos

`src/pages/index.astro` ensambla secciones en el orden del brief. Cada sección es un `.astro` en `components/sections/`. Los 8 servicios viven en `src/data/services.ts` y los datos de negocio en `src/data/business.ts`.

- **Alternativa:** contenido hardcodeado en cada sección. Se descarta porque impide cambiar un dato en un solo lugar y contradice `AGENTS.md` §10.
- **Consecuencia:** los componentes reciben datos tipados; los textos de negocio no se duplican.

### D3. Tokens CSS como única capa visual

`src/styles/tokens.css` define color, tipografía, glow, espaciado, capas, movimiento y `--header-h`. `global.css` hace reset y tipografía; `effects.css` concentra scanlines, glitch, lluvia, ruido y flicker. Los componentes consumen variables y no declaran hex ni sombras literales.

- **Alternativa:** Tailwind. Se descarta porque no está configurado y el brief pide CSS nativo.
- **Consecuencia:** el sistema visual de `DESIGN.md` §4 se traduce 1:1 a tokens; los ajustes de paleta se hacen en un archivo.

### D4. Cuatro roles tipográficos autoalojados

Orbitron (display), Chakra Petch (cuerpo/UI), Space Mono (técnico) y Permanent Marker (acentos). `.woff2` en `public/fonts/`, `font-display: swap`, subconjunto latino y solo pesos usados. Se precarga únicamente la display del hero.

- **Alternativa:** una sola familia. Se descarta porque el brief exige contraste entre display, cuerpo y grafiti.
- **Consecuencia:** si Lighthouse no llega a 90 en móvil, el primer recorte es el peso de la fuente grafiti, no el contenido.

### D5. Efectos en CSS, con `transform` y `opacity`

Flicker, glitch, lluvia, scanlines, marquesina, tilt y borde animado se implementan con CSS. El borde cónico animado usa `@property` cuando el navegador lo soporta y degrada a borde estático si no. `IntersectionObserver` pausa animaciones infinitas fuera de pantalla.

- **Alternativa:** GSAP o canvas. Se descartan por peso y porque el brief pide CSS siempre que sea posible.
- **Consecuencia:** la lluvia es un número limitado de capas CSS; en móvil se reduce.

### D6. JS vanilla en módulos pequeños, sin islas

`src/scripts/` contiene módulos independientes: `lightbox.ts`, `menu.ts`, `loader.ts`, `cursor.ts`, `konami.ts`, `reveal.ts` y `tilt.ts`. Cada uno se importa desde el `<script>` de su componente y se inicializa solo si su elemento existe.

- **Alternativa:** una isla de framework por interacción. Se descarta por peso y porque Astro ya resuelve el HTML.
- **Consecuencia:** el HTML funciona sin JS; cada módulo mejora una parte sin bloquear el resto.

### D7. Datos de negocio tipados y placeholders explícitos

`business.ts` exporta un objeto tipado con `name`, `city`, `whatsapp`, `address`, `hours`, `social`, `domain` y `siteUrl`. Los campos sin valor usan una cadena `[PLACEHOLDER]` y un flag `pending`. Un helper `whatsappUrl(message)` construye `https://wa.me/<numero>?text=<encoded>`.

- **Alternativa:** valores dispersos en componentes. Se descarta por riesgo de deriva y por `AGENTS.md` §10.
- **Consecuencia:** el build puede listar qué datos faltan; la UI muestra el placeholder en lugar de un dato falso.

### D8. SEO generado desde una sola fuente

`Base.astro` compone `title`, `description`, canonical, Open Graph, Twitter Card y JSON-LD `AutoBodyShop` desde `business.ts` y `services.ts`. Se usa `@astrojs/sitemap` y un `robots.txt`. Si `siteUrl` es placeholder, el build emite un warning y no genera URLs engañosas.

- **Alternativa:** metadatos por página. No aplica: hay una sola página.
- **Consecuencia:** cambiar el dominio o el teléfono actualiza metadatos y datos estructurados.

### D9. Formulario con handoff a WhatsApp en v1

El formulario valida en cliente (nombre, vehículo, servicio, mensaje) y, si es válido, compone un mensaje y ofrece continuar por WhatsApp con los datos ya escritos. No envía nada a un tercero. El backend definitivo queda como decisión abierta.

- **Alternativas:** `mailto:` (pierde el contexto de WhatsApp); servicio externo (requiere consentimiento y no está elegido).
- **Consecuencia:** el flujo de conversión funciona desde la primera versión sin comprometer privacidad ni infraestructura.

### D10. Mapa estático con enlace de direcciones en v1

La sección de contacto muestra dirección y horario desde `business.ts`, más un mapa SVG/CSS decorativo con un enlace externo a indicaciones. No se incrusta un iframe de terceros en v1.

- **Alternativas:** iframe de Google Maps (peso, cookies, consentimiento); mapa interactivo propio (coste alto).
- **Consecuencia:** cero peticiones a terceros y mejor rendimiento; el iframe puede añadirse después con carga diferida.

### D11. Placeholders de material visual

La galería usa placeholders generados con CSS/SVG y etiquetas visibles ("PLACEHOLDER", "TODO: reemplazar"). Las reseñas de muestra están marcadas como ejemplos y no se presentan como reseñas reales. El lightbox funciona con esos placeholders para validar la interacción antes de tener fotos reales.

- **Alternativa:** fotos de stock. Se descarta: el brief pide material propio y no se deben simular trabajos reales.
- **Consecuencia:** la sección se puede revisar y medir sin bloquear el lanzamiento por assets.

### D12. Imágenes reales con Astro cuando existan

Mientras no haya fotos, todo es SVG/CSS. Cuando lleguen, se usan `<Image />`/`<Picture />` con dimensiones explícitas, `loading="lazy"` y `alt` descriptivo; el hero nunca depende de una imagen pesada.

- **Consecuencia:** no hay CLS por imágenes y el hero se mantiene rápido.

### D13. Cursor aditivo y opcional

El cursor personalizado se dibuja con un elemento posicionado y `transform`, solo bajo `(pointer: fine)` y sin `cursor: none`. Se desactiva con reduced motion.

- **Consecuencia:** nunca se rompe la usabilidad del puntero nativo.

### D14. Loader fail-open

El overlay del loader está oculto por defecto y solo se muestra si el JS añade una clase al inicio; se retira a los ~6.6 s, por botón de omisión o con `Esc`, y usa el logo como watermark de fondo. Si el JS falla o está desactivado, el contenido es visible.

- **Alternativa:** overlay visible por defecto que el JS retira. Se descarta: si el JS falla, la página queda bloqueada.
- **Consecuencia:** el loader nunca es un requisito para ver el contenido.

### D15. Modo apagón con dos disparadores

Un único módulo comparte el estado del modo apagón: secuencia Konami o cinco activaciones del logo en una ventana corta. El logo sigue funcionando como ancla; el modo es reversible y no oculta contenido esencial.

- **Consecuencia:** no hay dos implementaciones del easter egg ni conflicto con la navegación.

## Risks / Trade-offs

- **Datos de negocio incompletos** → placeholders visibles, warning de build y checklist de publicación; no se inventan valores.
- **Ocho colores de servicio compiten con la jerarquía visual** → el neón se limita a icono, borde y glow; el texto usa `--text`; violeta y azul no se usan en texto normal.
- **Cuatro familias tipográficas pueden romper el objetivo de rendimiento** → subconjunto latino, solo pesos usados, precarga de una sola fuente y recorte de la grafiti si Lighthouse baja de 90.
- **Efectos CSS intensos en móvil** → menos capas de lluvia, sin parallax, sin tilt, sin cursor, menos glow y pausa fuera de pantalla.
- **El formulario no tiene backend definitivo** → handoff a WhatsApp en v1; se documenta como decisión abierta y no se envía nada a terceros.
- **El mapa definitivo no está decidido** → mapa estático con enlace; el iframe queda como mejora posterior.
- **No hay fotos reales** → placeholders etiquetados; el diseño se valida con ellos y se sustituyen sin cambiar la estructura.
- **El contraste de violeta y azul no llega a AA en texto normal** → restricción a texto grande/UI, iconos, bordes y glow, medida en `DESIGN.md` §2.5.

## Migration Plan

No hay migración: el proyecto no tiene código previo. El despliegue es estático y el rollback consiste en volver a la versión anterior del build.

Orden de construcción:

1. Scaffold de Astro, TypeScript, configuración y estructura de carpetas.
2. Tokens, estilos globales, fuentes y layout base con SEO y JSON-LD.
3. Datos de negocio y servicios con placeholders.
4. Secciones estáticas en el orden del brief.
5. Interacciones (lightbox, menú, formulario).
6. Efectos, loader, cursor y modo apagón.
7. Verificación con `astro check`, build, Playwright y Lighthouse.

## Open Questions

- Proveedor definitivo del formulario de contacto y si se añadirá backend propio.
- Dominio canónico, destino de despliegue y cabeceras de seguridad.
- Datos reales de negocio: WhatsApp, dirección, horario, redes y dominio.
- Fotos reales de galería y testimonios.
- Analytics y medición de conversiones (con su aviso de privacidad).
- Si el mapa final será un iframe de terceros o el mapa estático con enlace.
