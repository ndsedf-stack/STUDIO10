import React from 'react';
import { Workout, MuscleGroup } from '../types';
import { muscleGroups } from '../data/programData';

interface MuscleGroupHeatmapProps {
  workout: Workout | null;
}

export const MuscleGroupHeatmap: React.FC<MuscleGroupHeatmapProps> = ({ workout }) => {
  if (!workout) return null;

  const workedMuscles: {
    primary: Set<MuscleGroup>;
    secondary: Set<MuscleGroup>;
  } = {
    primary: new Set(),
    secondary: new Set()
  };

  workout.exercises.forEach(exo => {
    const processExo = (subExo: any) => {
      if (subExo.muscles) {
        subExo.muscles.primary.forEach((m: MuscleGroup) => workedMuscles.primary.add(m));
        subExo.muscles.secondary.forEach((m: MuscleGroup) => workedMuscles.secondary.add(m));
      }
    };

    if (exo.type === 'superset') {
      exo.exercises.forEach(processExo);
    } else {
      processExo(exo);
    }
  });

  return (
    <div className="muscle-heatmap">
      {muscleGroups.map(muscle => {
        const isPrimary = workedMuscles.primary.has(muscle);
        const isSecondary = workedMuscles.secondary.has(muscle) && !isPrimary;
        
        let status = 'inactive';
        if (isPrimary) status = 'primary';
        else if (isSecondary) status = 'secondary';
        
        return (
          <div key={muscle} className={`muscle-tag muscle-${status}`}>
            {muscle}
          </div>
        );
      })}
    </div>
  );
};
