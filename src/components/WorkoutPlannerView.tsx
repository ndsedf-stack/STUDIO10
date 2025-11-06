import React, { useState, useMemo } from 'react';
import { Workout } from '../types';
import { programData } from '../data/programData';
import { MuscleGroupHeatmap } from './MuscleGroupHeatmap';
import { ExerciseCard } from './ExerciseCard';

interface WorkoutPlannerViewProps {
  onStartWorkout: (workout: Workout, week: number, day: string, isHomeWorkout?: boolean) => void;
}

export const WorkoutPlannerView: React.FC<WorkoutPlannerViewProps> = ({ onStartWorkout }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeDay, setActiveDay] = useState<string>(() => {
    const dayIndex = new Date().getDay();
    const dayMap: { [key: number]: string } = {
      0: 'dimanche',
      2: 'mardi',
      4: 'jeudi',
      5: 'vendredi'
    };
    return dayMap[dayIndex] || 'dimanche';
  });

  const { currentBlock, isDeload } = useMemo(() => {
    if (programData.deloadWeeks.includes(currentWeek)) {
      return {
        isDeload: true,
        currentBlock: {
          id: 0,
          name: `SEMAINE ${currentWeek}: DELOAD`,
          weeks: [currentWeek],
          technique: {
            name: "Récupération",
            desc: "Charges réduites de 40%, volume réduit de 50%. Focus sur la technique et la mobilité."
          }
        }
      };
    }
    const block = programData.blocks.find(b => b.weeks.includes(currentWeek)) || {
      id: 0,
      name: "Phase Initiale",
      weeks: [],
      technique: {
        name: "Technique",
        desc: "Concentration sur la forme."
      }
    };
    return { isDeload: false, currentBlock: block };
  }, [currentWeek]);

  const gymWorkout = useMemo(() => {
    const originalWorkout = (programData.workouts as any)[activeDay];
    if (!originalWorkout) return null;

    let workout = JSON.parse(JSON.stringify(originalWorkout));

    const getBicepsName = (w: number) => {
      const b = programData.blocks.find(bl => bl.weeks.includes(w))?.id;
      return (b === 1 || b === 3) ? 'Incline Curl' : 'Spider Curl';
    };

    workout.exercises.forEach((exo: any) => {
      const exosToProcess = (exo.type === 'superset' && exo.exercises) ? exo.exercises : [exo];
      exosToProcess.forEach((subExo: any) => {
        if (subExo.bicepsRotation) {
          subExo.name = getBicepsName(currentWeek);
        }
      });
    });

    return workout;
  }, [activeDay, currentWeek]);

  const homeWorkout = (programData.homeWorkouts as any)[activeDay];

  return (
    <div className="main-content">
      <header className="header">
        <h1>Programme d'Entraînement</h1>
      </header>

      <div className="week-navigator">
        <button onClick={() => setCurrentWeek(w => Math.max(1, w - 1))} disabled={currentWeek === 1}>
          &lt;
        </button>
        <div className="week-display">Semaine {currentWeek}</div>
        <button onClick={() => setCurrentWeek(w => Math.min(26, w + 1))} disabled={currentWeek === 26}>
          &gt;
        </button>
      </div>

      <div className="block-info">
        <h3>{currentBlock.name}</h3>
        <p>
          <strong>Technique :</strong> {currentBlock.technique.name}
        </p>
        <p>{currentBlock.technique.desc}</p>
      </div>

      <div className="tabs">
        {['dimanche', 'mardi', 'jeudi', 'vendredi'].map(day => (
          <button
            key={day}
            className={`tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
          </button>
        ))}
      </div>

      <MuscleGroupHeatmap workout={gymWorkout || (homeWorkout ? { name: '', exercises: [homeWorkout] } : null)} />

      <div className="workout-overview">
        {gymWorkout && (
          <>
            <button
              className="start-session-btn"
              onClick={() => onStartWorkout(gymWorkout, currentWeek, activeDay)}
              disabled={isDeload}
            >
              {isDeload ? 'Jour de repos / Deload' : 'Commencer la séance'}
            </button>
            {gymWorkout.exercises.map((exo: any, index: number) => (
              <ExerciseCard key={exo.id || `superset-${index}`} exercise={exo} />
            ))}
          </>
        )}

        {homeWorkout && (
          <div className="home-workout-card">
            <div>
              <h4>🏠 Séance à la Maison</h4>
              <p>{homeWorkout.name}</p>
              <p className="sets-reps">
                {homeWorkout.sets} × {homeWorkout.reps}
              </p>
            </div>
            <button
              className="start-home-btn"
              onClick={() => onStartWorkout({ name: homeWorkout.name, exercises: [homeWorkout] }, currentWeek, activeDay, true)}
            >
              Démarrer
            </button>
          </div>
        )}

        {!gymWorkout && activeDay === 'jeudi' && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            Séance à la maison uniquement aujourd'hui.
          </p>
        )}

        {!gymWorkout && !homeWorkout && !(programData.homeWorkouts as any)[activeDay] && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Jour de repos.</p>
        )}
      </div>
    </div>
  );
};
