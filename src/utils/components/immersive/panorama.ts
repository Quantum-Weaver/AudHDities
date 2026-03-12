// @/utils/components/immersive/panorama.ts
// ============================================================================
// PANORAMA UTILITIES - PURE LOGIC FOR COSMIC IMMERSION
// ============================================================================

import type {
  PanoramaState,
  PanoramaVariant,
  PanoramaPhysics,
  PanoramaPerformance,
  PanoramaPathPoint,
  PanoramaSceneChangeEvent,
  PanoramaHotspotEvent
} from '@/types/components/immersive/panorama';

import {
  PANORAMA_PHYSICS,
  PANORAMA_PERFORMANCE,
  PANORAMA_TRANSITIONS,
  PANORAMA_ACCESSIBILITY
} from '@/lib/constants/components/immersive/panorama';

// ============================================================================
// PANORAMA STATE MANAGEMENT UTILITIES
// ============================================================================

/**
 * Initialize panorama state with default values
 */
export const initializePanoramaState = (
  initialScene: string = 'default',
  performance: PanoramaPerformance = 'balanced'
): PanoramaState => ({
  currentScene: initialScene,
  cameraPosition: [0, 0, 0],
  cameraRotation: [0, 0, 0],
  zoomLevel: 1.0,
  activeHotspots: new Set(),
  userPath: [],
  qualityMode: performance,
  loadedAssets: new Set(),
  resonance: 0.5,
  engagement: 0.0
});

/**
 * Update panorama camera position with physics
 */
export const updateCameraPosition = (
  currentState: PanoramaState,
  targetPosition: [number, number, number],
  physics: PanoramaPhysics = 'quantum_responsive',
  deltaTime: number = 0.016
): PanoramaState => {
  const physicsConfig = PANORAMA_PHYSICS[physics];
  const [currentX, currentY, currentZ] = currentState.cameraPosition;
  const [targetX, targetY, targetZ] = targetPosition;
  
  // Apply physics-based interpolation
  const inertia = physicsConfig.inertia * deltaTime * 60;
  const newX = currentX + (targetX - currentX) * inertia;
  const newY = currentY + (targetY - currentY) * inertia;
  const newZ = currentZ + (targetZ - currentZ) * inertia;
  
  return {
    ...currentState,
    cameraPosition: [newX, newY, newZ] as [number, number, number]
  };
};

/**
 * Calculate distance between two 3D points
 */
