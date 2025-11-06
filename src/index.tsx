import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarHeatmap } from './components/CalendarHeatmap';
import { MuscleGroupHeatmap } from './components/MuscleGroupHeatmap';
import { ProgressionChart } from './components/ProgressionChart';
import { RestTimer } from './components/RestTimer';
import { IntensificationStep } from './components/IntensificationStep';
import { TechniqueHighlight } from './components/TechniqueHighlight';
import { SetsTracker } from './components/SetsTracker';
import { ActiveWorkoutView } from './components/ActiveWorkoutView';
import { StatisticsView } from './components/StatisticsView';
import { WorkoutPlannerView } from './components/WorkoutPlannerView';
import { BottomNav } from './components/BottomNav';
import { App } from './components/App';

const workoutData: any[] = []; // Replace 'any' with appropriate type

ReactDOM.render(
  <React.StrictMode>
    <App 
      workoutData={workoutData}
      // Other props can be defined as per original functionality
    />
  </React.StrictMode>,
  document.getElementById('root')
);