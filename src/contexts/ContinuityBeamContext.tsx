// contexts/ContinuityBeamContext.tsx - UPDATED WITH SYNC
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { User } from '@supabase/supabase-js';
import { Profile } from '@/types/supabase/supabase'; // Import your Profile type from the types you just created

type BeamVariant = EnvironmentKey;
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
  currentUser: Profile | null; // Changed from setUser to currentUser
  setCurrentUser: (user: Profile | null) => void; // Added this function
}

const ContinuityBeamContext = createContext<ContinuityBeamContextType | undefined>(undefined);

interface ContinuityBeamProviderProps {
  children: ReactNode;
}

export function ContinuityBeamProvider({ children }: ContinuityBeamProviderProps) {
  const [beamConfig, setBeamConfig] = useState<BeamConfig>({
    variant: 'QUANTUM',
    intensity: 0.8,
    showQuantumSweep: true
  });
  
  const [isActive, setIsActive] = useState(true);
  const [currentUser, setCurrentUser] = useState<Profile | null>(null); // Added user state

  // Function to sync with current environment
  const setEnvironment = (environment: EnvironmentKey) => {    
    setBeamConfig(prev => ({
      ...prev,
      variant: environment
    }));
  };

  return (
    <ContinuityBeamContext.Provider value={{
      beamConfig,
      setBeamConfig,
      setEnvironment,
      isActive,
      setIsActive,
      currentUser, // Export user data
      setCurrentUser, // Export setter for user
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