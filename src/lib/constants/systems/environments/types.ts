// lib/constants/systems/environments/types.ts

import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';

export type BaseEnvironmentKey = EnvironmentKey;

export type DynamicEnvironmentKey = 
  | BaseEnvironmentKey
  | 'user_determined'
  | 'context_aware'
  | 'ai_suggested'
  | 'adaptive'

export interface PageMetadata {
  title: string;
  subtitle: string;
  environment: BaseEnvironmentKey;
}

export interface PageEnvironmentConfig {
  default: BaseEnvironmentKey;
  title: string;
  subtitle: string;
}

export type PageEnvironmentMap = Record<string, PageEnvironmentConfig>;

export interface HeaderTypography {
  title: string;
  subtitle: string;
  quote?: string;
}

export interface HeaderData {
  defaultTitle: string;
  showAncientQuoteDefault: boolean;
  environmentTitles: Record<BaseEnvironmentKey, string>;
  environmentSubtitles: Record<BaseEnvironmentKey, string>;
  pageTitles: Record<string, string>;
  pageSubtitles: Record<string, string>;
  typography: {
    default: HeaderTypography;
    mobile: HeaderTypography;
    desktop: HeaderTypography;
  };
}

// ============================================================================
// ENVIRONMENT RULES TYPES
// ============================================================================
// lib/constants/systems/environments/types.ts
// Add these missing types:

export interface EnvironmentContext {
  userTier?: 'community' | 'ally' | 'corporate' | 'council';
  sovereigntyScore?: number;
  currentEnergy?: 'low' | 'medium' | 'high' | 'quantum';
  currentMood?: string[];
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  reducedMotion?: boolean;
  highContrast?: boolean;
  devicePerformance?: 'low' | 'medium' | 'high';
  networkSpeed?: 'slow' | 'medium' | 'fast';
  path?: string;
  userId?: string;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export interface EnvironmentResolution {
  environment: BaseEnvironmentKey;
  variant: number;
  reason?: string;
  matchedRule?: string;
}

export interface EnvironmentRule {
  name: string;
  condition: (ctx: EnvironmentContext) => boolean;
  result: BaseEnvironmentKey;
  priority: number;
}
