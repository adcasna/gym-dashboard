# Guía de aprendizaje — Gym Dashboard (React)

Documento vivo. Se va rellenando a medida que avanzamos, tema a tema. Sirve como referencia rápida y como resumen para repasar antes de una entrevista.

## Objetivo del proyecto

App PWA de seguimiento de ejercicios de gimnasio: listado con CRUD, contadores de series/reps/kg, GIF de demostración por ejercicio. Stack: JavaScript + Vite.

## Hoja de ruta

1. ✅ Setup del proyecto (Vite, estructura, `npm run dev`)
2. ✅ JSX y componentes
3. ✅ Props
4. ✅ State (`useState`)
5. ✅ Eventos y formularios
6. ✅ Editar y borrar (CRUD completo, lifting state up)
7. ✅ Componente Counter reutilizable (series/reps/kg)
8. ✅ Persistencia (`localStorage`)
9. ✅ PWA (manifest, service worker, instalable/offline) + despliegue (Git/GitHub/Netlify)
10. ⬜ Estilos con Tailwind (toque profesional)
11. ✅ Catálogo de ejercicios con gif (selector + CRUD conectado)

---

## 1. Setup del proyecto

Creado con `npm create vite@latest . -- --template react` → framework **React**, variante **JavaScript + React Compiler**, linter **ESLint**.

- `npm run dev` levanta el servidor local (por defecto en `http://localhost:5173/`) con recarga en caliente (HMR: guardas el archivo y el navegador se actualiza solo, sin perder el estado de la página).
- **ESLint (linter)**: analiza el código sin ejecutarlo y avisa de errores probables o malas prácticas (variables sin usar, dependencias que faltan en un `useEffect`, etc.). No cambia el comportamiento de la app, solo avisa mientras programas.
- **React Compiler**: optimización automática de re-renders, de la que hablaremos más adelante cuando tengamos el problema real que resuelve delante (no tiene sentido explicarlo sin contexto).

Estructura relevante que genera:
- `index.html` — punto de entrada HTML, carga `src/main.jsx`
- `src/main.jsx` — monta el componente `App` en el DOM
- `src/App.jsx` — nuestro primer componente, punto de partida
- `src/App.css`, `src/index.css` — estilos
- `eslint.config.js`, `vite.config.js` — configuración de herramientas (no tocar aún)

---

## 2. JSX y componentes

Un componente es una función de JS normal (nombre en PascalCase) que devuelve JSX — la descripción de qué pintar. JSX solo puede devolver un elemento raíz (se usa `<>...</>`, un Fragment, cuando no quieres un `<div>` extra de verdad). `className` en vez de `class`, y `{}` para meter expresiones JS dentro del marcado.

Primer componente propio: `App` en `src/App.jsx`, reducido a un `<h1>` de título.

## 3. Props

Props son los "argumentos" de un componente — datos que el padre le pasa al hijo como si fueran atributos HTML (`<ExerciseCard name="..." series={3} />`). React los empaqueta en un objeto `props`, normalmente desestructurado directo en los parámetros: `function ExerciseCard({ name, series, reps, weight })`.

Flujo unidireccional: los props solo bajan de padre a hijo, nunca al revés, y el hijo no los puede modificar (son de solo lectura).

Hecho: `src/ExerciseCard.jsx`, componente reutilizable que recibe `name`, `series`, `reps`, `weight` y los pinta. Usado desde `App.jsx` con datos de prueba fijos (todavía sin `useState`).

## 2. JSX y componentes

Un componente es una función de JS normal (nombre en PascalCase) que devuelve JSX — la descripción de qué pintar. JSX solo puede devolver un elemento raíz (se usa `<>...</>`, un Fragment, cuando no quieres un `<div>` extra de verdad). `className` en vez de `class` (porque `class` es palabra reservada en JS), `id` se mantiene igual que en HTML, y `{}` para meter expresiones JS dentro del marcado.

