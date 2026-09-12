// src/Modal.jsx
import { useRef, useEffect } from "react"

function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto max-w-md w-full rounded-xl bg-surface p-6 shadow-lg backdrop:bg-black/60 text-ink"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-xl">{title}</h2>
        <button type="button" onClick={onClose} className="text-muted text-2xl leading-none">×</button>
      </div>
      {children}
    </dialog>
  )
}

export default Modal
