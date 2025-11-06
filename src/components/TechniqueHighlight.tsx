import React from 'react';
import { WorkoutExercise, Block, Exercise, isSuperset } from '../types';

interface TechniqueHighlightProps {
  exercise: WorkoutExercise;
  block: Block | null;
}

export const TechniqueHighlight: React.FC<TechniqueHighlightProps> = ({ exercise, block }) => {
  if (!block) return null;

  const getTechniqueForExo = (exo: Exercise): string | null => {
    if (!exo.intensification) return null;
    const techName = block.technique.name.toLowerCase();
    if (techName.includes(exo.intensification.replace('-', ''))) {
      return block.technique.name.split('&')[0].trim();
    }
    return null;
  };

  const techniques: string[] = [];

  if (isSuperset(exercise)) {
    exercise.exercises.forEach(exo => {
      const tech = getTechniqueForExo(exo);
      if (tech && !techniques.includes(tech)) {
        techniques.push(tech);
      }
    });
  } else {
    const tech = getTechniqueForExo(exercise);
    if (tech) {
      techniques.push(tech);
    }
  }

  if (techniques.length === 0) return null;

  return (
    <div className="technique-highlight-box">
      <strong>🔥 Technique Spéciale: </strong>
      {techniques.join(' / ')}
    </div>
  );
};
