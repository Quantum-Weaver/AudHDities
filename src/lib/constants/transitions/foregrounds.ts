// lib/constants/transitions/foregrounds.ts
// ============================================================================
// QUANTUM FOREGROUNDS - PERSISTENT MYSTICAL ELEMENTS
// All 32 environment keys mapped to their mystical foreground elements
// ============================================================================
export const TRANSITION_FOREGROUND_IMAGES = {
  // Council Theme
  council: '/environments/360-panoramas/council/council-foreground-1.webp',
  plan: '/environments/360-panoramas/council/council-foreground-1.webp',
  admin: '/environments/360-panoramas/council/council-foreground-1.webp',
  creator: '/environments/360-panoramas/council/council-foreground-1.webp',
  
  // Library Theme
  library: '/environments/360-panoramas/library/library-foreground-1.webp',
  docs: '/environments/360-panoramas/library/library-foreground-1.webp',
  ecosystem: '/environments/360-panoramas/library/library-foreground-1.webp',
  learn: '/environments/360-panoramas/library/library-foreground-1.webp',
  
  // Community Theme
  community: '/environments/360-panoramas/community/community-foreground-1.webp',
  business: '/environments/360-panoramas/community/community-foreground-1.webp',
  marketplace: '/environments/360-panoramas/community/community-foreground-1.webp',
  
  // Music Theme
  music: '/environments/360-panoramas/music/music-page-foreground-1.png',
  timer: '/environments/360-panoramas/music/music-page-foreground-1.png',
  
  // Origin Theme
  origin: '/environments/360-panoramas/origin/origin-foreground-1.png',
  questionaire: '/environments/360-panoramas/origin/origin-foreground-1.png',
  progress: '/environments/360-panoramas/origin/origin-foreground-1.png',
  
  // Support Theme
  support: '/environments/360-panoramas/support/music-foreground-1.png',
  contact: '/environments/360-panoramas/support/music-foreground-1.png',
  anon: '/environments/360-panoramas/support/music-foreground-1.png',
  
  // Home Theme (Fantasy)
  home: '/environments/360-panoramas/home/home-foreground-1.png',
  gateway: '/environments/360-panoramas/home/home-foreground-1.png',
  seasonal: '/environments/360-panoramas/home/home-foreground-1.png',
  
  // Observatory Theme
  observatory: '/environments/360-panoramas/observatory/observatory-foreground-1.png',
  about: '/environments/360-panoramas/observatory/observatory-foreground-1.png',
  vision: '/environments/360-panoramas/observatory/observatory-foreground-1.png',
  
  // Architecture Theme
  architecture: '/environments/360-panoramas/architecture/architecture-foreground-1.png',
  dashboard: '/environments/360-panoramas/architecture/architecture-foreground-1.png',
  edit: '/environments/360-panoramas/architecture/architecture-foreground-1.png',
  cure: '/environments/360-panoramas/architecture/architecture-foreground-1.png',
  
  // Invitation Theme
  invitation: '/environments/360-panoramas/invitation/invitaion-foreground-1.png',
  transparency: '/environments/360-panoramas/invitation/invitaion-foreground-1.png',
  
  // Lounge Theme
  lounge: '/environments/360-panoramas/lounge/lounge-foreground-1.png',
} as const;