Primer componente propio: `App` en `src/App.jsx`, reducido a un `<h1>` de título.

## 3. Props

Props son los "argumentos" de un componente — datos que el padre le pasa al hijo como si fueran atributos HTML (`<ExerciseCard name="..." series={3} />`). React los empaqueta en un objeto `props`, normalmente desestructurado directo en los parámetros: `function ExerciseCard({ name, series, reps, weight })`.

Flujo unidireccional: los props solo bajan de padre a hijo, nunca al revés, y el hijo no los puede modificar (son de solo lectura).

Hecho: `src/ExerciseCard.jsx`, componente reutilizable que recibe `name`, `series`, `reps`, `weight` y los pinta. Usado desde `App.jsx` con datos de prueba fijos (todavía sin `useState`).

## 4. State (`useState`) y listas

`useState` da a un componente memoria propia: `const [valor, setValor] = useState(inicial)` devuelve el valor actual y una función para cambiarlo. A diferencia de los props (vienen de fuera, de solo lectura), el state vive dentro del componente y él mismo lo modifica llamando al setter — eso dispara un re-render.

Regla estructural clave de un componente: todo lo que es JavaScript "normal" (declarar state, variables, funciones) va en el cuerpo de la función, **antes** del `return`. Dentro del `return` (JSX) solo caben expresiones envueltas en `{}`, nunca declaraciones (`const`, `if`, etc.) sueltas.

`.map()` para listas: a diferencia de `.forEach()` (que solo recorre, no devuelve nada útil), `.map()` **construye y devuelve un array nuevo** con lo que retornes en cada vuelta — por eso encaja dentro de `{}` en JSX: `{exercises.map((exercise) => (<li key={exercise.id}>...</li>))}`.

**`key`**: obligatorio en el elemento de primer nivel que devuelve cada vuelta del `.map()` (no vale ponerlo en un elemento anidado más adentro). Le da a React un identificador único y estable por elemento, para que al comparar la lista antes/después de un cambio sepa qué añadir, quitar o reordenar sin repintar todo. No tiene equivalente en HTML — no es lo mismo que `id`, que sigue existiendo tal cual. Se usa el `id` del dato, nunca el índice del array si la lista puede reordenarse/borrarse elementos.

Hecho: `exercises` como array de objetos (`id`, `name`, `series`, `reps`, `weight`) en `App.jsx`, renderizado con `.map()` sobre `ExerciseCard`, con `key={exercise.id}` en el `<li>` de cada fila.

## 5. Eventos y formularios (Create del CRUD)

**Input controlado**: el valor de un `<input>` vive en el state de React, no en el DOM. El input solo muestra el state (`value={miState}`) y avisa de cambios (`onChange={(e) => setMiState(e.target.value)}`). `e` aquí es el evento del cambio; `e.target.value` es el texto actual del input en ese instante.

**Envío de formulario**: `<form onSubmit={handleSubmit}>`. Dentro del handler, `e.preventDefault()` es casi obligatorio — evita que el navegador recargue la página como haría un `<form>` HTML normal (si se recarga, se pierde todo el state de React).

**Evento vs. dato**: el objeto evento (`e`) solo lleva información sobre *lo que ha pasado* (que se ha enviado el formulario, que ha cambiado un input) — no lleva los datos del formulario en sí. Los datos reales ya están guardados en el state (gracias a los `onChange`), así que se leen de ahí, nunca de `e.nombreDelCampo`.

**Anatomía de una etiqueta JSX**: los atributos/props van dentro de la etiqueta de apertura (`<tag attr={valor}>`), nunca sueltos como si fueran contenido entre `<tag>` y `</tag>`.

**Actualizar un array de state sin mutarlo**: nunca `array.push(...)` — React compara referencias, y mutar el array existente no crea una referencia nueva, así que no vuelve a pintar. Se crea un array nuevo con spread: `setExercises([...exercises, nuevo])`.

