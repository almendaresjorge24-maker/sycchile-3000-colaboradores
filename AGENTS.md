# SYCCHILE 3.000 — Modo colaborador: instrucciones para el agente

## Qué es
Página simple de entrega de alimentos para colaboradoras y colaboradores mayores de 60 años, sin formación técnica ni superior y sin conocimientos de logística (ver `ICP.md`).
SYCCHILE 3.000 es una marca corporativa con varias iniciativas independientes; esta pertenece a Banco Solidario de Alimentos.
Es una característica nueva sobre el proyecto de la clase 2, que no se modifica.

## Reglas
- Un solo archivo: `public/index.html`. Sin librerías externas. Textos en español de Chile, frases cortas.
- Nunca usar `alert`, `confirm` ni `prompt` en el flujo de la colaboradora.
- Nunca insertar texto escrito por personas con `innerHTML`. Usar `textContent`.
- Lenguaje amigable y de aliento: la tecnología debe dar confianza y no miedo (principio «aprender usando»).
- Texto base de 20 px o más y controles de 56 px o más (variables `--fs-base` y `--btn-h`).
- Datos solo en el navegador. Los contadores del piloto no guardan nombres ni RUT.
- La spec manda: si un criterio falla, se corrige la spec antes que el prompt. `npm test` debe pasar.
- Mantener el aviso de prototipo de demostración y `© 2026 Jorge Almendares Aros`.
