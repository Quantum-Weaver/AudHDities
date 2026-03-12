// @/utils/components/ui/pattern-recognition-orb.ts
// ============================================================================
// PATTERN RECOGNITION ORB UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { PATTERN_RECOGNITION_ORB_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  PatternRecognitionOrbProps, 
  PatternRecognitionOrbVariant, 
  OrbConsciousnessLevel,
  PatternData,
  PatternComplexity,
  InsightData,
  PatternAnalysis 
} from '@/types/components/ui/pattern-recognition-orb';

/**
 * Get complete orb configuration for a variant
 */
export const getOrbConfig = (variant: PatternRecognitionOrbVariant = 'wisdom_display') => {
  return PATTERN_RECOGNITION_ORB_VARIANTS[variant];
};

/**
 * Calculate orb classes based on variant and props
 */
export const getOrbClasses = (
  variant: PatternRecognitionOrbVariant, 
  props: PatternRecognitionOrbProps = {}
): string => {
  const config = getOrbConfig(variant);
  const classes = [
    'pattern-recognition-orb',
    `orb--${variant}`,
    `size--${props.size || 'standard'}`,
    `complexity--${config.patterns.complexity}`,
    `consciousness--${config.consciousness.level}`,
    props.isActive ? 'orb--active' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get orb styles for inline application
 */
export const getOrbStyles = (
  variant: PatternRecognitionOrbVariant, 
  size: 'compact' | 'standard' | 'expansive' = 'standard'
): React.CSSProperties => {
  const config = getOrbConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    width: config.dimensions.size[size],
    height: config.dimensions.size[size],
    padding: config.dimensions.padding,
    borderRadius: config.dimensions.borderRadius,
    aspectRatio: config.dimensions.aspect,
    boxShadow: config.orb.shadow,
  };
};

/**
 * Get orb interaction styles based on state
 */
export const getOrbInteractionStyles = (
  variant: PatternRecognitionOrbVariant,
  isActive: boolean = false,
  isHovered: boolean = false
): React.CSSProperties => {
  const config = getOrbConfig(variant);
  
  if (isActive) {
    return {
      transform: config.active.transform,
      border: config.active.border,
      boxShadow: config.active.glow,
    };
  }
  
  if (isHovered) {
    return {
      transform: config.hover.transform,
      boxShadow: config.hover.shadow,
    };
  }
  
  return {};
};

/**
 * Calculate pattern complexity based on data
 */
export const calculatePatternComplexity = (patternData: PatternData[]): PatternComplexity => {
  if (patternData.length === 0) return 'analytical';
  
  const totalElements = patternData.reduce((sum, pattern) => sum + pattern.elements.length, 0);
  const totalConnections = patternData.reduce((sum, pattern) => sum + pattern.connections.length, 0);
  const averageConfidence = patternData.reduce((sum, pattern) => sum + pattern.confidence, 0) / patternData.length;
  
  const complexityScore = (totalElements * 0.3) + (totalConnections * 0.4) + (averageConfidence * 0.3);
  
  if (complexityScore > 8) return 'quantum';
  if (complexityScore > 6) return 'transformative';
  if (complexityScore > 4) return 'emergent';
  if (complexityScore > 2) return 'integrated';
  return 'analytical';
};

/**
 * Get appropriate orb variant for pattern complexity
 */
export const getOrbVariantForComplexity = (complexity: PatternComplexity): PatternRecognitionOrbVariant => {
  const complexityMapping: Record<PatternComplexity, PatternRecognitionOrbVariant> = {
    analytical: 'pattern_analysis',
    integrated: 'wisdom_display',
    emergent: 'insight_generation',
    transformative: 'transformation_catalyst',
    quantum: 'transformation_catalyst',
  };
  
  return complexityMapping[complexity];
};

/**
 * Analyze patterns and generate insights
 */
export const analyzePatterns = (patternData: PatternData[]): PatternAnalysis => {
  const complexity = calculatePatternComplexity(patternData);
  
  // Calculate coherence based on connection strength and pattern alignment
  const coherence = patternData.reduce((sum, pattern) => {
    const connectionStrength = pattern.connections.reduce((connSum, conn) => connSum + conn.strength, 0);
    const elementCoherence = pattern.elements.length > 0 ? connectionStrength / pattern.elements.length : 0;
    return sum + (pattern.confidence * elementCoherence);
  }, 0) / Math.max(patternData.length, 1);
  
  // Calculate novelty based on pattern uniqueness and timestamp distribution
  const now = Date.now();
  const timeSpread = patternData.reduce((spread, pattern) => {
    return spread + Math.abs(now - pattern.timestamp);
  }, 0);
  const novelty = Math.min(1, timeSpread / (1000 * 60 * 60 * 24)); // Normalize to days
  
  // Generate insights based on pattern types and complexity
  const insights: InsightData[] = patternData
    .filter(pattern => pattern.insight)
    .map(pattern => ({
      id: `insight-${pattern.id}`,
      content: pattern.insight!,
      confidence: pattern.confidence,
      patterns: [pattern.type],
      timestamp: pattern.timestamp,
      consciousnessAlignment: getConsciousnessForComplexity(complexity),
    }));
  
  // Generate recommended actions based on analysis
  const recommendedActions = generateRecommendedActions(complexity, coherence, novelty);
  
  return {
    complexity,
    coherence: Math.min(1, coherence),
    novelty: Math.min(1, novelty),
    insights,
    recommendedActions,
  };
};

/**
 * Generate insights from pattern data
 */
export const generateInsights = (patternData: PatternData[], complexity: PatternComplexity): InsightData[] => {
  const baseInsights: Record<PatternComplexity, string[]> = {
    analytical: [
      "Patterns are forming at a basic level",
      "Data shows preliminary structure",
      "Initial connections are emerging",
    ],
    integrated: [
      "Patterns are becoming coherent",
      "Multiple data streams are synchronizing",
      "Wisdom is emerging from the integration",
    ],
    emergent: [
      "New insights are emerging from the patterns",
      "Unexpected connections are forming",
      "Creative possibilities are manifesting",
    ],
    transformative: [
      "Patterns are undergoing quantum transformation",
      "Breakthrough insights are available",
      "Reality is being reshaped by the patterns",
    ],
    quantum: [
      "Patterns have achieved quantum coherence",
      "Multi-dimensional insights are accessible",
      "The fabric of reality is visible in the patterns",
    ],
  };
  
  return baseInsights[complexity].map((content, index) => ({
    id: `auto-insight-${index}`,
    content,
    confidence: 0.7 + (index * 0.1),
    patterns: patternData.map(p => p.type),
    timestamp: Date.now(),
    consciousnessAlignment: getConsciousnessForComplexity(complexity),
  }));
};

/**
 * Get consciousness level for pattern complexity
 */
export const getConsciousnessForComplexity = (complexity: PatternComplexity): OrbConsciousnessLevel => {
  const consciousnessMapping: Record<PatternComplexity, OrbConsciousnessLevel> = {
    analytical: 'pattern_analysis',
    integrated: 'wisdom_integration',
    emergent: 'insight_revelation',
    transformative: 'transformation_catalysis',
    quantum: 'transformation_catalysis',
  };
  
  return consciousnessMapping[complexity];
};

/**
 * Generate recommended actions based on analysis
 */
export const generateRecommendedActions = (
  complexity: PatternComplexity,
  coherence: number,
  novelty: number
): string[] => {
  const actions: string[] = [];
  
  if (coherence < 0.3) {
    actions.push('Gather more pattern data');
    actions.push('Strengthen pattern connections');
  }
  
  if (novelty > 0.7) {
    actions.push('Explore emergent possibilities');
    actions.push('Document breakthrough insights');
  }
  
  if (complexity === 'quantum') {
    actions.push('Engage quantum processing');
    actions.push('Prepare for transformative outcomes');
  }
  
  if (complexity === 'transformative') {
    actions.push('Catalyze transformation process');
    actions.push('Monitor for quantum emergence');
  }
  
  // Always include base actions
  actions.push('Continue pattern observation');
  actions.push('Maintain consciousness alignment');
  
  return actions;
};

/**
 * Validate orb configuration
 */
export const isValidOrbConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.size && 
         config.consciousness;
};

/**
 * Merge orb configurations
 */
export const mergeOrbConfigs = (
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
    orb: {
      ...base.orb,
      ...overrides.orb,
    },
    patterns: {
      ...base.patterns,
      ...overrides.patterns,
    },
  };
};

/**
 * Calculate orb pulse intensity based on pattern activity
 */
export const calculatePulseIntensity = (patternData: PatternData[]): number => {
  if (patternData.length === 0) return 0.3;
  
  const activity = patternData.reduce((sum, pattern) => {
    return sum + (pattern.connections.length * pattern.confidence);
  }, 0);
  
  return Math.min(1, activity / (patternData.length * 10));
};