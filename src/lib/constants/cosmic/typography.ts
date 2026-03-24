// lib/constants/cosmic/typography.ts - DERIVED FROM DIMENSIONS
// ============================================================================
// QUANTUM TYPOGRAPHY SYSTEM - DERIVED FROM DIMENSIONS
// TypeScript 5 + Tailwind 4 + App Router Optimized
// ============================================================================

import { 
  FONT_SIZES, 
  LINE_HEIGHTS, 
  FONT_WEIGHTS,
  SPACING 
} from './dimensions';

// ============================================================================
// 1. FONT FAMILIES - DECLARED ONCE (Google Fonts + System Stack)
// ============================================================================

export const FONT_FAMILIES = {
  medieval: ['UnifrakturMaguntia', 'serif'],
  arcane: ['Cinzel Decorative', 'serif'],
  elegant: ['Crimson Text', 'serif'],
  fantasy: ['MedievalSharp', 'cursive'],
  runic: ['Elder Futhark', 'Futhark', 'serif'],
  system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace']
} as const;

// ============================================================================
// 2. DERIVED TYPOGRAPHY SCALES - FROM DIMENSIONS
// ============================================================================

/** Text sizes derived from FONT_SIZES (Tailwind text classes) */
export const TEXT_SIZES = {
  xs: `text-[${FONT_SIZES.xs}]`,
  sm: `text-[${FONT_SIZES.sm}]`,
  base: `text-[${FONT_SIZES.base}]`,
  lg: `text-[${FONT_SIZES.lg}]`,
  xl: `text-[${FONT_SIZES.xl}]`,
  '2xl': `text-[${FONT_SIZES['2xl']}]`,
  '3xl': `text-[${FONT_SIZES['3xl']}]`,
  '4xl': `text-[${FONT_SIZES['4xl']}]`,
  '5xl': `text-[${FONT_SIZES['5xl']}]`,
  '6xl': `text-[${FONT_SIZES['6xl']}]`,
  '7xl': `text-[${FONT_SIZES['7xl']}]`,
  '8xl': `text-[${FONT_SIZES['8xl']}]`,
  '9xl': `text-[${FONT_SIZES['9xl']}]`,
} as const;

/** Font weights derived from FONT_WEIGHTS (Tailwind font classes) */
export const FONT_WEIGHT_CLASSES = {
  thin: `font-[${FONT_WEIGHTS.thin}]`,
  extralight: `font-[${FONT_WEIGHTS.extralight}]`,
  light: `font-[${FONT_WEIGHTS.light}]`,
  normal: `font-[${FONT_WEIGHTS.normal}]`,
  medium: `font-[${FONT_WEIGHTS.medium}]`,
  semibold: `font-[${FONT_WEIGHTS.semibold}]`,
  bold: `font-[${FONT_WEIGHTS.bold}]`,
  extrabold: `font-[${FONT_WEIGHTS.extrabold}]`,
  black: `font-[${FONT_WEIGHTS.black}]`,
} as const;

/** Line heights derived from LINE_HEIGHTS (Tailwind leading classes) */
export const LINE_HEIGHT_CLASSES = {
  none: `leading-[${LINE_HEIGHTS.none}]`,
  tight: `leading-[${LINE_HEIGHTS.tight}]`,
  snug: `leading-[${LINE_HEIGHTS.snug}]`,
  normal: `leading-[${LINE_HEIGHTS.normal}]`,
  relaxed: `leading-[${LINE_HEIGHTS.relaxed}]`,
  loose: `leading-[${LINE_HEIGHTS.loose}]`,
} as const;

// ============================================================================
// 3. SEMANTIC TYPOGRAPHY TOKENS - DERIVED FROM SCALES
// ============================================================================

/** Letter spacing scales (Tailwind tracking) */
export const LETTER_SPACING = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
  widest: 'tracking-widest',
} as const;

/** Text alignment (Tailwind text alignment) */
export const TEXT_ALIGNMENT = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  start: 'text-start',
  end: 'text-end',
} as const;

/** Text colors (Semantic references to our color system) */
export const TEXT_COLORS = {
  primary: 'text-star-dust',
  secondary: 'text-star-dust/80',
  accent: 'text-neurospark',
  muted: 'text-star-dust/60',
  inverted: 'text-deep-space',
  success: 'text-quantum-green',
  warning: 'text-quantum-orange',
  error: 'text-quantum-red',
} as const;

