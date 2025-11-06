import React from 'react';
import { ViewType } from '../types';
import { ChartIcon, DumbbellIcon } from './Icons';

interface BottomNavProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${currentView === 'stats' ? 'active' : ''}`}
        onClick={() => setView('stats')}
      >
        <ChartIcon />
        <span>Stats</span>
      </button>
      <button
        className={`nav-item ${currentView === 'program' ? 'active' : ''}`}
        onClick={() => setView('program')}
      >
        <DumbbellIcon />
        <span>Programme</span>
      </button>
    </nav>
  );
};
