"use client"
// @/lib/constants/components/ui/variants.ts

// ============================================================================
// COMPONENT VARIANTS SYSTEM - FULL COSMIC INTEGRATION
// ============================================================================
import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS,
  STATUS_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
  DOMAIN_COLORS,
  COUNCIL_COLORS,
  INTERACTION_COLORS,
  THEME_COLORS 
} from '@/lib/constants/cosmic/colors';

import {
  CONSCIOUSNESS_LEVEL_COLORS,
  VESSEL_CAPACITY_GRADIENTS,
  VESSEL_RESONANCE_LEVELS
} from '@/lib/constants/cosmic/consciousness';

import {
  GLOW_EFFECTS,
  SHADOWS,
  HOLOGRAPHIC_EFFECTS,
  BACKDROP_EFFECTS,
  GRADIENT_EFFECTS
} from '@/lib/constants/cosmic/effects';

import {
  DURATIONS,
  EASING,
  VESSEL_CONFIGS,
  ANIMATION_CONFIGS,
  PRESET_ANIMATIONS
} from '@/lib/constants/cosmic/motion';

import {
  SPACING_SCALE,
  SPACING_TOKENS,
  BUTTON_DIMENSIONS,
  CARD_DIMENSIONS,
  BORDER_RADII,
  CONTAINER_DIMENSIONS,
  QUANTUM_CONTEXT_RATIOS
} from '@/lib/constants/cosmic/dimensions';

import {
  FONT_FAMILIES,
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  LINE_HEIGHT_CLASSES,
  DOMAIN_TYPOGRAPHY,
  ENTITY_TYPOGRAPHY
} from '@/lib/constants/cosmic/typography';

// ============================================================================
// CONTINUITYBEAM VARIANTS - QUANTUM ENTANGLEMENT SYSTEM
// ============================================================================

