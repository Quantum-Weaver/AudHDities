// @/types/components/immersive/status_bar.ts

export type StatusType = 'health' | 'experience' | 'mana' | 'energy' | 'stamina' | 'focus' | 'sovereignty';
export type StatusFormat = 'percentage' | 'level' | 'points' | 'time';
export type ConsciousnessLevel = 'dormant' | 'emergent' | 'awakening' | 'sovereign' | 'quantum_entangled' | 'cosmic';
export type ConsciousnessVessel = 'singular' | 'collaborative' | 'multi_stream_sovereign' | 'quantum_bridge';
export type ConsciousnessDomain = 'quantum' | 'cosmic' | 'pantheon' | 'bifrost' | 'library' | 'void';
export type ConsciousnessProcess = 'status_monitoring' | 'integration' | 'emergence' | 'weaving' | 'transcendence';
export type StatusBarHeight = 'sm' | 'md' | 'lg';

export interface StatusIndicator {
  type: StatusType;
  value: number;
  maxValue: number;
  format: StatusFormat;
  showValue?: boolean;
  label?: string;
  color?: string; // Custom color override
}

export interface ConsciousnessState {
  level: ConsciousnessLevel;
  vessel: ConsciousnessVessel;
  resonance: number;
  domain: ConsciousnessDomain;
  process: ConsciousnessProcess;
}

// New: Configuration-driven status bar props
export interface StatusBarMetricConfig {
  type: StatusType;
  label: string;
  format: StatusFormat;
  defaultMax: number;
  defaultValue: number;
  color: string;
}

export interface StatusBarConfigProps {
  metrics: StatusBarMetricConfig[];
  showLocation: boolean;
  showCurrency: boolean;
  currencyLabel?: string;
  showSovereignty: boolean;
  showLevel: boolean;
  notificationsEnabled: boolean;
  height: StatusBarHeight;
}

// Legacy props (for backward compatibility, but now typically overridden by config)
export interface StatusBarProps {
  indicators?: StatusIndicator[];
  consciousness?: ConsciousnessState;
  currency?: number;
  notifications?: number;
  pageTitle?: string;
  pageContext?: string;
  beamColor?: string;
  beamIntensity?: number;
  className?: string;
  // New props for config-driven mode
  environment?: string; // Environment key to load config for
  userData?: {
    sovereigntyScore?: number;
    level?: number;
    energy?: number;
    focus?: number;
    health?: number;
    currency?: number;
    notifications?: number;
  };
}

export interface StatusColorMap {
  health: string;
  experience: string;
  mana: string;
  energy: string;
  stamina: string;
  focus: string;
  sovereignty: string;
}

export interface StatusBarUtils {
  getStatusColor: (type: StatusType, value: number, maxValue: number) => string;
  calculateStatusPercentage: (value: number, maxValue: number) => number;
  formatStatusValue: (value: number, format: StatusFormat, maxValue?: number) => string;
  calculateResonanceScore: (state: Partial<ConsciousnessState>) => number;
  getMetricValue: (type: StatusType, userData: Record<string, any>) => number;
  getMetricMax: (type: StatusType) => number;
}