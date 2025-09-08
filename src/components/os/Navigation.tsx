"use client";

import { useContext } from 'react';
import { Home, Square, ChevronLeft } from 'lucide-react';
import { OsContext } from './OsContext';

const Navigation = () => {
  const os = useContext(OsContext);

  if (!os) return null;

  return (
    <div className="w-full flex justify-center p-2 pb-1">
      <div className="h-12 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-around gap-4 px-6 border border-white/20 dark:border-black/20 w-[200px]">
        <button 
          className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50"
          aria-label="Back"
          disabled
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={os.closeAllApps}
          className="text-foreground/80 hover:text-foreground transition-colors"
          aria-label="Home"
        >
          <Home className="w-6 h-6" />
        </button>
        <button 
          className="text-foreground/80 hover:text-foreground transition-colors disabled:opacity-50"
          aria-label="Recents"
          disabled
        >
          <Square className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