**Extraer handlers con nombre**: en vez de una función anónima larga metida dentro de `onSubmit={...}`, se declara aparte en el cuerpo del componente (`function handleAddExercise(e) {...}`) y se referencia por nombre (`onSubmit={handleAddExercise}`). Más legible, y evita problemas de indentación con JSX.

Hecho: formulario en `App.jsx` con 4 inputs controlados (`exerciseName`, `exerciseSeries`, `exerciseReps`, `exerciseWeight`) que añade un ejercicio nuevo a `exercises` con `Date.now()` como `id`, y resetea los campos tras guardar.

Pendiente anotado para más adelante: los campos numéricos (`series`, `reps`, `weight`) se guardan como texto (string), no como número — habrá que revisarlo cuando lleguen los contadores, que necesitan sumar/restar de verdad.

## 6. Editar y borrar (CRUD completo) — "lifting state up"

El problema de fondo: el botón de borrar/editar vive en `ExerciseCard` (el hijo), pero el array `exercises` y su `setExercises` viven en `App` (el padre). Los props solo bajan, nunca suben — entonces, ¿cómo avisa el hijo al padre? **El padre le pasa al hijo una función como prop**, igual que le pasaría un dato. El hijo no sabe *cómo* se borra o edita nada, solo llama a la función que le han dado.

**Borrar — `.filter()`**: quita un elemento de un array de forma inmutable, devolviendo un array nuevo solo con los que cumplen la condición:
```js
function handleDeleteExercise(id) {
  setExercises(exercises.filter((exercise) => exercise.id !== id))
}
```
En el `.map()` de `App` que renderiza las tarjetas, se pasa `onDelete={() => handleDeleteExercise(exercise.id)}` — se envuelve en una función flecha ahí mismo, donde ya se tiene `exercise.id` a mano, para que `ExerciseCard` reciba "una función lista para llamar", sin tener que conocer el `id`.

**Editar — `.map()` para actualizar un elemento en su sitio**:
```js
function handleEditExercise(id, camposActualizados) {
  setExercises(
    exercises.map((exercise) =>
      exercise.id === id ? { ...exercise, ...camposActualizados } : exercise
    )
  )
}
```
Se lee: "el que coincide con `id`, se sustituye por una copia fusionando lo viejo con los campos nuevos; el resto se deja igual". Con esto se completan los tres patrones de actualizar arrays sin mutar: **spread** (añadir), **`.filter()`** (quitar), **`.map()`** (actualizar uno).

**State por instancia de componente** (el concepto que más costó entender): si hay 4 ejercicios renderizados, hay 4 instancias de `ExerciseCard` ejecutándose, y cada `useState` declarado dentro de `ExerciseCard` le da a **cada instancia su propia copia aislada** de ese state. Por eso `isEditing` y los campos de edición (`editName`, etc.) se declaran **dentro de `ExerciseCard`**, no en `App` — así cada tarjeta puede estar editándose de forma independiente, gratis, sin tener que llevar manualmente un registro de "qué tarjeta se está editando" en `App`. Los campos de edición se inicializan desde los **props** del propio ejercicio (`useState(name)`), nunca desde el state de otro formulario no relacionado.

**Callback que además de avisar, lleva datos**: `onDelete` solo necesita avisar de que "esto" se borra (no lleva datos extra). `onEdit` es distinto: además de avisar, tiene que llevar los valores nuevos. El objeto (`camposActualizados`) se construye **donde están los datos nuevos** — dentro de `ExerciseCard`, en el momento de pulsar "Guardar" — y se envía como argumento: `onEdit({ name: editName, series: editSeries, reps: editReps, weight: editWeight })`. En `App`, el prop `onEdit` solo recibe ese objeto y lo reenvía junto al `id`: `onEdit={(camposActualizados) => handleEditExercise(exercise.id, camposActualizados)}` — `App` no construye nada, solo añade el dato que le falta al objeto (el `id`) y lo reenvía.

