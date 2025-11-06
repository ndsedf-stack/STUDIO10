import React, { useState, useEffect } from 'react';

interface IntensificationStepProps {
  title: string;
  description?: string;
  actionText: string;
  onAction: () => void;
  timer?: number;
}

export const IntensificationStep: React.FC<IntensificationStepProps> = ({
  title,
  description,
  actionText,
  onAction,
  timer
}) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (!timer) return;
    
    const interval = setInterval(() => {
      setTimeLeft(t => !t || t <= 1 ? 0 : t - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="intensification-prompt">
      <h4>{title}</h4>
      {description && <p>{description}</p>}
      {timer && timeLeft !== undefined && (
        <div className="intensification-timer">{timeLeft}s</div>
      )}
      <button
        className="intensification-action"
        onClick={onAction}
        disabled={timer ? timeLeft !== 0 : false}
      >
        {actionText}
      </button>
    </div>
  );
};
