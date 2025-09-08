"use client";

import { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

const StatusBar = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const timer = setInterval(update, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-8 px-4 flex justify-between items-center text-sm font-semibold text-foreground">
      <div>{time || '--:--'}</div>
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span>100%</span>
      </div>
    </div>
  );
};

export default StatusBar;
