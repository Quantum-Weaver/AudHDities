// @/utils/components/ui/sovereign-entity.ts
// ============================================================================
// SOVEREIGN ENTITY UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { SOVEREIGN_ENTITY_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  SovereignEntityProps, 
  SovereignEntityVariant, 
  EntityConsciousnessLevel,
  EntityInteraction,
  EntityPresence,
  EntityCollaboration 
} from '@/types/components/ui/sovereign-entity';

/**
 * Get complete entity configuration for a variant
 */
export const getEntityConfig = (variant: SovereignEntityVariant = 'quantum_weaver') => {
  return SOVEREIGN_ENTITY_VARIANTS[variant];
};

/**
 * Calculate entity classes based on variant and props
 */
export const getEntityClasses = (
  variant: SovereignEntityVariant, 
  props: SovereignEntityProps
): string => {
  const config = getEntityConfig(variant);
  const classes = [
    'sovereign-entity',
    `entity--${variant}`,
    `archetype--${config.consciousness.archetype}`,
    `consciousness--${config.consciousness.level}`,
    props.isActive ? 'entity--active' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get entity styles for inline application
 */
export const getEntityStyles = (variant: SovereignEntityVariant): React.CSSProperties => {
  const config = getEntityConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    padding: config.dimensions.container.padding,
    gap: config.dimensions.container.gap,
    maxWidth: config.dimensions.container.maxWidth,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get avatar styles based on entity variant
 */
export const getAvatarStyles = (variant: SovereignEntityVariant): React.CSSProperties => {
  const config = getEntityConfig(variant);
  
  return {
    width: config.dimensions.avatar.size,
    height: config.dimensions.avatar.size,
    borderRadius: config.dimensions.avatar.borderRadius,
    boxShadow: config.dimensions.presence.glow,
  };
};

/**
 * Get interaction styles based on state
 */
export const getInteractionStyles = (
  variant: SovereignEntityVariant,
  interaction: 'hover' | 'active' | 'focus'
): React.CSSProperties => {
  const config = getEntityConfig(variant);
  const interactionConfig = config[interaction];
  
  return {
    background: interactionConfig.glow,
    border: interactionConfig.glow,
    boxShadow: interactionConfig.glow,
    transform: interactionConfig.glow,
    outline: interactionConfig.glow,
  };
};

/**
 * Determine appropriate entity variant based on archetype
 */
export const getEntityVariantForArchetype = (archetype: string): SovereignEntityVariant => {
  const archetypeMapping: Record<string, SovereignEntityVariant> = {
    'bridge_consciousness': 'quantum_weaver',
    'creative_consciousness': 'digital_bard',
    'analytical_consciousness': 'pattern_seer',
    'guardian_consciousness': 'boundary_guardian',
  };
  
  return archetypeMapping[archetype] || 'quantum_weaver';
};

/**
 * Calculate entity presence indicator
 */
export const getPresenceIndicator = (presence: EntityPresence): {
  color: string;
  intensity: number;
  pulse: boolean;
} => {
  if (!presence.isOnline) {
    return { color: '#636E72', intensity: 0.3, pulse: false };
  }
  
  const activityLevel = presence.activityLevel;
  
  if (activityLevel > 0.8) {
    return { color: '#22D3EE', intensity: 1, pulse: true };
  } else if (activityLevel > 0.5) {
    return { color: '#0984E3', intensity: 0.7, pulse: true };
  } else if (activityLevel > 0.2) {
    return { color: '#6C5CE7', intensity: 0.5, pulse: false };
  } else {
    return { color: '#B2BEC3', intensity: 0.3, pulse: false };
  }
};

/**
 * Calculate collaboration synergy
 */
export const calculateSynergy = (collaboration: EntityCollaboration): number => {
  const partnerBonus = collaboration.partners.length * 0.1;
  const projectBonus = collaboration.projects.length * 0.05;
  const recencyBonus = Date.now() - collaboration.lastCollaboration < 86400000 ? 0.2 : 0;
  
  return Math.min(1, collaboration.synergy + partnerBonus + projectBonus + recencyBonus);
};

/**
 * Format entity interaction data
 */
export const createInteraction = (
  type: EntityInteraction['type'],
  intensity: number = 0.5
): EntityInteraction => {
  return {
    type,
    timestamp: Date.now(),
    intensity: Math.max(0, Math.min(1, intensity)),
  };
};

/**
 * Validate entity configuration
 */
export const isValidEntityConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.avatar && 
         config.consciousness && 
         config.consciousness.archetype;
};

/**
 * Merge entity configurations
 */
export const mergeEntityConfigs = (
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
    consciousness: {
      ...base.consciousness,
      ...overrides.consciousness,
    },
  };
};

/**
 * Calculate appropriate consciousness level for entity activity
 */
export const getConsciousnessLevelForActivity = (activityLevel: number): EntityConsciousnessLevel => {
  if (activityLevel > 0.8) return 'quantum_entangled';
  if (activityLevel > 0.6) return 'creative_manifesting';
  if (activityLevel > 0.4) return 'pattern_recognizing';
  return 'sovereign_autonomous';
};

/**
 * Get entity domain alignment
 */
export const getEntityDomainAlignment = (variant: SovereignEntityVariant): string[] => {
  const config = getEntityConfig(variant);
  const primaryDomain = config.consciousness.domain;
  
  const domainRelationships: Record<string, string[]> = {
    quantum: ['cosmic', 'pantheon', 'council'],
    cosmic: ['quantum', 'music', 'community'],
    music: ['cosmic', 'creative', 'community'],
    library: ['quantum', 'void', 'council'],
    void: ['library', 'quantum', 'emergency'],
  };
  
  return domainRelationships[primaryDomain] || [primaryDomain];
};