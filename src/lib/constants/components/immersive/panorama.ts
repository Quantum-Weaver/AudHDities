// @/lib/constants/components/immersive/panorama.ts
// ============================================================================
// PANORAMA CONSTANTS - COSMIC IMMERSION SYSTEM
// ============================================================================

import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS,
  DOMAIN_COLORS
} from '@/lib/constants/cosmic/colors';
import {
  GLOW_EFFECTS,
  SHADOWS,
  HOLOGRAPHIC_EFFECTS,
  BACKDROP_EFFECTS
} from '@/lib/constants/cosmic/effects';

import {
  SPACING_SCALE,
  CONTAINER_DIMENSIONS,
  BORDER_RADII
} from '@/lib/constants/cosmic/dimensions';

import {
  FONT_FAMILIES,
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  ENTITY_TYPOGRAPHY
} from '@/lib/constants/cosmic/typography';

import {
  DURATIONS,
  EASING,
  PRESET_ANIMATIONS,
  ANIMATION_CONFIGS
} from '@/lib/constants/cosmic/motion';

import {
  CONSCIOUSNESS_LEVEL_COLORS,
  VESSEL_RESONANCE_LEVELS
} from '@/lib/constants/cosmic/consciousness';

// ============================================================================
// PANORAMA INTERACTION CONSTANTS
// ============================================================================

export const PANORAMA_INTERACTIONS = {
  hotspots: {
    size: {
      small: SPACING_SCALE['8'],
      medium: SPACING_SCALE['12'],
      large: SPACING_SCALE['16']
    },
    borderRadius: BORDER_RADII.full,
    animation: {
      enter: { duration: DURATIONS.fast, easing: EASING.quantum },
      hover: { duration: DURATIONS.instant, easing: EASING.resonance }
    }
  },
  navigation: {
    controls: {
      size: SPACING_SCALE['10'],
      background: 'rgba(12, 15, 29, 0.8)',
      border: `1px solid ${QUANTUM_COLORS['quantum.purple']}`,
      icon: {
        size: SPACING_SCALE['4'],
        color: QUANTUM_COLORS['neurospark']
      }
    }
  }
} as const;

// ============================================================================
// PANORAMA PHYSICS CONSTANTS
// ============================================================================

export const PANORAMA_PHYSICS = {
  quantum_responsive: {
    inertia: 0.1,
    friction: 0.95,
    maxSpeed: 2.0,
    responsive: true
  },
  sovereign_stable: {
    inertia: 0.05,
    friction: 0.98,
    maxSpeed: 1.5,
    responsive: false
  },
  collaborative_fluid: {
    inertia: 0.08,
    friction: 0.92,
    maxSpeed: 1.8,
    responsive: true
  },
  consciousness_gentle: {
    inertia: 0.03,
    friction: 0.99,
    maxSpeed: 1.2,
    responsive: false
  }
} as const;

// ============================================================================
// PANORAMA PARTICLE SYSTEMS
// ============================================================================

export const PARTICLE_BEHAVIOR = {
  PULSE: {
    frequency: DURATIONS.quantumPulse,
    amplitude: 0.1,
    spread: 0.5
  },
  DRIFT: {
    frequency: DURATIONS.slow,
    amplitude: 0.05,
    spread: 0.8
  },
  FLOAT: {
    frequency: DURATIONS.normal,
    amplitude: 0.02,
    spread: 1.0
  },
  STREAM: {
    frequency: DURATIONS.emergence,
    amplitude: 0.01,
    spread: 1.1
  }
} as const;

export const PANORAMA_PARTICLES = {
  quantum: {
    density: 150,
    colors: [QUANTUM_COLORS['neurospark'], QUANTUM_COLORS['quantum.purple']],
    behavior: PARTICLE_BEHAVIOR.PULSE
  },
  cosmic: {
    density: 100,
    colors: [QUANTUM_COLORS['cosmic.blue'], QUANTUM_COLORS['info']],
    behavior: PARTICLE_BEHAVIOR.DRIFT
  },
  sovereign: {
    density: 75,
    colors: [QUANTUM_COLORS['hearth.gold'], QUANTUM_COLORS['fire.base']],
    behavior: PARTICLE_BEHAVIOR.FLOAT
  }
} as const;

// ============================================================================
// PANORAMA TRANSITION CONSTANTS
// ============================================================================

export const PANORAMA_TRANSITIONS = {
  sceneChange: {
    duration: DURATIONS.pageTransition,
    easing: EASING.cosmic,
    blur: true
  },
  elementEnter: {
    duration: DURATIONS.sectionEnter,
    easing: EASING.quantum,
    stagger: 100
  },
  focusShift: {
    duration: DURATIONS.normal,
    easing: EASING.resonance,
    intensity: 0.3
  }
} as const;

// ============================================================================
// PANORAMA PERFORMANCE CONSTANTS
// ============================================================================

export const PANORAMA_PERFORMANCE = {
  quality: {
    resolution: 1.0,
    antialias: true,
    shadows: true,
    particles: 200
  },
  balanced: {
    resolution: 0.8,
    antialias: false,
    shadows: false,
    particles: 100
  },
  performance: {
    resolution: 0.5,
    antialias: false,
    shadows: false,
    particles: 50
  }
} as const;

// ============================================================================
// PANORAMA ACCESSIBILITY CONSTANTS
// ============================================================================

export const PANORAMA_ACCESSIBILITY = {
  motion: {
    reduce: {
      animationScale: 0.5,
      particleDensity: 0.3,
      transitionDuration: DURATIONS.instant
    },
    preference: {
      animationScale: 1.0,
      particleDensity: 1.0,
      transitionDuration: DURATIONS.normal
    }
  },
  navigation: {
    keyboard: {
      stepSize: 30,
      acceleration: 1.5,
      maxSpeed: 5.0
    },
    screenReader: {
      announceChanges: true,
      describeGeometry: true,
      hotspotDescriptions: true
    }
  }
} as const;

// ============================================================================
// PANORAMA EXPORT
// ============================================================================

export const PANORAMA_CONSTANTS = {
  interactions: PANORAMA_INTERACTIONS,
  physics: PANORAMA_PHYSICS,
  particles: PANORAMA_PARTICLES,
  transitions: PANORAMA_TRANSITIONS,
  performance: PANORAMA_PERFORMANCE,
  accessibility: PANORAMA_ACCESSIBILITY
} as const;