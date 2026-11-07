# Spec 001 — Modo colaborador: registrar una entrega en 3 pasos

Estado: borrador a la espera de mi validación (sección 7).
Origen: elaborada con asistencia de inteligencia artificial generativa, a partir de un prompt de mi autoría. Su mejora y validación quedan bajo mi responsabilidad.
Relación: característica nueva de la iniciativa Banco Solidario de Alimentos, dentro de la marca SYCCHILE 3.000. Se construye sobre el proyecto de la clase 2 (repositorio `sycchile-3000`), que permanece intacto.

## 1. Problema
Hoy, quien atiende la entrega final debe ubicar el botón correcto entre numerosas secciones y responder ventanas emergentes del navegador.
Para un equipo de más de 60 años, sin formación técnica ni superior y sin conocimientos de logística ni de tecnología, esa fricción se traduce en demoras, errores y temor a "romper algo".
La equidad del sistema se juega en un solo gesto: registrar una entrega sin duplicar a una familia.
Ese gesto es el 20% de funciones que concentra el 80% del valor, y es el que esta característica simplifica.

## 2. Usuario
Rosa Muñoz, colaboradora de recepción y entrega, de más de 60 años, sin formación técnica ni superior y sin conocimientos de logística ni de tecnología (ver `ICP.md`).

## 3. Solución
- Una página independiente, con una acción por pantalla: identificar, confirmar y leer el resultado.
- Cero ventanas emergentes y mensajes breves, en español cotidiano.
- Reglas de equidad más estrictas que las del panel completo: RUT validado con módulo 11 y bloqueo de duplicados dentro del ciclo, sin que importen tildes, mayúsculas, espacios, puntos, comas ni guiones.
- Texto base de 20 px, controles de 56 px de alto y colores de alto contraste.
- Ayuda permanente, mensaje de calma y refuerzo positivo en cada entrega.
- Contadores anónimos en el navegador, sin nombres ni RUT, para medir el piloto.

Fuera de alcance: cerrar ciclos (lo hace la coordinación en el panel completo), cuentas de usuario, servidor y varios idiomas.
Los demás momentos de la cadena (recepción de donaciones, almacenamiento y despacho) serán las siguientes características del modo colaborador.

## Principio de diseño: aprender usando
La tecnología debe ser accesible, amigable y libre de complicaciones. Su uso cotidiano tiene que entregar confianza y conocimiento a las personas mayores
y ayudarlas a superar el temor a la tecnología, también en sus gestiones personales, laborales y administrativas.
Como el equipo tampoco domina la logística, el sistema asume el criterio técnico y lo traduce en pasos simples: la regla de equidad la aplica la herramienta, no la persona.
Por eso la página usa palabras simples, aclara que equivocarse no tiene consecuencias, celebra cada entrega y mide si la autonomía crece con la práctica.

## 4. Criterios de aceptación (cada uno tiene prueba en `tests/modo-colaborador.test.js`)
- CA1. La pantalla inicial muestra una sola acción principal ("Continuar"), un mensaje de calma ("si te equivocas, no pasa nada") y las entregas del ciclo, sin paneles técnicos.
- CA2. Registrar una entrega toma 3 pasos (escribir, confirmar, ver resultado) y no usa ventanas emergentes del navegador.
- CA3. Un duplicado (aunque cambien tildes, mayúsculas, espacios, puntos, comas o guion) se bloquea con un mensaje claro y no suma; un RUT con dígito verificador incorrecto se rechaza.
- CA4. El texto base mide 20 px o más y los botones y campos, 56 px o más de alto.
- CA5. Los contadores del piloto se guardan solo en el navegador, sin nombres ni RUT, y se ven en "Métricas del piloto".

## 5. Métricas de éxito
Las metas son de diseño y las fijé yo para este ejercicio. La página mide su propio uso en el navegador; las cifras que muestra no representan a todos los usuarios.
| Métrica | Meta | Cómo se mide |
|---|---|---|
| Tiempo hasta la primera entrega registrada | 60 segundos o menos (mediana) | Segundos desde que se abre la página hasta el primer registro exitoso |
| Registros al primer intento | 90% o más | Registros sin error previo, sobre el total de registros |
| Dobles entregas en un ciclo | 0 | Duplicados registrados (los bloqueados se cuentan aparte) |
| Autonomía creciente | De los últimos 5 registros, 4 o más sin abrir "Ayuda" | Se anota si se abrió "Ayuda" antes de cada registro y se cuentan los últimos 5 |

## 6. Historial de cambios
- En una prueba manual, "maria gonzalez." (con punto final) se registró como otra familia, mientras que sin el punto se bloqueaba.
  La regla comparaba solo tildes, mayúsculas y espacios. Se amplió el CA3 a la puntuación y se agregó su prueba antes de corregir el código.

## 7. Validación (la completo yo)
- [ ] Revisé el problema, los criterios y las métricas, y reflejan el trabajo en terreno.
- Ajustes que hice a esta spec: _______________________________________________
- Validada por: Jorge Almendares Aros — Fecha: ____ / ____ / ________
