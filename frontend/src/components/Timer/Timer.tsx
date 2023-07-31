import React, { useState, useEffect } from 'react';
import './Timer.css';

interface TimerProps {
  initialSeconds: number; // Nombre initial de secondes pour le compte à rebours
  onTimeOut?: () => void; // Callback lorsque le temps est écoulé
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeOut }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      // Cleanup en cas de démontage du composant
      return () => {
        clearTimeout(timerId);
      };
    } else {
      if (onTimeOut) onTimeOut(); // Exécuter le callback si le temps est écoulé
    }
  }, [seconds, onTimeOut]);

  return (
    <div className="timer">
      Temps restant : {seconds} secondes
    </div>
  );
};

export default Timer;
