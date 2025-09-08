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

const PHONE_WIDTH = 380;
const PHONE_HEIGHT = 780;

const OsWrapper = () => {
  const [apps] = useState<App[]>(APPS);
  const [openApps, setOpenApps] = useState<OpenApp[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeAppId, setActiveAppId] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("omniweb-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no theme is saved, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("omniweb-theme", newTheme);
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

  const openApp = useCallback((appId: string) => {
    const appToOpen = apps.find(a => a.id === appId);
    if (!appToOpen) return;

    const isAlreadyOpen = openApps.some(a => a.id === appId);
    if (isAlreadyOpen) {
      focusApp(appId);
      return;
    }
    
    const newZ = nextZIndex;
    setNextZIndex(newZ + 1);
    setActiveAppId(appId);

    const defaultSize = appToOpen.defaultSize || { width: 350, height: 400 };

    setOpenApps(prev => [
      ...prev,
      {
        id: appId,
        zIndex: newZ,
        isMinimized: false,
        position: { x: (PHONE_WIDTH - defaultSize.width) / 2, y: (PHONE_HEIGHT - 300 - defaultSize.height) / 2 },
        size: defaultSize
      },
    ]);
  }, [apps, openApps, nextZIndex, focusApp]);

  const closeApp = useCallback((appId: string) => {
    setOpenApps(prev => prev.filter(a => a.id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  }, [activeAppId]);

  const updateAppPosition = useCallback((appId: string, position: { x: number, y: number }) => {
    setOpenApps(prev =>
      prev.map(app => (app.id === appId ? { ...app, position } : app))
    );
  }, []);

  const contextValue = useMemo(() => ({
    apps,
    openApps,
    openApp,
    closeApp,
    focusApp,
    updateAppPosition,
    theme,
    toggleTheme,
    activeAppId,
  }), [apps, openApps, openApp, closeApp, focusApp, updateAppPosition, theme, toggleTheme, activeAppId]);

  return (
    <OsContext.Provider value={contextValue}>
      <div className={cn("bg-neutral-800 p-2 sm:p-4 rounded-[2.5rem] shadow-2xl transition-colors", theme)}>
        <div 
          className="w-[375px] h-[812px] bg-cover bg-center rounded-[2rem] overflow-hidden relative flex flex-col transition-colors border-8 border-black"
          style={{ backgroundImage: theme === 'light' ? 'url(/wallpapers/light.jpg)' : 'url(/wallpapers/dark.jpg)' }}
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col h-full">
            <StatusBar />
            <div className="flex-grow relative">
                <HomeScreen />
                {openApps.map(app => (
                    <Window key={app.id} openApp={app} />
                ))}
            </div>
            <Dock />
          </div>
        </div>
      </div>
    </OsContext.Provider>
  );
};

export default OsWrapper;
