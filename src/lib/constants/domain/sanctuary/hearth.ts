// lib/constants/domain/sanctuary/hearth.ts
import { DURATIONS, EASING } from '@/lib/constants/cosmic/motion';

export const HEARTH_CONFIGS = {
  RADIUS: 150,
  ITEM_SIZE: 80,
  CENTRAL_SIZE: 100,
  ITEM_SPACING: 20,
  ACTIVATION_DISTANCE: 120
} as const;

export const HEARTH_ANIMATIONS = {
  hearthMenuItem: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15
  },
  hearthItemFloat: (index: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: DURATIONS.slow / 1000,
      repeat: Infinity,
      ease: EASING.easeInOut,
      delay: index * 0.2
    }
  }),
  hearthGlowRotation: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: EASING.linear
    }
  }
} as const;