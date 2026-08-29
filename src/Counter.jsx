function Counter({label, value, onChange, step = 1, min = 0}){

    function handleDecrement(){
        onChange(Math.max(min, value - step));
    }

    function handleIncremente (){
        onChange(value + step);
    }

    return (
        <>
        <div>
            <span>{label}</span>
            <button type="button" onClick={handleDecrement}>-</button>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                step={step}
                min={min}
            />
            <button type="button" onClick={handleIncremente}>+</button>
        </div>
        </>
    )


}


export default Counter;