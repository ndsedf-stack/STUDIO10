import React from 'react';
import { WorkoutHistory, ExercisePR } from '../types';
import { CalendarHeatmap } from './CalendarHeatmap';
import { ProgressionChart } from './ProgressionChart';
import { programData } from '../data/programData';

interface StatisticsViewProps {
  getExercisePR: (exerciseId: string) => ExercisePR;
  history: WorkoutHistory;
}

const ProjectionsView: React.FC<{ getExercisePR: (id: string) => ExercisePR; hasHistory: boolean }> = ({ 
  getExercisePR, 
  hasHistory 
}) => {
  if (!hasHistory) {
    return (
      <div className="empty-stat">
        Commencez à vous entraîner pour suivre vos projections.
      </div>
    );
  }

  return (
    <div className="stats-container">
      {programData.stats.projections.map(proj => {
        const currentPR = getExercisePR(proj.id).weight;
        const progress = Math.min(100, Math.max(0, ((currentPR - proj.start) / (proj.end - proj.start)) * 100));
        
        return (
          <div className="projection-item" key={proj.id}>
            <div className="stat-item-header">
              <span>{proj.name}</span>
              <span>{currentPR || "..."}kg / {proj.end}kg</span>
            </div>
            <div className="projection-bar-bg">
              <div className="projection-bar-fg" style={{ width: `${progress}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WeeklyVolumeView: React.FC = () => {
  const statsData = programData.stats.weeklyVolume;
  const maxSeries = Math.max(
    ...statsData.map(s => s.series),
    ...statsData.map(s => s.optimal[1])
  );

  return (
    <div className="stats-container">
      {statsData.map(stat => (
        <div key={stat.muscle}>
          <div className="stat-item-header">
            <span>{stat.muscle}</span>
            <span>{stat.series} séries</span>
          </div>
          <div className="stat-bar-container">
            <div
              className="stat-optimal-range"
              style={{
                left: `${(stat.optimal[0] / maxSeries) * 100}%`,
                width: `${((stat.optimal[1] - stat.optimal[0]) / maxSeries) * 100}%`
              }}
            />
            <div
              className="stat-bar"
              style={{ width: `${(stat.series / maxSeries) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatisticsView: React.FC<StatisticsViewProps> = ({ getExercisePR, history }) => {
  const hasHistory = Object.keys(history).length > 0;

  return (
    <div className="main-content">
      <h2 className="stats-header">Tableau de Bord</h2>

      <div className="stats-section">
        <h3>🗓️ Calendrier d'Activité</h3>
        {hasHistory ? (
          <CalendarHeatmap history={history} />
        ) : (
          <div className="empty-stat">Vos jours d'entraînement apparaîtront ici.</div>
        )}
      </div>

      <div className="stats-section">
        <h3>🎯 Objectifs & Projections</h3>
        <ProjectionsView getExercisePR={getExercisePR} hasHistory={hasHistory} />
      </div>

      <div className="stats-section">
        <h3>📈 Progression des Charges</h3>
        {hasHistory ? (
          programData.stats.projections.map(exo => (
            <ProgressionChart
              key={exo.id}
              exerciseId={exo.id}
              exerciseName={exo.name}
              history={history}
            />
          ))
        ) : (
          <div className="empty-stat">Vos courbes de progression s'afficheront ici.</div>
        )}
      </div>

      <div className="stats-section">
        <h3>📊 Volume Hebdomadaire</h3>
        <WeeklyVolumeView />
      </div>
    </div>
  );
};
