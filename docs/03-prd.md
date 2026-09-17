# PRD — Sitio web bilingüe de Villa Tortuga

## 1. Resumen

Crear un sitio web bilingüe, rápido y visual para presentar Villa Tortuga como una villa privada de alquiler vacacional en Culebra, generar confianza y dirigir a visitantes calificados hacia la reserva o consulta.

El MVP será una experiencia editorial independiente con inglés y español, galería optimizada, información completa de la propiedad, reseñas sintetizadas, preguntas frecuentes y CTA de disponibilidad en Airbnb. La reserva directa queda fuera del MVP hasta definir pagos, calendario, impuestos, términos y operación.

## 2. Problema

El anuncio de Airbnb contiene mucha información, pero está dispersa entre descripción, comodidades, reglas, seguridad, reseñas y modales. No existe una experiencia de marca propia ni una narrativa bilingüe controlada. Además, algunos datos públicos son contradictorios o dinámicos.

La web debe:

- Convertir el inventario disperso en una historia clara y visual.
- Presentar el mismo nivel de calidad en inglés y español.
- Aumentar confianza sin copiar el diseño ni la marca de Airbnb.
- Mantener seguridad, reglas y limitaciones importantes visibles.
- Llevar al visitante a una acción medible.

## 3. Objetivos

### Objetivos de negocio

- Aumentar visitas calificadas al flujo de disponibilidad/reserva.
- Construir una presencia de marca propia para Villa Tortuga.
- Facilitar promoción por redes sociales, búsqueda orgánica y referidos.
- Reducir preguntas repetitivas antes de reservar.
- Crear una base que posteriormente pueda soportar reserva directa.

### Objetivos del usuario

- Entender rápidamente capacidad, distribución, ubicación y experiencia.
- Ver fotos relevantes sin fricción.
- Confirmar si la villa se adapta a su grupo.
- Comprender reglas y condiciones antes de reservar.
- Consultar disponibilidad o contactar al anfitrión con confianza.

### No objetivos del MVP

- Procesar pagos o depósitos.
- Administrar inventario de noches.
- Sustituir el contrato, la política de cancelación o el flujo de Airbnb.
- Crear cuentas de huéspedes.
- Operar un CMS complejo.
- Sincronizar automáticamente reseñas o precios si no existe una fuente autorizada.

## 4. Audiencias principales

1. Familias con niños que cumplan la política definitiva de edad y seguridad.
2. Grupos de amistades de hasta 10 personas.
3. Parejas o grupos que celebran una escapada especial sin organizar eventos.
4. Viajeros interesados en Playa Zoni, actividades acuáticas y naturaleza.
5. Huéspedes bilingües de Puerto Rico, Estados Unidos y mercados internacionales.
6. Personas que viajan con embarcación y desean consultar el muelle opcional.

## 5. Principios de producto y contenido

- Primero la experiencia visual, luego los detalles operativos.
- Equivalencia entre idiomas, no traducción literal.
- Hechos verificables; no inventar tiempos, servicios, precios ni garantías.
- Seguridad visible, sin esconder limitaciones importantes.
- Un CTA principal consistente por página.
- Datos dinámicos identificados por fecha o alimentados por una integración.
- Dirección exacta y datos privados solo para huéspedes confirmados.
- La web debe tener identidad propia y no imitar la interfaz de Airbnb.

## 6. Arquitectura de información del MVP

### Opción recomendada: página principal larga con rutas legales separadas

1. Header fijo: marca, navegación, idioma y CTA.
2. Hero con foto principal, propuesta de valor y datos rápidos.
3. Introducción a la experiencia.
4. Distribución y dormitorios.
5. Piscina y exteriores.
6. Cocina y espacios para compartir.
7. Galería por categorías.
8. Comodidades.
9. Ubicación y guía breve de Culebra.
10. Servicios de concierge y muelle opcional.
11. Reseñas y señales de confianza.
12. Información importante y seguridad.
13. Preguntas frecuentes.
14. CTA final de disponibilidad.
15. Footer con contacto, idioma, privacidad y términos.
16. Páginas separadas: `/privacy`, `/terms` y página 404.

Rutas localizadas sugeridas:

- Inglés por defecto: `/`
- Español: `/es`
- Páginas legales: `/privacy`, `/terms`, `/es/privacidad`, `/es/terminos`

## 7. Requisitos funcionales

### RF-01 — Idiomas

