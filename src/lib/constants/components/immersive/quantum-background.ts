// @/lib/constants/components/immersive/quantum-background.ts - SIMPLIFIED
// ============================================================================
// QUANTUM BACKGROUND CONSTANTS - DIRECT ASSET MAPPER INTEGRATION
// ============================================================================

import { AssetMapper } from '@/lib/constants/systems/assets/mapper';

// Simple background configuration using your AssetMapper directly
export const BACKGROUND_ASSETS = {
  // Direct environment mappings - your component uses these
  environments: AssetMapper.environments,
  
  // Simple animation presets (mutable arrays for Framer Motion)
  animations: {
    subtlePulse: {
      animate: {
        scale: [1, 1.02, 1] as number[]
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    foregroundFloat: {
      animate: {
        scale: [1.01, 1, 1.01] as number[]
      },
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 2
      }
    }
  },
  
  // Interactive spot configurations
  interactive: {
    defaultSize: 'w-8 h-8',
    hoverScale: 'scale-110',
    activeScale: 'scale-95'
  }
} as const;
// PERFECT SCALING CONSTELLATION
const BASE_SCALE_ARRAY = [1.02, 1.03, 1.035, 1.025, 1.03, 1.035, 1.02];
const FOREGROUND_RATIO = 1.0025; 

const foregroundScaleArray = BASE_SCALE_ARRAY.map(scale => 
  scale * FOREGROUND_RATIO
);
// Background intensity levels matching your component props
export const BACKGROUND_INTENSITY = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 0.9,
  QUANTUM: 1.0
} as const;

// Define at component level for perfect synchronization
export const SCALING_CONFIG = {
  // Base scaling pattern - gentle, organic breathing
  baseArray: [1.02, 1.03, 1.035, 1.025, 1.03, 1.035, 1.02],
  
  // Perfect foreground ratio (tested for immersion)
  foregroundRatio: 1.0025,
  
  // Timing for natural resonance
  duration: 47.7, // More organic than 112.358
  foregroundDelay: 0.3 // Shorter delay for better sync
} as const;

// Calculate synchronized arrays
export const backgroundScales = SCALING_CONFIG.baseArray;
export const foregroundScales = SCALING_CONFIG.baseArray.map(scale => scale * SCALING_CONFIG.foregroundRatio);

// Default configuration matching your component defaults
export const DEFAULT_BACKGROUND_CONFIG = {
  variant: 1,
  showForeground: false,
  animated: true,
  parallaxIntensity: 0.5
} as const;

// Type exports for your component props
export type BackgroundEnvironment = keyof typeof AssetMapper.environments;
export type BackgroundVariant = 1 | 2 | 3 | 4;
export type BackgroundIntensity = keyof typeof BACKGROUND_INTENSITY;