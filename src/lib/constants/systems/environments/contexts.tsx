// lib/constants/systems/environments/contexts.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useUser, tierLight } from '@/hooks/useUser';
import type { 
  BaseEnvironmentKey, 
  EnvironmentContext as EnvironmentContextType,
  EnvironmentResolution 
} from './types';
import { getPageEnvironment } from './page_mapping';
import { ALL_ENVIRONMENT_RULES, DEFAULT_ENVIRONMENT } from './rules';

// ============================================================================
// CONTEXT TYPE (unchanged)
// ============================================================================

interface EnvironmentContextValue {
  environment: BaseEnvironmentKey;
  variant: number;
  isTransitioning: boolean;
  resolution: EnvironmentResolution | null;
  setOverride: (env: BaseEnvironmentKey | null) => void;
  clearOverride: () => void;
  refresh: () => void;
}

// ============================================================================
// DEFAULT VALUES (unchanged)
// ============================================================================

const DEFAULT_CONTEXT: EnvironmentContextValue = {
  environment: DEFAULT_ENVIRONMENT,
  variant: 1,
  isTransitioning: false,
  resolution: null,
  setOverride: () => {},
  clearOverride: () => {},
  refresh: () => {},
};

// ============================================================================
// CONTEXT (unchanged)
// ============================================================================

const EnvironmentContext = createContext<EnvironmentContextValue>(DEFAULT_CONTEXT);

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

// ============================================================================
// PROVIDER
// ============================================================================

export interface EnvironmentProviderProps {
  children: React.ReactNode;
  debug?: boolean;
}

export function EnvironmentProvider({ children, debug = false }: EnvironmentProviderProps) {
  const pathname = usePathname();
  const { user, profile, roles, sovereignTier, isLoading: isUserLoading } = useUser();
  
  const [environment, setEnvironment] = useState<BaseEnvironmentKey>(DEFAULT_ENVIRONMENT);
  const [variant, setVariant] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [override, setOverrideState] = useState<BaseEnvironmentKey | null>(null);
  const [resolution, setResolution] = useState<EnvironmentResolution | null>(null);
  
  // ============================================================================
  // ENVIRONMENT RESOLUTION FUNCTION
  // ============================================================================
  
  const resolveEnvironment = useCallback((): { environment: BaseEnvironmentKey; variant: number; reason: string } => {
    // If manually overridden, use that
    if (override) {
      return { environment: override, variant: 1, reason: 'manual_override' };
    }
    
    const ctx: EnvironmentContextType = {
      userTier: sovereignTier || 'dweller',
      sovereigntyScore: tierLight(sovereignTier),
      path: pathname,
      isAuthenticated: !!user,
      isAdmin: roles.includes('admin'),
      currentEnergy: 'medium',
      currentMood: [],
      timeOfDay: getTimeOfDay(),
      season: getCurrentSeason(),
      reducedMotion: typeof window !== 'undefined' ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches : false,
      highContrast: typeof window !== 'undefined' ? window.matchMedia?.('(prefers-contrast: more)').matches : false,
    };
    
    // First, check page-specific environment (from page_mapping)
    const pageEnvironment = getPageEnvironment(pathname);
    if (pageEnvironment !== DEFAULT_ENVIRONMENT) {
      return { environment: pageEnvironment, variant: 1, reason: 'page_mapping' };
    }
    
    const sortedRules = [...ALL_ENVIRONMENT_RULES].sort((a, b) => b.priority - a.priority);
    
    for (const rule of sortedRules) {
      try {
        if (rule.condition(ctx)) {
          return { environment: rule.result, variant: 1, reason: rule.name };
        }
      } catch (error) {
        if (debug) console.warn(`Rule ${rule.name} failed:`, error);
      }
    }
    
    // Fallback to default
    return { environment: DEFAULT_ENVIRONMENT, variant: 1, reason: 'default' };
  }, [override, profile, user, pathname, debug]);
  
  // ============================================================================
  // REFRESH FUNCTION
  // ============================================================================
  
  const refresh = useCallback(() => {
    const resolved = resolveEnvironment();
    
    if (resolved.environment !== environment) {
      setIsTransitioning(true);
      
      if (debug) {
        console.log(`🌍 Environment transition: ${environment} → ${resolved.environment} (${resolved.reason})`);
      }
      
      setResolution({
        environment: resolved.environment,
        variant: resolved.variant,
        reason: resolved.reason,
      });
      
      setEnvironment(resolved.environment);
      
      // End transition after animation duration
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    } else if (resolved.variant !== variant) {
      setVariant(resolved.variant);
    }
  }, [resolveEnvironment, environment, variant, debug]);
  
  // ============================================================================
  // OVERRIDE FUNCTIONS
  // ============================================================================
  
  const setOverride = useCallback((env: BaseEnvironmentKey | null) => {
    setOverrideState(env);
    if (debug) console.log(`🌍 Environment override set to: ${env || 'none'}`);
  }, [debug]);
  
  const clearOverride = useCallback(() => {
    setOverrideState(null);
    if (debug) console.log(`🌍 Environment override cleared`);
  }, [debug]);
  
  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  useEffect(() => {
    if (!isUserLoading) {
      refresh();
    }
  }, [refresh, pathname, user, profile, isUserLoading]);
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  const value: EnvironmentContextValue = {
    environment,
    variant,
    isTransitioning,
    resolution,
    setOverride,
    clearOverride,
    refresh,
  };
  
  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}