- El usuario puede cambiar entre inglés y español desde cualquier sección.
- El cambio conserva la sección equivalente cuando sea posible.
- Cada ruta define `lang`, `hreflang`, canonical y metadatos propios.
- No deben quedar cadenas visibles en el idioma incorrecto.

### RF-02 — Hero y CTA

- Mostrar nombre, propuesta de valor, ubicación pública y datos rápidos.
- CTA principal abre el anuncio oficial de Airbnb en una nueva pestaña.
- El enlace externo debe identificarse de forma accesible.
- El evento debe registrarse en analítica sin incluir datos personales.

### RF-03 — Galería

- Organizar fotos por categoría, no como una lista de 92 elementos sin estructura.
- Usar 15 categorías derivadas de la fuente: sala, cocina, cuatro dormitorios, cuatro baños, balcón, lavandería, exterior, piscina y muelle/adicionales.
- Permitir abrir lightbox, avanzar, retroceder y cerrar con teclado.
- Mostrar contador y categoría.
- Cargar imágenes de forma progresiva y responsive.
- Cada imagen informativa requiere texto alternativo localizado; las decorativas usan `alt=""`.

### RF-04 — Habitaciones y capacidad

- Mostrar distribución por nivel y tipo de cama.
- Comunicar claramente qué baños son privados y cuál se comparte.
- No presentar capacidad mayor a 10 huéspedes.

### RF-05 — Comodidades

- Mostrar primero las comodidades de mayor valor.
- Permitir expandir el inventario completo.
- Separar servicios incluidos, servicios con costo y elementos no disponibles.

### RF-06 — Ubicación

- Mostrar Culebra/Fraile de manera general y distancias declaradas por la fuente.
- No exponer dirección exacta.
- Si se usa mapa, presentar una zona aproximada con consentimiento de cookies cuando corresponda.
- Recomendar vehículo de alquiler.

### RF-07 — Reseñas

- Mostrar un resumen de confianza propio, inspirado en los datos pero sin copiar la interfaz visual de Airbnb.
- El resumen debe incluir calificación general, cantidad de reseñas, fecha de actualización y enlace a Airbnb.
- Mostrar las seis subcalificaciones observadas: limpieza, exactitud, check-in, comunicación, ubicación y relación calidad-precio.
- Mostrar de cuatro a seis tarjetas destacadas, equilibrando familias, grupos y estadías de distintas fechas.
- Las tarjetas pueden usar una síntesis editorial con nombre, contexto del viaje y fecha. Las citas textuales requieren aprobación.
- No reutilizar fotografías de perfil de huéspedes sin autorización; usar iniciales o avatares neutrales.
- Si se muestran rating y cantidad, incluir “datos observados el {fecha}” o sincronizar mediante una fuente autorizada.
- El CTA debe abrir la sección de reseñas del anuncio de Airbnb: “Read all 28 reviews on Airbnb” / “Leer las 28 reseñas en Airbnb”.
- No publicar textos de huéspedes fuera de Airbnb sin revisar derechos y autorización.
- No reutilizar laureles, insignias, iconos ni composición visual propia de Airbnb. “Guest favorite” y “top 10%” deben presentarse como datos atribuidos a Airbnb, no como una certificación propia.
- Si los datos quedan desactualizados o no pueden verificarse, ocultar el conteo y mostrar solo reseñas aprobadas con el enlace externo.

### RF-08 — Información importante

- Incluir agua de lluvia, ausencia de generador, piscina sin verja, escaleras, fauna local, cámaras exteriores y reglas principales.
- La política de edad debe ser única y aprobada antes de activar producción.
- La ubicación exacta de cámaras debe describirse de manera precisa.

### RF-09 — Contacto opcional

Si se habilita un formulario:

- Campos mínimos: nombre, correo, fechas tentativas, cantidad de huéspedes y mensaje.
- Consentimiento de privacidad obligatorio.
- Validación bilingüe y protección contra spam.
- Confirmación visible y por correo solo si la operación la soporta.
- No almacenar información innecesaria.
- El destinatario, SLA y herramienta de envío deben definirse antes de implementar.

Si esos datos no se definen, el MVP debe usar únicamente el CTA hacia Airbnb.

### RF-10 — Estados y errores

- Carga, error, imagen faltante, sin conexión, formulario en progreso, éxito y fallo deben tener copy bilingüe.
- La página 404 debe ofrecer regreso a la home correcta por idioma.
- Ningún error debe bloquear la navegación principal.

## 8. Requisitos no funcionales

### Rendimiento

