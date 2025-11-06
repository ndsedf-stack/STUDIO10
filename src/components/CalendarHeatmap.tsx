import React from 'react';
import { WorkoutHistory } from '../types';

interface CalendarHeatmapProps {
  history: WorkoutHistory;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ history }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 180);
  
  const dates: Date[] = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const workoutDates = Object.keys(history).map(dateStr => new Date(dateStr).toDateString());
  
  return (
    <div className="heatmap-container">
      {dates.map(date => (
        <div
          key={date.toISOString()}
          className="heatmap-day"
          data-level={workoutDates.includes(date.toDateString()) ? "2" : "0"}
        />
      ))}
    </div>
  );
};
