"use client";

import { useContext } from 'react';
import AppIcon from './AppIcon';
import { OsContext } from './OsContext';
import { DOCK_APPS } from './apps.config';
import Search from './Search';

const HomeScreen = () => {
  const os = useContext(OsContext);
  if (!os) return null;

  // Filter out apps that are in the dock
  const homeScreenApps = os.apps.filter(app => !DOCK_APPS.includes(app.id));

  return (
    <div className="flex-grow p-4 pt-6 space-y-8">
      <Search />
      <div className="grid grid-cols-4 gap-y-6 justify-items-center">
        {homeScreenApps.map(app => (
          <AppIcon key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
