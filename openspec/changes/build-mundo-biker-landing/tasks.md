# Tasks

## 1. Scaffold y configuración

- [x] 1.1 Crear `package.json`, `astro.config.mjs` y `tsconfig.json` con Astro estático y TypeScript estricto; verificar que `npm run build` genera `dist/index.html`.
- [x] 1.2 Instalar `astro`, `@astrojs/sitemap`, `@astrojs/check` y `typescript`; verificar que `npm install` termina y `npx astro check` ejecuta sin errores.
- [x] 1.3 Crear la estructura `src/{layouts,pages,components/{ui,sections,svg},scripts,styles,data}` y `public/fonts`; verificar el árbol con `find src public -maxdepth 3`.
- [x] 1.4 Configurar `output: 'static'`, integración de sitemap y `site` leído desde el placeholder de dominio; verificar que el build emite el warning de dominio pendiente.
- [x] 1.5 Crear `README.md` con comandos (`dev`, `build`, `preview`, `astro check`), estructura y lista de placeholders; verificar que los comandos documentados se ejecutan tal cual.

## 2. Sistema de diseño y layout base

- [x] 2.1 Crear `src/styles/tokens.css` con paleta, glow, espaciado, z-index, movimiento y `--header-h`; verificar que no hay hex literales en `src/components` con `grep -rn "#[0-9A-Fa-f]\{6\}" src/components`.
- [x] 2.2 Crear `src/styles/global.css` con reset, escala tipográfica, foco visible y override de `prefers-reduced-motion`; verificar foco con teclado en el navegador.
- [x] 2.3 Crear `src/styles/effects.css` con scanlines, ruido, lluvia, flicker y glitch; verificar que con reduced motion no hay animación.
- [x] 2.4 Autoalojar las cuatro familias en `public/fonts` con `@font-face`, `font-display: swap`, subset latino y precarga solo de Orbitron; verificar en DevTools que no se descargan pesos no usados.
- [x] 2.5 Implementar `src/layouts/Base.astro` con `lang="es"`, title, description, canonical, Open Graph, Twitter Card y JSON-LD `AutoBodyShop` desde los datos; verificar el HTML generado y que el JSON-LD parsea.
- [x] 2.6 Añadir `robots.txt` y generar sitemap desde la URL canónica; verificar que `dist/robots.txt` existe y que, con dominio pendiente, el sitemap se omite y el warning se reporta.
- [x] 2.7 Implementar contenedor, gutters y `scroll-padding-top`; verificar ausencia de scroll horizontal en 360, 390, 768, 1024 y 1440 px.

## 3. Datos y catálogo de servicios

- [x] 3.1 Crear `src/data/business.ts` tipado con nombre, ciudad, WhatsApp, dirección, horario, redes, dominio y flags de pendiente; verificar con `npx astro check` y que la UI muestra placeholders.
- [x] 3.2 Añadir el helper `whatsappUrl(message)` con codificación correcta; verificar una URL de ejemplo en el navegador.
- [x] 3.3 Crear `src/data/services.ts` con los 8 servicios del brief (id, nombre, descripción corta, icono y neón); verificar que hay exactamente 8 entradas sin duplicados.
- [x] 3.4 Crear los 8 iconos SVG originales en `src/components/svg`; verificar que no hay marcas de terceros y que los decorativos usan `aria-hidden`.
- [x] 3.5 Implementar `ServiceCard` y la sección de servicios con grid asimétrico y una tarjeta destacada; verificar que el neón solo aparece en icono, borde y glow.
- [x] 3.6 Implementar el tilt y el borde animado solo para puntero fino; verificar que en emulación táctil las tarjetas quedan estáticas.

## 4. Secciones narrativas

- [x] 4.1 Implementar `Header.astro` con navegación por anclas, botón COTIZA YA y menú móvil; verificar teclado, táctil y que las anclas no quedan tapadas.
- [x] 4.2 Implementar `Hero.astro` con un único `h1`, subtítulo y dos CTAs; verificar un solo `h1` y capas decorativas con `aria-hidden`.
- [x] 4.3 Crear la banda marquesina con el texto exacto del brief entre hero y servicios; verificar que con reduced motion queda estática y visible.
- [x] 4.4 Implementar la línea de tiempo del proceso con Cotiza, Diseño, Instalación y Entrega; verificar el orden y que la secuencia se desactiva con reduced motion.
- [x] 4.5 Implementar la galería como mosaico de placeholders etiquetados; verificar que cada ítem tiene nombre accesible y que no se presenta como trabajo real.
- [x] 4.6 Implementar reseñas de muestra en stickers marcados como ejemplos; verificar que no se presentan como reseñas reales.
- [x] 4.7 Implementar la sección de contacto con los cuatro campos, ubicación, horario, redes y acceso flotante a WhatsApp; verificar labels reales y placeholders visibles.
- [x] 4.8 Implementar el footer con firma de grafiti, créditos y redes; verificar que todos los trazos son originales.

## 5. Interacciones

- [x] 5.1 Implementar `lightbox.ts` con apertura, anterior/siguiente, `Esc`, foco atrapado y restauración de foco; verificar los cuatro comportamientos.
- [x] 5.2 Implementar `menu.ts` para el menú móvil con foco atrapado y cierre con `Esc`; verificar teclado y táctil.
- [x] 5.3 Implementar la validación del formulario con errores inline, `aria-live`, foco en el primer error y handoff a WhatsApp; verificar envío vacío y envío válido.
- [x] 5.4 Verificar degradación sin JS: contenido y galería siguen visibles; la navegación sin JS enlaza las secciones y no hay controles que bloqueen.

## 6. Efectos y extras

- [x] 6.1 Implementar `reveal.ts` con `IntersectionObserver` para encendido de neón y pausa de animaciones fuera de pantalla; verificar que al salir del viewport la animación se pausa.
- [x] 6.2 Implementar `cursor.ts` aditivo, solo `(pointer: fine)` y desactivado con reduced motion; verificar que el cursor nativo sigue visible.
- [x] 6.3 Implementar `loader.ts` con overlay oculto por defecto, ~6.6 s, logo de fondo, botón de omisión y fail-open; verificar con JS desactivado y con reduced motion.
- [x] 6.4 Implementar `konami.ts` con secuencia Konami y cinco clics en el logo para alternar modo apagón; verificar ambos disparadores y que se puede desactivar.
- [x] 6.5 Verificar el límite de 3 parpadeos por segundo en los keyframes de flicker; documentar la medición en el README.

## 7. Verificación final e integración

- [x] 7.1 Ejecutar `npx astro check` y `npm run build`; verificar que terminan sin errores ni warnings nuevos.
- [x] 7.2 Tomar capturas con Playwright en 390x844 y 1440x900; verificar que no hay scroll horizontal en 360, 390 y 768 px.
- [x] 7.3 Probar con Playwright los flujos: lightbox, menú, formulario, modo apagón y reduced motion; verificar que no hay errores en consola.
- [x] 7.4 Ejecutar Lighthouse móvil sobre el build; verificar Performance >= 90, Accessibility >= 95, SEO >= 95 y Best Practices >= 95.
- [x] 7.5 Revisar la cobertura vigente: 8 secciones, 8 servicios y banda marquesina; verificar contra `MUNDOBIKER.md` y las omisiones documentadas del configurador y el comparador.
- [x] 7.6 Revisar la lista de pendientes (WhatsApp, dirección, horario, redes, dominio, fotos, testimonios, backend del formulario, mapa, analytics y deploy); verificar que el README y `AGENTS.md` §15 siguen siendo la fuente.
