import "./App.css";
import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from "react";
import Counter from "./Counter";
import ExercisePicker from "./ExercisePicker";
function App() {
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("exercises");
    return saved ? JSON.parse(saved) : [
    { id: 1, name: "Press de banca", gif:"/ejercicios/0025.gif", series: 3, reps: 12, weight: 20 },
    { id: 2, name: "Tirón al pecho", gif:"/ejercicios/0245.gif", series: 3, reps: 12, weight: 30 },
    { id: 3, name: "Press hombros", gif:"/ejercicios/1299.gif", series: 3, reps: 12, weight: 10 },
    { id: 4, name: "Remo sentado", gif: "/ejercicios/0239.gif", series: 3, reps: 12, weight: 30 },
    ];
  });

  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises)) }, [exercises]);
  
  const [exerciseSeries, setExerciseSeries] = useState(3);
  const [exerciseReps, setExerciseReps] = useState(10);
  const [exerciseWeight, setExerciseWeight] = useState(10);


  function handleAddExercise(e) {
    e.preventDefault();
    if (!selectedExercise) return;
    const nuevoEjercicio = {id: Date.now(), name:selectedExercise.name, gif:selectedExercise.gif, series:exerciseSeries, reps:exerciseReps, weight:exerciseWeight}
    setExercises([...exercises, nuevoEjercicio]);
    setExerciseSeries(3);
    setExerciseReps(10);
    setExerciseWeight(10);
    setSelectedExercise(null);
  }

  function handleDeleteExercise(id){
    setExercises(exercises.filter((exercise) => exercise.id !== id))
  }

  function handleEditExercise(id, camposActualizados){
    setExercises(exercises.map((exercise) => 
      exercise.id === id? {...exercise, ...camposActualizados} : exercise
      )
    )
  }

  return (
    <>
      <section id="title">
        <h1>Gym Dashboard</h1>
        <div>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>
                <ExerciseCard
                  name={exercise.name}
                  gif={exercise.gif}
                  series={exercise.series}
                  reps={exercise.reps}
                  weight={exercise.weight}
                  onEdit={(camposActualizados) => handleEditExercise(exercise.id, camposActualizados)}
                  onDelete={() => handleDeleteExercise(exercise.id)}
                ></ExerciseCard>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <form key="exerciseForm" onSubmit={handleAddExercise}>
          <ExercisePicker onSelect={setSelectedExercise} />
          <Counter label="Series" value={exerciseSeries} onChange={setExerciseSeries} />
          <Counter label="Repeticiones" value={exerciseReps} onChange={setExerciseReps} />
          <Counter label="Peso (kg)" value={exerciseWeight} onChange={setExerciseWeight} step={2.5} />
          <button type="submit">Guardar</button>
        </form>
      </section>
    </>
  );
}

export default App;
