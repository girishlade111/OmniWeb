"use client";

import { useContext } from 'react';
import { OsContext } from './OsContext';
import type { App } from '@/types';

interface AppIconProps {
  app: App;
}

const AppIcon = ({ app }: AppIconProps) => {
  const os = useContext(OsContext);

  const handleClick = () => {
    os?.openApp(app.id);
  };

  return (
    <div
      className="flex flex-col items-center gap-1.5 text-center cursor-pointer group"
      onClick={handleClick}
      onDoubleClick={handleClick}
      aria-label={`Open ${app.name}`}
      role="button"
      tabIndex={0}
    >
      <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 border">
        <app.Icon className="w-8 h-8 text-primary" />
      </div>
      <span className="text-xs text-foreground/90 font-medium truncate w-16">{app.name}</span>
    </div>
  );
};

export default AppIcon;
