/* src/contexts/ContinuityBeamContext.tsx */
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { User } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase/database.types';
import { DEFAULT_BEAM_CONFIG, ENVIRONMENT_BEAM_CONFIGS } from '@/lib/constants/components/immersive/continuity-beam';

export type Profile = Database['public']['Tables']['profiles']['Row'];

interface BeamConfig {
  variant: string;
  intensity: number;
  showQuantumSweep: boolean;
}

interface ContinuityBeamContextType {
  beamConfig: BeamConfig;
  setBeamConfig: (config: BeamConfig) => void;
  setEnvironment: (environment: EnvironmentKey) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  currentUser: Profile | null;
  setCurrentUser: (user: Profile | null) => void;
  // Optional: Get environment-specific config
  getEnvironmentConfig: (environment: EnvironmentKey) => { intensity: string; purpose: string };
}

const ContinuityBeamContext = createContext<ContinuityBeamContextType | undefined>(undefined);

interface ContinuityBeamProviderProps {
  children: ReactNode;
  defaultEnvironment?: EnvironmentKey;
}

export function ContinuityBeamProvider({ 
  children, 
  defaultEnvironment = 'home' 
}: ContinuityBeamProviderProps) {
  const [beamConfig, setBeamConfig] = useState<BeamConfig>({
    variant: defaultEnvironment,
    intensity: 0.8,
    showQuantumSweep: DEFAULT_BEAM_CONFIG.showQuantumSweep
  });
  
  const [isActive, setIsActive] = useState(true);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  // Function to sync with current environment
  const setEnvironment = (environment: EnvironmentKey) => {
    // Get environment-specific config if exists
    const envConfig = ENVIRONMENT_BEAM_CONFIGS[environment as keyof typeof ENVIRONMENT_BEAM_CONFIGS];
    
    // Map string intensity to number (safe fallback)
    let intensityValue = 0.8;
    if (envConfig) {
      const intensityMap = { low: 0.33, medium: 0.47, high: 0.66, quantum: 0.85 };
      intensityValue = intensityMap[envConfig.intensity as keyof typeof intensityMap] || DEFAULT_BEAM_CONFIG.intensity;
    }
    
    setBeamConfig(prev => ({
      ...prev,
      variant: environment,
      intensity: intensityValue
    }));
  };

  // Helper to get environment config (for components that need it)
  const getEnvironmentConfig = (environment: EnvironmentKey) => {
    const config = ENVIRONMENT_BEAM_CONFIGS[environment as keyof typeof ENVIRONMENT_BEAM_CONFIGS];
    return {
      intensity: config?.intensity || 'medium',
      purpose: config?.purpose || 'emotional_support'
    };
  };

  return (
    <ContinuityBeamContext.Provider value={{
      beamConfig,
      setBeamConfig,
      setEnvironment,
      isActive,
      setIsActive,
      currentUser,
      setCurrentUser,
      getEnvironmentConfig
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