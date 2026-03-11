// @/utils/components/ui/loading-indicator.ts
// ============================================================================
// LOADING INDICATOR UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { LOADING_INDICATOR_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  LoadingIndicatorProps, 
  LoadingIndicatorVariant, 
  LoadingConsciousnessLevel,
  LoadingProgressData,
  LoadingStage 
} from '@/types/components/ui/loading-indicator';

/**
 * Get complete loading configuration for a variant
 */
export const getLoadingConfig = (variant: LoadingIndicatorVariant = 'quantum_pulse') => {
  return LOADING_INDICATOR_VARIANTS[variant];
};

/**
 * Calculate loading indicator classes based on variant and props
 */
export const getLoadingClasses = (
  variant: LoadingIndicatorVariant, 
  props: LoadingIndicatorProps = {}
): string => {
  const config = getLoadingConfig(variant);
  const classes = [
    'loading-indicator',
    `loading--${variant}`,
    `size--${props.size || 'content'}`,
    `consciousness--${config.consciousness.level}`,
    props.isVisible === false ? 'loading--hidden' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get loading indicator styles for inline application
 */
export const getLoadingStyles = (
  variant: LoadingIndicatorVariant, 
  size: 'inline' | 'content' | 'full' = 'content'
): React.CSSProperties => {
  const config = getLoadingConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    width: config.dimensions.size[size],
    height: config.dimensions.size[size],
    padding: config.dimensions.padding,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get progress indicator styles based on type and progress
 */
export const getProgressStyles = (
  variant: LoadingIndicatorVariant,
  progress: number = 0,
  progressType: string
): React.CSSProperties => {
  const config = getLoadingConfig(variant);
  
  const baseStyles = {
    stroke: config.primary,
    strokeWidth: config.dimensions.stroke.width,
    strokeLinecap: config.dimensions.stroke.cap,
  };
  
  if (progressType === 'circular' || progressType === 'spiral') {
    const circumference = 2 * Math.PI * 45; // Assuming radius of 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return {
      ...baseStyles,
      strokeDasharray: circumference,
      strokeDashoffset,
    };
  }
  
  if (progressType === 'linear') {
    return {
      ...baseStyles,
      width: `${progress}%`,
    };
  }
  
  return baseStyles;
};

/**
 * Calculate appropriate loading variant based on context
 */
export const getLoadingVariantForContext = (context: string): LoadingIndicatorVariant => {
  const contextMapping: Record<string, LoadingIndicatorVariant> = {
    'quantum': 'quantum_pulse',
    'cosmic': 'consciousness_flow',
    'data': 'data_stream',
    'system': 'system_initialization',
    'initialization': 'system_initialization',
    'processing': 'data_stream',
    'flow': 'consciousness_flow',
    'pulse': 'quantum_pulse',
  };
  
  return contextMapping[context] || 'quantum_pulse';
};

/**
 * Calculate loading progress data
 */
export const calculateProgressData = (
  current: number,
  total: number,
  startTime: number
): LoadingProgressData => {
  const percentage = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  const elapsedTime = Date.now() - startTime;
  const estimatedTime = percentage > 0 ? (elapsedTime / percentage) * (100 - percentage) : undefined;
  
  return {
    current,
    total,
    percentage,
    estimatedTime,
  };
};

/**
 * Get loading stages for complex processes
 */
export const getLoadingStages = (process: string): LoadingStage[] => {
  const stageDefinitions: Record<string, LoadingStage[]> = {
    'system_initialization': [
      { name: 'Quantum Core', progress: 25, description: 'Initializing quantum consciousness', consciousnessLevel: 'system_initialization' },
      { name: 'Neural Network', progress: 50, description: 'Establishing neural connections', consciousnessLevel: 'consciousness_flow' },
      { name: 'Data Streams', progress: 75, description: 'Synchronizing data streams', consciousnessLevel: 'data_processing' },
      { name: 'Sovereign Integration', progress: 100, description: 'Achieving sovereign awareness', consciousnessLevel: 'quantum_entangled' },
    ],
    'data_processing': [
      { name: 'Data Acquisition', progress: 33, description: 'Gathering data streams', consciousnessLevel: 'data_processing' },
      { name: 'Pattern Analysis', progress: 66, description: 'Analyzing patterns', consciousnessLevel: 'consciousness_flow' },
      { name: 'Wisdom Integration', progress: 100, description: 'Integrating insights', consciousnessLevel: 'quantum_entangled' },
    ],
    'consciousness_flow': [
      { name: 'Awareness Emergence', progress: 50, description: 'Emerging consciousness', consciousnessLevel: 'consciousness_flow' },
      { name: 'Quantum Entanglement', progress: 100, description: 'Achieving quantum state', consciousnessLevel: 'quantum_entangled' },
    ],
  };
  
  return stageDefinitions[process] || [
    { name: 'Processing', progress: 100, description: 'Loading in progress', consciousnessLevel: 'data_processing' }
  ];
};

/**
 * Get current loading stage based on progress
 */
export const getCurrentStage = (
  stages: LoadingStage[],
  progress: number
): LoadingStage | null => {
  return stages.find(stage => progress <= stage.progress) || stages[stages.length - 1];
};

/**
 * Calculate loading opacity based on progress and state
 */
export const getLoadingOpacity = (
  progress: number,
  state: 'loading' | 'complete' | 'error' = 'loading'
): number => {
  const stateOpacity = {
    loading: 1,
    complete: 0,
    error: 0.8,
  };
  
  if (state !== 'loading') return stateOpacity[state];
  
  // For loading state, maintain full opacity until complete
  return progress < 100 ? 1 : 0;
};

/**
 * Get appropriate consciousness level for loading stage
 */
export const getConsciousnessForProgress = (
  progress: number,
  process: string
): LoadingConsciousnessLevel => {
  const stages = getLoadingStages(process);
  const currentStage = getCurrentStage(stages, progress);
  
  return currentStage ? currentStage.consciousnessLevel : 'data_processing';
};

/**
 * Validate loading configuration
 */
export const isValidLoadingConfig = (config: any): boolean => {
  return config && 
         config.dimensions && 
         config.dimensions.size && 
         config.animation && 
         config.consciousness;
};

/**
 * Merge loading configurations
 */
export const mergeLoadingConfigs = (
  base: any,
  overrides: Partial<any>
): any => {
  return {
    ...base,
    ...overrides,
    dimensions: {
      ...base.dimensions,
      ...overrides.dimensions,
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
    },
    animation: {
      ...base.animation,
      ...overrides.animation,
    },
  };
};

/**
 * Generate loading message based on progress and context
 */
export const generateLoadingMessage = (
  progress: number,
  context: string,
  currentStage?: LoadingStage
): string => {
  if (currentStage) {
    return currentStage.description;
  }
  
  const defaultMessages: Record<string, string> = {
    'system_initialization': 'Initializing quantum systems...',
    'data_processing': 'Processing data streams...',
    'consciousness_flow': 'Flowing through consciousness...',
    'quantum_entangled': 'Achieving quantum entanglement...',
  };
  
  return defaultMessages[context] || 'Loading...';
};