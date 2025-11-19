"use client";

import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (num) => num.toString().padStart(2, '0');

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
        {['Days', 'Hours', 'Min', 'Sec'].map((label, i) => (
          <div key={label} className="text-center">
            <div className="bg-gray-200 w-8 h-8 md:w-10 md:h-10 rounded animate-pulse"></div>
            <span className="text-[10px] md:text-xs text-gray-400 block mt-1">{label}</span>
            {i < 3 && <span className="text-lg md:text-xl font-bold text-gray-400 mx-1">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
      <div className="text-center">
        <div className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center font-bold text-sm md:text-base">
          {format(timeLeft.days)}
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 block mt-1">Days</span>
      </div>
      <span className="text-lg md:text-xl font-bold text-red-600">:</span>
      <div className="text-center">
        <div className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center font-bold text-sm md:text-base">
          {format(timeLeft.hours)}
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 block mt-1">Hours</span>
      </div>
      <span className="text-lg md:text-xl font-bold text-red-600">:</span>
      <div className="text-center">
        <div className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center font-bold text-sm md:text-base">
          {format(timeLeft.minutes)}
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 block mt-1">Min</span>
      </div>
      <span className="text-lg md:text-xl font-bold text-red-600">:</span>
      <div className="text-center">
        <div className="bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center font-bold text-sm md:text-base">
          {format(timeLeft.seconds)}
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 block mt-1">Sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;