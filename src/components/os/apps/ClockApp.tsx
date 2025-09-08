"use client";

import { useState, useEffect } from 'react';

const ClockApp = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
        <div className="flex flex-col h-full items-center justify-center bg-card text-card-foreground p-4">
            <div className="text-6xl font-bold font-mono">00:00:00</div>
            <div className="mt-4 text-lg text-muted-foreground">&nbsp;</div>
            <div className="mt-2 text-sm text-muted-foreground">&nbsp;</div>
        </div>
    );
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="flex flex-col h-full items-center justify-center bg-card text-card-foreground p-4">
      <div className="text-6xl font-bold font-mono">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <div className="mt-4 text-lg text-muted-foreground">
        {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
       <div className="mt-2 text-sm text-muted-foreground">{timeZone}</div>
    </div>
  );
};

export default ClockApp;
