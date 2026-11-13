# DESIGN.md

Sistema de diseño de la landing de **Mundo Biker** (CDMX).
Documento agnóstico del harness. Complementa a `AGENTS.md`.

**Precedencia:** `MUNDOBIKER.md` define la intención; este documento es la verdad visual dentro de ese alcance; `AGENTS.md` gobierna ingeniería y proceso. Si algo choca con el brief, gana el brief.

## 1. Concepto

**Calle de Neo-Tokyo, de noche, bajo la lluvia.** Muros sucios con grafitis y stickers, neones defectuosos, vinilos, glitch y HUD futurista.

Dos mundos que conviven:
- **Urbano sucio:** concreto, ladrillo, spray, stickers rotados, cinta, tags.
- **Futurista:** scanlines, hologramas, marcos tipo HUD, glow, texto de terminal.

**Principio rector:** intensidad con jerarquía. Todo puede brillar, pero no todo a la vez. Un elemento protagonista por pantalla; el resto acompaña.

**Palabras clave:** nocturno, húmedo, eléctrico, rebelde, táctil, imperfecto.
**Lo que NO es:** minimalista, corporativo, pastel, plantilla SaaS, "dark mode genérico con un degradado morado".

## 2. Color

### 2.1 Base

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#07060F` | Fondo general |
| `--bg-raised` | `#0E0B1F` | Tarjetas, paneles |
| `--bg-wall` | `#14102A` | Muros de grafiti, secciones alternas |
| `--line` | `#2A2250` | Bordes sutiles, divisores |
| `--text` | `#F2EEFF` | Texto principal |
| `--text-dim` | `#A59FC8` | Texto secundario |

### 2.2 Neones principales (protagonistas)

| Token | Valor | Rol |
|---|---|---|
| `--neon-magenta` | `#FF2BD6` | Color de marca, CTA principal |
| `--neon-cyan` | `#00F0FF` | Acento tecnológico, enlaces, HUD |
| `--neon-acid` | `#E8FF00` | Advertencias, etiquetas, detalles de energía |
| `--neon-violet` | `#8A2BFF` | Profundidad, fondos con glow, degradados |

### 2.3 Neones secundarios (solo para diferenciar servicios)

| Token | Valor |
|---|---|
| `--neon-orange` | `#FF7A1A` |
| `--neon-green` | `#3DFF7A` |
| `--neon-blue` | `#2D6BFF` |
| `--neon-red` | `#FF2D55` |

**Nota de alcance:** el brief autoriza 4 neones principales y, a la vez, exige un color propio para cada uno de los 8 servicios. Esta paleta secundaria resuelve esa tensión: es una extensión necesaria del brief, no una ampliación arbitraria. Solo se usa en iconos, bordes y glow de las tarjetas.

### 2.4 Asignación de color por servicio

Cada servicio tiene su color, su icono SVG y su glow. Se define en `src/data/services.ts`.

| Servicio | Color |
|---|---|
| Polarizado | `--neon-cyan` |
| Película de seguridad | `--neon-blue` |
| Full Wrap | `--neon-magenta` |
| Calcomanías personalizadas | `--neon-acid` |
| Accesorios para moto y carro | `--neon-orange` |
| Pulido de faros | `--neon-green` |
| Estética general | `--neon-violet` |
| Iluminación y sonido | `--neon-red` |

### 2.5 Reglas de color

- Fondo siempre oscuro. Nunca fondo blanco ni claro.
- Máximo **2 neones protagonistas por pantalla** más el color del servicio en las tarjetas.
- El texto largo va en `--text` sobre `--bg` o `--bg-raised`, **nunca** en neón.
- No uses colores fuera de esta paleta. Si hace falta un tono nuevo, añádelo aquí primero.

**Contraste medido** contra `--bg` `#07060F`:

