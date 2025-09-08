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
      // Open the URL in a new browser tab
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // A slight delay to ensure the new tab is initiated before this placeholder closes.
      const timer = setTimeout(() => {
        // Find its own app instance to close.
        // This assumes the last opened app is this one.
        const myAppInstance = os.openApps[os.openApps.length-1];
        if (myAppInstance) {
          os.closeApp(myAppInstance.id);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [os, url]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-card">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-2">Opening...</span>
    </div>
  );
};

LinkApp.displayName = 'LinkApp';

export default LinkApp;
