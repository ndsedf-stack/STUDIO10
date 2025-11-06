import React from 'react';
import { WorkoutExercise, isSuperset } from '../types';
import { PlusIcon } from './Icons';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  if (isSuperset(exercise)) {
    return (
      <div className="superset-card">
        <div className="superset-badge">SUPERSET</div>
        <div className="superset-exercises">
          <div className="superset-exercise-item">
            <h4>{exercise.exercises[0].name}</h4>
            <div className="sets-reps">
              {exercise.exercises[0].sets} × {exercise.exercises[0].reps}
            </div>
          </div>
          <div className="superset-plus-icon">
            <PlusIcon />
          </div>
          <div className="superset-exercise-item">
            <h4>{exercise.exercises[1].name}</h4>
            <div className="sets-reps">
              {exercise.exercises[1].sets} × {exercise.exercises[1].reps}
            </div>
          </div>
        </div>
        <div className="exercise-details">
          Repos: {exercise.rest}s après le duo
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <h4>{exercise.name}</h4>
        <div className="sets-reps">
          {exercise.sets} × {exercise.reps}
        </div>
      </div>
      <div className="exercise-details">
        RIR: {exercise.rir} • Repos: {exercise.rest}s
      </div>
    </div>
  );
};
