// @/utils/components/ui/section.ts
// ============================================================================
// SECTION UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { SECTION_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  SectionProps, 
  SectionVariant, 
  SectionConsciousnessLevel,
  SectionLayout 
} from '@/types/components/ui/section';

/**
 * Get complete section configuration for a variant
 */
export const getSectionConfig = (variant: SectionVariant = 'content_group') => {
  return SECTION_VARIANTS[variant];
};

/**
 * Calculate section classes based on variant and props
 */
export const getSectionClasses = (
  variant: SectionVariant, 
  props: SectionProps = {}
): string => {
  const config = getSectionConfig(variant);
  const classes = [
    'section',
    `section--${variant}`,
    `spacing--${config.dimensions.spacing}`,
    `consciousness--${config.consciousness.level}`,
    props.fullWidth ? 'section--full-width' : '',
    props.backgroundEffects && config.background ? 'section--background-effects' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get section styles for inline application
 */
export const getSectionStyles = (variant: SectionVariant): React.CSSProperties => {
  const config = getSectionConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    padding: `${config.dimensions.padding.top} ${config.dimensions.padding.x} ${config.dimensions.padding.bottom}`,
    maxWidth: config.dimensions.maxWidth,
    gap: config.dimensions.gap,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get grid styles based on screen size
 */
export const getGridStyles = (
  variant: SectionVariant,
  screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): React.CSSProperties => {
  const config = getSectionConfig(variant);
  const columns = config.grid.columns[screenSize];
  
  return {
    display: 'grid',
    gap: config.grid.gap,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };
};

/**
 * Get child animation delay for staggered entrance
 */
export const getChildAnimationDelay = (
  variant: SectionVariant,
  index: number,
  totalChildren: number
): number => {
  const config = getSectionConfig(variant);
  const stagger = config.children.stagger || 100;
  
  // Calculate delay based on position and total children
  const baseDelay = index * stagger;
  const maxDelay = (totalChildren - 1) * stagger;
  
  // Normalize to prevent excessive delays with many children
  return Math.min(baseDelay, maxDelay);
};

/**
 * Get child hover styles
 */
export const getChildHoverStyles = (variant: SectionVariant): React.CSSProperties => {
  const config = getSectionConfig(variant);
  const hoverConfig = config.children.animation.enter;
  
  if (!hoverConfig) return {};
  
  return {
    transition: 'all 0.3s ease',
    transform: hoverConfig.easing,
    background: hoverConfig.complexity,
    border: hoverConfig.complexity,
    boxShadow: hoverConfig.complexity,
  };
};

/**
 * Get background effect styles
 */
export const getBackgroundEffectStyles = (variant: SectionVariant): React.CSSProperties => {
  const config = getSectionConfig(variant);
  
  if (!config.animation) return {};
  
  return {
    position: 'relative',
    overflow: 'hidden',
  };
};

/**
 * Get appropriate section variant for content type
 */
export const getSectionVariantForContent = (contentType: string): SectionVariant => {
  const contentMapping: Record<string, SectionVariant> = {
    'text': 'content_group',
    'cards': 'content_group',
    'images': 'content_group',
    'forms': 'interactive_zone',
    'controls': 'interactive_zone',
    'data': 'data_display',
    'metrics': 'data_display',
    'dashboard': 'control_panel',
    'settings': 'control_panel',
  };
  
  return contentMapping[contentType] || 'content_group';
};

/**
 * Calculate responsive grid columns
 */
export const getResponsiveGridColumns = (
  variant: SectionVariant,
  screenWidth: number
): number => {
  const config = getSectionConfig(variant);
  
  if (screenWidth < 768) {
    return config.grid.columns.mobile;
  } else if (screenWidth < 1024) {
    return config.grid.columns.tablet;
  } else {
    return config.grid.columns.desktop;
  }
};

/**
 * Validate section configuration
 */
export const isValidSectionConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.padding && 
         config.grid && 
         config.consciousness;
};

/**
 * Merge section configurations
 */
export const mergeSectionConfigs = (
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
    grid: {
      ...base.grid,
      ...overrides.grid,
    },
    children: {
      ...base.children,
      ...overrides.children,
    },
  };
};

/**
 * Create section layout configuration
 */
export const createSectionLayout = (
  variant: SectionVariant,
  options: Partial<SectionLayout> = {}
): SectionLayout => {
  const config = getSectionConfig(variant);
  
  return {
    variant,
    gridColumns: config.grid.columns.desktop,
    responsive: true,
    centered: true,
    ...options,
  };
};

/**
 * Calculate section visibility based on scroll
 */
export const getSectionVisibility = (
  element: HTMLElement | null,
  viewportHeight: number
): number => {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top;
  const elementHeight = rect.height;
  
  // Calculate how much of the element is visible
  const visibleHeight = Math.min(viewportHeight - elementTop, elementHeight, viewportHeight);
  const visibility = visibleHeight / Math.min(elementHeight, viewportHeight);
  
  return Math.max(0, Math.min(1, visibility));
};