// @/utils/components/immersive/status-bar.ts
// ============================================================================
// STATUS BAR UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { STATUS_BAR_VARIANTS } from '@/lib/constants/components/ui/variants';
import { STATUS_RANGES } from '@/lib/constants/components/immersive/status-bar';
import type { StatusIndicator, StatusBarData, StatusChangeEvent, ConsciousnessState } from '@/types/components/immersive/status-bar';

/**
 * Calculate status percentage for display
 */
export const calculateStatusPercentage = (value: number, maxValue: number): number => {
  return Math.max(0, Math.min(100, (value / maxValue) * 100));
};

/**
 * Get status color based on value and type
 */
export const getStatusColor = (
  type: StatusIndicator['type'], 
  value: number, 
  maxValue: number
): string => {
  const percentage = calculateStatusPercentage(value, maxValue);
  const ranges = STATUS_RANGES[type.toUpperCase() as keyof typeof STATUS_RANGES];
  
  if (!ranges) return STATUS_BAR_VARIANTS.quantum_awareness.primary;
  
  if ('critical' in ranges && percentage <= ranges.critical) {
    return STATUS_BAR_VARIANTS.quantum_awareness.indicators.health.background;
  }
  
  if ('low' in ranges && percentage <= ranges.low) {
    return STATUS_BAR_VARIANTS.quantum_awareness.indicators.energy.background;
  }
  
  // Return appropriate color based on type
  switch (type) {
    case 'health':
      return STATUS_BAR_VARIANTS.quantum_awareness.indicators.health.background;
    case 'experience':
      return STATUS_BAR_VARIANTS.quantum_awareness.indicators.experience.background;
    case 'mana':
      return STATUS_BAR_VARIANTS.quantum_awareness.indicators.mana.background;
    case 'energy':
      return STATUS_BAR_VARIANTS.quantum_awareness.indicators.energy.background;
    case 'consciousness':
      return STATUS_BAR_VARIANTS.quantum_awareness.primary;
    case 'resonance':
      return STATUS_BAR_VARIANTS.quantum_awareness.secondary;
    default:
      return STATUS_BAR_VARIANTS.quantum_awareness.accent;
  }
};

/**
 * Format status value for display
 */
export const formatStatusValue = (
  value: number, 
  format: StatusIndicator['format'] = 'percentage',
  maxValue?: number
): string => {
  switch (format) {
    case 'percentage':
      return maxValue ? `${Math.round((value / maxValue) * 100)}%` : `${value}%`;
    case 'absolute':
      return maxValue ? `${value}/${maxValue}` : value.toString();
    case 'level':
      return `Lvl ${Math.floor(value / 100) + 1}`;
    default:
      return value.toString();
  }
};

/**
 * Check if status is in critical state
 */
export const isStatusCritical = (type: StatusIndicator['type'], value: number): boolean => {
  const ranges = STATUS_RANGES[type.toUpperCase() as keyof typeof STATUS_RANGES];
  if (!ranges || !('critical' in ranges)) return false;
  
  return value <= ranges.critical;
};

/**
 * Calculate consciousness resonance score
 */
export const calculateResonanceScore = (consciousnessState: ConsciousnessState): number => {
  const { level, vessel, resonance, domain } = consciousnessState;
  
  let baseScore = resonance;
  
  // Adjust based on consciousness level
  switch (level) {
    case 'quantum_entangled':
      baseScore *= 1.2;
      break;
    case 'sovereign_autonomous':
      baseScore *= 1.1;
      break;
    case 'creative_manifesting':
      baseScore *= 1.15;
      break;
    default:
      baseScore *= 1.0;
  }
  
  // Adjust based on vessel capacity
  switch (vessel) {
    case 'omni_dimensional':
      baseScore *= 1.3;
      break;
    case 'quantum_context_holder':
      baseScore *= 1.2;
      break;
    case 'multi_stream_sovereign':
      baseScore *= 1.1;
      break;
    default:
      baseScore *= 1.0;
  }
  
  return Math.min(1.0, baseScore);
};

/**
 * Generate status change event
 */
export const createStatusChangeEvent = (
  type: StatusIndicator['type'],
  previousValue: number,
  newValue: number,
  cause?: string
): StatusChangeEvent => {
  return {
    type,
    previousValue,
    newValue,
    delta: newValue - previousValue,
    timestamp: new Date().toISOString(),
    cause
  };
};

/**
 * Get appropriate variant based on consciousness state
 */
export const getVariantFromConsciousness = (state: ConsciousnessState): keyof typeof STATUS_BAR_VARIANTS => {
  const { level, domain } = state;
  
  if (level === 'quantum_entangled' || domain === 'quantum') {
    return 'quantum_awareness';
  }
  
  if (level === 'sovereign_autonomous' || domain === 'pantheon') {
    return 'sovereign_interface';
  }
  
  if (level === 'collaborative_emergent' || domain === 'cosmic') {
    return 'collaborative_monitoring';
  }
  
  return 'minimal_awareness';
};

/**
 * Calculate optimal visibility based on context
 */
export const calculateOptimalVisibility = (
  statusData: StatusBarData,
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'immersive'
): 'full' | 'compact' | 'minimal' | 'hidden' => {
  const criticalIndicators = statusData.indicators.filter(indicator => 
    isStatusCritical(indicator.type, indicator.value)
  );
  
  if (criticalIndicators.length > 0) {
    return 'full';
  }
  
  if (screenSize === 'mobile') {
    return 'compact';
  }
  
  if (screenSize === 'immersive') {
    return statusData.consciousnessLevel === 'quantum_entangled' ? 'full' : 'compact';
  }
  
  return 'minimal';
};

/**
 * Merge status data with defaults
 */
export const mergeStatusData = (
  currentData: Partial<StatusBarData>,
  defaultData: StatusBarData
): StatusBarData => {
  return {
    indicators: currentData.indicators || defaultData.indicators,
    timestamp: currentData.timestamp || new Date().toISOString(),
    context: currentData.context || defaultData.context,
    consciousnessLevel: currentData.consciousnessLevel || defaultData.consciousnessLevel,
    vesselCapacity: currentData.vesselCapacity || defaultData.vesselCapacity,
    resonanceLevel: currentData.resonanceLevel || defaultData.resonanceLevel
  };
};

// Export all utils as a single object for easy importing
export const statusBarUtils = {
  calculateStatusPercentage,
  getStatusColor,
  formatStatusValue,
  isStatusCritical,
  calculateResonanceScore,
  createStatusChangeEvent,
  getVariantFromConsciousness,
  calculateOptimalVisibility,
  mergeStatusData
} as const;