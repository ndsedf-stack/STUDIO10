import React, { useState, useEffect } from 'react';

interface RestTimerProps {
  duration: number;
  onFinish: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({ duration, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="rest-timer-overlay">
      <h3>Repos</h3>
      <div className="rest-timer-circle">
        {`${minutes}:${seconds.toString().padStart(2, '0')}`}
      </div>
      <button className="skip-timer-btn" onClick={onFinish}>
        Passer
      </button>
    </div>
  );
};
