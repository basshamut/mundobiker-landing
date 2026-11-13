Crea una landing page de una sola página (con scroll fluido y navegación por anclas) para Mundo Biker, un taller de personalización y estética automotriz en Mexico DF. Debe sentirse como entrar a una calle de Neo-Tokyo de noche: una web memorable, inmersiva y completamente fuera de lo común, nada de plantillas genéricas.

## CONCEPTO CREATIVO
Estética cyberpunk callejera: ciudad lluviosa de noche, neones parpadeantes, grafitis, vinilos, glitch y hologramas. Mezcla lo urbano sucio (muros, stickers, spray) con lo futurista (HUD, scanlines, glow).

## PALETA Y TIPOGRAFÍA
- Fondo: negro azulado muy oscuro (#07060F) con textura sutil de asfalto/ruido.
- Neones: magenta (#FF2BD6), cian (#00F0FF), amarillo ácido (#E8FF00), violeta (#8A2BFF).
- Títulos: fuente display agresiva tipo "Orbitron", "Rajdhani" o "Bungee"; textos de apoyo con "Chakra Petch" o "Space Mono"; acentos con una fuente tipo graffiti/spray (ej. "Permanent Marker" o "Rock Salt") para etiquetas y firmas.
- Efecto glow en neón mediante text-shadow y box-shadow en varias capas.

## EFECTOS Y ANIMACIÓN (lo que lo hace único)
- Hero a pantalla completa con fondo de ciudad cyberpunk (CSS/SVG, sin imágenes pesadas), lluvia animada, scanlines y flicker de neón.
- Título principal con efecto glitch (RGB split) y letrero de neón que "parpadea" como tubo defectuoso.
- Muros de ladrillo/concreto con grafitis en SVG, tags y stickers superpuestos y ligeramente rotados.
- Cursor personalizado: mira neón o gota de spray que deja un rastro breve.
- Las secciones aparecen con animaciones tipo "encendido de neón" o "pintura de spray" al hacer scroll.
- Tarjetas de servicio con hover 3D (tilt), borde neón animado y glitch.
- Parallax suave entre capas (edificios, letreros, humo).
- Marquesina infinita con texto en neón: "POLARIZADO // WRAP // LUCES // SONIDO // ESTÉTICA".
- Respeta prefers-reduced-motion.

## SECCIONES
1. **Header fijo** translúcido con logo en neón y menú. Botón "COTIZA YA" con pulso de neón.
2. **Hero**: frase potente (ej. "TU AUTO. TU MOTO. TU IDENTIDAD."), subtítulo, dos botones (WhatsApp y "Ver servicios") y un auto/moto en silueta con luces neón.
3. **Servicios** (grid asimétrico, cada servicio con su propio color neón, icono SVG propio y descripción corta):
   - Polarizado
   - Película de seguridad
   - Full Wrap
   - Calcomanías personalizadas
   - Accesorios para moto y carro
   - Pulido de faros
   - Estética general
   - Iluminación y sonido
4. **Antes / Después**: slider interactivo para comparar (ej. faros opacos vs. pulidos, vidrio sin polarizar vs. polarizado).
5. **Configurador de Wrap**: un auto en SVG donde el usuario elige un color/acabado (neón, mate, cromo, holográfico) y la carrocería cambia en vivo. Botón "Quiero este look" que abre WhatsApp con mensaje prellenado.
6. **Proceso**: línea de tiempo estilo circuito/HUD (Cotiza → Diseño → Instalación → Entrega).
7. **Galería**: mosaico tipo muro de grafitis con lightbox (usa placeholders).
8. **Testimonios**: tarjetas como stickers pegados en un muro.
9. **Contacto**: formulario (nombre, vehículo, servicio de interés, mensaje), mapa/ubicación, horarios, redes sociales y botón flotante de WhatsApp con neón.
10. **Footer** con firma de grafiti y créditos.

## EXTRAS
- Easter egg: al presionar el código Konami o hacer clic en el logo 5 veces, se activa "modo apagón" y todo se ilumina solo con neones.
- Loader inicial tipo terminal hacker ("INICIALIZANDO SISTEMA...") de máximo 2 segundos.
- Sonido opcional (desactivado por defecto) con un botón para activar zumbido de neón.

## TÉCNICO
- Arquitectura inspirada en Astro: componentes pequeños y reutilizables, HTML semántico, JS mínimo, animaciones con CSS siempre que sea posible, sin librerías pesadas.
- 100% responsive, mobile-first (la mayoría del tráfico será móvil).
- Rendimiento alto: lazy loading, SVG en lugar de imágenes, fuentes optimizadas.
- SEO básico: títulos, meta description, Open Graph y datos estructurados de LocalBusiness.
- Accesibilidad: contraste suficiente en textos, foco visible y alt en imágenes.
- Textos en español, con tono callejero, directo y con actitud.
