import { useState } from "react";
import Counter from "./Counter";
import Modal from "./Modal";

function ExerciseCard({name,gif,series,reps,weight,onEdit, onDelete}){
    //EDITAR
    const [isEditing, setIsEditing] = useState(false);
    const [editExerciseSeries, setEditExerciseSeries] = useState(series);
    const [editExerciseReps, setEditExerciseReps] = useState(reps);
    const [editExerciseWeight, setEditExerciseWeight] = useState(weight);

    function handleSave(){
        onEdit({series: editExerciseSeries, reps: editExerciseReps, weight: editExerciseWeight});
        setIsEditing(false);
    }

    function handleCancel(){
        setEditExerciseSeries(series);
        setEditExerciseReps(reps);
        setEditExerciseWeight(weight);
        setIsEditing(false);
    }


    return (

        <>
         <li className="flex items-center justify-between gap-4 bg-surface rounded-xl p-4">
            <div className="flex flex-col gap-1">
            <h2 className="font-heading text-lg font-semibold text-ink">{name}</h2>
            <p className="text-sm text-muted">
                Series: {series} · Repeticiones: {reps} · Peso: {weight} kg
            </p>
            <div className="flex gap-3 mt-2">
                <button onClick={() => setIsEditing(true)} className="text-sm text-accent font-medium">Editar</button>
                <button onClick={onDelete} className="text-sm text-muted font-medium">Eliminar</button>
            </div>
            </div>
            {gif ? (
            <img src={gif} alt={name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
            ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-lg bg-background text-2xl flex-shrink-0">🏋️</div>
            )}
        </li>

        <Modal open={isEditing} onClose={handleCancel} title={`Editar ${name}`}>
            <Counter label="Series" value={editExerciseSeries} onChange={setEditExerciseSeries} />
            <Counter label="Repeticiones" value={editExerciseReps} onChange={setEditExerciseReps} />
            <Counter label="Peso (kg)" value={editExerciseWeight} onChange={setEditExerciseWeight} step={2.5} />
            <div className="flex gap-3 mt-4">
                <button type="button" onClick={handleCancel} className="flex-1 py-2 rounded-lg bg-background text-ink font-medium ">Cancelar</button>
                <button type="button" onClick={handleSave} className="flex-1 py-2 rounded-lg bg-accent  font-heading font-semibold text-ink">Guardar</button>
            </div>
        </Modal>

        </>

        
    )

}

export default ExerciseCard