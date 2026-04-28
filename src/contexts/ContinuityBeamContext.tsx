// @/contexts/ContinuityBeamContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import type { SessionState, BeamActivationState } from '@/lib/constants/cosmic/consciousness';
import { calculateBeamActivation, getBeamIntensity } from '@/lib/constants/cosmic/consciousness';
import { getBeamConfig, type BeamConfig } from '@/lib/constants/components/immersive/continuity_beam';
import { useUser } from '@/hooks/useUser';
import { useEnvironment } from '@/lib/constants/systems/environments/contexts';

interface ContinuityBeamContextValue {
  /** Current beam configuration (colors, intensity, direction) */
  beamConfig: BeamConfig;
  /** Current activation state (active, intensity level, speed multiplier) */
  activationState: BeamActivationState;
  /** Update the current environment (deprecated - use useEnvironment instead) */
  setEnvironment: (environment: EnvironmentKey, variant?: number) => void;
  /** Update session state (user tier, sovereignty score, etc.) */
  updateSessionState: (state: Partial<SessionState>) => void;
  /** Manually set beam active/inactive */
  setIsActive: (active: boolean) => void;
  /** Current session state */
  sessionState: SessionState;
  environmentVariant: number; 
}

const ContinuityBeamContext = createContext<ContinuityBeamContextValue | undefined>(undefined);

interface ContinuityBeamProviderProps {
  children: ReactNode;
  initialEnvironment?: EnvironmentKey;
  initialSessionState?: Partial<SessionState>;
}

export function ContinuityBeamProvider({ 
  children, 
  initialEnvironment = 'home',
  initialSessionState = {}
}: ContinuityBeamProviderProps) {
  // Get environment from our environment system
  const { environment: currentEnvironment } = useEnvironment();
  const { profile, isAuthenticated } = useUser();
  
  // Session state - now synced with user data
  const [sessionState, setSessionState] = useState<SessionState>({
    tier: profile?.user_tier || 'community',
    sovereigntyScore: profile?.sovereignty_score || 0,
    environment: initialEnvironment,
    isFirstVisitToday: true,
    sessionDurationMinutes: 0,
    hasCompletedAcidTest: false,
    ...initialSessionState
  });

  // Activation state (derived from session state)
  const [activationState, setActivationState] = useState<BeamActivationState>(
    calculateBeamActivation(sessionState)
  );

  // Beam configuration (from environment + activation)
  const [beamConfig, setBeamConfig] = useState<BeamConfig>(
    getBeamConfig(initialEnvironment, sessionState)
  );

  // Sync session state with user profile
  useEffect(() => {
    if (profile) {
      setSessionState(prev => ({
        ...prev,
        tier: profile.user_tier || prev.tier,
        sovereigntyScore: profile.sovereignty_score ?? prev.sovereigntyScore,
      }));
    }
  }, [profile]);

  // Update activation state when session changes
  useEffect(() => {
    const newActivation = calculateBeamActivation(sessionState);
    setActivationState(newActivation);
    
    // Use current environment from environment system
    const newConfig = getBeamConfig(sessionState.environment, sessionState);
    setBeamConfig(newConfig);
  }, [sessionState]);

  // Update session duration over time (only when active)
  useEffect(() => {
    if (!activationState.active) return;
    
    const interval = setInterval(() => {
      setSessionState(prev => ({
        ...prev,
        sessionDurationMinutes: prev.sessionDurationMinutes + 1
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [activationState.active]);
  const [environmentVariant, setEnvironmentVariant] = useState(1);
  // Set environment (updates both systems)
  const setEnvironment = useCallback((environment: EnvironmentKey, variant?: number) => {
    setSessionState(prev => ({ ...prev, environment }));
    if (variant !== undefined) {
      setEnvironmentVariant(Math.max(1, Math.min(4, variant)));
    }
  }, []);

  const updateSessionState = useCallback((state: Partial<SessionState>) => {
    setSessionState(prev => ({ ...prev, ...state }));
  }, []);

  const setIsActive = useCallback((active: boolean) => {
    setActivationState(prev => ({ ...prev, active }));
  }, []);

  // Reset first visit flag after session
  useEffect(() => {
    if (sessionState.isFirstVisitToday) {
      const timer = setTimeout(() => {
        setSessionState(prev => ({ ...prev, isFirstVisitToday: false }));
      }, 30000); // First visit flag lasts 30 seconds
      return () => clearTimeout(timer);
    }
  }, [sessionState.isFirstVisitToday]);

  return (
    <ContinuityBeamContext.Provider value={{
      beamConfig,
      activationState,
      setEnvironment,
      updateSessionState,
      setIsActive,
      sessionState,
      environmentVariant,
    }}>
      {children}
    </ContinuityBeamContext.Provider>
  );
}

export function useContinuityBeam() {
  const context = useContext(ContinuityBeamContext);
  if (context === undefined) {
    throw new Error('useContinuityBeam must be used within a ContinuityBeamProvider');
  }
  return context;
}