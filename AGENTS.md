# AGENTS.md

Guía para cualquier agente de programación con IA (OpenCode, Claude Code, Cursor, Codex, Copilot, etc.) que trabaje en este repositorio.
Este archivo es agnóstico del harness: no depende de comandos, rutas ni herramientas de un agente concreto.
Lee este archivo completo antes de escribir código.

**Fuente de intención:** `MUNDOBIKER.md` es el brief original del cliente y la referencia de alcance. Este documento y `DESIGN.md` lo ejecutan; si lo contradicen, gana el brief.

**Convención de herramientas:** usa las que tu harness ofrezca (leer y editar archivos, ejecutar comandos de shell, navegar). No asumas nombres de herramientas específicos. Si una capacidad no está disponible, dilo y propón una alternativa.

## 1. Proyecto

Landing page de una sola página para **Mundo Biker**, taller de personalización y estética automotriz en **CDMX**.

**Servicios:** polarizado, película de seguridad, full wrap, calcomanías personalizadas, accesorios para moto y carro, pulido de faros, estética general, iluminación y sonido.

**Objetivo de negocio:** que el visitante (mayoría en móvil) contacte por **WhatsApp** o pida cotización. Toda decisión de diseño y rendimiento se subordina a esto.

**Concepto creativo:** calle de Neo-Tokyo de noche. Cyberpunk callejero con neón, grafitis, vinilos, glitch, scanlines y HUD. Debe sentirse memorable, nunca una plantilla genérica. La landing es una sola página con scroll fluido y navegación por anclas.

## 2. Stack

- **Astro** (puro), sitio estático. Sin SSR salvo necesidad justificada. Es la decisión tomada a partir de la «arquitectura inspirada en Astro» del brief.
- **TypeScript** estricto.
- **CSS nativo** (variables CSS, `@keyframes`, `clip-path`, `mix-blend-mode`). Tailwind solo si ya está configurado; no lo añadas por tu cuenta.
- **JavaScript vanilla** en `<script>` de Astro para interacciones pequeñas.
- Frameworks de UI (React, Svelte, etc.): **no**, salvo aprobación explícita. Si algo realmente lo exige, usa una isla pequeña con `client:visible` o `client:idle`.
- Librerías pesadas (GSAP, Three.js): **no** por defecto. Preguntar antes de añadirlas.
- Despliegue: Vercel, sitio estático. La configuración vive en `vercel.json`; la URL canónica se resuelve con `PUBLIC_SITE_URL` o `VERCEL_PROJECT_PRODUCTION_URL`.

## 3. Comandos

```bash
npm install          # instalar dependencias
npm run dev          # servidor de desarrollo (http://localhost:4321)
npm run build        # build de producción
npm run preview      # previsualizar el build
npx astro check      # validar tipos y .astro
```

Antes de dar una tarea por terminada: `npx astro check` y `npm run build` deben pasar sin errores.

## 4. Estructura esperada

```
/
├── MUNDOBIKER.md            # brief de intención del cliente (referencia de alcance)
├── AGENTS.md
├── DESIGN.md                # sistema de diseño (paleta, fuentes, reglas de glow)
├── README.md                # comandos, estructura, despliegue y placeholders
├── astro.config.ts
├── vercel.json              # build, headers y cache para Vercel
├── .env.example             # PUBLIC_SITE_URL
├── .nvmrc                   # Node 22
├── public/
│   ├── favicon.svg
│   ├── logo.webp             # logo transparente (principal)
│   ├── logo.png              # fallback del logo
│   ├── og-image.jpg
│   └── fonts/               # fuentes autoalojadas (.woff2)
└── src/
    ├── layouts/
    │   └── Base.astro       # <head>, SEO, JSON-LD, fuentes, cursor, loader
    ├── pages/
    │   ├── index.astro      # ensambla las secciones
    │   └── robots.txt.ts    # robots + sitemap condicional
    ├── components/
    │   ├── ui/              # NeonButton, Marquee, Sticker, Loader, FloatingWhatsApp
    │   ├── sections/        # Header, Hero, Services, Process, Gallery,
    │   │                    # Testimonials, Contact, Footer
    │   └── svg/             # ServiceIcon, CityScape, GraffitiMark
    ├── scripts/             # cursor, tilt, reveal, parallax, konami, loader, menu, lightbox, form
    ├── styles/
    │   ├── tokens.css       # variables (colores, glow, espaciados, z-index)
    │   ├── global.css       # reset, tipografía, utilidades
    │   └── effects.css      # scanlines, flicker, glitch, lluvia, ruido
    └── data/
        ├── business.ts      # WhatsApp, dirección, horario, redes (única fuente de verdad)
        ├── services.ts      # los 8 servicios: nombre, color, icono, descripción
        └── site.ts          # URL canónica (PUBLIC_SITE_URL / Vercel)
```