**Alternar vista/edición con un `if` antes del `return`**: un componente puede tener varios `return` distintos según su propio state — `if (isEditing) { return (...) }`, y si no, sigue con el `return` normal más abajo. Es una forma clara de expresar "esta tarjeta se ve de una forma u otra según su modo".

Hecho: `ExerciseCard` con modo vista (nombre, datos, botones Editar/Eliminar) y modo edición (4 inputs controlados + botón Guardar), con state propio por tarjeta; `App` con `handleDeleteExercise` y `handleEditExercise` conectados vía props.

Pendiente futuro ya anotado (viene de una pregunta muy buena sobre arquitectura): cuando `App.jsx` empiece a notarse muy cargado, refactorizar la lógica de datos (`exercises`, `handleAddExercise`, `handleDeleteExercise`, `handleEditExercise`) a un **custom hook** (`useExercises()`), que es la forma en que React separa "lógica de datos" de "lógica de vista" — lo más parecido a la idea de un "controlador".

## 7. Componente `Counter` reutilizable

**Cualquier componente que exportas se convierte en una etiqueta JSX usable**, no hay una lista cerrada de "las de HTML". `<Counter />`, igual que `<ExerciseCard />`, funciona porque se importó — el `return` de un componente describe JSX igual que lo hace uno hecho a mano.

**Cuándo un componente merece vivir aparte, en su propio archivo**: cuando su lógica no depende del dominio concreto (aquí, "ejercicios") y por tanto puede reutilizarse en sitios distintos sin cambiarle nada — `Counter` no sabe qué es una serie o un kilo, solo sabe sumar/restar un número con una etiqueta, y por eso sirve igual para el formulario de añadir, el de editar, o una futura sección de perfil. Lo contrario (`handleAddExercise`, `handleEditExercise`) sí depende del dominio, así que se queda pegado a donde vive el dato (`App`/`ExerciseCard`), no se separa.

**Un `onChange` propio no es un evento del navegador**: en un `<input>` nativo, `onChange` te da un evento con `.target.value`. En un componente hecho por nosotros, `onChange` es solo el nombre que le hemos puesto a un prop — puede entregar lo que decidamos, y en `Counter` decidimos que entregue directamente el número ya calculado (`onChange(value + step)`). Por eso, al conectarlo, no se envuelve en una función flecha con `.target.value` — se pasa el setter tal cual: `onChange={setExerciseSeries}`. Mezclar ambos estilos (tratar el `onChange` de un componente propio como si fuera el de un input nativo) fue el error que más se repitió en este bloque.

**Botones dentro de un `<form>` son `type="submit"` por defecto**: un `<button>` sin `type` especificado, dentro de un formulario, envía el formulario al pulsarlo. Los botones +/- de `Counter` necesitan `type="button"` explícito para no disparar un envío accidental.

**El input de número y los botones comparten el mismo `onChange`**: el input nativo dentro de `Counter` sí recibe un evento de verdad, así que ahí sí se hace la conversión `Number(e.target.value)` antes de reenviarlo — la traducción "evento → dato limpio" ocurre una vez, dentro de `Counter`, y todo lo que está fuera (`App`, `ExerciseCard`) solo ve números limpios sin importar si vinieron de teclear o de un botón.

Hecho: `src/Counter.jsx`, usado tanto en el formulario de añadir (`App.jsx`) como en el de editar (`ExerciseCard.jsx`) para `series`, `reps` y `weight` — con lo que además se resolvió la nota pendiente de que esos campos fueran números de verdad en vez de texto.

## 8. Persistencia con `localStorage`

`localStorage` guarda datos en el navegador entre sesiones (sobrevive a cerrar la pestaña/el navegador), pero **solo guarda texto**. Para guardar un array/objeto hace falta convertirlo: `JSON.stringify(datos)` al guardar, `JSON.parse(texto)` al leer.

