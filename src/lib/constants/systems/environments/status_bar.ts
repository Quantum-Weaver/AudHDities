// lib/constants/systems/environments/status_bar.ts
// Status Bar Configuration - Complete for all EnvironmentKeys

import type { BaseEnvironmentKey } from './types';

export interface StatusBarMetric {
  type: 'health' | 'experience' | 'mana' | 'energy' | 'stamina' | 'focus' | 'sovereignty';
  label: string;
  icon?: string;
  format: 'percentage' | 'level' | 'points' | 'time';
  defaultMax: number;
  defaultValue: number;
  color: string;
  gradient?: string;
}

export interface StatusBarConfig {
  metrics: StatusBarMetric[];
  showLocation: boolean;
  showCurrency: boolean;
  currencyLabel?: string;
  showSovereignty: boolean;
  showLevel: boolean;
  notificationsEnabled: boolean;
  height: 'sm' | 'md' | 'lg';
}

export const STATUS_BAR_CONFIG: Record<BaseEnvironmentKey, StatusBarConfig> = {
  // ============================================================================
  // HESTIA (Hearth)
  // ============================================================================
  home: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 77, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  
  // ============================================================================
  // THEMIS (Council & Governance)
  // ============================================================================
  council: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-purple-400' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 85, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  admin: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-purple-400' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 95, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  transparency: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // ATHENA (Library & Learning)
  // ============================================================================
  library: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 92, color: 'bg-blue-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  learn: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 88, color: 'bg-blue-500' },
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  docs: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 90, color: 'bg-blue-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  ecosystem: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // HERMES (Bazaar & Commerce)
  // ============================================================================
  community: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 65, color: 'bg-yellow-500' },
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  marketplace: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 70, color: 'bg-yellow-500' },
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  business: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 80, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  creator: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 75, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: true,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  edit: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 85, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  plan: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 82, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  progress: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 60, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // PROMETHEUS (Stage & Studio)
  // ============================================================================
  music: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 88, color: 'bg-yellow-500' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 75, color: 'bg-pink-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  lounge: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 55, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  cure: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 85, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'md',
  },
  timer: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 78, color: 'bg-cyan-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // MNEMOSYNE (Observatory & Vision)
  // ============================================================================
  observatory: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 95, color: 'bg-purple-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  vision: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // MNEMOSYNE (Origin & Discovery)
  // ============================================================================
  origin: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  questionaire: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 90, color: 'bg-blue-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // AETHELRED (Nexus & Architecture)
  // ============================================================================
  architecture: {
    metrics: [
      { type: 'focus', label: 'Focus', format: 'percentage', defaultMax: 100, defaultValue: 82, color: 'bg-cyan-500' },
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: false,
    height: 'sm',
  },
  dashboard: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 72, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: true,
    notificationsEnabled: true,
    height: 'md',
  },
  
  // ============================================================================
  // IRIS (Bridge & Support)
  // ============================================================================
  support: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 42, color: 'bg-yellow-500' },
      { type: 'health', label: 'Health', format: 'percentage', defaultMax: 100, defaultValue: 85, color: 'bg-red-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: true,
    height: 'md',
  },
  contact: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 65, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  invitation: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  
  // ============================================================================
  // COSMIC (Design & Environment)
  // ============================================================================
  gateway: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 80, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'md',
  },
  
  // ============================================================================
  // SUPPORTING & UTILITY
  // ============================================================================
  about: {
    metrics: [
      { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: true,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  anon: {
    metrics: [],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
  seasonal: {
    metrics: [
      { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 75, color: 'bg-yellow-500' },
    ],
    showLocation: true,
    showCurrency: false,
    showSovereignty: false,
    showLevel: false,
    notificationsEnabled: false,
    height: 'sm',
  },
};

// Default config for any unmapped environment
export const DEFAULT_STATUS_BAR_CONFIG: StatusBarConfig = {
  metrics: [
    { type: 'sovereignty', label: 'Sovereignty', format: 'points', defaultMax: 10000, defaultValue: 0, color: 'text-cyan-400' },
    { type: 'energy', label: 'Energy', format: 'percentage', defaultMax: 100, defaultValue: 70, color: 'bg-yellow-500' },
  ],
  showLocation: true,
  showCurrency: true,
  showSovereignty: true,
  showLevel: true,
  notificationsEnabled: true,
  height: 'md',
};

export function getStatusBarConfig(environment: BaseEnvironmentKey): StatusBarConfig {
  return STATUS_BAR_CONFIG[environment] || DEFAULT_STATUS_BAR_CONFIG;
}

export interface UserStatusData {
  sovereigntyScore: number;
  level: number;
  energy: number;
  focus: number;
  health: number;
  currency: number;
  notifications: number;
  experience: number;
  spoons?: number;
  progress?: number;
  next_steps?: string;
  encouragement?: string;
  system_message?: string;
}

export const DEFAULT_USER_STATUS: UserStatusData = {
  sovereigntyScore: 0,
  level: 1,
  energy: 70,
  focus: 70,
  health: 100,
  currency: 0,
  notifications: 0,
  experience: 0
};