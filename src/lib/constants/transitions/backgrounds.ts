// lib/constants/transitions/backgrounds.ts
// ============================================================================
// TRANSITION BACKGROUNDS - MYSTICAL THRESHOLD SPACES
// Each transition background now maps to the actual environment background image
// ============================================================================

import { QUANTUM_GRADIENTS, QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { HOLOGRAPHIC_EFFECTS, GLOW_EFFECTS } from '@/lib/constants/cosmic/effects';

// ============================================================================
// BACKGROUND IMAGE URLS - Mapped to each environment theme
// These are the actual 360-panorama backgrounds from AssetMapper
// ============================================================================

export const TRANSITION_BACKGROUND_IMAGES = {
  // Council Theme
  council: '/environments/360-panoramas/council/council-background-1.webp',
  admin: '/environments/360-panoramas/council/council-background-1.webp',
  creator: '/environments/360-panoramas/council/council-background-1.webp',
  
  // Library Theme
  library: '/environments/360-panoramas/library/library-background-1.webp',
  docs: '/environments/360-panoramas/library/library-background-1.webp',
  ecosystem: '/environments/360-panoramas/library/library-background-1.webp',
  learn: '/environments/360-panoramas/library/library-background-1.webp',
  
  // Community Theme
  community: '/environments/360-panoramas/community/community-background-1.webp',
  business: '/environments/360-panoramas/community/community-background-1.webp',
  marketplace: '/environments/360-panoramas/community/community-background-1.webp',
  
  // Music Theme
  music: '/environments/360-panoramas/music/music-page-background-1.webp',
  timer: '/environments/360-panoramas/music/music-page-background-1.webp',
  
  // Origin Theme
  origin: '/environments/360-panoramas/origin/origin-background-1.webp',
  questionaire: '/environments/360-panoramas/origin/origin-background-1.webp',
  progress: '/environments/360-panoramas/origin/origin-background-1.webp',
  
  // Support Theme
  support: '/environments/360-panoramas/support/support-background-1.webp',
  contact: '/environments/360-panoramas/support/support-background-1.webp',
  anon: '/environments/360-panoramas/support/support-background-1.webp',
  
  // Home Theme (Fantasy)
  home: '/environments/360-panoramas/home/home-background-1.webp',
  gateway: '/environments/360-panoramas/home/home-background-1.webp',
  seasonal: '/environments/360-panoramas/home/home-background-1.webp',
  
  // Observatory Theme
  observatory: '/environments/360-panoramas/observatory/observatory-background-1.webp',
  about: '/environments/360-panoramas/observatory/observatory-background-1.webp',
  vision: '/environments/360-panoramas/observatory/observatory-background-1.webp',
  
  // Architecture Theme
  architecture: '/environments/360-panoramas/architecture/architecture-background-1.webp',
  dashboard: '/environments/360-panoramas/architecture/architecture-background-1.webp',
  edit: '/environments/360-panoramas/architecture/architecture-background-1.webp',
  cure: '/environments/360-panoramas/architecture/architecture-background-1.webp',
  
  // Invitation Theme
  invitation: '/environments/360-panoramas/invitation/invitaion-background-1.webp',
  transparency: '/environments/360-panoramas/invitation/invitaion-background-1.webp',
  
  // Lounge Theme
  lounge: '/environments/360-panoramas/lounge/lounge-background-1.webp',
} as const;

// ============================================================================
// TRANSITION BACKGROUND CONFIGURATIONS
// Each configuration includes gradient overlay and mystical effects
// The actual background image will be overlaid with these effects
// ============================================================================

export const TRANSITION_BACKGROUNDS = {
  // Quantum Transition - For council/architecture domains
  quantumThreshold: {
    // Base background image (will be overlaid with gradient)
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.council,
    gradient: QUANTUM_GRADIENTS.quantumDomain,
    pattern: 'quantum_weave',
    particles: true,
    glow: GLOW_EFFECTS.quantum,
    holographic: HOLOGRAPHIC_EFFECTS.scan,
    intention: 'alignment' as const,
    duration: { fadeIn: 400, fadeOut: 600, hold: 200 }
  },
  
  // Cosmic Transition - For observatory/cosmic domains
  cosmicThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.observatory,
    gradient: QUANTUM_GRADIENTS.cosmicDomain,
    pattern: 'nebula_swirl',
    particles: true,
    glow: GLOW_EFFECTS.cosmic,
    holographic: HOLOGRAPHIC_EFFECTS.particles,
    intention: 'expansion' as const,
    duration: { fadeIn: 600, fadeOut: 400, hold: 300 }
  },
  
  // Hearth Transition - For home/gateway domains (Fantasy/WoW style)
  hearthThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.home,
    gradient: QUANTUM_GRADIENTS.sovereign,
    pattern: 'ember_rise',
    particles: true,
    glow: GLOW_EFFECTS.focus,
    holographic: null,
    intention: 'grounding' as const,
    duration: { fadeIn: 500, fadeOut: 500, hold: 250 }
  },
  
  // Bifrost Transition - For invitation/lounge domains
  bifrostThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.invitation,
    gradient: QUANTUM_GRADIENTS.bifrostDomain,
    pattern: 'rainbow_bridge',
    particles: true,
    glow: GLOW_EFFECTS.hover,
    holographic: HOLOGRAPHIC_EFFECTS.rainbow,
    intention: 'connection' as const,
    duration: { fadeIn: 450, fadeOut: 450, hold: 300 }
  },
  
  // Library Transition - For library/docs domains
  libraryThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.library,
    gradient: QUANTUM_GRADIENTS.libraryDomain,
    pattern: 'page_turn',
    particles: false,
    glow: GLOW_EFFECTS.focus,
    holographic: null,
    intention: 'revelation' as const,
    duration: { fadeIn: 350, fadeOut: 550, hold: 200 }
  },
  
  // Support Transition - For support/contact domains
  supportThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.support,
    gradient: QUANTUM_GRADIENTS.supportDomain,
    pattern: 'gentle_waves',
    particles: true,
    glow: GLOW_EFFECTS.cosmic,
    holographic: null,
    intention: 'holding' as const,
    duration: { fadeIn: 700, fadeOut: 300, hold: 400 }
  },
  
  // Creative Transition - For music domains
  creativeThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.music,
    gradient: QUANTUM_GRADIENTS.creativeGradient,
    pattern: 'sound_waves',
    particles: true,
    glow: GLOW_EFFECTS.hover,
    holographic: HOLOGRAPHIC_EFFECTS.particles,
    intention: 'inspiration' as const,
    duration: { fadeIn: 400, fadeOut: 500, hold: 250 }
  },
  
  // Transformative Transition - For origin domains
  transformativeThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.origin,
    gradient: QUANTUM_GRADIENTS.transformativeEnergy,
    pattern: 'spiral_emerge',
    particles: true,
    glow: GLOW_EFFECTS.quantum,
    holographic: HOLOGRAPHIC_EFFECTS.glitch,
    intention: 'metamorphosis' as const,
    duration: { fadeIn: 550, fadeOut: 450, hold: 350 }
  },
  
  // Community Transition - For community domains
  communityThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.community,
    gradient: QUANTUM_GRADIENTS.communityDomain,
    pattern: 'collective_weave',
    particles: true,
    glow: GLOW_EFFECTS.cosmic,
    holographic: null,
    intention: 'connection' as const,
    duration: { fadeIn: 500, fadeOut: 500, hold: 300 }
  },
  
  // Architecture Transition - For architecture domains
  architectureThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.architecture,
    gradient: QUANTUM_GRADIENTS.architectureDomain,
    pattern: 'geometric_flow',
    particles: true,
    glow: GLOW_EFFECTS.quantum,
    holographic: HOLOGRAPHIC_EFFECTS.scan,
    intention: 'alignment' as const,
    duration: { fadeIn: 450, fadeOut: 550, hold: 250 }
  },
  
  // Default Threshold - Fallback (uses home background)
  defaultThreshold: {
    backgroundImage: TRANSITION_BACKGROUND_IMAGES.home,
    gradient: QUANTUM_GRADIENTS.quantum,
    pattern: 'subtle_flow',
    particles: true,
    glow: GLOW_EFFECTS.quantum,
    holographic: null,
    intention: 'transition' as const,
    duration: { fadeIn: 500, fadeOut: 500, hold: 300 }
  }
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get transition background by environment key
 */
