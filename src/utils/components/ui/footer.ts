// @/utils/components/ui/footer.ts
// ============================================================================
// FOOTER UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { FOOTER_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { FooterProps, FooterVariant, FooterConsciousnessLevel, FooterSection } from '@/types/components/ui/footer';

/**
 * Get complete footer configuration for a variant
 */
export const getFooterConfig = (variant: FooterVariant = 'sovereign_autonomy') => {
  return FOOTER_VARIANTS[variant];
};

/**
 * Calculate footer classes based on variant and props
 */
export const getFooterClasses = (variant: FooterVariant, props: FooterProps = {}): string => {
  const config = getFooterConfig(variant);
  const classes = [
    'footer',
    `footer--${variant}`,
    `consciousness--${config.consciousness.level}`,
    props.showBackToTop ? 'footer--back-to-top' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get footer styles for inline application
 */
export const getFooterStyles = (variant: FooterVariant): React.CSSProperties => {
  const config = getFooterConfig(variant);
  
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
 * Get section grid styles based on screen size
 */
export const getSectionGridStyles = (
  variant: FooterVariant,
  screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): React.CSSProperties => {
  const config = getFooterConfig(variant);
  const columns = config.sections.columns[screenSize];
  
  return {
    display: 'grid',
    gap: config.sections.spacing,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };
};

/**
 * Get link styles based on state
 */
export const getLinkStyles = (
  variant: FooterVariant,
  isActive: boolean = false,
  isHovered: boolean = false
): React.CSSProperties => {
  const config = getFooterConfig(variant);
  const linkConfig = config.links;
  
  const baseStyles = {
    color: config.typography.link.color,
    fontFamily: config.typography.link.font.join(', '),
    fontSize: config.typography.link.size,
    fontWeight: config.typography.link.weight,
    transition: 'all 0.3s ease',
  };
  
  if (isActive) {
    return {
      ...baseStyles,
      color: linkConfig.active.color,
      borderBottom: linkConfig.active.color,
      boxShadow: linkConfig.active.color,
      transform: linkConfig.active.color,
    };
  }
  
  if (isHovered) {
    return {
      ...baseStyles,
      color: linkConfig.hover.color,
      boxShadow: linkConfig.hover.glow,
      transform: linkConfig.hover.glow,
    };
  }
  
  return baseStyles;
};

/**
 * Filter sections by consciousness alignment
 */
export const getAlignedSections = (
  sections: FooterSection[],
  consciousnessLevel: FooterConsciousnessLevel
): FooterSection[] => {
  return sections.filter(section => 
    !section.consciousnessAlignment || 
    section.consciousnessAlignment === consciousnessLevel
  );
};

/**
 * Calculate footer visibility based on scroll position
 */
export const getFooterVisibility = (
  scrollPosition: number, 
  documentHeight: number,
  windowHeight: number
): number => {
  const scrollBottom = scrollPosition + windowHeight;
  const distanceFromBottom = documentHeight - scrollBottom;
  const threshold = 200;
  
  if (distanceFromBottom > threshold) return 0;
  
  const visibility = 1 - (distanceFromBottom / threshold);
  return Math.max(0, Math.min(1, visibility));
};

/**
 * Get appropriate footer variant for a domain
 */
export const getFooterVariantForDomain = (domain: string): FooterVariant => {
  const domainMapping: Record<string, FooterVariant> = {
    quantum: 'sovereign_autonomy',
    cosmic: 'collaborative_support',
    pantheon: 'sovereign_autonomy',
    library: 'collaborative_support',
    void: 'quantum_context',
    council: 'sovereign_autonomy',
    community: 'collaborative_support',
    support: 'collaborative_support',
  };
  
  return domainMapping[domain] || 'sovereign_autonomy';
};

/**
 * Validate footer configuration
 */
export const isValidFooterConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.padding && 
         config.consciousness && 
         config.consciousness.level;
};

/**
 * Merge footer configurations
 */
export const mergeFooterConfigs = (
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
    sections: {
      ...base.sections,
      ...overrides.sections,
    },
    links: {
      ...base.links,
      ...overrides.links,
    },
  };
};

/**
 * Generate responsive column classes for footer sections
 */
export const getSectionColumnClasses = (variant: FooterVariant): string => {
  const config = getFooterConfig(variant);
  const { mobile, tablet, desktop } = config.sections.columns;
  
  return [
    `grid-cols-${mobile}`,
    `md:grid-cols-${tablet}`,
    `lg:grid-cols-${desktop}`,
  ].join(' ');
};