"use client";

import { useContext, useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { Card } from '@/components/ui/card';
import { X, Minus, Square } from 'lucide-react';
import { OsContext } from './OsContext';
import { APPS } from './apps.config';
import type { OpenApp } from '@/types';
import { cn } from '@/lib/utils';

interface WindowProps {
  openApp: OpenApp;
}

const Window = ({ openApp }: WindowProps) => {
  const os = useContext(OsContext);
  const app = APPS.find(a => a.id === openApp.id);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !windowRef.current || !app?.resizable) return;
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      os?.updateAppPosition(openApp.id, {
        x: windowStartPos.current.x + dx,
        y: windowStartPos.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, openApp.id, os, app?.resizable]);


  if (!os || !app) return null;

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    // Only drag on header, not on buttons
    if ((e.target as HTMLElement).closest('button') || !app.resizable) return;
    
    os.focusApp(openApp.id);
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { x: openApp.position.x, y: openApp.position.y };
  };

  const { component: AppContent } = app;
  
  return (
    <div
      ref={windowRef}
      className={cn("absolute transition-[transform,width,height] duration-200", os.activeAppId === openApp.id && "transform-gpu")}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${openApp.position.x}px, ${openApp.position.y}px)`,
        width: `${openApp.size.width}px`,
        height: `${openApp.size.height}px`,
        zIndex: openApp.zIndex,
      }}
      onMouseDown={() => os.focusApp(openApp.id)}
    >
      <Card className={cn(
        "w-full h-full flex flex-col shadow-2xl overflow-hidden transition-all duration-300 border-0 rounded-none",
        os.activeAppId === openApp.id ? 'ring-2 ring-primary/50' : ''
        )}>
        {app.resizable && (
          <div 
            className="h-8 bg-muted/80 flex items-center justify-between px-2 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <app.Icon className="w-4 h-4 text-foreground" />
              <span className="text-xs font-semibold">{app.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-white/20"><Minus className="w-3 h-3" /></button>
              <button className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-white/20"><Square className="w-3 h-3" /></button>
              <button 
                className="h-5 w-5 rounded-full flex items-center justify-center hover:bg-red-500"
                onClick={() => os.closeApp(openApp.id)}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
        <div className="flex-grow overflow-auto">
          <AppContent />
        </div>
      </Card>
    </div>
  );
};

export default Window;
