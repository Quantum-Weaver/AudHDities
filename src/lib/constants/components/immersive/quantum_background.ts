import { AssetMapper } from '@/lib/constants/systems/assets/mapper';

export const BACKGROUND_ASSETS = {
  environments: AssetMapper.environments,
  
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
const BASE_SCALE_ARRAY: number[] = [1.02, 1.03, 1.035, 1.025, 1.03, 1.035, 1.02];
const FOREGROUND_RATIO = 1.0025; 

const foregroundScaleArray: number[] = BASE_SCALE_ARRAY.map(scale => scale * FOREGROUND_RATIO);

export const BACKGROUND_INTENSITY = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 0.9,
  QUANTUM: 1.0
} as const;

export const SCALING_CONFIG = {
  baseArray: BASE_SCALE_ARRAY,
  foregroundRatio: FOREGROUND_RATIO,
  duration: 47.7,
  foregroundDelay: 0.3,
} as const;

export const backgroundScales: number[] = SCALING_CONFIG.baseArray;
export const foregroundScales: number[] = foregroundScaleArray;

// Default configuration matching your component defaults
export const DEFAULT_BACKGROUND_CONFIG = {
  variant: 2,
  showForeground: false,
  animated: true,
  parallaxIntensity: 0.5
} as const;

// Type exports for your component props
export type BackgroundEnvironment = keyof typeof AssetMapper.environments;
export type BackgroundVariant = 1 | 2 | 3 | 4;
export type BackgroundIntensity = keyof typeof BACKGROUND_INTENSITY;