**Inicializador perezoso de `useState`**: en vez de `useState(valorInicial)`, se le pasa una función — `useState(() => calcularValorInicial())`. React solo ejecuta esa función **una vez**, en el primerísimo render. Se usa cuando calcular el valor de arranque cuesta trabajo (aquí: leer y parsear `localStorage`), para no repetirlo en cada render sin necesidad.
```jsx
const [exercises, setExercises] = useState(() => {
  const saved = localStorage.getItem("exercises")
  return saved ? JSON.parse(saved) : [/* array de ejemplo por defecto */]
})
```

**`useEffect`**: ejecuta una función *después* de que el componente se renderiza, y el segundo argumento (el array de dependencias) controla cuándo se repite. Tres casos, fáciles de confundir entre sí porque dos de ellos parecen "no llevar nada especial":

| Código | Cuándo se ejecuta |
|---|---|
| `useEffect(fn)` — sin segundo argumento | Después de **cada** render, sin parar |
| `useEffect(fn, [])` — array vacío | Solo **una vez**, al montar, nunca más |
| `useEffect(fn, [exercises])` — con dependencia | Al montar, y de nuevo cada vez que `exercises` cambie |

Para guardar en `localStorage` cada vez que la lista cambia (añadir/editar/borrar), se usa la tercera forma:
```jsx
useEffect(() => {
  localStorage.setItem("exercises", JSON.stringify(exercises))
}, [exercises])
```

Los dos mecanismos hacen trabajos opuestos y complementarios: el inicializador perezoso **lee, una sola vez, al arrancar**; el `useEffect` **escribe, repetidamente, cada vez que algo cambia**. Como `handleAddExercise`/`handleDeleteExercise`/`handleEditExercise` siempre crean un array nuevo (spread/filter/map), React detecta el cambio en cada uno y dispara el efecto automáticamente.

Hecho: `exercises` en `App.jsx` se inicializa leyendo `localStorage` (con el array de ejemplo como respaldo la primera vez que se abre la app) y se guarda automáticamente en cada cambio.

## 9. PWA y despliegue

**Manifest + Service Worker**: dos piezas necesarias para que una web sea instalable. El manifest (JSON con nombre, iconos, colores, `display: "standalone"`) permite el botón de instalar; el Service Worker cachea archivos para que funcione offline. Se generan con el plugin `vite-plugin-pwa` en `vite.config.js`, sin escribir un Service Worker a mano.

**Iconos** obligatorios en `public/` (192x192 y 512x512 PNG), referenciados en el manifest.

**Instalación real vs. acceso directo**: en Android/Chrome, si el sitio cumple los requisitos de instalación (HTTPS, manifest válido, Service Worker registrado), Chrome genera un **WebAPK** — una app real reconocida por Android (aparece en el cajón de apps, multitarea, Ajustes), no solo un icono que abre una pestaña. Si falla algún requisito, cae a un simple acceso directo. Distintos navegadores (los de fabricante, tipo Samsung/Xiaomi) varían mucho en soporte — Chrome es la referencia para probar.

**HTTPS es obligatorio** para Service Worker/instalación (con la excepción de `localhost`). Por eso un servidor local expuesto en la red de casa no sirve para probar la instalación real en el móvil — hace falta desplegar.

**Git**: herramienta local que lleva el historial de versiones del proyecto (`git init`, `git add`, `git commit`). **GitHub**: aloja en la nube una copia de ese historial — sirve de backup, portfolio público, y punto de conexión para que otros servicios lean el repositorio.

**Despliegue continuo**: conectar Netlify (o Vercel) directamente al repositorio de GitHub (Sites → Import an existing project) hace que cada `git push` dispare un build y despliegue automático en sus servidores — nada de compilar y arrastrar carpetas a mano. Un sitio así, ligado a una cuenta, es permanente (a diferencia de un despliegue anónimo tipo "Netlify Drop", que viene protegido con contraseña temporal hasta que se reclama con una cuenta — esa contraseña bloquea también las comprobaciones automáticas de Chrome, impidiendo la instalación real aunque el manifest esté perfecto).

