"use client";

import { useContext, useEffect } from 'react';
import { OsContext } from '../OsContext';
import { Loader2 } from 'lucide-react';

interface LinkAppProps {
  url: string;
}

const LinkApp = ({ url }: LinkAppProps) => {
  const os = useContext(OsContext);

  useEffect(() => {
    if (os && url) {
      // This component's purpose is to open the browser app with a specific URL
      // and then close itself.
      os.openApp('browser', { initialUrl: url });
      // A slight delay to ensure the browser opens before this placeholder closes.
      const timer = setTimeout(() => {
        // Need to figure out its own app id to close.
        // This is a bit of a hack, assumes the last opened app is this one.
        const myApp = os.openApps[os.openApps.length-1];
        if (myApp) {
          os.closeApp(myApp.id);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [os, url]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-card">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2">Redirecting...</span>
    </div>
  );
};

export default LinkApp;
