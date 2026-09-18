# Design checkup — Villa Tortuga

**Fecha:** 17 de septiembre de 2026  
**Modo:** `checkup` (auditoría, sin cambios a la interfaz)  
**Superficie revisada:** páginas `/` y `/es`, navegación, hero, contenido editorial, galería y lightbox, comodidades, ubicación, reseñas, FAQ, CTA final y footer.

## Veredicto

**Needs changes.** La dirección visual es sólida y creíble, y no encontré barreras de severidad alta. Queda un defecto responsive claro en la galería móvil y tres ajustes de consistencia/legibilidad antes de considerar la interfaz cerrada.

## Puntuación

| Dimensión | Nota | Lectura |
|---|---:|---|
| Intencionalidad | 8.7/10 | La fotografía, la paleta y la tipografía construyen una identidad de alojamiento concreta, no una plantilla genérica. |
| Legibilidad | 8.0/10 | La jerarquía principal funciona; varios textos auxiliares móviles bajan a 8–11 px. |
| Usabilidad | 8.5/10 | La reserva, navegación, FAQ y lightbox son claros y operables con teclado. |
| Responsive | 7.4/10 | No hay desbordamiento horizontal a 320 px, pero los iconos de la galería se rompen por debajo de 600 px. |
| Accesibilidad | 8.8/10 | Semántica, foco, teclado, nombres accesibles y movimiento reducido están bien resueltos; falta validación con lector de pantalla y zoom real al 200 %. |
| Sensación de rendimiento | 8.8/10 | Las imágenes reservan espacio, la carga local es estable y no aparecieron errores; la medición local no sustituye datos reales de producción. |
| Credibilidad del producto | 9.1/10 | Capacidad, limitaciones, anfitriones, reseñas sintetizadas y CTA de Airbnb están presentados con claridad y sin promesas inventadas. |

## Hallazgos

| ID | Severidad | Área | Ubicación / evidencia | Comportamiento actual | Corrección propuesta | Impacto para la persona usuaria |
|---|---|---|---|---|---|---|
| VT-DES-001 | **MEDIUM** | Galería responsive | `/es`, 390 px, primeras seis fotografías. En `src/app/globals.css:1593-1597`, `.tile-caption > .icon` cambia a `width: auto; height: auto`. | El SVG de expansión ocupa gran parte de cada mosaico; en la primera foto llega a cubrir el centro de la imagen y eleva el caption a la altura completa del mosaico. | Mantener dimensiones explícitas de 28–32 px en móvil y retirar solo el borde si se desea simplificarlo. Verificar 320, 390 y 600 px después del cambio. | Oculta la fotografía, distrae del contenido principal y hace que la galería parezca rota. |
| VT-DES-002 | **LOW** | Barra de galería | `/es`, 1440 px. `src/components/gallery.tsx:47-54`. | “Todos los espacios” aparece como etiqueta, vuelve a aparecer dentro del selector con “· 92” y el total “92 fotografías” se repite a la derecha. | Cambiar la etiqueta visible a “Filtrar por” o hacerla solo accesible; conservar el total en un único lugar. | Añade ruido y debilita la jerarquía de una sección que debería sentirse fotográfica y ligera. |
| VT-DES-003 | **LOW** | Lenguaje de iconos del lightbox | `/es`, 390 px, lightbox abierto. `src/components/gallery.tsx:67` y `src/components/gallery.tsx:71`. | Los controles usan los glifos tipográficos `×`, `←` y `→`, mientras el resto del sitio usa SVG propios. Su peso y alineación dependen de la fuente. | Añadir variantes `close`, `previous` y `next` al componente `Icon`; mantener los `aria-label` actuales y un área táctil mínima de 44 px. | La galería se siente menos terminada que el resto de la interfaz y puede volver a producir iconos visualmente desalineados. |
| VT-DES-004 | **LOW** | Tipografía auxiliar móvil | `/es`, 320 y 390 px. `src/app/globals.css:1371-1384`, `1405-1409`, `1459-1463`, `1570-1591`. | Marca de ubicación a 8 px, eyebrow del hero a 9 px, eyebrows generales a 10 px, contador y captions de galería a 11 px. Los controles conservan áreas táctiles adecuadas, pero la lectura visual es frágil. | Subir captions, contadores y labels funcionales a 12 px como mínimo; llevar la marca secundaria a 9–10 px. Recuperar espacio reduciendo tracking o longitud, no el tamaño. | Penaliza a personas con visión baja y hace que información útil se perciba como decoración. Axe no detecta tamaños tipográficos pequeños, por lo que el pase automático no invalida este hallazgo. |

