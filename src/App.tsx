import { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import WorkoutDisplay from './components/WorkoutDisplay';
import workoutService from './services/workoutService';
import { DAYS } from './constants';

function App() {
  const [selectedDay, setSelectedDay] = useState<string>('dimanche');

  const handleWeekChange = (week: number) => {
    console.log('Week changed to:', week);
  };

  const workout = workoutService.getWorkoutForDay(selectedDay);

  return (
    <div className="app">
      <ControlPanel onWeekChange={handleWeekChange} />
      
      <div className="workout-selector">
        <h3>Sélectionnez votre séance</h3>
        <div className="day-buttons">
          {DAYS.map(day => {
            const isCompleted = workoutService.isWorkoutCompleted(day);
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={
                  `btn-day ${selectedDay === day ? 'active' : ''} ${isCompleted ? 'completed' : ''}`
                }
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
                {isCompleted && ' ✓'}
              </button>
            );
          })}
        </div>
      </div>

      {workout && <WorkoutDisplay workout={workout} />}
    </div>
  );
}

export default App;