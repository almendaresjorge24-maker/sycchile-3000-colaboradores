# SYCCHILE 3.000 · Banco Solidario de Alimentos — Modo colaborador
SYCCHILE 3.000 es una marca corporativa con varias iniciativas independientes. Este repositorio pertenece a una sola: Banco Solidario de Alimentos.

Registro de entregas de alimentos pensado para equipos de más de 60 años, sin formación técnica ni superior y sin conocimientos de logística.
Parte de una convicción: la tecnología debe adaptarse a las personas, y no al revés.
Es una característica nueva de esta iniciativa, construida sobre el proyecto de la clase 2 (repositorio `sycchile-3000`), que permanece intacto.

## Entrega de la clase 3: lanzamiento a producción
| Paso | Dónde está |
|---|---|
| 1. ICP y user persona | `ICP.md` |
| 2. Nueva spec, con criterios de aceptación y métricas de éxito | `specs/001-modo-colaborador.md` |
| 3. Lanzamiento a producción | `public/index.html` y `netlify.toml` |
| Verificación automática | `tests/modo-colaborador.test.js` (`npm install` y `npm test`; también en la pestaña Actions de GitHub) |

## Prueba de 1 minuto
1. Escribe `María González`, presiona **Continuar** y luego **Sí, registrar**. Queda en la lista.
2. Presiona **Registrar otra entrega** y escribe `maria gonzalez`. El sistema la bloquea como duplicada.
3. Prueba con el RUT `12.345.678-9`. Se rechaza por dígito verificador incorrecto.
4. Abre **Métricas del piloto** para ver los contadores.

Usa solo datos ficticios.

## Pendientes antes de un uso real
- Inicio de sesión para quien aprueba y cierra ciclos.
- Medición con usuarios reales: hoy las métricas son metas de diseño y provienen de un solo navegador.
- Revisión del tratamiento de datos personales con un abogado (Ley 21.719).

© 2026 Jorge Almendares Aros. Todos los derechos reservados (ver `LICENSE.txt`).
