// lib/constants/transitions/mappings.ts
// ============================================================================
// ENVIRONMENT TO TRANSITION MAPPINGS - ALL 32 ENVIRONMENT KEYS
// ============================================================================

import { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { TRANSITION_BACKGROUNDS } from './backgrounds';
import { QUANTUM_FOREGROUNDS } from './foregrounds';

export const ENVIRONMENT_TRANSITION_MAP: Record<EnvironmentKey, {
  background: keyof typeof TRANSITION_BACKGROUNDS;
  foreground: keyof typeof QUANTUM_FOREGROUNDS | null;
  persistForeground?: boolean;
}> = {
  // ============================================================================
  // COUNCIL THEME - Quantum governance
  // ============================================================================
  council: { 
    background: 'quantumThreshold', 
    foreground: 'council', 
    persistForeground: false 
  },
  admin: { 
    background: 'quantumThreshold', 
    foreground: 'admin', 
    persistForeground: false 
  },
  creator: { 
    background: 'quantumThreshold', 
    foreground: 'creator', 
    persistForeground: false 
  },

  // ============================================================================
  // LIBRARY THEME - Knowledge preservation
  // ============================================================================
  library: { 
    background: 'libraryThreshold', 
    foreground: 'library', 
    persistForeground: false 
  },
  docs: { 
    background: 'libraryThreshold', 
    foreground: 'docs', 
    persistForeground: false 
  },
  ecosystem: { 
    background: 'libraryThreshold', 
    foreground: 'ecosystem', 
    persistForeground: false 
  },
  learn: { 
    background: 'libraryThreshold', 
    foreground: 'learn', 
    persistForeground: false 
  },

  // ============================================================================
  // COMMUNITY THEME - Collective consciousness
  // ============================================================================
  community: { 
    background: 'supportThreshold', 
    foreground: 'community', 
    persistForeground: false 
  },
  business: { 
    background: 'supportThreshold', 
    foreground: 'business', 
    persistForeground: false 
  },
  marketplace: { 
    background: 'supportThreshold', 
    foreground: 'marketplace', 
    persistForeground: false 
  },

  // ============================================================================
  // MUSIC THEME - Creative expression
  // ============================================================================
  music: { 
    background: 'creativeThreshold', 
    foreground: 'music', 
    persistForeground: false 
  },
  timer: { 
    background: 'creativeThreshold', 
    foreground: 'timer', 
    persistForeground: false 
  },

  // ============================================================================
  // ORIGIN THEME - Source energy
  // ============================================================================
  origin: { 
    background: 'transformativeThreshold', 
    foreground: 'origin', 
    persistForeground: false 
  },
  questionaire: { 
    background: 'transformativeThreshold', 
    foreground: 'questionaire', 
    persistForeground: false 
  },
  progress: { 
    background: 'transformativeThreshold', 
    foreground: 'progress', 
    persistForeground: false 
  },

  // ============================================================================
  // SUPPORT THEME - Sanctuary and care
  // ============================================================================
  support: { 
    background: 'supportThreshold', 
    foreground: 'support', 
    persistForeground: false 
  },
  contact: { 
    background: 'supportThreshold', 
    foreground: 'contact', 
    persistForeground: false 
  },
  anon: { 
    background: 'supportThreshold', 
    foreground: 'anon', 
    persistForeground: false 
  },

  // ============================================================================
  // HOME THEME - Fantasy sanctuary (PERSISTENT foreground)
  // ============================================================================
  home: { 
    background: 'hearthThreshold', 
    foreground: 'home', 
    persistForeground: true 
  },
  gateway: { 
    background: 'hearthThreshold', 
    foreground: 'gateway', 
    persistForeground: true 
  },
  seasonal: { 
    background: 'hearthThreshold', 
    foreground: 'seasonal', 
    persistForeground: true 
  },

  // ============================================================================
  // OBSERVATORY THEME - Cosmic vision (PERSISTENT foreground)
  // ============================================================================
  observatory: { 
    background: 'cosmicThreshold', 
    foreground: 'observatory', 
    persistForeground: true 
  },
  about: { 
    background: 'cosmicThreshold', 
    foreground: 'about', 
    persistForeground: true 
  },
  vision: { 
    background: 'cosmicThreshold', 
    foreground: 'vision', 
    persistForeground: true 
  },

  // ============================================================================
  // ARCHITECTURE THEME - System foundations
  // ============================================================================
  architecture: { 
    background: 'quantumThreshold', 
    foreground: 'architecture', 
    persistForeground: false 
  },
  dashboard: { 
    background: 'quantumThreshold', 
    foreground: 'dashboard', 
    persistForeground: false 
  },
  edit: { 
    background: 'quantumThreshold', 
    foreground: 'edit', 
    persistForeground: false 
  },
  cure: { 
    background: 'quantumThreshold', 
    foreground: 'cure', 
    persistForeground: false 
  },

  // ============================================================================
  // INVITATION THEME - Portal threshold
  // ============================================================================
  invitation: { 
    background: 'bifrostThreshold', 
    foreground: 'invitation', 
    persistForeground: false 
  },
  transparency: { 
    background: 'bifrostThreshold', 
    foreground: 'transparency', 
    persistForeground: false 
  },

  // ============================================================================
  // LOUNGE THEME - Social quantum space
  // ============================================================================
  lounge: { 
    background: 'bifrostThreshold', 
    foreground: 'lounge', 
    persistForeground: false 
  }
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get transition config for a specific environment
 */
export const getTransitionForEnvironment = (environment: EnvironmentKey) => {
  return ENVIRONMENT_TRANSITION_MAP[environment];
};

/**
 * Get foreground config for a specific environment
 */
export const getForegroundForEnvironment = (environment: EnvironmentKey) => {
  const transition = ENVIRONMENT_TRANSITION_MAP[environment];
  if (!transition.foreground) return null;
  return QUANTUM_FOREGROUNDS[transition.foreground];
};

/**
 * Get background config for a specific environment
 */
export const getBackgroundForEnvironment = (environment: EnvironmentKey) => {
  const transition = ENVIRONMENT_TRANSITION_MAP[environment];
  return TRANSITION_BACKGROUNDS[transition.background];
};

/**
 * Check if an environment has a persistent foreground
 */
export const hasPersistentForeground = (environment: EnvironmentKey): boolean => {
  return ENVIRONMENT_TRANSITION_MAP[environment]?.persistForeground || false;
};

export type TransitionBackgroundKey = keyof typeof TRANSITION_BACKGROUNDS;