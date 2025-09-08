
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
  Calculator,
  PenSquare,
  CloudSun,
  Terminal,
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
import CalculatorApp from "./apps/CalculatorApp";
import NotesApp from "./apps/NotesApp";
import WeatherApp from "./apps/WeatherApp";
import TerminalApp from "./apps/TerminalApp";


export const APPS: App[] = [
  { id: 'settings', name: 'Settings', Icon: Settings, component: SettingsApp, resizable: false },
  { id: 'browser', name: 'Browser', Icon: Globe, component: BrowserApp, resizable: false },
  { id: 'calendar', name: 'Calendar', Icon: Calendar, component: CalendarApp, resizable: false },
  { id: 'messages', name: 'Messages', Icon: MessageSquare, component: MessagesApp, resizable: false },
  { id: 'files', name: 'Files', Icon: Folder, component: FileExplorerApp, resizable: false },
  { id: 'gallery', name: 'Gallery', Icon: ImageIcon, component: GalleryApp, resizable: false },
  { id: 'clock', name: 'Clock', Icon: Clock, component: ClockApp, resizable: false },
  { id: 'contacts', name: 'Contacts', Icon: Contact, component: ContactsApp, resizable: false },
  { id: 'music', name: 'Music', Icon: Music, component: MusicApp, resizable: false },
  { id: 'calculator', name: 'Calculator', Icon: Calculator, component: CalculatorApp, resizable: false },
  { id: 'notes', name: 'Notes', Icon: PenSquare, component: NotesApp, resizable: false },
  { id: 'weather', name: 'Weather', Icon: CloudSun, component: WeatherApp, resizable: false },
  { id: 'terminal', name: 'Terminal', Icon: Terminal, component: TerminalApp, resizable: false },
];

export const DOCK_APPS = ['browser', 'messages', 'gallery', 'settings'];
