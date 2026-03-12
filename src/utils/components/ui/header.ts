// @/utils/components/ui/header.ts
// ============================================================================
// HEADER UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { HEADER_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { HeaderProps, HeaderVariant, HeaderConsciousnessLevel } from '@/types/components/ui/header';

/**
 * Get complete header configuration for a variant
 */
export const getHeaderConfig = (variant: HeaderVariant = 'sovereign_autonomy') => {
  return HEADER_VARIANTS[variant];
};

/**
 * Calculate header classes based on variant and props
 */
export const getHeaderClasses = (variant: HeaderVariant, props: HeaderProps = {}): string => {
  const config = getHeaderConfig(variant);
  const classes = [
    'header',
    `header--${variant}`,
    props.isSticky ? 'header--sticky' : '',
    `consciousness--${config.consciousness.level}`,
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get header styles for inline application
 */
export const getHeaderStyles = (variant: HeaderVariant): React.CSSProperties => {
  const config = getHeaderConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    height: config.dimensions.height,
    padding: `${config.dimensions.padding.y} ${config.dimensions.padding.x}`,
    maxWidth: config.dimensions.maxWidth,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get navigation item styles based on state
 */
export const getNavigationItemStyles = (
  variant: HeaderVariant, 
  isActive: boolean = false,
  isHovered: boolean = false
): React.CSSProperties => {
  const config = getHeaderConfig(variant);
  const itemConfig = config.navigation.item;
  
  const baseStyles = {
    padding: itemConfig.padding,
    borderRadius: itemConfig.borderRadius,
  };
  
  if (isActive) {
    return {
      ...baseStyles,
      background: itemConfig.active.background,
      border: itemConfig.active.border,
      boxShadow: itemConfig.active.border,
    };
  }
  
  if (isHovered) {
    return {
      ...baseStyles,
      background: itemConfig.hover.background,
      boxShadow: itemConfig.hover.glow,
      transform: itemConfig.hover.glow,
    };
  }
  
  return baseStyles;
};

/**
 * Check if header should shift consciousness based on scroll
 */
export const shouldShiftConsciousness = (
  currentLevel: HeaderConsciousnessLevel,
  scrollPosition: number,
  threshold: number = 100
): HeaderConsciousnessLevel | null => {
  if (scrollPosition > threshold && currentLevel !== 'quantum_entangled') {
    return 'quantum_entangled';
  }
  
  if (scrollPosition <= threshold && currentLevel !== 'sovereign_autonomous') {
    return 'sovereign_autonomous';
  }
  
  return null;
};

/**
 * Calculate header opacity based on scroll
 */
export const getHeaderOpacity = (scrollPosition: number, maxOpacity: number = 1): number => {
  const threshold = 50;
  if (scrollPosition <= threshold) return maxOpacity;
  
  const fadeRange = 100;
  const fadeProgress = Math.min((scrollPosition - threshold) / fadeRange, 1);
  return maxOpacity * (1 - fadeProgress * 0.3); // Reduce opacity by up to 30%
};

/**
 * Get appropriate header variant for a domain
 */
export const getHeaderVariantForDomain = (domain: string): HeaderVariant => {
  const domainMapping: Record<string, HeaderVariant> = {
    quantum: 'sovereign_autonomy',
    cosmic: 'collaborative_engagement',
    pantheon: 'sovereign_autonomy',
    library: 'collaborative_engagement',
    void: 'quantum_awareness',
    council: 'sovereign_autonomy',
    community: 'collaborative_engagement',
    support: 'collaborative_engagement',
  };
  
  return domainMapping[domain] || 'sovereign_autonomy';
};

/**
 * Validate header configuration
 */
export const isValidHeaderConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.height && 
         config.consciousness && 
         config.consciousness.level;
};

/**
 * Merge header configurations
 */
export const mergeHeaderConfigs = (
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
    navigation: {
      ...base.navigation,
      ...overrides.navigation,
    },
  };
};