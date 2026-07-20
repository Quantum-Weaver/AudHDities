// @/contexts/ContinuityBeamContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
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
  // ── X-OP-0 THE PAGE PROPS MADE REAL (Run 08, Phase 5, Movement I Step 2) ──
  // `<Page>` (bifrost/Page.tsx) declares showContinuityBeam/showStatusBar but
  // the beam + status bar actually render once, globally, in LayoutChrome.
  // These two flags are the honest wire between them: Page sets them per
  // route, LayoutChrome reads them to decide whether to render each.
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
  // Get environment from our environment system
  const { environment: currentEnvironment } = useEnvironment();
  const { profile, sovereignTier, isAuthenticated } = useUser();

  // The old numeric sovereignty_score became the sovereign_tier enum; the
  // beam still breathes on a number, so each tier carries its light-level.
  const TIER_SCORE: Record<string, number> = {
    dweller: 100, guild: 400, outlander: 700, sovereign_weaver: 1000,
  };
  const tierScore = (sovereignTier && TIER_SCORE[sovereignTier]) || 0;

  // Session state - now synced with user data
  const [sessionState, setSessionState] = useState<SessionState>({
    tier: (sovereignTier as SessionState['tier']) || 'community',
    sovereigntyScore: tierScore,
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
        tier: (sovereignTier as SessionState['tier']) || prev.tier,
        sovereigntyScore: tierScore || prev.sovereigntyScore,
      }));
    }
  }, [profile, sovereignTier, tierScore]);

  // Update activation state when session changes
  useEffect(() => {
    const newActivation = calculateBeamActivation(sessionState);
    setActivationState(newActivation);
    
    // Use current environment from environment system
    const newConfig = getBeamConfig(sessionState.environment as EnvironmentKey, sessionState);
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

  // ── X-OP-2 / IRI-1 — THE BEAM AS TRAVEL (Run 08, Phase 5, Movement I Step 2) ──
  // A manual setEnvironment() call (e.g. the EnvironmentSelector's live
  // preview) claims this environment value until the next real navigation —
  // the auto-sync effect below skips exactly one cycle when this is set,
  // honoring the opt-in law (an explicit choice is never silently overridden
  // mid-page).
  const manualOverrideRef = useRef(false);

  // Set environment (updates both systems)
  const setEnvironment = useCallback((environment: EnvironmentKey, variant?: number) => {
    manualOverrideRef.current = true;
    setSessionState(prev => ({ ...prev, environment }));
    if (variant !== undefined) {
      setEnvironmentVariant(Math.max(1, Math.min(4, variant)));
    }
  }, []);

  // `currentEnvironment` (above, from useEnvironment()) is already pathname-
  // reactive — it resolves on every route change via page_mapping.ts. Until
  // now it was read here and never used: sessionState.environment sat on
  // whatever `initialEnvironment` or the last manual setEnvironment() call
  // left it, so the beam never followed navigation. This effect follows the
  // route automatically (skipped once when a manual override just landed).
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

  // X-OP-0 THE PAGE PROPS MADE REAL — visibility flags <Page> sets per route;
  // LayoutChrome reads them to decide whether to render the beam/status bar.
  // Default true matches the pre-existing behavior (LayoutChrome's own
  // showContinuityBeam/showStatusBar props already default true) — nothing
  // that was on before is turned off by this wiring.
  const [beamVisible, setBeamVisible] = useState(true);
  const [statusBarVisible, setStatusBarVisible] = useState(true);

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