**`netlify.toml`** en `public/` (se copia a `dist/` en cada build) configura cabeceras HTTP que Netlify no adivina solo: el tipo de contenido correcto del manifest (`application/manifest+json`), caché agresiva para `/assets/*` (los archivos de Vite llevan hash en el nombre, así que es seguro cachearlos mucho tiempo), y una regla de redirección para cuando la app tenga rutas gestionadas por JavaScript (aún no es el caso).

Hecho: PWA instalable confirmada en Android/Chrome (modo standalone real), desplegada de forma permanente vía GitHub + Netlify con auto-deploy en cada push.

## 11. Catálogo de ejercicios con gif

**Dato vs. componente**: el catálogo (`src/exerciseCatalog.js`) es solo un array de objetos (`{ id, name, gif }`) — no es un componente, no devuelve JSX, es el mismo papel que ya hacía el array `exercises` de ejemplo. El componente nuevo es `ExercisePicker`, que **recorre ese array con `.map()`** (mismo patrón exacto que `App` recorriendo `exercises`) y por cada uno pinta un botón con imagen y nombre, llamando a `onSelect(item)` cuando se hace click — el mismo patrón de callback-con-dato que `onEdit`.

**Llamar una función vs. pasarla como referencia** — trampa clásica de JSX: `onClick={onSelect(item)}` ejecuta `onSelect(item)` inmediatamente durante el renderizado (una vez por cada vuelta del `.map()`), en vez de esperar al click. Hace falta envolverlo: `onClick={() => onSelect(item)}` — así se crea una función nueva que se ejecutará *cuando* se haga click, no antes. Se aplica siempre que un evento necesite pasar un argumento a la función real.

**`<img>` es un elemento "vacío" (void element)**: nunca puede llevar contenido entre etiquetas, ni siquiera un espacio en blanco — `<img ...> </img>` revienta con "img is a void element tag and must neither have children". Se autocierra siempre: `<img src={...} alt={...} />`.

**`public/` vs `src/` para assets**: los archivos dentro de `public/` se sirven tal cual, por su ruta (`/ejercicios/foo.gif`). Los archivos dentro de `src/` solo se procesan si se importan como módulo de JavaScript — una ruta de texto suelta apuntando a `src/...` puede parecer que funciona en desarrollo pero se rompe en la build de producción. Los gifs de ejercicios se guardan en `public/ejercicios/` por este motivo (mismo criterio que los iconos de la PWA).

**Conectar el picker al formulario**: `App` guarda `selectedExercise` (state, el ejercicio elegido en ese momento) separado de `exercises` (state, la lista ya guardada). `<ExercisePicker onSelect={setSelectedExercise} />` vive en el JSX (hay que verlo y poder tocarlo); `selectedExercise.name`/`.gif` se leen en `handleAddExercise` (lógica) para construir el ejercicio nuevo — la separación de siempre entre "Zona 1" (JS/lógica/state) y "Zona 2" (JSX/lo que se pinta).

**Decisión de diseño**: al editar un ejercicio ya guardado, solo se tocan series/reps/peso — el nombre y el gif no se pueden cambiar (si te equivocaste de ejercicio, se borra y se crea uno nuevo del catálogo). Por eso `ExerciseCard` ya no tiene ningún input de nombre en su modo edición.

Hecho: `exerciseCatalog.js` (catálogo de ejercicios propios, con gif), `ExercisePicker.jsx` (selector visual), conectados al formulario de añadir en `App.jsx`; `ExerciseCard` muestra el gif guardado de cada ejercicio en su vista normal.

## Glosario

Términos que van apareciendo, con una definición corta en tus propias palabras (o la mía si aún no la tienes).

| Término | Definición |
|---|---|
| | |
