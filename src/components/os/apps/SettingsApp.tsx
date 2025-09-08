"use client";

import { useContext } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { OsContext } from '@/components/os/OsContext';
import { Wifi, Bluetooth, Moon, Sun } from 'lucide-react';
import AiRecommendations from '@/components/os/AiRecommendations';

const SettingsApp = () => {
  const os = useContext(OsContext);

  if (!os) return null;

  const { theme, toggleTheme } = os;

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>
      <div className="flex-grow p-4 space-y-6">
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">General</h3>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-primary" />
                    <Label htmlFor="wifi-switch">Wi-Fi</Label>
                </div>
                <Switch id="wifi-switch" defaultChecked />
            </div>
             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                <div className="flex items-center gap-3">
                    <Bluetooth className="w-5 h-5 text-primary" />
                    <Label htmlFor="bluetooth-switch">Bluetooth</Label>
                </div>
                <Switch id="bluetooth-switch" />
            </div>
        </div>

        <Separator />

        <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Display</h3>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                    <Label htmlFor="dark-mode-switch">Dark Mode</Label>
                </div>
                <Switch
                    id="dark-mode-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                />
            </div>
        </div>
        
        <Separator />

         <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">AI Features</h3>
            <AiRecommendations />
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
