import React, { useState, useMemo } from 'react';
import { Workout, Exercise, Set } from '../types';
import { programData } from '../data/programData';
import { TechniqueHighlight } from './TechniqueHighlight';
import { SetsTracker } from './SetsTracker';
import { RestTimer } from './RestTimer';

interface ActiveWorkoutViewProps {
  workout: Workout;
  meta: {
    week: number;
    day: string;
    isHomeWorkout: boolean;
  };
  onEndWorkout: (completedWorkout: any) => void;
  getSuggestedWeight: (exercise: Exercise) => number;
}

export const ActiveWorkoutView: React.FC<ActiveWorkoutViewProps> = ({
  workout,
  meta,
  onEndWorkout,
  getSuggestedWeight
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [workoutState, setWorkoutState] = useState(() =>
    workout.exercises.map((exo: any) => {
      if (exo.type === 'superset') {
        const numSets = Math.max(...exo.exercises.map((e: any) => e.sets));
        return {
          ...exo,
          exercises: exo.exercises.map((subExo: any) => ({
            ...subExo,
            sets: Array.from({ length: numSets }, (_, i) => ({
              id: i,
              weight: getSuggestedWeight(subExo) || '',
              reps: (subExo.reps || "8").toString().split('-')[0],
              rir: subExo.rir || 1,
              completed: false
            }))
          }))
        };
      }
      return {
        ...exo,
        sets: Array.from({ length: exo.sets }, (_, i) => ({
          id: i,
          weight: getSuggestedWeight(exo) || '',
          reps: (exo.reps || "8").toString().split('-')[0],
          rir: exo.rir || 1,
          completed: false
        }))
      };
    })
  );

  const currentExercise = workoutState[currentIndex];
  const currentBlock = useMemo(
    () => programData.blocks.find(b => b.weeks.includes(meta.week)) || null,
    [meta.week]
  );

  const handleSetComplete = (isCompleted: boolean, setIndex: number, subExoIndex: number = -1) => {
    const newWorkoutState = JSON.parse(JSON.stringify(workoutState));
    const newExo = newWorkoutState[currentIndex];
    const set = subExoIndex > -1 ? newExo.exercises[subExoIndex].sets[setIndex] : newExo.sets[setIndex];
    set.completed = isCompleted;
    setWorkoutState(newWorkoutState);

    if (isCompleted) {
      const restDuration = newExo.rest;
      if (restDuration) {
        setRestTime(restDuration);
        setIsResting(true);
      }
    }
  };

  const handleInputChange = (value: string, field: string, setIndex: number, subExoIndex: number = -1) => {
    const newWorkoutState = JSON.parse(JSON.stringify(workoutState));
    const set = (subExoIndex > -1
      ? newWorkoutState[currentIndex].exercises[subExoIndex]
      : newWorkoutState[currentIndex]
    ).sets[setIndex];
    set[field] = value;
    setWorkoutState(newWorkoutState);
  };

  const handleAddBonusSet = (newSet: Partial<Set>, subExoIndex: number = -1) => {
    const newWorkoutState = [...workoutState];
    const targetExo = subExoIndex > -1
      ? newWorkoutState[currentIndex].exercises[subExoIndex]
      : newWorkoutState[currentIndex];
    targetExo.sets.push({
      id: targetExo.sets.length,
      weight: '',
      reps: '',
      rir: 0,
      ...newSet,
      completed: false,
      isBonus: true
    });
    setWorkoutState(newWorkoutState);
  };

  return (
    <div className="main-content">
      <div className="workout-header">
        <span className="workout-progress">
          {currentIndex + 1} / {workoutState.length}
        </span>
        <button className="end-workout-btn" onClick={() => onEndWorkout(workoutState)}>
          Terminer
        </button>
      </div>

      <div className="current-exercise-info">
        <h2>
          {currentExercise.name ||
            (currentExercise.exercises || []).map((e: any) => e.name).join(' + ')}
        </h2>
      </div>

      <TechniqueHighlight exercise={currentExercise} block={currentBlock} />

      <SetsTracker
        exercise={currentExercise}
        onSetComplete={handleSetComplete}
        onInputChange={handleInputChange}
        onAddBonusSet={handleAddBonusSet}
        block={currentBlock}
      />

      <div className="workout-navigation">
        <button onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>
          Précédent
        </button>
        <button
          onClick={() => setCurrentIndex(i => i + 1)}
          disabled={currentIndex === workoutState.length - 1}
        >
          Suivant
        </button>
      </div>

      {isResting && <RestTimer duration={restTime} onFinish={() => setIsResting(false)} />}
    </div>
  );
};
