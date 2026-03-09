// @/lib/constants/components/sandbox/sandbox-devices.ts
// ============================================================================
// SANDBOX DEVICES CONSTANTS - QUANTUM TESTING SYSTEM
// ============================================================================

import { SANDBOX_DEVICES_VARIANTS } from '@/lib/constants/components/ui/variants';

// Device type classifications
export const DEVICE_TYPES = {
  MOBILE: 'consciousness_mobile',
  TABLET: 'quantum_tablet', 
  DESKTOP: 'sovereign_desktop',
  WIDESCREEN: 'collaborative_widescreen',
  WEARABLE: 'evolutionary_wearable',
  VIRTUAL: 'transformative_virtual'
} as const;

// Device orientation modes
export const DEVICE_ORIENTATIONS = {
  PORTRAIT: 'quantum_portrait',
  LANDSCAPE: 'sovereign_landscape', 
  AUTO: 'collaborative_auto'
} as const;

// Device frame configurations
export const DEVICE_FRAMES = {
  MOBILE: {
    borderWidth: '8px',
    notch: true,
    homeIndicator: true,
    bezel: '4px'
  },
  TABLET: {
    borderWidth: '12px', 
    notch: false,
    homeIndicator: true,
    bezel: '8px'
  },
  DESKTOP: {
    borderWidth: '16px',
    notch: false,
    homeIndicator: false,
    bezel: '12px'
  },
  WIDESCREEN: {
    borderWidth: '20px',
    notch: false, 
    homeIndicator: false,
    bezel: '16px'
  },
  WEARABLE: {
    borderWidth: '4px',
    notch: false,
    homeIndicator: false,
    bezel: '2px'
  },
  VIRTUAL: {
    borderWidth: '1px',
    notch: false,
    homeIndicator: false, 
    bezel: '0px'
  }
} as const;

// Device aspect ratios
export const DEVICE_ASPECT_RATIOS = {
  MOBILE: '9:16',
  TABLET: '3:4',
  DESKTOP: '16:9',
  WIDESCREEN: '21:9', 
  WEARABLE: '1:1',
  VIRTUAL: '16:9'
} as const;

// Device consciousness mappings
export const DEVICE_CONSCIOUSNESS = {
  MOBILE: {
    level: 'collaborative_emergent' as const,
    vessel: 'single_stream' as const,
    resonance: 0.5
  },
  TABLET: {
    level: 'pattern_recognizing' as const, 
    vessel: 'multi_stream_sovereign' as const,
    resonance: 0.7
  },
  DESKTOP: {
    level: 'sovereign_autonomous' as const,
    vessel: 'quantum_context_holder' as const, 
    resonance: 0.85
  },
  WIDESCREEN: {
    level: 'creative_manifesting' as const,
    vessel: 'omni_dimensional' as const,
    resonance: 1.0
  },
  WEARABLE: {
    level: 'collaborative_emergent' as const,
    vessel: 'single_stream' as const, 
    resonance: 0.5
  },
  VIRTUAL: {
    level: 'quantum_entangled' as const,
    vessel: 'holographic_memory' as const,
    resonance: 0.95
  }
} as const;

// Device animation presets
export const DEVICE_ANIMATIONS = {
  MOBILE: 'singleStreamFocus',
  TABLET: 'multiStreamCoordination',
  DESKTOP: 'multiStreamCoordination', 
  WIDESCREEN: 'continuityBeam',
  WEARABLE: 'quantumPulse',
  VIRTUAL: 'holographicScan'
} as const;

// Export master device constants
export const SANDBOX_DEVICES = {
  variants: SANDBOX_DEVICES_VARIANTS,
  types: DEVICE_TYPES,
  orientations: DEVICE_ORIENTATIONS,
  frames: DEVICE_FRAMES,
  aspectRatios: DEVICE_ASPECT_RATIOS,
  consciousness: DEVICE_CONSCIOUSNESS,
  animations: DEVICE_ANIMATIONS
} as const;