## Lo que ya funciona

- El hero explica propiedad, ubicación y acción principal en el primer viewport. El título queda en dos líneas a 1100/1440 px y en tres líneas deliberadas a 320/390 px, sin interlineado excesivo.
- La composición alterna fotografía, texto y densidad sin caer en una cuadrícula de tarjetas repetidas. Cocina, ubicación y reseñas tienen ritmos distintos y reconocibles.
- El menú móvil transforma el signo de apertura en cierre, muestra etiquetas claras y devuelve el foco al botón con `Escape`.
- La CTA de Airbnb usa un icono de calendario consistente en header, hero, barra fija y cierre. Los enlaces editoriales externos ya no dependen de una flecha decorativa.
- El lightbox tiene diálogo modal, nombres accesibles, navegación por teclado y gesto táctil, contador, cierre con `Escape` y restauración del foco.
- El movimiento de entrada usa transformaciones sin ocultar imágenes con opacidad; `prefers-reduced-motion` cancela las animaciones. Durante esta revisión no observé destellos ni imágenes ausentes.
- Las limitaciones importantes de la villa permanecen visibles y el contenido bilingüe conserva la misma jerarquía.

## Candidatos descartados

- **CTA fija móvil:** repite la acción del hero, pero la repetición es útil para una reserva de alta intención; el footer reserva espacio y el control no impide completar tareas.
- **Título del hero en tres líneas en móvil:** el quiebre responde al ancho disponible, mantiene el énfasis editorial y no causa recorte ni desbordamiento.
- **Animaciones entre secciones:** la coreografía es extensa, pero ahora es discreta, interrumpible por scroll y tiene una ruta sin movimiento. Uniformarla más sería una preferencia de marca, no un defecto demostrado.
- **Contraste automatizado:** no aparecieron violaciones WCAG A/AA en Axe. No lo elevo a certificación ni a prueba de lector de pantalla.

## Verificación ejecutada

- Inspección visual local de `/` y `/es` a 320, 390, 1100 y 1440 px; recorridos completos y capturas de hero, galería, ubicación, reseñas, anfitriones/FAQ, CTA y footer.
- Revisión interactiva del menú móvil, selector de galería, lightbox, cierre con `Escape`, controles anterior/siguiente, CTA fija y cambio de idioma.
- Inspección de estilos computados a 320/390 px: sin desbordamiento horizontal; CTA principal a 14 px; tamaños auxiliares indicados en VT-DES-004 confirmados.
- `npm run typecheck`: aprobado.
- `npm test`: 17/17 pruebas aprobadas en ambos idiomas a 360, 390, 768, 1024 y 1440 px, incluido Axe WCAG 2.2 AA, teclado, foco, swipe, enlaces, 404, fuentes locales, movimiento reducido e imágenes sin JavaScript.
- Consola y errores de página del navegador automatizado: sin errores registrados durante la revisión.
- Perfil local de carga: TTFB 1.7 ms, FCP/LCP 40 ms y CLS 0. Son datos de localhost y solo respaldan estabilidad visual local.

## Límites de la auditoría

- No se probó con lector de pantalla real.
- No se ejecutó zoom nativo del navegador al 200 %; sí se verificó reflujo a 320 px y ausencia de scroll horizontal.
- No se verificaron Safari/iOS físico ni Firefox.
- No hay datos de Core Web Vitals reales hasta publicar y recibir tráfico.

## Orden recomendado

1. Resolver **VT-DES-001** antes de cualquier otro pulido.
2. Limpiar la barra de galería con **VT-DES-002**.
3. Unificar controles del lightbox con **VT-DES-003**.
4. Cerrar la escala tipográfica móvil con **VT-DES-004**.

El siguiente modo recomendado es `finish`, consumiendo estos cuatro IDs y repitiendo la comprobación visual móvil de la galería.
