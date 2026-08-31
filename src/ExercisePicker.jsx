import { exerciseCatalog } from "./exerciseCatalog";

function ExercisePicker ({onSelect}) {

    return (
        <>
        <div>
            {exerciseCatalog.map((item) => (
                <button type="button" key={item.id} onClick={() => onSelect(item)}>
                    <img src={item.gif} alt={item.name} width={60}/>
                    <span>{item.name}</span>
                </button>
            ))}
        </div>
        
        </>
    )

}

export default ExercisePicker;