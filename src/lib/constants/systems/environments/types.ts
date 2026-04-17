// lib/constants/systems/environments/types.ts
// Environment type definitions - separate from mapper.ts

import type { EnvironmentKey as BaseEnvironmentKey } from '../assets/mapper';

// Re-export the base keys
export type { BaseEnvironmentKey };

// Extended environment key (includes dynamic variants)
export type DynamicEnvironmentKey = BaseEnvironmentKey | 'auto' | 'adaptive';

// Environment context - what influences the environment choice
export interface EnvironmentContext {
  // User state
  userTier?: 'community' | 'ally' | 'corporate' | 'council';
  sovereigntyScore?: number;
  currentEnergy?: 'low' | 'medium' | 'high' | 'quantum';
  currentMood?: string[];
  
  // Session data
  sessionId?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek?: number;
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  
  // Page context
  currentRoute?: string;
  pageType?: 'home' | 'bazaar' | 'library' | 'stage' | 'studio' | 'council' | 'connect' | 'nexus' | 'cosmic' | 'supporting' | 'auth';
  
  // User preferences
  preferredEnvironment?: BaseEnvironmentKey;
  reducedMotion?: boolean;
  highContrast?: boolean;
  
  // Performance
  devicePerformance?: 'low' | 'medium' | 'high';
  networkSpeed?: 'slow' | 'medium' | 'fast';
}

// Environment resolution result
export interface EnvironmentResolution {
  key: BaseEnvironmentKey;
  variant: number;
  reason: string;
  confidence: number; // 0-1
}

// Environment rule - for dynamic selection
export interface EnvironmentRule {
  name: string;
  condition: (context: EnvironmentContext) => boolean;
  result: BaseEnvironmentKey;
  priority: number;
}

// Page to environment mapping (static fallback)
export interface PageEnvironmentMap {
  [route: string]: {
    default: BaseEnvironmentKey;
    variants?: {
      authenticated?: BaseEnvironmentKey;
      unauthenticated?: BaseEnvironmentKey;
      [key: string]: BaseEnvironmentKey | undefined;
    };
  };
}