| Token | Ratio aprox. | Uso permitido |
|---|---|---|
| `--text` | 19:1 | texto normal |
| `--text-dim` | 8.0:1 | texto normal |
| `--neon-acid` | 18:1 | texto normal y UI |
| `--neon-cyan` | 14:1 | texto normal y UI |
| `--neon-green` | 14:1 | texto normal y UI |
| `--neon-orange` | 7.7:1 | texto normal y UI |
| `--neon-magenta` | 6.3:1 | texto normal y UI |
| `--neon-red` | 5.5:1 | texto normal y UI |
| `--neon-blue` | 4.47:1 | texto grande y UI; no texto normal |
| `--neon-violet` | 3.7:1 | texto grande y UI; no texto normal |
| `--line` | 1.4:1 | decorativo; no como borde que comunique estado |

- Texto grande = 24 px o más, o 18.66 px o más en negrita.
- El color del servicio se usa en icono, borde y glow; el título de la tarjeta va en `--text`.
- Si necesitas violeta o azul como texto normal, define una variante aclarada en este documento antes de usarla. No improvises el color en el componente.

## 3. Tipografía

Todas las fuentes autoalojadas en `.woff2`, con `font-display: swap` y fallback real.

| Rol | Fuente | Fallback | Uso |
|---|---|---|---|
| Display | Orbitron | `Impact, system-ui, sans-serif` | Títulos, hero, números |
| Cuerpo | Chakra Petch | `system-ui, sans-serif` | Párrafos, UI |
| Mono | Space Mono | `ui-monospace, monospace` | Loader, HUD, etiquetas técnicas |
| Grafiti | Permanent Marker | `cursive` | Solo acentos: firmas, etiquetas, stickers |

Elección cerrada: no se intercambian familias ni se añaden alternativas sin actualizar este documento y `src/styles/tokens.css`.

**Escala** (móvil → escritorio, con `clamp()`):

| Token | Valor |
|---|---|
| `--fs-hero` | `clamp(2.5rem, 9vw, 7rem)` |
| `--fs-h2` | `clamp(1.75rem, 5vw, 3.5rem)` |
| `--fs-h3` | `clamp(1.25rem, 3vw, 1.75rem)` |
| `--fs-body` | `clamp(1rem, 1.2vw, 1.125rem)` |
| `--fs-small` | `0.875rem` |

**Reglas:**
- Títulos en mayúsculas, `letter-spacing` ligeramente positivo.
- Cuerpo con `line-height` entre 1.5 y 1.7 y ancho máximo de 65 caracteres.
- La fuente de grafiti nunca se usa en párrafos ni en texto de lectura larga.
- Cargar solo los pesos que se usen. Precargar únicamente la fuente del hero.

## 4. Tokens CSS (punto de partida para `tokens.css`)

```css
:root {
  /* Base */
  --bg: #07060F;
  --bg-raised: #0E0B1F;
  --bg-wall: #14102A;
  --line: #2A2250;
  --text: #F2EEFF;
  --text-dim: #A59FC8;

  /* Neones */
  --neon-magenta: #FF2BD6;
  --neon-cyan: #00F0FF;
  --neon-acid: #E8FF00;
  --neon-violet: #8A2BFF;
  --neon-orange: #FF7A1A;
  --neon-green: #3DFF7A;
  --neon-blue: #2D6BFF;
  --neon-red: #FF2D55;

  /* Glow de texto (2 a 4 capas) */
  --glow-text-magenta:
    0 0 4px #fff,
    0 0 10px var(--neon-magenta),
    0 0 24px var(--neon-magenta),
    0 0 48px var(--neon-magenta);
  --glow-text-cyan:
    0 0 4px #fff,
    0 0 10px var(--neon-cyan),
    0 0 24px var(--neon-cyan),
    0 0 48px var(--neon-cyan);

  /* Glow de caja */
  --glow-box-magenta:
    0 0 0 1px var(--neon-magenta),
    0 0 12px var(--neon-magenta),
    0 0 32px color-mix(in srgb, var(--neon-magenta) 50%, transparent);
  --glow-box-cyan:
    0 0 0 1px var(--neon-cyan),
    0 0 12px var(--neon-cyan),
    0 0 32px color-mix(in srgb, var(--neon-cyan) 50%, transparent);

  /* Espaciado (escala de 4 px) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Layout */
  --container: 72rem;
  --gutter: clamp(1rem, 4vw, 2rem);

  /* Capas */
  --z-bg: -1;
  --z-base: 1;
  --z-header: 50;
  --z-float: 60;      /* botón WhatsApp */
  --z-modal: 80;      /* lightbox */
  --z-cursor: 90;
  --z-loader: 100;

  /* Movimiento */
  --ease-snap: cubic-bezier(0.2, 0.9, 0.3, 1);
  --dur-fast: 150ms;
  --dur-base: 300ms;
  --dur-slow: 600ms;
}
```

