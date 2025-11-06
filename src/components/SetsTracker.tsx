import React, { useState } from 'react';
import { WorkoutExercise, Block, Set } from '../types';
import { IntensificationStep } from './IntensificationStep';

interface SetsTrackerProps {
  exercise: any;
  onSetComplete: (completed: boolean, setIndex: number, subExoIndex?: number) => void;
  onInputChange: (value: string, field: string, setIndex: number, subExoIndex?: number) => void;
  onAddBonusSet: (newSet: Partial<Set>, subExoIndex?: number) => void;
  block: Block | null;
}

interface IntensificationState {
  active: boolean;
  step: number;
  type: string | null;
}

export const SetsTracker: React.FC<SetsTrackerProps> = ({
  exercise,
  onSetComplete,
  onInputChange,
  onAddBonusSet,
  block
}) => {
  const [intensificationState, setIntensificationState] = useState<IntensificationState>({
    active: false,
    step: 0,
    type: null
  });

  const handleCheck = (set: any, setIndex: number, subExoIndex: number = -1) => {
    onSetComplete(!set.completed, setIndex, subExoIndex);
    
    const targetExo = subExoIndex > -1 ? exercise.exercises[subExoIndex] : exercise;
    
    if (!set.completed && !set.isBonus && setIndex === targetExo.sets.filter((s: any) => !s.isBonus).length - 1 && targetExo.intensification) {
      setIntensificationState({
        active: true,
        type: targetExo.intensification,
        step: 1
      });
    }
  };

  const renderIntensificationGuide = (exo: any, subExoIndex: number = -1) => {
    if (!intensificationState.active || intensificationState.type !== exo.intensification || !block) {
      return null;
    }

    const lastSet = [...exo.sets].filter((s: any) => !s.isBonus).pop();
    if (!lastSet) return null;

    if (block.technique.name === 'Rest-Pause' && intensificationState.type === 'rest-pause') {
      return (
        <IntensificationStep
          title="🔥 Rest-Pause"
          actionText="Ajouter la série bonus"
          onAction={() => {
            onAddBonusSet(
              {
                weight: lastSet.weight,
                reps: '',
                rir: lastSet.rir
              },
              subExoIndex
            );
            setIntensificationState({ active: false, step: 0, type: null });
          }}
          timer={15}
        />
      );
    }

    if (block.technique.name.includes('Drop-Sets') && intensificationState.type === 'drop-set') {
      return (
        <IntensificationStep
          title="🔥 Drop-Set"
          description="Baissez de 20-25% et continuez à l'échec."
          actionText="Ajouter la série"
          onAction={() => {
            const reducedWeight = parseFloat(String
