// @/types/components/immersive/panorama.ts
// ============================================================================
// PANORAMA TYPES - PURE SHAPES FOR COSMIC IMMERSION
// ============================================================================

import type { 
  ConsciousnessLevel, 
  VesselCapacity,
  ResonanceLevel 
} from '@/types/cosmic/primitives';

import {
  PANORAMA_PERFORMANCE,
  PANORAMA_PHYSICS,
  PARTICLE_BEHAVIOR
} from '@/lib/constants/components/immersive/panorama'
// ============================================================================
// CORE PANORAMA PROPS
// ============================================================================

export interface PanoramaProps {
  // Core Configuration
  variant: PanoramaVariant;
  initialState?: PanoramaState;
  performance?: keyof typeof PANORAMA_PERFORMANCE;
  
  // Interaction & Behavior
  interactive?: boolean;
  navigable?: boolean;
  physics?: keyof typeof PANORAMA_PHYSICS;
  
  // Content & Structure
  title?: string;
  description?: string;
  hotspots?: PanoramaHotspot[];
  scenes?: PanoramaScene[];
  
  // Event Handlers
  onSceneChange?: (sceneId: string) => void;
  onHotspotActivate?: (hotspotId: string) => void;
  onStateChange?: (state: PanoramaState) => void;
  
  // Consciousness Integration
  consciousness?: PanoramaConsciousness;
  
  // Accessibility
  ariaLabel?: string;
  reducedMotion?: boolean;
}

// ============================================================================
// PANORAMA STATE MANAGEMENT
// ============================================================================

export interface PanoramaState {
  // View & Navigation
  currentScene: string;
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  zoomLevel: number;
  
  // Interaction State
  focusedElement?: string;
  activeHotspots: Set<string>;
  userPath: PanoramaPathPoint[];
  
  // Performance & Quality
  qualityMode: keyof typeof PANORAMA_PERFORMANCE;
  loadedAssets: Set<string>;
  
  // Consciousness State
  resonance: ResonanceLevel;
  engagement: number; // 0-1 scale
}

export interface PanoramaPathPoint {
  timestamp: number;
  position: [number, number, number];
  rotation: [number, number, number];
  interaction?: string;
}

// ============================================================================
// PANORAMA CONTENT STRUCTURES
// ============================================================================

export interface PanoramaScene {
  id: string;
  name: string;
  background: string | string[];
  geometry?: PanoramaGeometry;
  hotspots: PanoramaHotspot[];
  transitions: PanoramaTransition[];
  audio?: PanoramaAudio;
}

export interface PanoramaHotspot {
  id: string;
  position: [number, number, number];
  type: 'info' | 'interaction' | 'transition' | 'entity';
  content: PanoramaHotspotContent;
  trigger: 'click' | 'hover' | 'proximity' | 'gaze';
  radius?: number;
  animation?: PanoramaAnimation;
}

export interface PanoramaHotspotContent {
  title: string;
  description?: string;
  icon?: string;
  media?: string;
  actions?: PanoramaAction[];
}

export interface PanoramaAction {
  type: 'navigate' | 'reveal' | 'trigger' | 'transform';
  target: string;
  payload?: any;
}

// ============================================================================
// PANORAMA GEOMETRY & SPATIAL TYPES
// ============================================================================

export interface PanoramaGeometry {
  type: 'sphere' | 'cube' | 'plane' | 'custom';
  radius?: number;
  segments?: number;
  textureMapping?: 'equirectangular' | 'cubemap';
}

export interface PanoramaTransition {
  from: string;
  to: string;
  type: 'fade' | 'slide' | 'morph' | 'quantum';
  duration: number;
  easing: string;
}

// ============================================================================
// PANORAMA AUDIO & SENSORY TYPES
// ============================================================================

export interface PanoramaAudio {
  ambient?: string;
  interactions?: PanoramaInteractionAudio;
  spatial?: boolean;
  volume?: number;
}

export interface PanoramaInteractionAudio {
  hotspotEnter?: string;
  hotspotExit?: string;
  sceneChange?: string;
  navigation?: string;
}

// ============================================================================
// PANORAMA ANIMATION & EFFECTS TYPES
// ============================================================================

export interface PanoramaAnimation {
  type: 'pulse' | 'glow' | 'rotate' | 'float';
  duration: number;
  easing: string;
  intensity: number;
  loop?: boolean;
}

export interface PanoramaEffects {
  glow?: string;
  shadow?: string;
  backdrop?: string;
  holographic?: string;
  particles?: keyof typeof PARTICLE_BEHAVIOR;
}

// ============================================================================
// PANORAMA CONSCIOUSNESS INTEGRATION
// ============================================================================

export interface PanoramaConsciousness {
  level: ConsciousnessLevel;
  vessel: VesselCapacity;
  domain: string;
  resonance: ResonanceLevel;
  process: string;
}

// ============================================================================
// PANORAMA VARIANT TYPES
// ============================================================================

export type PanoramaVariant = 
  | 'consciousness_quantum_realm'
  | 'sovereign_council_chamber' 
  | 'collaborative_digital_ethereal'
  | 'evolutionary_library_sanctuary'
  | 'transformative_void_space'
  | 'universal_cosmic_realm';

// ============================================================================
// PANORAMA UTILITY TYPES
// ============================================================================

export type PanoramaPhysics = keyof typeof PANORAMA_PHYSICS;
export type PanoramaPerformance = keyof typeof PANORAMA_PERFORMANCE;
export type PanoramaParticleBehavior = keyof typeof PARTICLE_BEHAVIOR;

// ============================================================================
// PANORAMA EVENT TYPES
// ============================================================================

export interface PanoramaSceneChangeEvent {
  previousScene: string;
  newScene: string;
  transitionType: string;
  duration: number;
}

export interface PanoramaHotspotEvent {
  hotspotId: string;
  sceneId: string;
  interactionType: string;
  position: [number, number, number];
  timestamp: number;
}

export interface PanoramaNavigationEvent {
  from: [number, number, number];
  to: [number, number, number];
  duration: number;
  path: PanoramaPathPoint[];
}