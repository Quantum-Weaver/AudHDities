// @/contexts/ContinuityBeamContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import type { SessionState, BeamActivationState } from '@/lib/constants/cosmic/consciousness';
import { calculateBeamActivation, getBeamIntensity } from '@/lib/constants/cosmic/consciousness';
import { getBeamConfig, type BeamConfig } from '@/lib/constants/components/immersive/continuity_beam';
import { EnvironmentPromptMap } from '@/lib/constants/systems/assets/environment_prompts';
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
  /** Whether the current page wants the ContinuityBeam shown. */
  beamVisible: boolean;
  /** Whether the current page wants the StatusBar shown. */
  statusBarVisible: boolean;
  setBeamVisible: (visible: boolean) => void;
  setStatusBarVisible: (visible: boolean) => void;
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
  const { environment: currentEnvironment } = useEnvironment();
  const { profile, sovereignTier, isAuthenticated } = useUser();

  const TIER_SCORE: Record<string, number> = {
    dweller: 100, guild: 400, outlander: 700, sovereign_weaver: 1000,
  };
  const tierScore = (sovereignTier && TIER_SCORE[sovereignTier]) || 0;

  const [sessionState, setSessionState] = useState<SessionState>({
    tier: (sovereignTier as SessionState['tier']) || 'community',
    sovereigntyScore: tierScore,
    environment: initialEnvironment,
    isFirstVisitToday: true,
    sessionDurationMinutes: 0,
    hasCompletedAcidTest: false,
    ...initialSessionState
  });

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
        tier: (sovereignTier as SessionState['tier']) || prev.tier,
        sovereigntyScore: tierScore || prev.sovereigntyScore,
      }));
    }
  }, [profile, sovereignTier, tierScore]);

  useEffect(() => {
    const newActivation = calculateBeamActivation(sessionState);
    setActivationState(newActivation);
    
    // Use current environment from environment system
    const newConfig = getBeamConfig(sessionState.environment as EnvironmentKey, sessionState);
    setBeamConfig(newConfig);
  }, [sessionState]);

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

  const manualOverrideRef = useRef(false);

  const setEnvironment = useCallback((environment: EnvironmentKey, variant?: number) => {
    manualOverrideRef.current = true;
    setSessionState(prev => ({ ...prev, environment }));
    if (variant !== undefined) {
      setEnvironmentVariant(Math.max(1, Math.min(4, variant)));
    }
  }, []);

  const hydratedPreferenceRef = useRef(false);
  useEffect(() => {
    if (!isAuthenticated || hydratedPreferenceRef.current) return;
    hydratedPreferenceRef.current = true;
    fetch('/api/generated/hestia-core/vessel_config?limit=1')
      .then(r => r.json())
      .then(res => {
        const rows = res?.success ? (res.data?.data ?? []) : [];
        const raw = rows[0] as Record<string, unknown> | undefined;
        const pref = typeof raw?.environment_preference === 'string' ? raw.environment_preference : '';
        if (!pref) return;
        const [env, variantStr] = pref.split(':');
        if (!env || !(env in EnvironmentPromptMap)) return;
        const variant = Math.max(1, Math.min(4, parseInt(variantStr || '1', 10) || 1));
        setEnvironment(env as EnvironmentKey, variant);
      })
      .catch(() => {});
  }, [isAuthenticated, setEnvironment]);

  useEffect(() => {
    if (manualOverrideRef.current) {
      manualOverrideRef.current = false;
      return;
    }
    setSessionState(prev =>
      prev.environment === currentEnvironment ? prev : { ...prev, environment: currentEnvironment }
    );
  }, [currentEnvironment]);

  const updateSessionState = useCallback((state: Partial<SessionState>) => {
    setSessionState(prev => ({ ...prev, ...state }));
  }, []);

  const setIsActive = useCallback((active: boolean) => {
    setActivationState(prev => ({ ...prev, active }));
  }, []);

  const [beamVisible, setBeamVisible] = useState(true);
  const [statusBarVisible, setStatusBarVisible] = useState(true);

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
      beamVisible,
      statusBarVisible,
      setBeamVisible,
      setStatusBarVisible,
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