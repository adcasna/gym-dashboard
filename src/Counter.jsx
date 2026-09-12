function Counter({ label, value, onChange, step = 1, min = 0 }) {
  function handleDecrement() {
    onChange(Math.max(min, value - step))
  }
  function handleIncrement() {
    onChange(value + step)
  }

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full bg-background text-ink text-lg font-bold flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          min={min}
          className="w-14 text-center bg-background text-ink rounded-lg py-1 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="w-8 h-8 rounded-full bg-background text-ink text-lg font-bold flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter