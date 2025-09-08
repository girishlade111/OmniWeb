
import { App } from "@/types";
import {
  Settings,
  Globe,
  Calendar,
  MessageSquare,
  Folder,
  Image as ImageIcon,
  Clock,
  Contact,
  Music,
} from 'lucide-react';

import SettingsApp from "./apps/SettingsApp";
import BrowserApp from "./apps/BrowserApp";
import CalendarApp from "./apps/CalendarApp";
import MessagesApp from "./apps/MessagesApp";
import FileExplorerApp from "./apps/FileExplorerApp";
import GalleryApp from "./apps/GalleryApp";
import ClockApp from "./apps/ClockApp";
import ContactsApp from "./apps/ContactsApp";
import MusicApp from "./apps/MusicApp";

export const APPS: App[] = [
  { id: 'settings', name: 'Settings', Icon: Settings, component: SettingsApp, defaultSize: { width: 340, height: 500 } },
  { id: 'browser', name: 'Browser', Icon: Globe, component: BrowserApp, defaultSize: { width: 360, height: 600 }, resizable: true },
  { id: 'calendar', name: 'Calendar', Icon: Calendar, component: CalendarApp, defaultSize: { width: 320, height: 340 } },
  { id: 'messages', name: 'Messages', Icon: MessageSquare, component: MessagesApp, defaultSize: { width: 340, height: 550 } },
  { id: 'files', name: 'Files', Icon: Folder, component: FileExplorerApp, defaultSize: { width: 350, height: 400 } },
  { id: 'gallery', name: 'Gallery', Icon: ImageIcon, component: GalleryApp, defaultSize: { width: 350, height: 500 } },
  { id: 'clock', name: 'Clock', Icon: Clock, component: ClockApp, defaultSize: { width: 300, height: 200 } },
  { id: 'contacts', name: 'Contacts', Icon: Contact, component: ContactsApp, defaultSize: { width: 340, height: 500 } },
  { id: 'music', name: 'Music', Icon: Music, component: MusicApp, defaultSize: { width: 350, height: 580 } },
];

export const DOCK_APPS = ['browser', 'messages', 'gallery', 'settings'];
