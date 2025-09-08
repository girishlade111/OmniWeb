"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { OsContext } from "./OsContext";
import { APPS } from "./apps.config";
import type { App, OpenApp } from "@/types";
import StatusBar from "./StatusBar";
import HomeScreen from "./HomeScreen";
import Dock from "./Dock";
import Window from "./Window";
import { cn } from "@/lib/utils";
import Navigation from "./Navigation";

const PHONE_WIDTH = 375;
const PHONE_HEIGHT = 812;
const STATUS_BAR_HEIGHT = 32;
const DOCK_HEIGHT = 80;
const NAVIGATION_HEIGHT = 48;
const APP_AREA_HEIGHT = PHONE_HEIGHT - STATUS_BAR_HEIGHT;

const OsWrapper = () => {
  const [apps] = useState<App[]>(APPS);
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let savedTheme: "light" | "dark" | null = null;
      try {
        savedTheme = localStorage.getItem("omniweb-theme") as "light" | "dark" | null;
      } catch (e) {
        // Silently fail if localStorage is not available
      }
      
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("omniweb-theme", newTheme);
      } catch (e) {
        // Silently fail if localStorage is not available
      }
      return newTheme;
    });
  }, []);

  const focusApp = useCallback((appId: string) => {
    if (activeAppId === appId) return;

    setActiveAppId(appId);
    setOpenApps(prev => {
      const app = prev.find(a => a.id === appId);
      if (app && app.zIndex < nextZIndex - 1) {
        const newZ = nextZIndex;
        setNextZIndex(newZ + 1);
        return prev.map(a => a.id === appId ? { ...a, zIndex: newZ } : a);
      }
      return prev;
    });
  }, [activeAppId, nextZIndex]);

  const openApp = useCallback((appId: string, props: Record<string, any> = {}) => {
    const appToOpen = apps.find(a => a.id === appId);
    if (!appToOpen) return;

    const isAlreadyOpen = openApps.some(a => a.id === appId);
    
    // For link apps, we don't care if it's already open, we want to open the browser
    if (isAlreadyOpen && appToOpen.component.displayName !== 'LinkApp') {
      focusApp(appId);
      return;
    }
    
    const newZ = nextZIndex;
    setNextZIndex(newZ + 1);
    
    // We create a unique ID for each app instance to handle multiple windows of the same app
    const instanceId = `${appId}-${Date.now()}`;
    setActiveAppId(instanceId);

    const defaultSize = { width: PHONE_WIDTH, height: APP_AREA_HEIGHT - DOCK_HEIGHT - NAVIGATION_HEIGHT};

    setOpenApps(prev => [
      ...prev,
      {
        id: instanceId, // Use instanceId here
        appId: appId,
        zIndex: newZ,
        isMinimized: false,
        position: { x: 0, y: 0 }, 
        size: defaultSize,
        props: props
      },
    ]);
  }, [apps, openApps, nextZIndex, focusApp]);

  const closeApp = useCallback((instanceId: string) => {
    setOpenApps(prev => prev.filter(a => a.id !== instanceId));
    if (activeAppId === instanceId) {
       const remainingApps = openApps.filter(a => a.id !== instanceId);
       if (remainingApps.length > 0) {
         // Focus the top-most app
         const topApp = remainingApps.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
         setActiveAppId(topApp.id);
       } else {
         setActiveAppId(null);
       }
    }
  }, [activeAppId, openApps]);
  
  const closeAllApps = useCallback(() => {
    setOpenApps([]);
    setActiveAppId(null);
  }, []);

  const updateAppPosition = useCallback((instanceId: string, position: { x: number, y: number }) => {
    setOpenApps(prev =>
      prev.map(app => (app.id === instanceId ? { ...app, position } : app))
    );
  }, []);

  const contextValue = useMemo(() => ({
    apps,
    openApps,
    openApp,
    closeApp,
    closeAllApps,
    focusApp,
    updateAppPosition,
    theme,
    toggleTheme,
    activeAppId,
  }), [apps, openApps, openApp, closeApp, closeAllApps, focusApp, updateAppPosition, theme, toggleTheme, activeAppId]);
  
  const body = (
      <div className={cn("bg-neutral-800 p-2 sm:p-4 rounded-[2.5rem] shadow-2xl transition-colors", theme)}>
        <div 
          className="w-[375px] h-[812px] bg-cover bg-center rounded-[2rem] overflow-hidden relative flex flex-col transition-colors border-8 border-black"
          style={{ backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-KraXm1UKi_9SRACIP9tvGkCuQRYEjJbfwgAAGIn__CtzvhsEKn9Kz9Rv8dWctUxblndqoPlQCHNvK30yS5In1hDKUdnknYrLGKa7M1tTUchpmzGaDTM7k9nc-BsKPuxFBVzJjYBrJps1B76rHL72tvYnlk2xzltlnV81zcZxajDbzDwyhyruF8BdATZ_/s1152/Gemini_Generated_Image_yaki32yaki32yaki.png')` }}
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col h-full">
            <StatusBar />
            <div className="flex-grow relative" style={{ height: APP_AREA_HEIGHT }}>
              <div className="absolute inset-0 h-full w-full" style={{height: `calc(100% - ${DOCK_HEIGHT + NAVIGATION_HEIGHT}px)`}}>
                <HomeScreen />
                {openApps.map(app => (
                  <Window key={app.id} openApp={app} />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0">
                <Dock />
                <Navigation />
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  // Render a placeholder on the server and initial client render, then the full UI.
  if (!isMounted) {
    return (
       <div className={cn("bg-neutral-800 p-2 sm:p-4 rounded-[2.5rem] shadow-2xl transition-colors", theme)}>
        <div className="w-[375px] h-[812px] bg-cover bg-center rounded-[2rem] overflow-hidden relative flex flex-col transition-colors border-8 border-black">
        </div>
      </div>
    );
  }

  return (
    <OsContext.Provider value={contextValue}>
      {body}
    </OsContext.Provider>
  );
};

export default OsWrapper;