export const QUANTUM_FOREGROUNDS = {
  // Council Chamber - Quantum governance symbols
  council: {
    element: 'council_ring',
    animation: 'orbital_rotate',
    persist: false,
    opacity: { start: 0.8, peak: 1, end: 0 },
    duration: { enter: 300, hold: 400, exit: 500 }
  },
  
  admin: {
    element: 'council_ring',
    animation: 'orbital_rotate',
    persist: false,
    opacity: { start: 0.8, peak: 1, end: 0 },
    duration: { enter: 300, hold: 400, exit: 500 }
  },
  
  creator: {
    element: 'council_ring',
    animation: 'orbital_rotate',
    persist: false,
    opacity: { start: 0.8, peak: 1, end: 0 },
    duration: { enter: 300, hold: 400, exit: 500 }
  },
  
  // Library - Floating pages and knowledge
  library: {
    element: 'floating_pages',
    animation: 'gentle_drift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 450, hold: 600, exit: 450 }
  },
  
  docs: {
    element: 'floating_pages',
    animation: 'gentle_drift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 450, hold: 600, exit: 450 }
  },
  
  ecosystem: {
    element: 'floating_pages',
    animation: 'gentle_drift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 450, hold: 600, exit: 450 }
  },
  
  learn: {
    element: 'floating_pages',
    animation: 'gentle_drift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 450, hold: 600, exit: 450 }
  },
  
  // Community - Collective energy orbs
  community: {
    element: 'community_orbs',
    animation: 'gentle_pulse',
    persist: false,
    opacity: { start: 0.6, peak: 0.9, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  business: {
    element: 'community_orbs',
    animation: 'gentle_pulse',
    persist: false,
    opacity: { start: 0.6, peak: 0.9, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  marketplace: {
    element: 'community_orbs',
    animation: 'gentle_pulse',
    persist: false,
    opacity: { start: 0.6, peak: 0.9, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  // Music - Sound waves and ripples
  music: {
    element: 'sound_ripple',
    animation: 'pulse_wave',
    persist: false,
    opacity: { start: 0.5, peak: 1, end: 0 },
    duration: { enter: 400, hold: 500, exit: 600 }
  },
  
  timer: {
    element: 'sound_ripple',
    animation: 'pulse_wave',
    persist: false,
    opacity: { start: 0.5, peak: 1, end: 0 },
    duration: { enter: 400, hold: 500, exit: 600 }
  },
  
  // Origin - Spiral emergence
  origin: {
    element: 'spiral_emerge',
    animation: 'unfold',
    persist: false,
    opacity: { start: 0.3, peak: 0.9, end: 0 },
    duration: { enter: 700, hold: 300, exit: 400 }
  },
  
  questionaire: {
    element: 'spiral_emerge',
    animation: 'unfold',
    persist: false,
    opacity: { start: 0.3, peak: 0.9, end: 0 },
    duration: { enter: 700, hold: 300, exit: 400 }
  },
  
  progress: {
    element: 'spiral_emerge',
    animation: 'unfold',
    persist: false,
    opacity: { start: 0.3, peak: 0.9, end: 0 },
    duration: { enter: 700, hold: 300, exit: 400 }
  },
  
  // Support - Gentle nurturing light
  support: {
    element: 'gentle_light',
    animation: 'soft_pulse',
    persist: false,
    opacity: { start: 0.4, peak: 0.7, end: 0 },
    duration: { enter: 500, hold: 600, exit: 400 }
  },
  
  contact: {
    element: 'gentle_light',
    animation: 'soft_pulse',
    persist: false,
    opacity: { start: 0.4, peak: 0.7, end: 0 },
    duration: { enter: 500, hold: 600, exit: 400 }
  },
  
  anon: {
    element: 'gentle_light',
    animation: 'soft_pulse',
    persist: false,
    opacity: { start: 0.4, peak: 0.7, end: 0 },
    duration: { enter: 500, hold: 600, exit: 400 }
  },
  
  // Home - Sanctuary hearth (persistent)
  home: {
    element: 'hearth_flame',
    animation: 'gentle_flicker',
    persist: true,
    opacity: { start: 0.6, peak: 0.9, end: 0.7 },
    duration: { enter: 500, hold: null, exit: null }
  },
  
  gateway: {
    element: 'hearth_flame',
    animation: 'gentle_flicker',
    persist: true,
    opacity: { start: 0.6, peak: 0.9, end: 0.7 },
    duration: { enter: 500, hold: null, exit: null }
  },
  
  seasonal: {
    element: 'hearth_flame',
    animation: 'gentle_flicker',
    persist: true,
    opacity: { start: 0.6, peak: 0.9, end: 0.7 },
    duration: { enter: 500, hold: null, exit: null }
  },
  
  // Observatory - Celestial orbs (persistent)
  observatory: {
    element: 'celestial_spheres',
    animation: 'cosmic_drift',
    persist: true,
    opacity: { start: 0.4, peak: 0.8, end: 0.6 },
    duration: { enter: 600, hold: null, exit: null }
  },
  
  about: {
    element: 'celestial_spheres',
    animation: 'cosmic_drift',
    persist: true,
    opacity: { start: 0.4, peak: 0.8, end: 0.6 },
    duration: { enter: 600, hold: null, exit: null }
  },
  
  vision: {
    element: 'celestial_spheres',
    animation: 'cosmic_drift',
    persist: true,
    opacity: { start: 0.4, peak: 0.8, end: 0.6 },
    duration: { enter: 600, hold: null, exit: null }
  },
  
  // Architecture - Geometric patterns
  architecture: {
    element: 'geometric_pattern',
    animation: 'subtle_shift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 350, hold: 500, exit: 450 }
  },
  
  dashboard: {
    element: 'geometric_pattern',
    animation: 'subtle_shift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 350, hold: 500, exit: 450 }
  },
  
  edit: {
    element: 'geometric_pattern',
    animation: 'subtle_shift',
    persist: false,
    opacity: { start: 0.5, peak: 0.8, end: 0 },
    duration: { enter: 350, hold: 500, exit: 450 }
  },
  
  cure: {
    element: 'healing_light',
    animation: 'gentle_pulse',
    persist: false,
    opacity: { start: 0.5, peak: 0.9, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  // Invitation - Portal glow
  invitation: {
    element: 'portal_ring',
    animation: 'pulse_expand',
    persist: false,
    opacity: { start: 0.4, peak: 1, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  transparency: {
    element: 'portal_ring',
    animation: 'pulse_expand',
    persist: false,
    opacity: { start: 0.4, peak: 1, end: 0 },
    duration: { enter: 400, hold: 500, exit: 500 }
  },
  
  // Lounge - Social quantum mist
  lounge: {
    element: 'quantum_mist',
    animation: 'gentle_flow',
    persist: false,
    opacity: { start: 0.3, peak: 0.6, end: 0 },
    duration: { enter: 600, hold: 400, exit: 500 }
  }
} as const;

/**
 * Get transition foreground image URL for an environment
 */
export const getForegroundForEnvironment = (environment: keyof typeof TRANSITION_FOREGROUND_IMAGES): string => {
  return TRANSITION_FOREGROUND_IMAGES[environment] || TRANSITION_FOREGROUND_IMAGES.home;
};

export type QuantumForegroundKey = keyof typeof QUANTUM_FOREGROUNDS;