import type { LucideIcon } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export interface App {
  id: string;
  name: string;
  Icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  component: ComponentType<any>;
  defaultSize?: { width: number; height: number };
  resizable?: boolean;
}

export interface OpenApp {
  id: string;
  zIndex: number;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
