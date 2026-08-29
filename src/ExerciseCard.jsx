import { useState } from "react";
import Counter from "./Counter";
function ExerciseCard({name,series,reps,weight,onEdit, onDelete}){
    //EDITAR
    const [isEditing, setIsEditing] = useState(false);
    const [editExerciseName, setEditExerciseName] = useState(name)
    const [editExerciseSeries, setEditExerciseSeries] = useState(series);
    const [editExerciseReps, setEditExerciseReps] = useState(reps);
    const [editExerciseWeight, setEditExerciseWeight] = useState(weight);

    function handleSave(){
        onEdit({name:editExerciseName, series: editExerciseSeries, reps: editExerciseReps, weight: editExerciseWeight});
        setIsEditing(false);
    }

    if(isEditing){
        return(
            <>
                <input value={editExerciseName} onChange={(e) => setEditExerciseName(e.target.value)}></input>
                <Counter label="series" value={editExerciseSeries} onChange={setEditExerciseSeries}></Counter>             
                <Counter label="repeticiones" value={editExerciseReps} onChange={setEditExerciseReps}></Counter>
                <Counter label="Peso (kg)" value={editExerciseWeight} onChange={setEditExerciseWeight} step={2.5}></Counter>
                <button onClick={handleSave}>Guardar</button>
            </>
        )
    }

    return (
        <>
        <h2>{name}</h2>
        <p>Series: {series} Repeticiones: {reps} Peso: {weight}</p>
        <button onClick={() => setIsEditing(true)}> Editar</button>
        <button onClick={onDelete}> Eliminar</button>
        </>

    )

}

export default ExerciseCard