Si el repositorio difiere de esto, respeta lo que ya exista y no reorganices sin pedirlo.

## 5. Sistema de diseño

La fuente de verdad visual es `DESIGN.md`. Los valores viven en `src/styles/tokens.css`. **No hardcodees colores ni sombras en componentes**: usa las variables.

**Paleta:** 4 neones principales (magenta, cian, ácido, violeta) más 4 secundarios reservados para diferenciar servicios. La asignación completa, los ratios de contraste medidos y sus límites de uso están en `DESIGN.md` §2. No uses colores fuera de esa paleta.

**Tipografía** (autoalojada, `font-display: swap`, con fallback real):
- Títulos: **Orbitron**.
- Cuerpo y UI: **Chakra Petch**.
- Mono (loader, HUD, etiquetas técnicas): **Space Mono**.
- Acentos de grafiti (etiquetas, firmas): **Permanent Marker**. Solo para acentos, nunca para párrafos.

**Glow:** `text-shadow` y `box-shadow` en 2 a 4 capas, definidos como variables reutilizables (`--glow-magenta`, `--glow-cyan`, etc.).

**Cada servicio tiene su propio color neón** y su propio icono SVG (requisito del brief). Mantén esa asignación en `src/data/services.ts`. El color del servicio se usa en icono, borde y glow; nunca en párrafos ni en texto de cuerpo.

**Equilibrio:** el estilo es intenso, pero debe haber jerarquía. No todo brilla a la vez. Reserva el glow fuerte para el hero, los CTA y los títulos de sección. El texto largo va sobre fondo sólido y legible.

## 6. Secciones (orden en la página)

El brief define 10 secciones; esta versión omite el configurador de wrap y el comparador antes/después, así que la landing entrega 8. La marquesina es una banda de transición, no una sección numerada.

1. Header fijo translúcido + navegación por anclas + botón **COTIZA YA** (pulso de neón).
2. Hero: frase potente, subtítulo, 2 botones (WhatsApp / Ver servicios), lluvia, scanlines, título con glitch RGB.
3. Servicios: grid asimétrico, 8 tarjetas con tilt 3D y borde neón animado.
4. Proceso: línea de tiempo tipo circuito/HUD (Cotiza, Diseño, Instalación, Entrega).
5. Galería: mosaico tipo muro de grafitis con lightbox (placeholders hasta tener fotos reales).
6. Testimonios: tarjetas tipo sticker pegado en un muro.
7. Contacto: formulario (nombre, vehículo, servicio de interés, mensaje), ubicación, horarios, redes, botón flotante de WhatsApp.
8. Footer con firma de grafiti y créditos.

**Banda de transición:** marquesina infinita de neón (`POLARIZADO // WRAP // LUCES // SONIDO // ESTÉTICA`) entre el hero y los servicios, tal como la define el brief en «Efectos». No cuenta como sección.

**Anclas:** el header enlaza a cada sección. Usa `scroll-margin-top` igual a la altura del header para que el destino no quede tapado.

**Extras:** loader tipo terminal (~6.6 s, omitible, logo de fondo), cursor personalizado (solo con puntero fino), easter egg "modo apagón" (código Konami o 5 clics en el logo).

## 7. Reglas de rendimiento (innegociables)

La mayoría del tráfico es **móvil**. Diseña mobile-first.

- **Sin frameworks de UI ni islas por defecto.** Los componentes `.astro` son estáticos; añade JS vanilla solo donde haya interacción real (lightbox, menú, formulario).
- Efectos con **CSS** siempre que sea posible. Animar solo `transform` y `opacity`.
- Preferir **SVG** a imágenes. Fondos de ciudad, lluvia, grafitis y siluetas se hacen en CSS/SVG.
- Imágenes con `<Image />` / `<Picture />` de Astro, `loading="lazy"` (excepto el hero) y dimensiones explícitas para evitar CLS.
- Fuentes: solo los pesos que se usen, `.woff2`, precargar solo la fuente del hero.
- **Reducir efectos en móvil:** menos capas de lluvia, sin parallax pesado, sin cursor personalizado, `backdrop-filter` solo donde aporte.
- Evitar `filter: blur()` grande y `box-shadow` masivo animados. Usar `will-change` con moderación.
- Objetivo Lighthouse móvil: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- Pausar animaciones fuera de pantalla con `IntersectionObserver`.

## 8. Accesibilidad

