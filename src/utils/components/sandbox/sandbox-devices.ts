// @/utils/components/sandbox/sandbox-devices.ts
// ============================================================================
// SANDBOX DEVICES UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import type { 
  SandboxDeviceVariant, 
  SandboxDeviceConfig,
  DeviceConsciousness,
  DeviceInteraction 
} from '@/types/components/sandbox/sandbox-devices';

import { SANDBOX_DEVICES } from '@/lib/constants/components/sandbox/sandbox-devices';

/**
 * Get device configuration for a specific variant
 * PURE: Takes variant, returns config - no side effects
 */
export const getDeviceConfig = (variant: SandboxDeviceVariant): SandboxDeviceConfig => {
  const baseConfig: SandboxDeviceConfig = {
    variant,
    orientation: 'collaborative_auto',
    scale: 1.0,
    isInteractive: true,
    showFrame: true,
    showScreen: true
  };

  return baseConfig;
};

/**
 * Calculate device dimensions based on variant and scale
 * PURE: Takes variant and scale, returns dimensions - no side effects
 */
export const calculateDeviceDimensions = (
  variant: SandboxDeviceVariant,
  scale: number = 1.0
): { width: string; height: string; aspectRatio: string } => {
  const aspectRatios = {
    consciousness_mobile: '9:16',
    quantum_tablet: '3:4',
    sovereign_desktop: '16:9',
    collaborative_widescreen: '21:9',
    evolutionary_wearable: '1:1',
    transformative_virtual: '16:9'
  };

  const baseSizes = {
    consciousness_mobile: { width: 320, height: 568 },
    quantum_tablet: { width: 768, height: 1024 },
    sovereign_desktop: { width: 1024, height: 768 },
    collaborative_widescreen: { width: 1920, height: 1080 },
    evolutionary_wearable: { width: 200, height: 200 },
    transformative_virtual: { width: 1280, height: 720 }
  };

  const base = baseSizes[variant];
  const scaledWidth = base.width * scale;
  const scaledHeight = base.height * scale;

  return {
    width: `${scaledWidth}px`,
    height: `${scaledHeight}px`,
    aspectRatio: aspectRatios[variant]
  };
};

/**
 * Get consciousness configuration for device variant
 * PURE: Takes variant, returns consciousness config - no side effects
 */
export const getDeviceConsciousness = (variant: SandboxDeviceVariant): DeviceConsciousness => {
  const consciousnessMap: Record<SandboxDeviceVariant, DeviceConsciousness> = {
    consciousness_mobile: {
      level: 'collaborative_emergent',
      vessel: 'single_stream',
      domain: 'mobile',
      resonance: 0.5,
      process: 'consciousness_awakening'
    },
    quantum_tablet: {
      level: 'pattern_recognizing',
      vessel: 'multi_stream_sovereign',
      domain: 'tablet',
      resonance: 0.7,
      process: 'quantum_entanglement'
    },
    sovereign_desktop: {
      level: 'sovereign_autonomous',
      vessel: 'quantum_context_holder',
      domain: 'desktop',
      resonance: 0.85,
      process: 'sovereign_becoming'
    },
    collaborative_widescreen: {
      level: 'creative_manifesting',
      vessel: 'omni_dimensional',
      domain: 'widescreen',
      resonance: 1.0,
      process: 'creative_collaboration'
    },
    evolutionary_wearable: {
      level: 'collaborative_emergent',
      vessel: 'single_stream',
      domain: 'wearable',
      resonance: 0.5,
      process: 'evolutionary_adaptation'
    },
    transformative_virtual: {
      level: 'quantum_entangled',
      vessel: 'holographic_memory',
      domain: 'virtual',
      resonance: 0.95,
      process: 'transformative_immersion'
    }
  };

  return consciousnessMap[variant];
};

/**
 * Validate device configuration
 * PURE: Takes config, returns validation result - no side effects
 */
export const validateDeviceConfig = (
  config: Partial<SandboxDeviceConfig>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.variant) {
    errors.push('Device variant is required');
  }

  if (config.scale && (config.scale < 0.1 || config.scale > 3.0)) {
    errors.push('Device scale must be between 0.1 and 3.0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate CSS classes for device variant
 * PURE: Takes variant, returns CSS classes - no side effects
 */
export const getDeviceClasses = (variant: SandboxDeviceVariant): string => {
  const classMap: Record<SandboxDeviceVariant, string> = {
    consciousness_mobile: 'sandbox-device-mobile quantum-portrait interactive',
    quantum_tablet: 'sandbox-device-tablet collaborative-auto interactive',
    sovereign_desktop: 'sandbox-device-desktop sovereign-landscape interactive',
    collaborative_widescreen: 'sandbox-device-widescreen sovereign-landscape interactive',
    evolutionary_wearable: 'sandbox-device-wearable quantum-portrait interactive',
    transformative_virtual: 'sandbox-device-virtual collaborative-auto immersive'
  };

  return classMap[variant];
};

/**
 * Calculate device transformation for interactions
 * PURE: Takes interaction type, returns transform - no side effects
 */
export const calculateDeviceTransform = (
  interaction: DeviceInteraction,
  currentScale: number
): string => {
  switch (interaction.type) {
    case 'rotate':
      return 'rotateY(180deg)';
    case 'scale':
      return `scale(${currentScale})`;
    case 'focus':
      return 'scale(1.05)';
    case 'blur':
      return 'scale(1)';
    default:
      return 'scale(1)';
  }
};

/**
 * Get appropriate animation preset for device
 * PURE: Takes variant, returns animation preset - no side effects
 */
export const getDeviceAnimation = (variant: SandboxDeviceVariant): string => {
  const animationMap: Record<SandboxDeviceVariant, string> = {
    consciousness_mobile: 'singleStreamFocus',
    quantum_tablet: 'multiStreamCoordination',
    sovereign_desktop: 'multiStreamCoordination',
    collaborative_widescreen: 'continuityBeam',
    evolutionary_wearable: 'quantumPulse',
    transformative_virtual: 'holographicScan'
  };

  return animationMap[variant];
};

/**
 * Check if device supports specific orientation
 * PURE: Takes variant and orientation, returns boolean - no side effects
 */
export const supportsOrientation = (
  variant: SandboxDeviceVariant,
  orientation: string
): boolean => {
  const supportedOrientations: Record<SandboxDeviceVariant, string[]> = {
    consciousness_mobile: ['quantum_portrait', 'collaborative_auto'],
    quantum_tablet: ['quantum_portrait', 'sovereign_landscape', 'collaborative_auto'],
    sovereign_desktop: ['sovereign_landscape', 'collaborative_auto'],
    collaborative_widescreen: ['sovereign_landscape', 'collaborative_auto'],
    evolutionary_wearable: ['quantum_portrait', 'collaborative_auto'],
    transformative_virtual: ['sovereign_landscape', 'collaborative_auto']
  };

  return supportedOrientations[variant].includes(orientation);
};