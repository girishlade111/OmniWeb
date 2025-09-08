"use client";

import { useState, useEffect } from 'react';

const ClockApp = () => {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeZone = isClient ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';

  return (
    <div className="flex flex-col h-full items-center justify-center bg-card text-card-foreground p-4">
      <div className="text-6xl font-bold font-mono">
        {isClient ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '00:00:00'}
      </div>
      <div className="mt-4 text-lg text-muted-foreground">
        {isClient ? time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
      </div>
       <div className="mt-2 text-sm text-muted-foreground">{timeZone}</div>
    </div>
  );
};

export default ClockApp;
