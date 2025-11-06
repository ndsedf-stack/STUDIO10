import { useState, useCallback } from 'react';
import { WorkoutHistory, WorkoutHistoryEntry, Exercise, ExercisePR } from '../types';

const DB_KEY = 'hybridMaster51_data_v4';

export const useWorkoutHistory = () => {
  const [history, setHistory] = useState<WorkoutHistory>(() => {
    try {
      const saved = localStorage.getItem(DB_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const saveWorkout = useCallback((workout: WorkoutHistoryEntry) => {
    const newHistory = { ...history, [workout.date]: workout };
    setHistory(newHistory);
    localStorage.setItem(DB_KEY, JSON.stringify(newHistory));
  }, [history]);

  const getExercisePR = useCallback((exerciseId: string): ExercisePR => {
    let best: ExercisePR = { weight: 0, reps: 0 };
    
    Object.values(history).forEach((workout) => {
      if (!workout?.exercises) return;
      
      const processExo = (exo: any) => {
        if (exo.id === exerciseId) {
          (exo.sets || []).forEach((set: any) => {
            const w = parseFloat(String(set.weight));
            const r = parseInt(String(set.reps));
            if (set.completed && w >= best.weight) {
              if (w > best.weight) {
                best = { weight: w, reps: r };
              } else if (r > best.reps) {
                best.reps = r;
              }
            }
          });
        }
      };
      
      workout.exercises.forEach((exo: any) => {
        if (exo.type === 'superset' && exo.exercises) {
          exo.exercises.forEach(processExo);
        } else {
          processExo(exo);
        }
      });
    });
    
    return best;
  }, [history]);

  const getSuggestedWeight = useCallback((exercise: Exercise): number => {
    const historyEntries = Object.values(history).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (const entry of historyEntries) {
      if (!entry?.exercises) continue;
      
      for (const performedExo of entry.exercises) {
        const checkExo = (exo: any): number | null => {
          if (exo.id === exercise.id && exo.sets?.length > 0) {
            const lastSet = exo.sets[exo.sets.length - 1];
            if (lastSet?.completed) {
              const targetReps = parseInt((exercise.reps || "0").split('-').pop() || "0");
              if (
                parseInt(String(lastSet.reps)) >= targetReps &&
                parseInt(String(lastSet.rir)) >= (exercise.rir || 1)
              ) {
                return parseFloat(String(lastSet.weight)) + (exercise.progression?.increment || 0);
              }
              return parseFloat(String(lastSet.weight));
            }
          }
          return null;
        };
        
        const subExos = (performedExo as any).type === 'superset' && (performedExo as any).exercises
          ? (performedExo as any).exercises
          : [performedExo];
        
        for (const subExo of subExos) {
          const weight = checkExo(subExo);
          if (weight !== null) return weight;
        }
      }
    }
    
    return exercise.startWeight;
  }, [history]);

  return {
    history,
    saveWorkout,
    getExercisePR,
    getSuggestedWeight
  };
};