- Objetivo móvil en producción: LCP ≤ 2.5 s, CLS ≤ 0.1 e INP ≤ 200 ms en el percentil 75 cuando exista volumen suficiente.
- Imagen hero con prioridad y tamaño correcto; resto con lazy loading.
- Usar formatos AVIF/WebP con fallback cuando corresponda.
- Evitar cargar las 92 imágenes en la vista inicial.
- JavaScript de terceros limitado y justificado.

### Accesibilidad

- Objetivo WCAG 2.2 AA.
- Navegación completa por teclado.
- Enlace “Saltar al contenido”.
- Foco visible y orden lógico.
- Contraste AA y controles de al menos 44 × 44 CSS px cuando aplique.
- Respeto a `prefers-reduced-motion`.
- Lightbox con foco contenido, nombre accesible y restauración de foco al cerrar.
- No depender solo de color o posición.

### Responsive

- Diseñar y validar como mínimo en 360, 390, 768, 1024 y 1440 px.
- Cuidar expansión del español en navegación, botones y tarjetas.
- Galería usable con gestos y controles visibles en móvil.

### Privacidad y seguridad

- No exponer dirección, códigos de acceso, teléfonos privados ni instrucciones de llegada.
- Política de privacidad antes de recopilar consultas o activar analítica no esencial.
- Consentimiento para cookies/embeds según jurisdicción y herramientas seleccionadas.
- Formularios con validación de servidor, rate limiting y sanitización.

## 9. SEO y descubrimiento

- Metadatos únicos por idioma.
- `hreflang` para `en` y `es`, más `x-default`.
- Sitemap XML y robots.txt.
- Datos estructurados compatibles con el contenido real; no marcar rating agregado sin base y actualización confiables.
- Open Graph y Twitter cards con fotografía autorizada.
- URLs limpias y canonical consistente.
- Contenido local útil: Playa Zoni, recomendaciones de transporte y guía breve de llegada a Culebra, sin inventar detalles.
- Mantener NAP solo si existe una dirección/contacto público aprobado.

## 10. Analítica y eventos

Métricas principales:

- Sesiones por idioma y fuente.
- Porcentaje de visitantes que abren Airbnb.
- Interacción con galería.
- Profundidad de lectura hasta FAQ/CTA final.
- Cambio de idioma.
- Consultas enviadas, si se habilita formulario.

Eventos sugeridos:

| Evento | Propiedades no sensibles |
| --- | --- |
| `airbnb_cta_clicked` | locale, placement |
| `language_changed` | from_locale, to_locale |
| `gallery_opened` | locale, category |
| `gallery_photo_viewed` | locale, category, index |
| `amenities_expanded` | locale |
| `faq_opened` | locale, faq_id |
| `inquiry_started` | locale |
| `inquiry_submitted` | locale, status |

No enviar nombres, correos, mensajes ni fechas de viaje a analítica.

## 11. Modelo de contenido recomendado

La implementación debe mantener una sola estructura y mensajes por locale, no dos páginas duplicadas manualmente.

Entidades mínimas:

- `site`: navegación, footer, CTA, metadatos.
- `property`: capacidad, camas, baños, niveles y ubicación pública.
- `sections`: hero, intro, rooms, pool, kitchen, location, concierge, dock, reviews, safety.
- `amenities`: categoría, inclusión, costo adicional y estado.
- `gallery`: categoría, imagen, tamaños, alt por idioma y orden.
- `faq`: pregunta y respuesta por idioma.
- `reviewsSummary`: fecha de corte, rating, cantidad y temas.
- `featuredReviews`: nombre público, mes/año, tipo de viaje, texto aprobado, idioma original y URL de origen.
- `legal`: privacidad, términos y consentimiento.

Los datos invariantes, como capacidad y cantidad de camas, deben existir una sola vez y formatearse por locale.

## 12. Diseño visual recomendado

- Dirección: lujo caribeño sereno, contemporáneo y cálido.
- Priorizar blancos suaves, arena, azul profundo y verde de manglar tomados de las fotografías.
- Tipografía editorial para títulos y sans serif altamente legible para interfaz.
- Espacios amplios, imágenes grandes y movimiento discreto.
- Evitar rosa Airbnb, iconografía o patrones que hagan parecer la web una copia del marketplace.
- CTA visible pero no invasivo.
- La fotografía de piscina con vista al mar es la candidata natural para el hero, sujeta a archivo original y derechos.

## 13. Dependencias