**Elevación:** `--bg-raised` y `--bg-wall` están a ~1.04:1 y ~1.09:1 del fondo; no se distinguen por valor. La elevación se comunica con `--line`, glow y textura, no con el color de fondo. Si se necesita separación real, sube el valor del token y actualiza esta nota.

Para el glow de cada servicio, define en la tarjeta una variable local y reutilízala:

```css
.service-card { --c: var(--neon-cyan); }
.service-card { box-shadow: 0 0 0 1px var(--c), 0 0 24px color-mix(in srgb, var(--c) 45%, transparent); }
```

## 5. Forma, textura y fondo

**Formas:**
- Esquinas **cortadas** (chaflán) con `clip-path: polygon(...)` en botones y tarjetas, en lugar de bordes redondeados suaves.
- Marcos tipo HUD: esquinas con corchetes, líneas finas y pequeñas etiquetas en mono (`SYS//01`, `ONLINE`).
- Stickers y tags con rotación ligera (−6° a +6°) y bordes irregulares.

**Textura y fondo:**
- Ruido sutil sobre `--bg` (SVG `feTurbulence` o patrón inline pequeño), opacidad baja.
- Muros de ladrillo o concreto en SVG/CSS, oscuros, con grafitis encima.
- Ciudad del hero: capas de edificios en SVG con ventanas encendidas, letreros y niebla. Sin imágenes pesadas.
- Scanlines: `repeating-linear-gradient` con opacidad muy baja sobre el hero y los paneles HUD.

**Grafitis:**
- Hechos en SVG, originales. Sin marcas, personajes ni logos de terceros.
- Tags, flechas, chorreos de pintura, estrellas, manchas de spray.
- Colocados detrás o en los bordes del contenido, nunca encima del texto de lectura.

## 6. Efectos

Todos son CSS salvo que se indique. Animar solo `transform` y `opacity` siempre que se pueda.

| Efecto | Descripción | Dónde |
|---|---|---|
| **Neón con flicker** | Parpadeo irregular y suave, como tubo defectuoso. Ciclo largo (6 a 10 s) con 1 o 2 caídas breves. | Letrero del hero, logo |
| **Glitch RGB split** | Capas `::before`/`::after` con `clip-path` y desplazamiento en cian y magenta, activadas por ráfagas cortas. | Título del hero, hover en títulos |
| **Lluvia** | Líneas finas inclinadas en CSS o canvas ligero. Pocas capas en móvil. | Hero |
| **Scanlines** | Líneas horizontales sutiles, fijas o con deriva muy lenta. | Hero, paneles HUD |
| **Parallax** | Movimiento suave entre capas (edificios, letreros, humo). | Hero. Desactivado en móvil |
| **Tilt 3D** | Inclinación según puntero. | Tarjetas de servicio. Solo puntero fino |
| **Borde neón animado** | Gradiente cónico que gira lentamente en el borde. | Tarjetas, CTA |
| **Encendido de neón** | Al entrar en pantalla, el elemento se enciende con 2 o 3 parpadeos y se estabiliza. | Títulos de sección |
| **Pintura de spray** | Máscara que revela el elemento como trazo de spray. | Grafitis, stickers |
| **Marquesina** | Texto infinito en neón: `POLARIZADO // WRAP // LUCES // SONIDO // ESTÉTICA`. Banda de transición, no sección. | Entre hero y servicios |
| **Cursor** | Mira neón o gota de spray con rastro breve. Se suma al cursor nativo, nunca lo reemplaza. | Solo `(pointer: fine)` |
| **Modo apagón** | Easter egg: oculta el fondo y deja solo los neones. | Konami o 5 clics en el logo |

