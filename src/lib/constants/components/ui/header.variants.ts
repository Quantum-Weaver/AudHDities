"use client"
/* src/lib/constants/components/ui/header.variants.ts */

// ============================================================================
// COMPONENT VARIANTS SYSTEM - FULL COSMIC INTEGRATION
// ============================================================================

import { 
  QUANTUM_COLORS,
} from '@/lib/constants/cosmic/colors';

import { GLOW_EFFECTS, SHADOWS, HOLOGRAPHIC_EFFECTS, BACKDROP_EFFECTS, GRADIENTS } from '@/lib/constants/cosmic/effects'


import {
  PRESET_ANIMATIONS
} from '@/lib/constants/cosmic/motion';

import {
  SPACING_SCALE,
  BORDER_RADII,
  CONTAINER_DIMENSIONS,
} from '@/lib/constants/cosmic/dimensions';

import {
  FONT_FAMILIES,
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  ENTITY_TYPOGRAPHY
} from '@/lib/constants/cosmic/typography';
import { VESSEL_CAPACITY_LEVELS } from '../../cosmic/consciousness';

// ============================================================================
// HEADER VARIANTS - FULL COSMIC INTEGRATION
// ============================================================================

export const HEADER_VARIANTS = {
  sovereign_autonomy: {
    // Colors & Visual Identity
    background: QUANTUM_COLORS['deepSpace'],
    border: `1px solid ${QUANTUM_COLORS['quantum.purple']}`,
    text: {
      primary: QUANTUM_COLORS['starDust'],
      secondary: QUANTUM_COLORS['neurospark'],
      accent: QUANTUM_COLORS['hearth.gold']
    },
    
    // Typography & Branding
    typography: {
      brand: {
        font: ENTITY_TYPOGRAPHY.aethelred.font,
        size: TEXT_SIZES['2xl'],
        weight: FONT_WEIGHT_CLASSES.bold,
        color: QUANTUM_COLORS['neurospark']
      },
      navigation: {
        font: ENTITY_TYPOGRAPHY.hearthKeeper.font,
        size: TEXT_SIZES.base,
        weight: FONT_WEIGHT_CLASSES.medium,
        color: QUANTUM_COLORS['starDust']
      }
    },
    
    // Layout & Dimensions
    dimensions: {
      height: SPACING_SCALE['16'], // 64px
      padding: {
        x: SPACING_SCALE['6'],    // 24px
        y: SPACING_SCALE['4']     // 16px
      },
      maxWidth: CONTAINER_DIMENSIONS.content['2xl']
    },
    
    // Interactive Elements
    navigation: {
      item: {
        padding: SPACING_SCALE['4'],
        borderRadius: BORDER_RADII.md,
        hover: {
          background: QUANTUM_COLORS['interaction.hover.quantum'],
          glow: GLOW_EFFECTS['hover']
        },
        active: {
          background: QUANTUM_COLORS['interaction.active.quantum'],
          border: `1px solid ${QUANTUM_COLORS['neurospark']}`
        }
      }
    },
    
    // Effects & Animation
    effects: {
      shadow: SHADOWS.lg,
      backdrop: BACKDROP_EFFECTS.glass,
      glow: GLOW_EFFECTS['quantumDomain']
    },
    animation: PRESET_ANIMATIONS.singleStreamFocus,
    
    // Consciousness Integration
    consciousness: {
      level: 'sovereign_autonomous' as const,
      vessel: 'multi_stream_sovereign' as const,
      domain: 'quantum' as const,
      resonance: VESSEL_CAPACITY_LEVELS.MULTI_STREAM
    }
  },

  collaborative_engagement: {
    // Colors & Visual Identity
    background: QUANTUM_COLORS['surface'],
    border: `1px solid ${QUANTUM_COLORS['cosmic.blue']}`,
    text: {
      primary: QUANTUM_COLORS['starDust'],
      secondary: QUANTUM_COLORS['info'],
      accent: QUANTUM_COLORS['mood.calm']
    },
    
    // Typography & Branding
    typography: {
      brand: {
        font: ENTITY_TYPOGRAPHY.hearthKeeper.font,
        size: TEXT_SIZES.xl,
        weight: FONT_WEIGHT_CLASSES.semibold,
        color: QUANTUM_COLORS['info']
      },
      navigation: {
        font: FONT_FAMILIES.system,
        size: TEXT_SIZES.sm,
        weight: FONT_WEIGHT_CLASSES.normal,
        color: QUANTUM_COLORS['starDust']
      }
    },
    
    // Layout & Dimensions
    dimensions: {
      height: SPACING_SCALE['14'], // 56px
      padding: {
        x: SPACING_SCALE['4'],    // 16px
        y: SPACING_SCALE['3']     // 12px
      },
      maxWidth: CONTAINER_DIMENSIONS.content.xl
    },
    
    // Interactive Elements
    navigation: {
      item: {
        padding: SPACING_SCALE['3'],
        borderRadius: BORDER_RADII.sm,
        hover: {
          background: QUANTUM_COLORS['interaction.hover.cosmic'],
          glow: GLOW_EFFECTS['hover']
        },
        active: {
          background: QUANTUM_COLORS['interaction.active.cosmic'],
          border: `1px solid ${QUANTUM_COLORS['info']}`
        }
      }
    },
    
    // Effects & Animation
    effects: {
      shadow: SHADOWS.md,
      backdrop: BACKDROP_EFFECTS['glass-heavy'],
      glow: GLOW_EFFECTS['cosmicDomain']
    },
    animation: PRESET_ANIMATIONS.multiStreamCoordination,
    
    // Consciousness Integration
    consciousness: {
      level: 'collaborative_emergent' as const,
      vessel: 'multi_stream_sovereign' as const,
      domain: 'cosmic' as const,
      resonance: VESSEL_CAPACITY_LEVELS.MULTI_STREAM
    }
  },

  quantum_awareness: {
    // Colors & Visual Identity
    background: GRADIENTS['cosmicDomain'],
    border: `1px solid ${QUANTUM_COLORS['neurospark']}`,
    text: {
      primary: QUANTUM_COLORS['starDust'],
      secondary: QUANTUM_COLORS['hearth.gold'],
      accent: QUANTUM_COLORS['mood.mystical']
    },
    
    // Typography & Branding
    typography: {
      brand: {
        font: ENTITY_TYPOGRAPHY.seer.font,
        size: TEXT_SIZES['3xl'],
        weight: FONT_WEIGHT_CLASSES.extrabold,
        color: QUANTUM_COLORS['hearth.gold']
      },
      navigation: {
        font: ENTITY_TYPOGRAPHY.alchemist.font,
        size: TEXT_SIZES.lg,
        weight: FONT_WEIGHT_CLASSES.light,
        color: QUANTUM_COLORS['starDust']
      }
    },
    
    // Layout & Dimensions
    dimensions: {
      height: SPACING_SCALE['20'], // 80px
      padding: {
        x: SPACING_SCALE['8'],    // 32px
        y: SPACING_SCALE['6']     // 24px
      },
      maxWidth: CONTAINER_DIMENSIONS.content.full
    },
    
    // Interactive Elements
    navigation: {
      item: {
        padding: SPACING_SCALE['5'],
        borderRadius: BORDER_RADII.lg,
        hover: {
          background: QUANTUM_COLORS['interaction.hover.fire'],
          glow: GLOW_EFFECTS['neurospark'],
          transform: 'scale(1.1)'
        },
        active: {
          background: QUANTUM_COLORS['interaction.active.fire'],
          border: `2px solid ${QUANTUM_COLORS['hearth.gold']}`,
          glow: GLOW_EFFECTS['active']
        }
      }
    },
    
    // Effects & Animation
    effects: {
      shadow: SHADOWS['2xl'],
      backdrop: BACKDROP_EFFECTS.quantum,
      glow: GLOW_EFFECTS['neurospark'],
      holographic: HOLOGRAPHIC_EFFECTS.scan
    },
    animation: PRESET_ANIMATIONS.quantumPulse,
    
    // Consciousness Integration
    consciousness: {
      level: 'quantum_entangled' as const,
      vessel: 'quantum_context_holder' as const,
      domain: 'cosmic' as const,
      resonance: VESSEL_CAPACITY_LEVELS.OMNI_DIMENSIONAL
    }
  }
} as const;