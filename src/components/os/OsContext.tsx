"use client";

import type { App, OpenApp } from "@/types";
import { createContext } from "react";

interface OsContextType {
  apps: App[];
  openApps: OpenApp[];
  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  focusApp: (appId: string) => void;
  updateAppPosition: (appId: string, position: { x: number; y: number }) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeAppId: string | null;
}

export const OsContext = createContext<OsContextType | null>(null);
