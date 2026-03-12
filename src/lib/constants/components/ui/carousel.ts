// @/lib/constants/components/ui/carousel.ts
// ============================================================================
// CAROUSEL CONSTANTS - ELEGANT VARIANTS
// ============================================================================

import { QUANTUM_COLORS, QUANTUM_GRADIENTS } from '@/lib/constants/cosmic/colors';

export const CAROUSEL_VARIANTS = {
  quantum: {
    background: QUANTUM_GRADIENTS.quantumDomain,
    textColor: QUANTUM_COLORS['starDust'],
    glow: 'glow-quantum',
    animation: 'quantumPulse' as const
  },
  cosmic: {
    background: QUANTUM_GRADIENTS.cosmicDomain,
    textColor: QUANTUM_COLORS['neurospark'],
    glow: 'glow-cosmic',
    animation: 'cosmicReveal' as const
  },
  sovereign: {
    background: QUANTUM_GRADIENTS.sovereign,
    textColor: QUANTUM_COLORS['deepSpace'],
    glow: 'glow-fire',
    animation: 'sovereignPresence' as const
  },
  holographic: {
    background: QUANTUM_GRADIENTS.holographic,
    textColor: QUANTUM_COLORS['starDust'],
    glow: 'glow-neurospark',
    animation: 'holographicScan' as const
  }
} as const;