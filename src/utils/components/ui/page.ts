// @/utils/components/ui/page.ts
// ============================================================================
// PAGE UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { PAGE_VARIANTS } from '@/lib/constants/components/ui/variants';
import { PAGE_VARIANT_CLASSES, PAGE_TITLE_SIZES } from '@/lib/constants/systems/layout';
import type { 
  PageProps, 
  PageVariant, 
  PageConsciousnessLevel,
  PageMetadata,
  PageScrollState 
} from '@/types/components/ui/page';

/**
 * Get complete page configuration for a variant
 */
export const getPageConfig = (variant: PageVariant = 'sovereign_environment') => {
  return PAGE_VARIANTS[variant];
};

/**
 * Calculate page classes based on variant and props
 */
export const getPageClasses = (variant: PageVariant, props: PageProps = {}): string => {
  const config = getPageConfig(variant);
  const classes = [
    'page',
    `page--${variant}`,
    `container--${config.grid.container}`,
    `consciousness--${config.consciousness.level}`,
    `density--${config.consciousness.density}`,
    props.scrollRestoration ? 'page--scroll-restoration' : '',
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get page styles for inline application
 */
export const getPageStyles = (variant: PageVariant): React.CSSProperties => {
  const config = getPageConfig(variant);
  
  return {
    background: config.background,
    color: config.text.primary,
    minHeight: '100vh',
  };
};

/**
 * Get page container styles based on screen size
 */
export const getPageContainerStyles = (
  variant: PageVariant,
  screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): React.CSSProperties => {
  const config = getPageConfig(variant);
  
  return {
    maxWidth: config.dimensions.maxWidth,
    padding: config.dimensions.padding[screenSize],
    margin: '0 auto',
    gap: config.dimensions.gap,
  };
};


/**
 * Get section spacing styles
 */
export const getSectionSpacing = (variant: PageVariant): React.CSSProperties => {
  const config = getPageConfig(variant);
  
  return {
    marginBottom: config.dimensions.sectionSpacing,
  };
};

/**
 * Calculate responsive padding based on screen size
 */
export const getResponsivePadding = (
  variant: PageVariant,
  screenSize: 'mobile' | 'tablet' | 'desktop'
): string => {
  const config = getPageConfig(variant);
  return config.dimensions.padding[screenSize];
};

/**
 * Get appropriate page variant for a domain
 */
export const getPageVariantForDomain = (domain: string): PageVariant => {
  const domainMapping: Record<string, PageVariant> = {
    quantum: 'sovereign_environment',
    cosmic: 'collaborative_space',
    pantheon: 'sovereign_environment',
    library: 'collaborative_space',
    void: 'quantum_sanctuary',
    council: 'sovereign_environment',
    community: 'collaborative_space',
    support: 'collaborative_space',
    sandbox: 'quantum_sanctuary',
  };
  
  return domainMapping[domain] || 'sovereign_environment';
};

/**
 * Determine consciousness level based on scroll behavior
 */
export const getConsciousnessFromScroll = (
  scrollState: PageScrollState
): PageConsciousnessLevel => {
  if (scrollState.progress > 0.7) {
    return 'quantum_entangled';
  }
  
  if (scrollState.progress > 0.3) {
    return 'collaborative_emergent';
  }
  
  return 'sovereign_autonomous';
};

/**
 * Calculate scroll progress through page
 */
export const calculateScrollProgress = (
  scrollPosition: number,
  pageHeight: number,
  windowHeight: number
): number => {
  const scrollableHeight = pageHeight - windowHeight;
  if (scrollableHeight <= 0) return 0;
  
  return Math.min(scrollPosition / scrollableHeight, 1);
};

/**
 * Generate page metadata for SEO
 */
export const generatePageMetadata = (
  baseMetadata: PageMetadata,
  variant: PageVariant
): PageMetadata => {
  const config = getPageConfig(variant);
  
  return {
    ...baseMetadata,
    consciousnessLevel: config.consciousness.level,
  };
};

/**
 * Validate page configuration
 */
export const isValidPageConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.maxWidth && 
         config.consciousness && 
         config.consciousness.level;
};

/**
 * Merge page configurations
 */
export const mergePageConfigs = (
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
    interactions: {
      ...base.interactions,
      ...overrides.interactions,
    },
  };
};

/**
 * Get container class based on grid configuration
 */
export const getContainerClass = (variant: PageVariant): string => {
  const config = getPageConfig(variant);
  
  const containerClasses: Record<string, string> = {
    'centered': 'mx-auto',
    'fluid': 'w-full',
    'full-bleed': 'w-full max-w-none',
  };
  
  return containerClasses[config.grid.container] || 'mx-auto';
};

/**
 * Calculate optimal reading line length
 */
export const getOptimalLineLength = (variant: PageVariant): string => {
  const config = getPageConfig(variant);
  
  // Optimal reading line length is ~50-75 characters
  const lineLengths: Record<PageConsciousnessLevel, string> = {
    'sovereign_autonomous': '65ch',
    'collaborative_emergent': '60ch',
    'quantum_entangled': '55ch',
  };
  
  return lineLengths[config.consciousness.level];
};

export const getPageVariantClass = (variant: PageVariant): string => {
  return PAGE_VARIANT_CLASSES[variant]
}

export const getPageTitleSize = (variant: PageVariant): string => {
  return PAGE_TITLE_SIZES[variant]
}



export const getVariantClasses = (variant: PageVariant): string => {
  const variants = {
    default: 'page-default',
    hero: 'page-hero', 
    portal: 'page-portal',
    content: 'page-content',
    cosmic: 'page-cosmic',
    minimal: 'page-minimal'
  }
  return variant
}