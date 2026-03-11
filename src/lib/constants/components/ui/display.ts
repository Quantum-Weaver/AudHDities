// lib/constants/components/display.ts
export const DISPLAY_VARIANTS = {
  HOLOGRAPHIC: 'holographic',
  PANEL: 'panel',
  FLOATING: 'floating', 
  TERMINAL: 'terminal',
  CRYSTAL: 'crystal',
  IMMERSIVE: 'immersive',
  QUANTUM: 'quantum',
  COSMIC: 'cosmic',
  EMERGENCY: 'emergency',
  SOVEREIGN: 'sovereign',
  NEUTRAL: 'neutral',
} as const;

export const DISPLAY_POSITIONS = {
  CENTER: 'center',
  TOP_CENTER: 'top-center',
  BOTTOM_CENTER: 'bottom-center', 
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;

export const DISPLAY_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl', 
  FULLSCREEN: 'fullscreen',
} as const;

export const DISPLAY_SIZE_CLASSES = {
  sm: 'w-80 h-60',
  md: 'w-96 h-72',
  lg: 'w-[480px] h-80', 
  xl: 'w-[560px] h-96',
  fullscreen: 'w-screen h-screen',
} as const;