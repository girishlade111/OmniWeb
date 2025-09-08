"use client";

import { useContext } from 'react';
import AppIcon from './AppIcon';
import { OsContext } from './OsContext';
import { APPS, DOCK_APPS } from './apps.config';

const Dock = () => {
  const os = useContext(OsContext);
  const dockApps = APPS.filter(app => DOCK_APPS.includes(app.id));

  return (
    <div className="w-full flex justify-center p-2">
      <div className="h-20 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center gap-4 px-4 border border-white/20 dark:border-black/20">
        {dockApps.map(app => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default Dock;
