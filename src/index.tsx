import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import { ViewType, ActiveWorkout, Workout } from './types';
import { useWorkoutHistory } from './hooks/useWorkoutHistory';
import { StatisticsView } from './components/StatisticsView';
import { WorkoutPlannerView } from './components/WorkoutPlannerView';
import { ActiveWorkoutView } from './components/ActiveWorkoutView';
import { BottomNav } from './components/BottomNav';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('program');
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);
  
  const { history, saveWorkout, getExercisePR, getSuggestedWeight } = useWorkoutHistory();

  const handleStartWorkout = (
    workout: Workout,
    week: number,
    day: string,
    isHomeWorkout: boolean = false
  ) => {
    setActiveWorkout({
      workout,
      meta: { week, day, isHomeWorkout },
      startTime: Date.now()
    });
  };

  const handleEndWorkout = (completedWorkout: any) => {
    if (!activeWorkout) return;
    
    const workoutEntry = {
      date: new Date().toISOString().split('T')[0],
      week: activeWorkout.meta.week,
      day: activeWorkout.meta.day,
      isHomeWorkout: activeWorkout.meta.isHomeWorkout,
      exercises: completedWorkout
    };
    
    saveWorkout(workoutEntry);
    setActiveWorkout(null);
    setCurrentView('stats');
  };

  if (activeWorkout) {
    return (
      <div className="app-container">
        <ActiveWorkoutView
          workout={activeWorkout.workout}
          meta={activeWorkout.meta}
          onEndWorkout={handleEndWorkout}
          getSuggestedWeight={getSuggestedWeight}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      {currentView === 'stats' && (
        <StatisticsView getExercisePR={getExercisePR} history={history} />
      )}
      {currentView === 'program' && (
        <WorkoutPlannerView onStartWorkout={handleStartWorkout} />
      )}
      <BottomNav currentView={currentView} setView={setCurrentView} />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