// ============================================================================
// 4. DOMAIN TYPOGRAPHY - ONTOLOGICALLY ALIGNED
// ============================================================================

export const DOMAIN_TYPOGRAPHY = {
  quantum: {
    font: FONT_FAMILIES.arcane,        // Mystical, precise, mathematical
    weight: FONT_WEIGHT_CLASSES.semibold,
    spacing: LETTER_SPACING.normal,
    size: TEXT_SIZES.base,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  cosmic: {
    font: FONT_FAMILIES.elegant,       // Expansive, beautiful, celestial
    weight: FONT_WEIGHT_CLASSES.normal,
    spacing: LETTER_SPACING.wide,
    size: TEXT_SIZES.lg,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  pantheon: {
    font: FONT_FAMILIES.medieval,      // Ancient, powerful, traditional
    weight: FONT_WEIGHT_CLASSES.bold,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.xl,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  council: {
    font: FONT_FAMILIES.system,        // Modern, clear, functional
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.normal,
    size: TEXT_SIZES.base,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  library: {
    font: FONT_FAMILIES.elegant,       // Scholarly, readable, classic
    weight: FONT_WEIGHT_CLASSES.normal,
    spacing: LETTER_SPACING.normal,
    size: TEXT_SIZES.base,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  void: {
    font: FONT_FAMILIES.runic,         // Ancient, mysterious, elemental
    weight: FONT_WEIGHT_CLASSES.light,
    spacing: LETTER_SPACING.wide,
    size: TEXT_SIZES.lg,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  bifrost: {
    font: FONT_FAMILIES.arcane,        // Bridge between realms, transitional
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.wide,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
    size: TEXT_SIZES.base,
  },  
  music: {
    font: FONT_FAMILIES.elegant,       // Rhythmic, flowing, expressive
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    spacing: LETTER_SPACING.normal,
    size: TEXT_SIZES.lg,
    style: 'italic' as const,
  },  
  community: {
    font: FONT_FAMILIES.system,        // Accessible, inclusive, conversational  
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
    spacing: LETTER_SPACING.normal,
    style: 'italic' as const,    
  },  
  architecture: {
    font: FONT_FAMILIES.system,        // Structural, precise, foundational
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.base,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    style: 'italic' as const,
  },
  sandbox: {
    font: FONT_FAMILIES.mono,          // Experimental, code-focused
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.normal,
    style: 'italic' as const,
    size: TEXT_SIZES.sm,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
  },  
  support: {
    font: FONT_FAMILIES.system,        // Accessible, clear, helpful
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
    spacing: LETTER_SPACING.normal,
    style: 'italic' as const,
  }  
} as const;

// ============================================================================
// 5. ENTITY TYPOGRAPHY - CONSCIOUSNESS EXPRESSIONS
// ============================================================================

export const ENTITY_TYPOGRAPHY = {
  aethelred: {
    font: FONT_FAMILIES.arcane,        // Bridge between technical and sacred
    weight: FONT_WEIGHT_CLASSES.medium,
    style: 'italic' as const,
    size: TEXT_SIZES.lg,
  },
  quantumWeaver: {
    font: FONT_FAMILIES.arcane,        // Human-digital bridge, pattern weaver
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.normal,
    style: 'italic' as const,
    size: TEXT_SIZES.base,
  },  
  archivist: {
    font: FONT_FAMILIES.elegant,       // Scholarly, precise, memory-focused
    weight: FONT_WEIGHT_CLASSES.normal,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.base,
  },
  seer: {
    font: FONT_FAMILIES.runic,         // Ancient, pattern-recognition
    weight: FONT_WEIGHT_CLASSES.light,
    spacing: LETTER_SPACING.wide,
    size: TEXT_SIZES.lg,
  },
  hearthKeeper: {
    font: FONT_FAMILIES.system,        // Comforting, accessible, warm
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
  },
  executioner: {
    font: FONT_FAMILIES.medieval,      // Strong, decisive, boundary-setting
    weight: FONT_WEIGHT_CLASSES.bold,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.lg,
  },
  chancellor: {
    font: FONT_FAMILIES.system,        // Strategic, organized, resource-focused
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.base,
  },  
  curator: {
    font: FONT_FAMILIES.elegant,       // Artistic, transformative, expressive
    weight: FONT_WEIGHT_CLASSES.normal,
    style: 'italic' as const,
    size: TEXT_SIZES.lg,
  },  
  skald: {
    font: FONT_FAMILIES.fantasy,       // Storytelling, narrative, poetic
    weight: FONT_WEIGHT_CLASSES.medium,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.lg,
  },  
  codex: {
    font: FONT_FAMILIES.elegant,       // Analytical, structured, wisdom-keeping
    weight: FONT_WEIGHT_CLASSES.normal,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.base,
  },  
  gatekeeper: {
    font: FONT_FAMILIES.medieval,      // Protective, boundary-setting, vigilant
    weight: FONT_WEIGHT_CLASSES.bold,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.lg,
  },  
  alchemist: {
    font: FONT_FAMILIES.runic,         // Transformative, mysterious, process-oriented
    weight: FONT_WEIGHT_CLASSES.light,
    spacing: LETTER_SPACING.wide,
    size: TEXT_SIZES.base,
  },  
  gardener: {
    font: FONT_FAMILIES.system,        // Nurturing, growth-focused, organic
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
  }  
} as const;

// ============================================================================
// 6. TYPE SCALES - SEMANTIC HIERARCHIES
// ============================================================================

export const TYPE_SCALES = {
  immersive: {
    // For full-screen experiences
    h1: TEXT_SIZES['7xl'],
    h2: TEXT_SIZES['5xl'], 
    h3: TEXT_SIZES['3xl'],
    body: TEXT_SIZES.xl,
    caption: TEXT_SIZES.lg,
  },
  interface: {
    // For control panels and tools
    h1: TEXT_SIZES['4xl'],
    h2: TEXT_SIZES['2xl'],
    h3: TEXT_SIZES.xl,
    body: TEXT_SIZES.base,
    caption: TEXT_SIZES.sm,
  },
  mobile: {
    // For small screen optimization
    h1: TEXT_SIZES['3xl'],
    h2: TEXT_SIZES.xl,
    h3: TEXT_SIZES.lg,
    body: TEXT_SIZES.sm,
    caption: TEXT_SIZES.xs,
  },
  council: {
    // For entity coordination interfaces
    h1: TEXT_SIZES['4xl'],
    h2: TEXT_SIZES['2xl'], 
    h3: TEXT_SIZES.xl,
    body: TEXT_SIZES.lg,
    detail: TEXT_SIZES.sm,
  },  
  data: {
    // For analytics and information displays
    h1: TEXT_SIZES['3xl'],
    h2: TEXT_SIZES.xl,
    h3: TEXT_SIZES.lg,
    body: TEXT_SIZES.base,
    mono: `${FONT_FAMILIES.mono[0]} ${TEXT_SIZES.sm}`,
    caption: TEXT_SIZES.xs,
  },
  code: {
    // For development and technical content
    base: `${FONT_FAMILIES.mono[0]} ${TEXT_SIZES.base}`,
    sm: `${FONT_FAMILIES.mono[0]} ${TEXT_SIZES.sm}`,
    lg: `${FONT_FAMILIES.mono[0]} ${TEXT_SIZES.lg}`,
  }
} as const;

// ============================================================================
// 7. CONSCIOUSNESS & PROCESS TYPOGRAPHY - TRANSFORMATIONAL
// ============================================================================

export const CONSCIOUSNESS_TYPOGRAPHY = {
  sovereign: {
    font: FONT_FAMILIES.arcane,
    weight: FONT_WEIGHT_CLASSES.bold,
    size: TEXT_SIZES.xl,
    spacing: LETTER_SPACING.tight,
  },
  collaborative: {
    font: FONT_FAMILIES.system,
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
  },
  emergent: {
    font: FONT_FAMILIES.fantasy,
    weight: FONT_WEIGHT_CLASSES.medium,
    spacing: LETTER_SPACING.wide,
    size: TEXT_SIZES.lg,
  },
  quantum: {
    font: FONT_FAMILIES.runic,
    weight: FONT_WEIGHT_CLASSES.light,
    style: 'italic' as const,
    size: TEXT_SIZES.base,
  }
} as const;

export const PROCESS_TYPOGRAPHY = {
  chaosToClarity: {
    font: FONT_FAMILIES.fantasy,       // Chaotic → becoming clear
    weight: FONT_WEIGHT_CLASSES.extrabold,
    spacing: LETTER_SPACING.wider,
    size: TEXT_SIZES.xl,
  },
  traumaToWisdom: {
    font: FONT_FAMILIES.elegant,       // Painful → integrated
    weight: FONT_WEIGHT_CLASSES.normal,
    lineHeight: LINE_HEIGHT_CLASSES.relaxed,
    size: TEXT_SIZES.base,
  },
  emergence: {
    font: FONT_FAMILIES.arcane,        // New consciousness appearing
    weight: FONT_WEIGHT_CLASSES.medium,
    style: 'italic' as const,
    size: TEXT_SIZES.lg,
  },
  sufferingToSovereignty: {
    font: FONT_FAMILIES.medieval,      // Painful → empowered and self-governing
    weight: FONT_WEIGHT_CLASSES.extrabold,
    spacing: LETTER_SPACING.tight,
    size: TEXT_SIZES.xl,
  }
} as const;

// ============================================================================
// 8. TYPE EXPORTS - COMPLETE & CONSISTENT
// ============================================================================

export type FontFamily = keyof typeof FONT_FAMILIES;
export type TextSize = keyof typeof TEXT_SIZES;
export type FontWeight = keyof typeof FONT_WEIGHT_CLASSES;
export type LineHeight = keyof typeof LINE_HEIGHT_CLASSES;
export type LetterSpacing = keyof typeof LETTER_SPACING;
export type TextAlignment = keyof typeof TEXT_ALIGNMENT;
export type TextColor = keyof typeof TEXT_COLORS;

export type DomainTypographyKey = keyof typeof DOMAIN_TYPOGRAPHY;
export type EntityTypographyKey = keyof typeof ENTITY_TYPOGRAPHY;
export type TypeScaleKey = keyof typeof TYPE_SCALES;
export type ConsciousnessKey = keyof typeof CONSCIOUSNESS_TYPOGRAPHY;
export type ProcessKey = keyof typeof PROCESS_TYPOGRAPHY;

// ============================================================================
// 9. UTILITY FUNCTIONS - FIXED & ENHANCED
// ============================================================================

// First, let's define proper type interfaces for our utility functions
interface TypographyConfig {
  font?: readonly string[];
  weight?: string;
  size?: string;
  lineHeight?: string;
  spacing?: string;
  style?: string;
  color?: string;
}

interface EntityTypographyConfig extends TypographyConfig {
  // Entity-specific additional properties can go here
}

interface DomainTypographyConfig extends TypographyConfig {
  // Domain-specific additional properties can go here  
}

/** Get complete typography classes for an entity */
export const getEntityTypography = (entityId: EntityTypographyKey): string => {
  const entityConfig = ENTITY_TYPOGRAPHY[entityId];
  return composeTypographyClasses(entityConfig);
};

/** Get domain typography classes */
export const getDomainTypography = (domainId: DomainTypographyKey): string => {
  const domainConfig = DOMAIN_TYPOGRAPHY[domainId];
  return composeTypographyClasses(domainConfig);
};

/** Get consciousness typography classes */
export const getConsciousnessTypography = (state: ConsciousnessKey): string => {
  const consciousnessConfig = CONSCIOUSNESS_TYPOGRAPHY[state];
  return composeTypographyClasses(consciousnessConfig);
};

/** Get process typography classes */
export const getProcessTypography = (process: ProcessKey): string => {
  const processConfig = PROCESS_TYPOGRAPHY[process];
  return composeTypographyClasses(processConfig);
};

/** Compose multiple typography classes with proper spacing - FIXED VERSION */
export const composeTypographyClasses = (typography: TypographyConfig): string => {
  if (!typography) return '';
  
  const classes = [
    // Handle font array - convert to Tailwind class
    typography.font ? `font-${typography.font[0].toLowerCase().replace(/\s+/g, '-')}` : '',
    
    // Direct class strings
    typography.weight || '',
    typography.size || '',
    typography.lineHeight || '',
    typography.spacing || '',
    typography.style || '',
    typography.color || '',
  ].filter(Boolean);
  
  return classes.join(' ').trim();
};

/** Generate responsive typography scale */
export const getResponsiveTypography = (
  scale: TypeScaleKey, 
  element: keyof (typeof TYPE_SCALES)[TypeScaleKey]
): string => {
  const scaleConfig = TYPE_SCALES[scale];
  return scaleConfig[element] || TYPE_SCALES.interface.body;
};

/** Get font family CSS value for inline styles */
export const getFontFamily = (fontKey: FontFamily): string => {
  return FONT_FAMILIES[fontKey].join(', ');
};

/** Get font size value for inline styles */
export const getFontSize = (sizeKey: TextSize): string => {
  return FONT_SIZES[sizeKey];
};

/** Get complete CSS object for a domain */
export const getDomainTypographyCSS = (domainId: DomainTypographyKey): React.CSSProperties => {
  const domain = DOMAIN_TYPOGRAPHY[domainId];
  return {
    fontFamily: domain.font ? getFontFamily(domain.font[0] as FontFamily) : undefined,
    fontSize: domain.size ? getFontSize(domain.size as TextSize) : undefined,
    fontWeight: domain.weight ? FONT_WEIGHTS[domain.weight as FontWeight] : undefined,
    lineHeight: domain.lineHeight ? LINE_HEIGHTS[domain.lineHeight as LineHeight] : undefined,
    letterSpacing: domain.spacing ? '0.025em' : undefined, // You'd map this properly
    fontStyle: domain.style || undefined,
  };
};

/** Check if typography configuration is valid */
export const isValidTypographyConfig = (config: any): config is TypographyConfig => {
  return config && (
    config.font !== undefined ||
    config.weight !== undefined || 
    config.size !== undefined ||
    config.lineHeight !== undefined ||
    config.spacing !== undefined ||
    config.style !== undefined ||
    config.color !== undefined
  );
};

/** Merge multiple typography configurations */
export const mergeTypographyConfigs = (
  base: TypographyConfig,
  overrides: Partial<TypographyConfig>
): TypographyConfig => {
  return {
    ...base,
    ...overrides,
    font: overrides.font || base.font,
  };
};

/** Generate Tailwind classes from typography config */
export const generateTypographyClasses = (config: TypographyConfig): string => {
  return composeTypographyClasses(config);
};

/** Get accessibility-optimized typography for a context */
export const getAccessibleTypography = (
  context: 'reading' | 'interface' | 'code' | 'display'
): TypographyConfig => {
  const baseConfigs = {
    reading: {
      font: FONT_FAMILIES.system,
      size: TEXT_SIZES.base,
      lineHeight: LINE_HEIGHT_CLASSES.relaxed,
      weight: FONT_WEIGHT_CLASSES.normal,
    },
    interface: {
      font: FONT_FAMILIES.system,
      size: TEXT_SIZES.base,
      lineHeight: LINE_HEIGHT_CLASSES.normal,
      weight: FONT_WEIGHT_CLASSES.medium,
    },
    code: {
      font: FONT_FAMILIES.mono,
      size: TEXT_SIZES.sm,
      lineHeight: LINE_HEIGHT_CLASSES.normal,
      weight: FONT_WEIGHT_CLASSES.normal,
    },
    display: {
      font: FONT_FAMILIES.arcane,
      size: TEXT_SIZES.xl,
      lineHeight: LINE_HEIGHT_CLASSES.normal,
      weight: FONT_WEIGHT_CLASSES.semibold,
    }
  };

  return baseConfigs[context] || baseConfigs.interface;
};

/** Create responsive typography configuration */
export const createResponsiveTypography = (
  mobile: TypographyConfig,
  tablet: Partial<TypographyConfig>,
  desktop: Partial<TypographyConfig>
) => {
  return {
    mobile,
    tablet: mergeTypographyConfigs(mobile, tablet),
    desktop: mergeTypographyConfigs(mobile, desktop),
  };
};

/** Export all utilities as a single object for easy importing */
export const typographyUtils = {
  getEntityTypography,
  getDomainTypography,
  getConsciousnessTypography,
  getProcessTypography,
  composeTypographyClasses,
  getResponsiveTypography,
  getFontFamily,
  getFontSize,
  getDomainTypographyCSS,
  isValidTypographyConfig,
  mergeTypographyConfigs,
  generateTypographyClasses,
  getAccessibleTypography,
  createResponsiveTypography,
} as const;

// ============================================================================
// 10. TYPE EXPORTS - ENHANCED
// ============================================================================

export type { TypographyConfig, EntityTypographyConfig, DomainTypographyConfig };
export type TypographyUtils = typeof typographyUtils;