- Respetar `prefers-reduced-motion`: desactivar glitch, flicker, parpadeo, parallax, lluvia animada y loader. Dejar un estado estático atractivo.
- Nada debe parpadear más de 3 veces por segundo (riesgo de convulsiones fotosensibles). El flicker del neón debe ser suave e irregular, no estroboscópico.
- Contraste suficiente: mínimo 4.5:1 en texto normal y 3:1 en texto grande y bordes de UI. **No todos los neones pasan AA**: violeta y azul solo se usan en texto grande/UI o en iconos, bordes y glow. Ratios medidos en `DESIGN.md` §2.5.
- HTML semántico: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`.
- Foco visible y estilizado (anillo neón). Todo operable con teclado: lightbox (con `Esc` para cerrar y foco atrapado), menú.
- Anclas del header con `scroll-margin-top` para que el header fijo no tape el destino del enlace.
- El cursor personalizado se suma al nativo; nunca lo reemplaza con `cursor: none`.
- El loader nunca bloquea el contenido: si el JS falla o está desactivado, la página es visible y usable.
- `alt` descriptivo en imágenes informativas; `alt=""` y `aria-hidden="true"` en decorativas (grafitis, lluvia, scanlines).
- Formularios con `label` real, errores claros y `autocomplete` correcto.

## 9. SEO y datos estructurados

- Un único `<h1>` (el del hero). `<title>` y `meta description` únicos, con **Mundo Biker**, **CDMX** y servicios.
- Open Graph y Twitter Card con imagen en `public/og-image.jpg`.
- JSON-LD `LocalBusiness` (o `AutoBodyShop`) en `Base.astro`, alimentado desde `src/data/business.ts`: nombre, dirección, teléfono, horario, redes, servicios.
- `lang="es"`, `sitemap` (integración oficial de Astro) y `robots.txt`. Canonical, Open Graph y sitemap usan `src/data/site.ts`: primero `PUBLIC_SITE_URL`, luego `VERCEL_PROJECT_PRODUCTION_URL` o `VERCEL_URL`. Si no hay URL resuelta, se omite el sitemap y se emite un warning.
- Enlaces de WhatsApp con formato `https://wa.me/<numero>?text=<mensaje codificado>`.

## 10. Contenido y tono

- `MUNDOBIKER.md` manda en intención y tono. Si el brief es ambiguo, pregunta antes de inventar.
- Todo en **español**, tono callejero, directo y con actitud. Frases cortas, llamadas a la acción claras.
- No inventes datos del negocio (precios, direcciones, números, testimonios, años de experiencia). Usa `[PLACEHOLDER]` visible y avísame.
- Los datos reales viven **solo** en `src/data/business.ts`. Nunca los copies en varios archivos.
- Las reseñas de muestra deben estar marcadas como ejemplos y no se presentan como reseñas reales. Fotos de galería y reseñas reales se marcan con `<!-- TODO: reemplazar -->`.
- Sin marcas registradas, personajes ni logos de terceros en grafitis o stickers. Todo original.

## 11. Skills y guías externas (opcionales)

Los skills son opcionales. Si tu harness soporta skills y alguno de estos está instalado, aplícalo según el momento. Si no, sigue este archivo, que ya contiene las reglas esenciales. Cada harness los invoca a su manera (por nombre, por comando o de forma automática): usa el mecanismo que tu entorno ofrezca.

| Skill | Cuándo usarlo |
|---|---|
| `astro-best-practices` o `astro` | Al crear o revisar componentes, layouts, integraciones y estructura. Prioridad: JS mínimo e islas solo cuando haga falta. |
| `impeccable` | Para dirección de diseño y refinamiento: crítica de diseño, auditoría, pulido final, animación e intensidad visual. |
| `playwright-cli` | Para verificar visualmente y probar flujos (ver sección 12). |

**Orden de prioridad si hay instrucciones contradictorias:**
1. Lo que pida el humano en la conversación.
2. `MUNDOBIKER.md`: intención y alcance del cliente.
3. `DESIGN.md`: verdad visual, dentro del alcance del brief.
4. Este `AGENTS.md`: ingeniería y proceso, dentro del alcance del brief y del sistema visual.
5. Cualquier skill o guía externa.

En conflicto entre capas: el brief gana en el «qué» y el «por qué»; `DESIGN.md` gana en lo visual; `AGENTS.md` gana en proceso e ingeniería.

El estilo cyberpunk con neón es intencional: ningún skill debe "suavizarlo" ni convertirlo en un diseño minimalista. Si un skill empuja hacia lo genérico, ignora esa parte y avísame.

## 12. Verificación con Playwright CLI

