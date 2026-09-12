# Puntos débiles — dónde estoy ahora

Esto no es un registro de incidentes con fecha — es un espejo: en qué áreas todavía no tengo soltura, para saber qué repasar antes de un CRUD nuevo o una entrevista. Se actualiza cambiando el nivel cuando de verdad mejora, no añadiendo líneas nuevas cada vez que pasa algo.

**Niveles**: 🔴 flojo, todavía me cuesta de verdad · 🟡 lo entiendo pero se me olvida bajo presión · 🟢 ya lo tengo interiorizado.

---

### 🟡 Estructura de un componente: qué va en la lógica y qué va en el JSX
Al principio metía `useState` u otras declaraciones dentro del `return`, como si formaran parte del marcado. Ya lo tengo bastante claro (todo lo que es JS normal va antes del `return`), pero conviene revisarlo si vuelve a pasar al empezar un componente nuevo desde cero.

### 🔴 Imaginar la estructura HTML/CSS antes de maquetar
Esta es la que más se repite: no me sale de forma natural pensar "esto va en un flex con gap-3" o visualizar cómo dividir algo en filas/columnas antes de escribirlo. Necesito seguir copiando y adaptando ejemplos reales (propios o de librerías como HyperUI/Preline) en vez de intentar generarlo de cero, y prestar atención a qué combinaciones de clases se repiten (flex/grid + gap + padding) para que con el tiempo salgan solas.

### 🟡 Evento (`e`) vs. dato real
Varias veces intenté leer datos directamente del evento (`e.nombreDelCampo`) cuando el dato de verdad estaba en el state. Ya lo reconozco cuando me lo señalan, pero todavía no lo detecto siempre por mi cuenta antes de escribirlo mal.

### 🟡 Pasar una función como referencia vs. llamarla ya
Se me olvida envolver en `() => ...` cuando un evento necesita pasar un argumento (`onClick={fn(x)}` en vez de `onClick={() => fn(x)}`) — sobre todo en componentes nuevos que no son una copia directa de uno que ya me había salido bien antes.

### 🔴 Decidir en qué componente vive un `state`
El bloqueo más grande hasta ahora: no tenía claro cuándo un `state` debe vivir en el componente padre (compartido) y cuándo debe vivir en el hijo (una copia por instancia). Es el área a la que más atención debo prestar en el próximo proyecto — antes de escribir un `useState`, pararme a pensar explícitamente "¿esto es de uno solo, o de todos a la vez?".

### 🟢 `useEffect` y su array de dependencias
Al principio confundía "sin array" (se ejecuta siempre) con "array vacío" (una sola vez). Con la práctica de la persistencia en `localStorage` ya lo aplico bien.

### 🟡 Confiar en mi propio criterio de diseño (Tailwind/CSS)
No es solo cuestión de sintaxis — me falta confianza para tomar decisiones de espaciado/tamaño sin que me las den ya resueltas. Está mejorando a base de ver ejemplos y tocar valores para ver el efecto en vivo, pero todavía no me sale como primera intuición.

---

## Categorías a vigilar de cara a entrevistas (independiente de mi nivel actual)

- Flujo de datos (props hacia abajo, eventos/callbacks hacia arriba)
- Cuándo y por qué se re-renderiza un componente
- Inmutabilidad del state (no mutar arrays/objetos directamente)
- Listas y `key`
- Formularios controlados vs no controlados