- Confirmaciones del propietario incluidas en la sección 15.
- Fotografías originales en alta resolución y derechos de uso.
- Logo o aprobación de un wordmark sencillo.
- Dominio y correo oficial.
- Definición del destino del CTA y parámetros UTM.
- Políticas legales revisadas.
- Herramientas aprobadas para hosting, analítica, formularios y protección contra spam.
- Si se desea disponibilidad propia: fuente autorizada, iCal/API y reglas de actualización.

## 14. Fases

### Fase 0 — Cierre de contenido

- Resolver contradicciones de edad, cámaras y grill.
- Confirmar servicios, muelle, anfitrión visible y contacto.
- Recibir fotografías originales.
- Aprobar contenido bilingüe y textos legales.

### Fase 1 — MVP editorial

- Home bilingüe.
- Galería categorizada.
- Habitaciones, comodidades, ubicación, reseñas, FAQ y seguridad.
- CTA hacia Airbnb.
- SEO técnico, accesibilidad y analítica básica.

### Fase 2 — Captación directa

- Formulario de consulta o integración de mensajería aprobada.
- Automatizaciones de respuesta.
- Guía ampliada de Culebra y contenido SEO.

### Fase 3 — Reserva directa, solo si se aprueba

- Motor de disponibilidad.
- Precios, impuestos, pagos, depósitos y cancelaciones.
- Contrato, identidad del huésped y operación de soporte.
- Sincronización de calendarios para evitar doble reserva.

## 15. Decisiones pendientes del propietario

### Bloqueantes antes de publicar

1. ¿Cuál es la edad mínima real: 2, 3 o 7 años? ¿Qué waiver se exige y quién lo gestiona?
2. ¿Cuántas cámaras exteriores existen y dónde apunta cada una?
3. ¿Hay detectores de humo y monóxido de carbono instalados actualmente?
4. ¿El grill usa exclusivamente propano?
5. ¿Cuál es la relación exacta con el muelle: distancia, acceso, tarifa, embarcación máxima y responsable?
6. ¿“Movie room” es una amenidad real o una descripción informal de la sala?
7. ¿La web debe presentar a Roxana, a Jorge o a ambos? ¿Qué biografía y fotografía están autorizadas?
8. ¿Qué fotografías pueden usarse y dónde están los originales?

### Necesarias para el CTA y la operación

9. ¿La acción principal debe ir a Airbnb, WhatsApp, correo o formulario?
10. Si hay formulario, ¿quién responde y en cuánto tiempo?
11. ¿Se desean mostrar precios o solo disponibilidad?
12. ¿Qué servicios de concierge siguen activos y cuáles son sus precios?
13. ¿Se permite fotografía comercial sin aprobación adicional?
14. ¿Qué licencia/registro debe aparecer en la web?
15. ¿Cuál será el dominio y el correo público?

## 16. Criterios de aceptación del MVP

- La home funciona en inglés y español con paridad de contenido y acciones.
- Todos los datos publicados coinciden con las decisiones aprobadas del propietario.
- No quedan contradicciones sobre menores, cámaras, grill o muelle.
- El CTA abre el destino correcto y registra el evento sin datos personales.
- La sección de reseñas identifica a Airbnb como fuente, muestra la fecha de actualización y enlaza al anuncio original.
- Ninguna foto de perfil, insignia o elemento gráfico de Airbnb se reutiliza sin autorización.
- La galería usa archivos autorizados, no hotlinks de Airbnb.
- La página inicial no descarga las 92 imágenes de inmediato.
- Navegación, acordeones y lightbox funcionan con teclado y lector de pantalla.
- No hay overflow ni texto cortado en los breakpoints definidos.
- Se cumplen los presupuestos de Core Web Vitals o se documentan las desviaciones.
- Metadatos, canonical, `hreflang`, sitemap y Open Graph son correctos en ambos idiomas.
- La dirección exacta y datos privados no aparecen en HTML, analítica ni repositorio público.
- Información crítica de seguridad es visible antes del CTA final.
- Privacidad y términos están disponibles si se recopilan datos o usan herramientas que lo requieran.
- Pruebas de enlaces, formularios, 404 y fallbacks pasan en producción.

## 17. Definición de terminado

El MVP está terminado cuando el contenido está aprobado, los bloqueantes de seguridad están resueltos, ambos idiomas fueron revisados en contexto, la galería utiliza originales autorizados, la experiencia fue validada en móvil y escritorio, y el CTA final se comprobó de extremo a extremo en producción.
