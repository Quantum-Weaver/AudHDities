/* @/contexts/ContinuityBeamContext.tsx */
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import type { SessionState, BeamActivationState } from '@/lib/constants/cosmic/consciousness';
import { calculateBeamActivation, getBeamIntensity } from '@/lib/constants/cosmic/consciousness';
import { getBeamConfig, type BeamConfig } from '@/lib/constants/components/immersive/continuity_beam';

interface ContinuityBeamContextValue {
  /** Current beam configuration (colors, intensity, direction) */
  beamConfig: BeamConfig;
  /** Current activation state (active, intensity level, speed multiplier) */
  activationState: BeamActivationState;
  /** Update the current environment */
  setEnvironment: (environment: EnvironmentKey) => void;
  /** Update session state (user tier, sovereignty score, etc.) */
  updateSessionState: (state: Partial<SessionState>) => void;
  /** Manually set beam active/inactive */
  setIsActive: (active: boolean) => void;
  /** Current session state */
  sessionState: SessionState;
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
  // Session state
  const [sessionState, setSessionState] = useState<SessionState>({
    tier: 'community',
    sovereigntyScore: 0,
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

  // Update activation state when session changes
  useEffect(() => {
    const newActivation = calculateBeamActivation(sessionState);
    setActivationState(newActivation);
    
    // Update beam config with new session state
    const newConfig = getBeamConfig(sessionState.environment, sessionState);
    setBeamConfig(newConfig);
  }, [sessionState]);

  // Update session duration over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionState(prev => ({
        ...prev,
        sessionDurationMinutes: prev.sessionDurationMinutes + 1
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const setEnvironment = (environment: EnvironmentKey) => {
    setSessionState(prev => ({ ...prev, environment }));
  };

  const updateSessionState = (state: Partial<SessionState>) => {
    setSessionState(prev => ({ ...prev, ...state }));
  };

  const setIsActive = (active: boolean) => {
    setActivationState(prev => ({ ...prev, active }));
  };

  return (
    <ContinuityBeamContext.Provider value={{
      beamConfig,
      activationState,
      setEnvironment,
      updateSessionState,
      setIsActive,
      sessionState
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