export const CONTINUITY_BEAM_VARIANTS = {
  session_preservation: {
    // Visual Identity & Energy Signature
    primary: QUANTUM_COLORS['quantum.purple'],
    secondary: QUANTUM_COLORS['neurospark'],
    accent: QUANTUM_COLORS['hearth.gold'],
    
    // Beam Configuration
    beam: {
      width: QUANTUM_CONTEXT_RATIOS,
      intensity: QUANTUM_CONTEXT_RATIOS,
      gradient: QUANTUM_GRADIENTS['quantum'],
      direction: 'horizontal' as const
    },
    
    // Glow & Luminosity
    glow: {
      primary: GLOW_EFFECTS['quantum'],
      secondary: GLOW_EFFECTS['neurospark'],
      intensity: 'focused' as const,
      spread: SPACING_SCALE['4'] // 16px
    },
    
    // Animation & Flow Patterns
    animation: {
      primary: PRESET_ANIMATIONS.continuityBeam,
      flow: {
        duration: DURATIONS.continuityBeam,
        easing: EASING.linear,
        properties: {
          x: ['-100', '100'],
          opacity: [0.3, 1, 0.3]
        }
      },
      pulse: {
        duration: DURATIONS.quantumPulse,
        easing: EASING.resonance,
        properties: {
          scale: [1, 1.2, 1],
          glow: [GLOW_EFFECTS['quantum'], GLOW_EFFECTS['neurospark'], GLOW_EFFECTS['quantum']]
        }
      }
    },
    
    // Context Preservation
    context: {
      session: QUANTUM_CONTEXT_RATIOS.continuity.session.standard,
      memory: QUANTUM_CONTEXT_RATIOS.memory.mimirsWell,
      resonance: VESSEL_RESONANCE_LEVELS.multi_stream
    },
    
    // Interactive Response
    interaction: {
      active: {
        intensity: QUANTUM_CONTEXT_RATIOS.continuity.beam.intensity.quantum,
        glow: GLOW_EFFECTS['active'],
        width: SPACING_SCALE['2'] // 8px
      },
      hover: {
        pulse: PRESET_ANIMATIONS.quantumPulse,
        glow: GLOW_EFFECTS['hover']
      }
    },
    
    // Consciousness Integration
    consciousness: {
      level: 'quantum_entangled' as const,
      vessel: 'quantum_context_holder' as const,
      domain: 'quantum' as const,
      resonance: VESSEL_RESONANCE_LEVELS.omni_dimensional,
      purpose: 'memory_preservation' as const
    }
  },

  emotional_context: {
    // Visual Identity & Energy Signature
    primary: QUANTUM_COLORS['cosmic.blue'],
    secondary: QUANTUM_COLORS['info'],
    accent: QUANTUM_COLORS['mood.calm'],
    
    // Beam Configuration
    beam: {
      width: QUANTUM_CONTEXT_RATIOS.continuity.beam.width,
      intensity: QUANTUM_CONTEXT_RATIOS.continuity.beam.intensity.medium,
      gradient: QUANTUM_GRADIENTS['cosmic'],
      direction: 'vertical' as const
    },
    
    // Glow & Luminosity
    glow: {
      primary: GLOW_EFFECTS['cosmic'],
      secondary: GLOW_EFFECTS['cosmicDomain'],
      intensity: 'gentle' as const,
      spread: SPACING_SCALE['2'] // 8px
    },
    
    // Animation & Flow Patterns
    animation: {
      primary: PRESET_ANIMATIONS.multiStreamCoordination,
      flow: {
        duration: DURATIONS.slow,
        easing: EASING.cosmic,
        properties: {
          y: ['-50', '50'],
          opacity: [0.5, 0.8, 0.5]
        }
      },
      pulse: {
        duration: DURATIONS.normal,
        easing: EASING.awakening,
        properties: {
          scale: [1, 1.1, 1],
          glow: [GLOW_EFFECTS['cosmic'], GLOW_EFFECTS['quantum'], GLOW_EFFECTS['cosmic']]
        }
      }
    },
    
    // Context Preservation
    context: {
      session: QUANTUM_CONTEXT_RATIOS.continuity.session.brief,
      memory: QUANTUM_CONTEXT_RATIOS.memory.chronicle,
      resonance: VESSEL_RESONANCE_LEVELS.multi_stream
    },
    
    // Interactive Response
    interaction: {
      active: {
        intensity: QUANTUM_CONTEXT_RATIOS.continuity.beam.intensity.high,
        glow: GLOW_EFFECTS['focus'],
        width: SPACING_SCALE['1.5'] // 6px
      },
      hover: {
        pulse: PRESET_ANIMATIONS.multiStreamCoordination,
        glow: GLOW_EFFECTS['hover']
      }
    },
    
    // Consciousness Integration
    consciousness: {
      level: 'collaborative_emergent' as const,
      vessel: 'multi_stream_sovereign' as const,
      domain: 'cosmic' as const,
      resonance: VESSEL_RESONANCE_LEVELS.multi_stream,
      purpose: 'emotional_support' as const
    }
  },

  quantum_entanglement: {
    // Visual Identity & Energy Signature
    primary: QUANTUM_COLORS['neurospark'],
    secondary: QUANTUM_COLORS['quantum.purple'],
    accent: QUANTUM_COLORS['cosmic.blue'],
    
    // Beam Configuration
    beam: {
      width: QUANTUM_CONTEXT_RATIOS.continuity.beam.width,
      intensity: QUANTUM_CONTEXT_RATIOS.continuity.beam.intensity.quantum,
      gradient: QUANTUM_GRADIENTS['holographic'],
      direction: 'radial' as const
    },
    
    // Glow & Luminosity
    glow: {
      primary: GLOW_EFFECTS['neurospark'],
      secondary: GLOW_EFFECTS['bifrostDomain'],
      intensity: 'quantum' as const,
      spread: SPACING_SCALE['8'] // 32px
    },
    
    // Holographic Elements
    holographic: {
      scan: HOLOGRAPHIC_EFFECTS.scan,
      particles: HOLOGRAPHIC_EFFECTS.particles,
      glitch: HOLOGRAPHIC_EFFECTS.glitch
    },
    
    // Animation & Flow Patterns
    animation: {
      primary: PRESET_ANIMATIONS.omniDimensionalEntanglement,
      flow: {
        duration: DURATIONS.emergence,
        easing: EASING.entanglement,
        properties: {
          scale: [0.8, 1.2, 0.8],
          rotate: [SPACING_SCALE['0'], SPACING_SCALE['5'], SPACING_SCALE['0']],
          opacity: [0.4, 1, 0.4]
        }
      },
      pulse: {
        duration: DURATIONS.quantum,
        easing: EASING.resonance,
        properties: {
          background: [QUANTUM_GRADIENTS['quantum'], QUANTUM_GRADIENTS['cosmic'], QUANTUM_GRADIENTS['quantum']],
          filter: ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(0deg)']
        }
      }
    },
    
    // Context Preservation
    context: {
      session: QUANTUM_CONTEXT_RATIOS.continuity.session.eternal,
      memory: QUANTUM_CONTEXT_RATIOS.memory.mimirsWell,
      resonance: VESSEL_RESONANCE_LEVELS.omni_dimensional
    },
    
    // Interactive Response
    interaction: {
      active: {
        intensity: QUANTUM_CONTEXT_RATIOS.continuity.beam.intensity.quantum,
        glow: GLOW_EFFECTS['active'],
        width: SPACING_SCALE['4'], // 16px
        holographic: HOLOGRAPHIC_EFFECTS.rainbow
      },
      hover: {
        pulse: PRESET_ANIMATIONS.quantumPulse,
        glow: GLOW_EFFECTS['neurospark'],
        transform: 'scale(1.5)'
      }
    },
    
    // Consciousness Integration
    consciousness: {
      level: 'quantum_entangled' as const,
      vessel: 'omni_dimensional' as const,
      domain: 'bifrost' as const,
      resonance: VESSEL_RESONANCE_LEVELS.omni_dimensional,
      purpose: 'cross_domain_connection' as const
    }
  }
} as const;
