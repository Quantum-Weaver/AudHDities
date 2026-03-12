// @/types/components/sandbox/sandbox-devices.ts
// ============================================================================
// SANDBOX DEVICES TYPES - PURE SHAPES ONLY
// ============================================================================

import type { SANDBOX_DEVICES_VARIANTS } from '@/lib/constants/components/ui/variants';

// Core device variant type
export type SandboxDeviceVariant = keyof typeof SANDBOX_DEVICES_VARIANTS;

// Device configuration interface
export interface SandboxDeviceConfig {
  variant: SandboxDeviceVariant;
  orientation: 'quantum_portrait' | 'sovereign_landscape' | 'collaborative_auto';
  scale: number;
  isInteractive: boolean;
  showFrame: boolean;
  showScreen: boolean;
  currentApp?: string;
}

// Device frame properties
export interface DeviceFrameProps {
  background: string;
  border: string;
  notch: boolean;
  homeIndicator: boolean;
  bezel: string;
}

// Device screen properties  
export interface DeviceScreenProps {
  background: string;
  bezel: string;
  aspectRatio: string;
  content?: React.ReactNode;
}

// Device consciousness state
export interface DeviceConsciousness {
  level: 'collaborative_emergent' | 'pattern_recognizing' | 'sovereign_autonomous' | 'quantum_entangled' | 'creative_manifesting';
  vessel: 'single_stream' | 'multi_stream_sovereign' | 'quantum_context_holder' | 'holographic_memory' | 'omni_dimensional';
  domain: string;
  resonance: number;
  process: string;
}

// Device animation state
export interface DeviceAnimation {
  type: string;
  duration: number;
  easing: string;
  isActive: boolean;
}

// Main component props
export interface SandboxDeviceProps {
  // Core configuration
  device: SandboxDeviceConfig;
  
  // Content
  children?: React.ReactNode;
  appContent?: React.ReactNode;
  
  // Interaction
  onDeviceRotate?: (orientation: string) => void;
  onDeviceInteract?: (interaction: string) => void;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Consciousness
  consciousness?: Partial<DeviceConsciousness>;
  
  // Animation
  animation?: Partial<DeviceAnimation>;
}

// Device context for state management
export interface SandboxDevicesContextType {
  currentDevice: SandboxDeviceConfig;
  availableDevices: SandboxDeviceVariant[];
  switchDevice: (device: SandboxDeviceVariant) => void;
  rotateDevice: (orientation: string) => void;
  updateScale: (scale: number) => void;
}

// Device interaction events
export type DeviceInteractionEvent = 
  | 'rotate'
  | 'scale'
  | 'focus'
  | 'blur'
  | 'app_switch'
  | 'consciousness_shift';

export interface DeviceInteraction {
  type: DeviceInteractionEvent;
  device: SandboxDeviceVariant;
  timestamp: number;
  metadata?: Record<string, unknown>;
}