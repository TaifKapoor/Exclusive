import React from 'react';

/**
 * Single box component for displaying time unit in the CountdownTimer.
 * @param {number} value - The numerical value (e.g., 23).
 * @param {string} unit - The unit label (e.g., Hours).
 */
const TimerBox = ({ value, unit }) => {
  return (
    <div className="flex flex-col items-center">
      
      
      <div className="text-3xl sm:text-4xl font-bold text-foreground leading-none">
        {String(value).padStart(2, '0')}
      </div>
      
      
      <span className="text-xs sm:text-sm text-foreground mt-1">
        {unit}
      </span>
    </div>
  );
};

export default TimerBox;