Después de cambios visuales o de interacción, verifica en un navegador real. Si `playwright-cli` no está instalado, usa Playwright estándar (`npx playwright`) o cualquier navegador headless que tengas. Si no puedes abrir un navegador, dilo y pídeme capturas en lugar de dar la verificación visual por hecha.

Ejemplo con `playwright-cli`:

```bash
npm run dev
playwright-cli open http://localhost:4321
playwright-cli resize 390 844      # móvil
playwright-cli screenshot
playwright-cli resize 1440 900     # escritorio
playwright-cli screenshot
```

Comprobar como mínimo:
- Sin scroll horizontal en 360, 390 y 768 px.
- El formulario de contacto valida y el botón de WhatsApp genera la URL correcta.
- El lightbox abre, navega y cierra con `Esc`.
- El easter egg activa y desactiva el modo apagón.
- Con `prefers-reduced-motion` activado no hay animaciones agresivas.
- Sin errores en consola.

## 13. Reglas de trabajo para el agente

**Haz:**
- Trabaja por secciones pequeñas. Termina y verifica una antes de pasar a la siguiente.
- Reutiliza componentes de `ui/` en lugar de duplicar estilos.
- Escribe código completo. Sin `// resto del código aquí` ni secciones a medias.
- Explica brevemente qué cambiaste y qué quedó pendiente.
- Pregunta si algo es ambiguo y afecta a la arquitectura. Si es un detalle menor, decide y anótalo.

**No hagas:**
- No contradigas `MUNDOBIKER.md`. Si una regla de este archivo choca con el brief, avisa y propón cómo resolverlo.
- No añadas dependencias sin justificarlo y sin preguntar.
- No uses `localStorage` para datos sensibles ni envíes datos del formulario a servicios externos sin confirmarlo.
- No reescribas archivos enteros para cambios pequeños.
- No expongas claves, tokens ni datos personales en el repositorio.
- No uses `!important` salvo para el override de `prefers-reduced-motion`.
- No uses `dangerouslySetInnerHTML` o `set:html` con contenido no confiable.
- No dejes `console.log` ni código muerto.

## 14. Definición de terminado

Una tarea está terminada cuando:
- [ ] `npx astro check` y `npm run build` pasan sin errores ni warnings nuevos.
- [ ] Se ve bien en móvil (390 px) y escritorio (1440 px), verificado con captura.
- [ ] Respeta `prefers-reduced-motion` y tiene foco visible.
- [ ] No añade JS innecesario ni rompe los objetivos de Lighthouse.
- [ ] Usa tokens de `tokens.css` y datos de `src/data/`, sin valores hardcodeados.
- [ ] Textos en español, sin datos inventados, placeholders y reseñas de muestra marcados.
- [ ] Cada una de las 8 secciones vigentes y los 8 servicios del brief tiene equivalente en la landing.
- [ ] Resumen final con lo hecho, lo pendiente y cualquier decisión tomada.

## 15. Datos del negocio y decisiones pendientes

Estos valores van **solo** en `src/data/business.ts`:

- Nombre: **Mundo Biker**
- Ciudad: **CDMX** (Ciudad de México)
- WhatsApp: `525663697644` (formato internacional, sin `+` ni espacios); display `+52 56 6369 7644`
- Dirección: `Norte 92, local #5430, Col. Gertrudis Sánchez, Gustavo A. Madero, CDMX`
- Horario: `Lunes a domingo, 10:00 a 19:00`
- Instagram / TikTok: `EL MUNDO DEL BIKER` (links pendientes)
- Dominio: `[DOMINIO]`

### Decisiones pendientes

No las inventes. Pregunta antes de implementarlas:

- Mecanismo de envío del formulario de contacto (WhatsApp prellenado, `mailto:` o servicio externo).
- Mapa de ubicación (iframe de terceros vs. mapa SVG estático con enlace).
- Fotos reales de galería; reseñas reales (las actuales son ejemplos marcados).
- Links o handles de Instagram y TikTok.
- Analytics y medición de conversiones.
- Dominio canónico definitivo y `PUBLIC_SITE_URL` de producción.
- Actualizar Node a >= 22.23.4 y Astro a 7.4.12 para cerrar los advisories de `npm audit`.

### Decisiones de alcance de la versión 1

El brief sigue siendo la referencia de intención. Para esta versión se decidió omitir:

- El configurador de wrap.
- El comparador antes/después.
- La silueta de auto en el hero.
- El sonido opcional y su control.
- El loader se extendió a ~6.6 s y usa el logo de fondo por decisión del cliente; sigue siendo omitible.

Estas omisiones deben revisarse antes de ampliar el alcance. La landing entrega 8 secciones y mantiene los 8 servicios del brief.
