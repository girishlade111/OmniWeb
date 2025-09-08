"use client";

import { useContext } from 'react';
import AppIcon from './AppIcon';
import { OsContext } from './OsContext';
import { APPS, DOCK_APPS } from './apps.config';
import Search from './Search';

const HomeScreen = () => {
  const os = useContext(OsContext);
  if (!os) return null;

  // Filter out apps that are in the dock
  const homeScreenApps = APPS.filter(app => !DOCK_APPS.includes(app.id));

  // Don't render homescreen if an app is open
  if (os.openApps.length > 0) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 pt-6">
        <Search />
      </div>
      <div className="flex-grow grid grid-cols-4 gap-y-6 content-start justify-items-center p-4">
        {homeScreenApps.map(app => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
