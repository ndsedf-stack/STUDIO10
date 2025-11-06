import React from 'react';
import { Workout, Exercise } from '../types';
import workoutService from '../services/workoutService';

interface WorkoutDisplayProps {
  workout: Workout;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ workout }) => {
  const [completedSets, setCompletedSets] = React.useState<{[key: string]: number}>({});
  const [notes, setNotes] = React.useState(workoutService.getWorkoutNote(workout.day));

  const handleSetComplete = (exerciseId: string) => {
    const current = completedSets[exerciseId] || 0;
    const exercise = workout.exercises.find(e => e.id === exerciseId);
    if (exercise && current < exercise.sets) {
      setCompletedSets({
        ...completedSets,
        [exerciseId]: current + 1
      });
    }
  };

  const handleCompleteWorkout = () => {
    workoutService.completeWorkout(workout.day);
    if (notes) {
      workoutService.addWorkoutNote(workout.day, notes);
    }
    alert('Séance terminée ! 💪');
  };

  const renderExercise = (exercise: Exercise, index: number) => {
    const weight = workoutService.calculateExerciseWeight(exercise);
    const completed = completedSets[exercise.id] || 0;
    const isCompleted = completed === exercise.sets;

    return (
      <div 
        key={exercise.id} 
        className={`exercise-card ${exercise.isSuperset ? 'superset' : ''} ${isCompleted ? 'completed' : ''}`}
      >
        <div className="exercise-header">
          <h4>
            {index + 1}. {exercise.name}
            {exercise.isSuperset && <span className="superset-badge">SUPERSET</span>}
          </h4>
          <span className="sets-counter">{completed}/{exercise.sets} séries</span>
        </div>

        <div className="exercise-details">
          <div className="detail-item">
            <span className="label">Séries:</span>
            <span className="value">{exercise.sets}</span>
          </div>
          <div className="detail-item">
            <span className="label">Répétitions:</span>
            <span className="value">{exercise.reps}</span>
          </div>
          <div className="detail-item">
            <span className="label">Repos:</span>
            <span className="value">{exercise.rest}s</span>
          </div>
          <div className="detail-item weight">
            <span className="label">Charge:</span>
            <span className="value">{weight} kg</span>
          </div>
        </div>

        {exercise.notes && (
          <div className="exercise-notes">
            <p>{exercise.notes}</p>
          </div>
        )}

        <button 
          onClick={() => handleSetComplete(exercise.id)}
          className="btn-complete-set"
          disabled={isCompleted}
        >
          {isCompleted ? '✓ Terminé' : `Compléter série ${completed + 1}`}
        </button>
      </div>
    );
  };

  return (
    <div className="workout-display">
      <div className="workout-header">
        <h2>{workout.name}</h2>
        <div className="workout-meta">
          <span className="meta-item">📅 {workout.day}</span>
          <span className="meta-item">⏱️ {workout.duration} min</span>
          <span className="meta-item">💪 {workout.totalSets} séries</span>
        </div>
      </div>

      <div className="exercises-list">
        {workout.exercises.map((exercise, index) => renderExercise(exercise, index))}
      </div>

      <div className="workout-notes">
        <h3>Notes de séance</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Comment vous êtes-vous senti ? RPE ? Difficultés ?"
          rows={4}
        />
      </div>

      <button onClick={handleCompleteWorkout} className="btn-complete-workout">
        ✅ Terminer la séance
      </button>
    </div>
  );
};

export default WorkoutDisplay;