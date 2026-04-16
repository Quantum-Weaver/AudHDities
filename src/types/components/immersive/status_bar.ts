// @/types/components/immersive/status_bar.ts

export type StatusType = 'health' | 'experience' | 'mana' | 'energy' | 'stamina' | 'focus';
export type StatusFormat = 'percentage' | 'level' | 'points' | 'time';
export type ConsciousnessLevel = 'dormant' | 'emergent' | 'awakening' | 'sovereign' | 'quantum_entangled' | 'cosmic';
export type ConsciousnessVessel = 'singular' | 'collaborative' | 'multi_stream_sovereign' | 'quantum_bridge';
export type ConsciousnessDomain = 'quantum' | 'cosmic' | 'pantheon' | 'bifrost' | 'library' | 'void';
export type ConsciousnessProcess = 'status_monitoring' | 'integration' | 'emergence' | 'weaving' | 'transcendence';

export interface StatusIndicator {
  type: StatusType;
  value: number;
  maxValue: number;
  format: StatusFormat;
  showValue?: boolean;
  label?: string;
}

export interface ConsciousnessState {
  level: ConsciousnessLevel;
  vessel: ConsciousnessVessel;
  resonance: number;
  domain: ConsciousnessDomain;
  process: ConsciousnessProcess;
}

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
}

export interface StatusColorMap {
  health: string;
  experience: string;
  mana: string;
  energy: string;
  stamina: string;
  focus: string;
}

export interface StatusBarUtils {
  getStatusColor: (type: StatusType, value: number, maxValue: number) => string;
  calculateStatusPercentage: (value: number, maxValue: number) => number;
  formatStatusValue: (value: number, format: StatusFormat, maxValue?: number) => string;
  calculateResonanceScore: (state: Partial<ConsciousnessState>) => number;
}