export const getTransitionBackgroundForEnvironment = (environment: keyof typeof TRANSITION_BACKGROUND_IMAGES) => {
  const themeMap: Record<string, keyof typeof TRANSITION_BACKGROUNDS> = {
    // Council theme
    council: 'quantumThreshold',
    admin: 'quantumThreshold',
    creator: 'quantumThreshold',
    // Library theme
    library: 'libraryThreshold',
    docs: 'libraryThreshold',
    ecosystem: 'libraryThreshold',
    learn: 'libraryThreshold',
    // Community theme
    community: 'communityThreshold',
    business: 'communityThreshold',
    marketplace: 'communityThreshold',
    // Music theme
    music: 'creativeThreshold',
    timer: 'creativeThreshold',
    // Origin theme
    origin: 'transformativeThreshold',
    questionaire: 'transformativeThreshold',
    progress: 'transformativeThreshold',
    // Support theme
    support: 'supportThreshold',
    contact: 'supportThreshold',
    anon: 'supportThreshold',
    // Home theme
    home: 'hearthThreshold',
    gateway: 'hearthThreshold',
    seasonal: 'hearthThreshold',
    // Observatory theme
    observatory: 'cosmicThreshold',
    about: 'cosmicThreshold',
    vision: 'cosmicThreshold',
    // Architecture theme
    architecture: 'architectureThreshold',
    dashboard: 'architectureThreshold',
    edit: 'architectureThreshold',
    cure: 'architectureThreshold',
    // Invitation theme
    invitation: 'bifrostThreshold',
    transparency: 'bifrostThreshold',
    // Lounge theme
    lounge: 'bifrostThreshold',
  };
  
  const themeKey = themeMap[environment] || 'defaultThreshold';
  return TRANSITION_BACKGROUNDS[themeKey];
};

/**
 * Get transition background image URL for an environment
 */
export const getTransitionBackgroundImage = (environment: keyof typeof TRANSITION_BACKGROUND_IMAGES): string => {
  return TRANSITION_BACKGROUND_IMAGES[environment] || TRANSITION_BACKGROUND_IMAGES.home;
};

export type TransitionIntention = 
  | 'alignment'
  | 'expansion'
  | 'grounding'
  | 'connection'
  | 'revelation'
  | 'holding'
  | 'inspiration'
  | 'metamorphosis'
  | 'transition';

export type TransitionBackgroundKey = keyof typeof TRANSITION_BACKGROUNDS;