### Límites de seguridad

- Nada parpadea más de **3 veces por segundo**. El flicker es suave e irregular, nunca estroboscópico.
- No animes `box-shadow` ni `filter: blur()` grandes de forma continua en muchos elementos. Anima la `opacity` de una capa con el glow ya pintado.
- Pausa las animaciones infinitas fuera de pantalla con `IntersectionObserver`.

### Ejemplo de flicker suave

```css
@keyframes neon-flicker {
  0%, 18%, 22%, 62%, 64%, 100% { opacity: 1; }
  20%, 63% { opacity: 0.55; }
  21% { opacity: 0.9; }
}
.neon-sign { animation: neon-flicker 8s infinite; }
```

### Ejemplo de glitch

```css
.glitch { position: relative; }
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0;
}
.glitch::before { color: var(--neon-cyan); }
.glitch::after  { color: var(--neon-magenta); }
.glitch:hover::before,
.glitch.is-glitching::before {
  opacity: 0.8;
  transform: translate(-2px, 1px);
  clip-path: polygon(0 10%, 100% 10%, 100% 45%, 0 45%);
}
.glitch:hover::after,
.glitch.is-glitching::after {
  opacity: 0.8;
  transform: translate(2px, -1px);
  clip-path: polygon(0 55%, 100% 55%, 100% 90%, 0 90%);
}
```

## 7. Componentes

**NeonButton**
- Primario: relleno `--neon-magenta`, texto oscuro, glow. Hover: se intensifica y hace un glitch breve.
- Secundario: contorno cian, fondo transparente, glow suave.
- Esquinas cortadas, mayúsculas, área táctil mínima de 44×44 px, foco visible con anillo neón.
- **COTIZA YA** (header): pulso de neón lento (opacidad/escala sutil).

**NeonSign (letrero)**
- Texto o forma con glow en 3 a 4 capas, flicker opcional, soporte para "tubo apagado" parcial.

**ServiceCard**
- Fondo `--bg-raised`, borde y glow en el color del servicio, icono SVG propio, título, descripción corta (máx. 2 líneas).
- Tilt 3D y borde animado en puntero fino. En táctil: efecto estático.
- Grid **asimétrico**: tarjetas de distinto tamaño, una destacada.

**Sticker**
- Rotación ligera, sombra dura, borde irregular, a veces con cinta adhesiva en SVG. Para testimonios y decoración.

**HUD Frame**
- Marco con esquinas en corchete, etiquetas en mono y línea de escaneo. Para la línea de tiempo.

**ContactForm**
- Campos exactos del brief: nombre, vehículo, servicio de interés, mensaje.
- `label` real, `autocomplete` correcto, errores claros y confirmación accesible (`aria-live`).
- El mecanismo de envío está pendiente (`AGENTS.md` §15). No lo inventes.

**Mapa / ubicación**
- Pendiente de decidir: iframe de terceros o mapa SVG estático con enlace. Si es iframe, cárgalo de forma diferida y documenta el coste de privacidad y rendimiento.

**Timeline (proceso)**
- Línea tipo circuito con nodos que se encienden en secuencia: Cotiza → Diseño → Instalación → Entrega.

**Gallery**
- Mosaico irregular tipo muro de grafitis. Lightbox con `Esc`, flechas y foco atrapado.

