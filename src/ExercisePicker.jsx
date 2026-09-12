import { exerciseCatalog } from "./exerciseCatalog";

function ExercisePicker ({onSelect, selectedId}) {

    return (
        <>
        <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
        {exerciseCatalog.map((item) => (
            <button
            type="button"
            key={item.id}
            onClick={() => onSelect(item)}
            className={`flex flex-col items-center gap-1 rounded-lg p-2 bg-background transition-colors ${
                item.id === selectedId ? "ring-2 ring-accent" : "hover:bg-white/5"
            }`}
            >
            <img src={item.gif} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <span className="text-xs text-center text-ink">{item.name}</span>
            </button>
        ))}
        </div>
        
        </>
    )

}

export default ExercisePicker;