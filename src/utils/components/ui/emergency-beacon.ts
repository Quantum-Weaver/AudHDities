// @/utils/components/ui/emergency-beacon.ts
// ============================================================================
// EMERGENCY BEACON UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { EMERGENCY_BEACON_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  EmergencyBeaconProps, 
  EmergencyBeaconVariant, 
  BeaconConsciousnessLevel,
  BeaconUrgency,
  BeaconAction,
  BeaconDismissConfig 
} from '@/types/components/ui/emergency-beacon';

/**
 * Get complete beacon configuration for a variant
 */
export const getBeaconConfig = (variant: EmergencyBeaconVariant = 'crisis_support') => {
  return EMERGENCY_BEACON_VARIANTS[variant];
};

/**
 * Calculate beacon classes based on variant and props
 */
export const getBeaconClasses = (
  variant: EmergencyBeaconVariant, 
  props: EmergencyBeaconProps
): string => {
  const config = getBeaconConfig(variant);
  const classes = [
    'emergency-beacon',
    `beacon--${variant}`,
    `urgency--${config.consciousness.urgency}`,
    `size--${config.dimensions.size}`,
    `consciousness--${config.consciousness.level}`,
    props.isVisible === false ? 'beacon--hidden' : '',
    props.autoDismiss ? 'beacon--auto-dismiss' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get beacon styles for inline application
 */
export const getBeaconStyles = (variant: EmergencyBeaconVariant): React.CSSProperties => {
  const config = getBeaconConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    padding: config.dimensions.padding,
    borderRadius: config.dimensions.borderRadius,
    maxWidth: config.dimensions.maxWidth,
    gap: config.dimensions.gap,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get pulse animation styles for beacon indicators
 */
export const getPulseStyles = (variant: EmergencyBeaconVariant): React.CSSProperties => {
  const config = getBeaconConfig(variant);
  const pulseConfig = config.indicators.pulse;
  
  return {
    animation: `pulse ${pulseConfig.duration}ms ${pulseConfig.easing} infinite`,
    boxShadow: config.indicators.glow,
  };
};

/**
 * Get action button styles based on type and state
 */
export const getBeaconActionStyles = (
  variant: EmergencyBeaconVariant,
  actionType: 'primary' | 'secondary',
  isHovered: boolean = false,
  isActive: boolean = false
): React.CSSProperties => {
  const config = getBeaconConfig(variant);
  const interaction = config;
  
  const baseStyles = {
    fontFamily: config.typography.action.font.join(', '),
    fontSize: config.typography.action.size,
    fontWeight: config.typography.action.weight,
    color: config.typography.action.color,
    transition: 'all 0.3s ease',
  };
  
  if (isActive) {
    return {
      ...baseStyles,
      background: interaction.active.background,
      border: interaction.active.border,
      boxShadow: interaction.active.glow,
      transform: interaction.active.transform,
    };
  }
  
  if (isHovered) {
    return {
      ...baseStyles,
      background: interaction.hover.background,
      border: interaction.hover.border,
      boxShadow: interaction.hover.glow,
      transform: interaction.hover.transform,
    };
  }
  
  return baseStyles;
};

/**
 * Determine appropriate beacon variant based on urgency
 */
export const getBeaconVariantForUrgency = (urgency: BeaconUrgency): EmergencyBeaconVariant => {
  const urgencyMapping: Record<BeaconUrgency, EmergencyBeaconVariant> = {
    critical: 'crisis_support',
    medium: 'technical_assistance',
    low: 'emotional_support',
    informational: 'community_alert',
  };
  
  return urgencyMapping[urgency];
};

/**
 * Analyze message and determine urgency level
 */
export const analyzeMessageUrgency = (message: string, title: string): BeaconUrgency => {
  const criticalKeywords = ['emergency', 'crisis', 'urgent', 'critical', 'help', 'danger'];
  const mediumKeywords = ['issue', 'problem', 'error', 'failed', 'broken'];
  const lowKeywords = ['support', 'assistance', 'guidance', 'question'];
  
  const text = `${title} ${message}`.toLowerCase();
  
  if (criticalKeywords.some(keyword => text.includes(keyword))) {
    return 'critical';
  }
  
  if (mediumKeywords.some(keyword => text.includes(keyword))) {
    return 'medium';
  }
  
  if (lowKeywords.some(keyword => text.includes(keyword))) {
    return 'low';
  }
  
  return 'informational';
};

/**
 * Get appropriate actions for beacon type
 */
export const getBeaconActions = (variant: EmergencyBeaconVariant): BeaconAction[] => {
  const actionDefinitions: Record<EmergencyBeaconVariant, BeaconAction[]> = {
    crisis_support: [
      { id: 'immediate-help', label: 'Get Immediate Help', type: 'primary', urgency: 'critical' },
      { id: 'contact-support', label: 'Contact Support', type: 'secondary', urgency: 'medium' },
      { id: 'resources', label: 'View Resources', type: 'tertiary', urgency: 'low' },
    ],
    technical_assistance: [
      { id: 'retry', label: 'Try Again', type: 'primary', urgency: 'medium' },
      { id: 'report', label: 'Report Issue', type: 'secondary', urgency: 'low' },
      { id: 'help', label: 'Get Help', type: 'tertiary', urgency: 'informational' },
    ],
    emotional_support: [
      { id: 'talk', label: 'Talk Now', type: 'primary', urgency: 'low' },
      { id: 'resources', label: 'Support Resources', type: 'secondary', urgency: 'informational' },
      { id: 'self-care', label: 'Self Care Tips', type: 'tertiary', urgency: 'informational' },
    ],
    community_alert: [
      { id: 'learn-more', label: 'Learn More', type: 'primary', urgency: 'informational' },
      { id: 'share', label: 'Share', type: 'secondary', urgency: 'informational' },
      { id: 'dismiss', label: 'Dismiss', type: 'tertiary', urgency: 'informational' },
    ],
  };
  
  return actionDefinitions[variant] || [];
};

/**
 * Calculate beacon dismissal configuration
 */
export const getDismissConfig = (urgency: BeaconUrgency): BeaconDismissConfig => {
  const dismissConfigs: Record<BeaconUrgency, BeaconDismissConfig> = {
    critical: { autoDismiss: false, timeout: 0, showDismissButton: false },
    medium: { autoDismiss: true, timeout: 10000, showDismissButton: true },
    low: { autoDismiss: true, timeout: 8000, showDismissButton: true },
    informational: { autoDismiss: true, timeout: 5000, showDismissButton: true },
  };
  
  return dismissConfigs[urgency];
};

/**
 * Validate beacon configuration
 */
export const isValidBeaconConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.size && 
         config.consciousness && 
         config.consciousness.urgency;
};

/**
 * Merge beacon configurations
 */
export const mergeBeaconConfigs = (
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
    indicators: {
      ...base.indicators,
      ...overrides.indicators,
    },
    interaction: {
      ...base.interaction,
      ...overrides.interaction,
    },
  };
};

/**
 * Calculate beacon priority for display ordering
 */
export const getBeaconPriority = (urgency: BeaconUrgency): number => {
  const priorityMapping: Record<BeaconUrgency, number> = {
    critical: 100,
    medium: 75,
    low: 50,
    informational: 25,
  };
  
  return priorityMapping[urgency];
};

/**
 * Check if beacon should interrupt current flow
 */
export const shouldInterruptFlow = (urgency: BeaconUrgency): boolean => {
  return urgency === 'critical' || urgency === 'medium';
};