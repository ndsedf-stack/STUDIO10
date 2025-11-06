import React, { useMemo } from 'react';
import { WorkoutHistory } from '../types';

interface ProgressionChartProps {
  exerciseId: string;
  exerciseName: string;
  history: WorkoutHistory;
}

export const ProgressionChart: React.FC<ProgressionChartProps> = ({
  exerciseId,
  exerciseName,
  history
}) => {
  const dataPoints = useMemo(() => {
    const points: Array<{ date: Date; weight: number }> = [];
    
    Object.values(history).forEach((w) => {
      if (!w?.exercises) return;
      let maxWeight = 0;
      
      w.exercises.forEach((exo: any) => {
        const exosToProcess = (exo.type === 'superset' && exo.exercises) ? exo.exercises : [exo];
        
        exosToProcess.forEach((subExo: any) => {
          if (subExo.id === exerciseId) {
            (subExo.sets || []).forEach((set: any) => {
              if (set.completed) {
                maxWeight = Math.max(maxWeight, parseFloat(String(set.weight)));
              }
            });
          }
        });
      });
      
      if (maxWeight > 0) {
        points.push({ date: new Date(w.date), weight: maxWeight });
      }
    });
    
    return points.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [history, exerciseId]);

  if (dataPoints.length < 2) {
    return (
      <div className="progression-chart">
        <h4 style={{ marginBottom: 0 }}>{exerciseName}</h4>
        <p className="empty-stat-small">
          Enregistrez au moins 2 séances pour voir la courbe.
        </p>
      </div>
    );
  }

  const weights = dataPoints.map(p => p.weight);
  const maxW = Math.max(...weights);
  const minW = Math.min(...weights);
  const firstD = dataPoints[0].date.getTime();
  const lastD = dataPoints[dataPoints.length - 1].date.getTime();

  const getCoords = (p: { date: Date; weight: number }) => ({
    x: lastD === firstD ? 50 : ((p.date.getTime() - firstD) / (lastD - firstD)) * 100,
    y: maxW === minW ? 50 : 100 - ((p.weight - minW) / (maxW - minW)) * 90 - 5
  });

  const path = dataPoints
    .map(getCoords)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div className="progression-chart">
      <h4>{exerciseName}</h4>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '150px' }}>
        <path
          d={path}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {dataPoints.map((p, i) => {
          const coords = getCoords(p);
          return (
            <circle
              key={i}
              cx={coords.x}
              cy={coords.y}
              r="2"
              fill="var(--color-primary)"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '0.8rem', 
        color: 'var(--color-text-secondary)', 
        marginTop: '0.5rem' 
      }}>
        <span>{minW}kg</span>
        <span>{maxW}kg</span>
      </div>
    </div>
  );
};