export const calculateDistance = (
  pointA: [number, number, number],
  pointB: [number, number, number]
): number => {
  const [x1, y1, z1] = pointA;
  const [x2, y2, z2] = pointB;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

// ============================================================================
// PANORAMA INTERACTION UTILITIES
// ============================================================================

/**
 * Check if position is within hotspot radius
 */
export const isPositionInHotspot = (
  position: [number, number, number],
  hotspotPosition: [number, number, number],
  radius: number = 1.0
): boolean => {
  const distance = calculateDistance(position, hotspotPosition);
  return distance <= radius;
};

/**
 * Find nearest hotspot to current position
 */
export const findNearestHotspot = (
  position: [number, number, number],
  hotspots: Array<{ id: string; position: [number, number, number]; radius?: number }>
): string | null => {
  if (hotspots.length === 0) return null;
  
  let nearestId: string | null = null;
  let minDistance = Infinity;
  
  hotspots.forEach(hotspot => {
    const distance = calculateDistance(position, hotspot.position);
    const effectiveRadius = hotspot.radius || 1.0;
    
    if (distance <= effectiveRadius && distance < minDistance) {
      minDistance = distance;
      nearestId = hotspot.id;
    }
  });
  
  return nearestId;
};

/**
 * Calculate engagement level based on user interactions
 */
export const calculateEngagement = (
  userPath: PanoramaPathPoint[],
  activeHotspots: Set<string>,
  timeInScene: number
): number => {
  const pathLength = userPath.length;
  const hotspotInteractions = activeHotspots.size;
  const timeFactor = Math.min(timeInScene / 60000, 1); // Normalize to 1 minute
  
  // Weighted engagement calculation
  const pathEngagement = Math.min(pathLength / 50, 1) * 0.4;
  const interactionEngagement = Math.min(hotspotInteractions / 10, 1) * 0.4;
  const timeEngagement = timeFactor * 0.2;
  
  return pathEngagement + interactionEngagement + timeEngagement;
};

// ============================================================================
// PANORAMA PERFORMANCE UTILITIES
// ============================================================================

/**
 * Adjust performance settings based on device capabilities
 */
export const getOptimalPerformanceMode = (): PanoramaPerformance => {
  if (typeof window === 'undefined') return 'balanced';
  
  const { hardwareConcurrency, deviceMemory } = window.navigator as any;
  const isLowEnd = hardwareConcurrency <= 4 || deviceMemory <= 4;
  const isHighEnd = hardwareConcurrency >= 8 && deviceMemory >= 8;
  
  if (isLowEnd) return 'performance';
  if (isHighEnd) return 'quality';
  return 'balanced';
};

/**
 * Calculate appropriate particle density based on performance mode
 */
export const getParticleDensity = (
  performance: PanoramaPerformance,
  reducedMotion: boolean = false
): number => {
  const baseDensity = PANORAMA_PERFORMANCE[performance].particles;
  
  if (reducedMotion) {
    return baseDensity * PANORAMA_ACCESSIBILITY.motion.reduce.particleDensity;
  }
  
  return baseDensity;
};

// ============================================================================
// PANORAMA TRANSITION UTILITIES
// ============================================================================

/**
 * Generate smooth transition between scenes
 */
export const createSceneTransition = (
  fromScene: string,
  toScene: string,
  transitionType: keyof typeof PANORAMA_TRANSITIONS = 'sceneChange'
): PanoramaSceneChangeEvent => {
  const transitionConfig = PANORAMA_TRANSITIONS[transitionType];
  
  return {
    previousScene: fromScene,
    newScene: toScene,
    transitionType,
    duration: transitionConfig.duration
  };
};

/**
 * Interpolate between two positions for smooth movement
 */
export const interpolatePosition = (
  start: [number, number, number],
  end: [number, number, number],
  progress: number,
  easing: (t: number) => number = (t) => t
): [number, number, number] => {
  const easedProgress = easing(progress);
  
  return [
    start[0] + (end[0] - start[0]) * easedProgress,
    start[1] + (end[1] - start[1]) * easedProgress,
    start[2] + (end[2] - start[2]) * easedProgress
  ];
};

// ============================================================================
// PANORAMA CONSIOUSNESS UTILITIES
// ============================================================================

/**
 * Calculate resonance based on engagement and interaction quality
 */
export const calculateResonance = (
  engagement: number,
  interactionQuality: number,
  timeConsistent: number
): number => {
  // Resonance formula: weighted combination of factors
  const engagementWeight = 0.5;
  const interactionWeight = 0.3;
  const consistencyWeight = 0.2;
  
  const consistencyFactor = Math.min(timeConsistent / 300000, 1); // 5 minutes max
  
  return (
    engagement * engagementWeight +
    interactionQuality * interactionWeight +
    consistencyFactor * consistencyWeight
  );
};

/**
 * Determine appropriate consciousness level based on resonance
 */
export const getConsciousnessLevel = (resonance: number): string => {
  if (resonance >= 0.8) return 'quantum_entangled';
  if (resonance >= 0.6) return 'sovereign_autonomous';
  if (resonance >= 0.4) return 'collaborative_emergent';
  if (resonance >= 0.2) return 'pattern_recognizing';
  return 'creative_manifesting';
};

// ============================================================================
// PANORAMA ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get accessibility-adjusted animation duration
 */
export const getAccessibleDuration = (
  baseDuration: number,
  reducedMotion: boolean = shouldReduceMotion()
): number => {
  if (reducedMotion) {
    return baseDuration * PANORAMA_ACCESSIBILITY.motion.reduce.transitionDuration;
  }
  
  return baseDuration;
};

// ============================================================================
// PANORAMA EXPORT
// ============================================================================

export const panoramaUtils = {
  // State Management
  initializePanoramaState,
  updateCameraPosition,
  calculateDistance,
  
  // Interaction
  isPositionInHotspot,
  findNearestHotspot,
  calculateEngagement,
  
  // Performance
  getOptimalPerformanceMode,
  getParticleDensity,
  
  // Transitions
  createSceneTransition,
  interpolatePosition,
  
  // Consciousness
  calculateResonance,
  getConsciousnessLevel,
  
  // Accessibility
  shouldReduceMotion,
  getAccessibleDuration
} as const;