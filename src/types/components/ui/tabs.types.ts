// src/types/components/ui/tabs.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABS TYPES                                             ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  TabsVariant,
  TabsSize,
  TabsOrientation,
  TabsBadgeVariant,
} from '@/lib/constants/components/ui/tabs.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { TabsVariant, TabsSize, TabsOrientation, TabsBadgeVariant };

// ─── Context ───────────────────────────────────────────────────────────────
export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  tabsId: string;
}

// ─── Tabs Root ─────────────────────────────────────────────────────────────
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// ─── Tabs List ─────────────────────────────────────────────────────────────
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

// ─── Tabs Trigger ──────────────────────────────────────────────────────────
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

// ─── Tabs Panel ────────────────────────────────────────────────────────────
export interface TabsPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

// ─── Composition Props ─────────────────────────────────────────────────────
export interface AnimatedTabsPanelProps extends TabsPanelProps {
  duration?: number;
}

export interface IconTabsTriggerProps extends TabsTriggerProps {
  icon: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface BadgeTabsTriggerProps extends TabsTriggerProps {
  badge?: string | number;
  badgeVariant?: TabsBadgeVariant;
}