**Loader**
- Terminal en mono: `INICIALIZANDO SISTEMA...`. Máximo 2 s, omitible y con salida garantizada: no depende de `animationend` ni bloquea el contenido si el JS falla o está desactivado.

## 8. Layout y responsive

- **Mobile-first.** Diseña primero a 360 a 390 px; luego amplía.
- Breakpoints: `640px`, `768px`, `1024px`, `1280px`.
- Contenedor máximo `--container`, con `--gutter` a los lados.
- Define `--header-h` y `scroll-padding-top` igual a la altura del header fijo, para que las anclas no queden tapadas.
- Sin scroll horizontal en ningún ancho. El contenido ancho (tablas, SVG) scrolla dentro de su propio contenedor.
- Secciones con ritmo vertical amplio (`--space-16` a `--space-24`) y alternancia de fondos (`--bg` y `--bg-wall`).
- Botón flotante de WhatsApp siempre accesible, sin tapar contenido importante ni el pie en móvil.

### Reducciones en móvil

- Menos capas de lluvia y sin parallax.
- Sin cursor personalizado ni tilt (no hay puntero fino).
- Glow con menos capas (2 en lugar de 4).
- `backdrop-filter` solo en el header, si el rendimiento lo permite.

## 9. Movimiento y accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Con `prefers-reduced-motion`:
- Sin glitch, flicker, lluvia animada, parallax, marquesina en movimiento ni loader.
- Los neones quedan **encendidos y estáticos**: la web sigue viéndose cyberpunk, solo quieta.
- El cursor personalizado se desactiva.

Además:
- Foco visible en todo elemento interactivo (anillo neón de 2 px con offset).
- Al navegar por ancla, el foco se mueve al destino y el header fijo no lo tapa.
- El cursor personalizado se suma al nativo; nunca lo reemplaza con `cursor: none`.
- El loader no bloquea el contenido si el JS falla o está desactivado.
- Elementos decorativos con `aria-hidden="true"`.
- No transmitir información solo con color: acompañar con texto o icono.

## 10. Voz y textos

- Español, tono callejero, directo, con actitud. Frases cortas.
- La ciudad es **CDMX** (Ciudad de México); no uses «México DF» en el copy ni en el JSON-LD.
- Títulos en mayúsculas. Verbos de acción en los botones.
- Ejemplos de tono: `TU AUTO. TU MOTO. TU IDENTIDAD.`, `COTIZA YA`.
- Evita el relleno ("somos una empresa líder en..."). Cada texto debe ayudar a contactar o a entender un servicio.
- Sin jerga ofensiva ni referencias a marcas registradas.

## 11. Qué evitar

- Degradados morado-azul genéricos sin intención.
- Tarjetas redondeadas blancas, sombras suaves grises o estilo "SaaS".
- Neón en todo a la vez; texto largo en neón.
- Efectos pesados en móvil, o animaciones continuas fuera de pantalla.
- Fuentes del sistema como único recurso tipográfico.
- Grafitis que reproduzcan marcas o artistas reales.
- Estroboscopia o parpadeo rápido.
- Suavizar el estilo por "limpieza": la intensidad es parte del concepto.

## 12. Revisión de diseño (checklist)

- [ ] Hay un elemento protagonista claro por pantalla.
- [ ] Paleta limitada a los tokens de este documento.
- [ ] Cada servicio tiene su color, icono y glow.
- [ ] El color del servicio se usa solo en icono, borde y glow; el texto va en `--text`.
- [ ] La landing cubre las 8 secciones vigentes (sin configurador ni comparador antes/después) y los 8 servicios de `MUNDOBIKER.md`.
- [ ] El texto largo es legible (contraste, ancho de línea, fondo sólido).
- [ ] Los efectos se reducen en móvil y se apagan con `prefers-reduced-motion`.
- [ ] Ningún parpadeo supera 3 por segundo.
- [ ] Los grafitis son originales y no tapan contenido.
- [ ] Hay captura de verificación en 390 px y 1440 px.
