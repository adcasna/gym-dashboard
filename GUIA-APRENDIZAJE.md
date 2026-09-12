# CRUD en React — plantillas para copiar y adaptar

Esto no es para leer de un tirón — es para abrir cuando estés en OTRO proyecto, necesites un CRUD, y no te acuerdes de la forma. Busca la pieza que necesitas, copia el bloque, cambia `item`/`Item`/`items` por tu entidad real (en este proyecto: `exercise`/`ExerciseCard`/`exercises`), y adapta los campos.

Cada plantilla lleva 1-2 líneas de "qué cambiar", no un ensayo.

---

## 1. Piezas de un CRUD típico

- `App.jsx` — tiene el state de la lista (`items`) y las funciones que la modifican (`handleAdd`, `handleDelete`, `handleEdit`).
- `ItemCard.jsx` — pinta un elemento de la lista; recibe los datos y las funciones `onEdit`/`onDelete` como props.
- (Opcional) `Modal.jsx` — reutilizable, para el formulario de crear y el de editar.

---

## 2. Read — listar

```jsx
{items.map((item) => (
  <ItemCard
    key={item.id}
    name={item.name}
    onEdit={(camposActualizados) => handleEditItem(item.id, camposActualizados)}
    onDelete={() => handleDeleteItem(item.id)}
  />
))}
```
Cambiar: los props que le pasas según los campos de tu entidad. `key` siempre en el elemento de primer nivel del `.map()`, siempre el `id` real, nunca el índice.

---

## 3. Create — formulario controlado

```jsx
const [name, setName] = useState("")

function handleAddItem(e) {
  e.preventDefault()
  const nuevo = { id: Date.now(), name }
  setItems([...items, nuevo])
  setName("")
}

// JSX:
<form onSubmit={handleAddItem}>
  <input value={name} onChange={(e) => setName(e.target.value)} />
  <button type="submit">Guardar</button>
</form>
```
Cambiar: un `useState` por cada campo del formulario; añádelos todos al objeto `nuevo`; resetea todos tras guardar.

---

## 4. Update — editar en sitio (dentro de `ItemCard.jsx`)

```jsx
function ItemCard({ id, name, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)

  function handleSave() {
    onEdit({ name: editName })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <>
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <button onClick={handleSave}>Guardar</button>
      </>
    )
  }

  return (
    <>
      <span>{name}</span>
      <button onClick={() => setIsEditing(true)}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </>
  )
}
```
Cambiar: un `useState` de edición por cada campo editable, inicializado desde el prop correspondiente (nunca desde el state de otro formulario). El state de edición **vive dentro de `ItemCard`**, no en `App` — cada tarjeta necesita su propia copia aislada.

En `App.jsx`, la función que aplica el cambio:
```js
function handleEditItem(id, camposActualizados) {
  setItems(items.map((item) =>
    item.id === id ? { ...item, ...camposActualizados } : item
  ))
}
```

---

## 5. Delete

```js
function handleDeleteItem(id) {
  setItems(items.filter((item) => item.id !== id))
}
```

---

## 6. Componente reutilizable genérico

Si una pieza de UI **no necesita saber nada de tu entidad** (un contador, un modal, un selector), sácala a su propio archivo, con un `onChange`/`onSelect` que tú mismo defines (no tiene por qué ser un evento del navegador — puede entregar directamente el valor limpio).

```jsx
function Counter({ label, value, onChange, step = 1 }) {
  return (
    <div>
      <span>{label}</span>
      <button type="button" onClick={() => onChange(value - step)}>-</button>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <button type="button" onClick={() => onChange(value + step)}>+</button>
    </div>
  )
}
// uso: <Counter label="Cantidad" value={qty} onChange={setQty} />
```
Ojo: dentro de un `<form>`, los botones necesitan `type="button"` o envían el formulario sin querer.

---

## 7. Persistencia con `localStorage`

```js
const [items, setItems] = useState(() => {
  const saved = localStorage.getItem("items")
  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items))
}, [items])
```
Cambiar: la clave `"items"` por algo específico de tu proyecto. El array de dependencias `[items]` es obligatorio — sin él, se ejecuta en cada render; vacío (`[]`), solo se ejecuta una vez y nunca vuelve a guardar cambios.

---

## 8. Modal reutilizable

```jsx
function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) dialogRef.current.showModal()
    else dialogRef.current.close()
  }, [open])

  return (
    <dialog ref={dialogRef} onClose={onClose} className="m-auto rounded-xl bg-surface p-6 backdrop:bg-black/60">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>×</button>
    </dialog>
  )
}
// uso: <Modal open={showForm} onClose={() => setShowForm(false)} title="Nuevo">...</Modal>
```

---

## 9. Tailwind — arranque rápido

Instalación:
```
npm install tailwindcss @tailwindcss/vite
```
`vite.config.js`: añadir `tailwindcss()` a `plugins`. `index.css`:
```css
@import "tailwindcss";
@theme {
  --color-background: #12141a;
  --color-surface: #1c1f28;
  --color-ink: #f2f2f0;
  --color-accent: #f97316;
}
```
Combinaciones que se repiten mucho (cópialas y ajusta el color):
- **Fila/tarjeta**: `flex items-center justify-between gap-4 bg-surface rounded-xl p-4`
- **Botón principal**: `bg-accent text-background font-semibold py-2 rounded-lg`
- **Botón secundario**: `bg-background text-ink py-2 rounded-lg`
- **Cuadrícula de tarjetas**: `grid grid-cols-3 gap-3`
- **Imagen que no se deforma ni se aplasta**: `w-24 h-24 object-cover rounded-lg flex-shrink-0`

---

## 10. Checklist cuando algo no funciona

Antes de darle vueltas, comprueba en este orden:

1. ¿El error dice "X is not defined"? → esa variable/función no se declaró en este archivo (falta un `useState`, un `import`, o un parámetro de la función).
2. ¿Un evento (`onClick`/`onChange`) necesita pasar un argumento? → tiene que ir envuelto en `() => ...`, nunca `onClick={fn(x)}` a secas (eso la ejecuta ya, durante el render).
3. ¿Es el `onChange` de un `<input>` nativo, o el de un componente propio? → el nativo entrega un evento (`e.target.value`); el propio entrega lo que ese componente decida (a veces ya un valor limpio).
4. ¿El `state` que falla debería ser por-tarjeta o compartido? → si cada instancia necesita su propio valor independiente, va dentro del componente hijo, no en el padre.
5. ¿El `.map()` tiene `key` en el elemento de primer nivel? ¿Ese `key` es el `id` real, no el índice?
6. ¿El array de state se modificó con `.push()`/mutación directa, o se creó uno nuevo (spread/`.filter()`/`.map()`)?
7. ¿El `useEffect` tiene el array de dependencias correcto (ni ausente, ni vacío por error)?

---

## 11. Glosario corto

| Término | Definición |
|---|---|
| Componente | Función que devuelve JSX. |
| Props | Datos que entran de fuera, de solo lectura. |
| State | Memoria propia del componente, modificable, dispara re-render. |
| `key` | Identificador único en listas, no es lo mismo que `id`. |
| Lifting state up | Pasar una función del padre al hijo para que el hijo avise hacia arriba. |
| Inmutabilidad | Crear un array/objeto nuevo en vez de modificar el existente. |
