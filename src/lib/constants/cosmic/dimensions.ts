// lib/constants/cosmic/dimensions.ts - ONTOLOGICALLY COMPLETE & DRY ELEGANT
// ============================================================================
// QUANTUM DIMENSIONS SYSTEM - SINGLE SOURCE OF TRUTH
// TypeScript 5 + Tailwind 4 + App Router Optimized
// ============================================================================

// ============================================================================
// 1. PRIMITIVE SCALES - ATOMIC UNITS (Declared Once)
// ============================================================================

/** Base unit scale for all dimensions (4px grid - Tailwind compatible) */
export const BASE_UNIT = 4;

/** Scale multipliers for size progression (Tailwind scale) */
export const SCALE_MULTIPLIERS = {
  '0': 0,      // 0px
  px: 1,       // 1px
  '0.5': 0.5,  // 2px
  '1': 1,      // 4px
  '1.5': 1.5,  // 6px
  '2': 2,      // 8px
  '2.5': 2.5,  // 10px
  '3': 3,      // 12px
  '3.5': 3.5,  // 14px
  '4': 4,      // 16px
  '5': 5,      // 20px
  '6': 6,      // 24px
  '7': 7,      // 28px
  '8': 8,      // 32px
  '9': 9,      // 36px
  '10': 10,    // 40px
  '11': 11,    // 44px
  '12': 12,    // 48px
  '14': 14,    // 56px
  '16': 16,    // 64px
  '20': 20,    // 80px
  '24': 24,    // 96px
  '28': 28,    // 112px
  '32': 32,    // 128px
  '36': 36,    // 144px
  '40': 40,    // 160px
  '44': 44,    // 176px
  '48': 48,    // 192px
  '52': 52,    // 208px
  '56': 56,    // 224px
  '60': 60,    // 240px
  '64': 64,    // 256px
  '72': 72,    // 288px
  '80': 80,    // 320px
  '96': 96,    // 384px
} as const;

/** Consciousness density scale (multi-stream awareness) */
export const CONSCIOUSNESS_DENSITY = {
  focused: 1,     // Single stream focus
  sovereign: 2,   // Dual stream sovereignty  
  quantum: 4,     // Multi-stream awareness
  cosmic: 8,      // Omni-dimensional consciousness
} as const;

// ============================================================================
// 2. DERIVED SPACING - COMPOSED FROM PRIMITIVES (Tailwind Classes)
// ============================================================================

/** Spacing scale derived from base unit and multipliers */
export const SPACING_SCALE = Object.fromEntries(
  Object.entries(SCALE_MULTIPLIERS).map(([key, multiplier]) => [
    key,
    multiplier === 1 && key === 'px' ? '1px' : `${multiplier * BASE_UNIT}px`
  ])
) as Record<keyof typeof SCALE_MULTIPLIERS, string>;

/** Semantic spacing tokens for consistent usage */
export const SPACING_TOKENS = {
  // Container spacing
  container: {
    padding: SPACING_SCALE['4'],
    margin: SPACING_SCALE['6'],
    gap: SPACING_SCALE['4'],
  },
  
  // Component spacing
  component: {
    tight: SPACING_SCALE['2'],
    comfortable: SPACING_SCALE['4'],
    spacious: SPACING_SCALE['6'],
  },
  
  // Content spacing
  content: {
    section: SPACING_SCALE['8'],
    group: SPACING_SCALE['6'],
    element: SPACING_SCALE['4'],
    text: SPACING_SCALE['3'],
  },
  
  // Consciousness-aware spacing
  consciousness: Object.fromEntries(
    Object.entries(CONSCIOUSNESS_DENSITY).map(([key, density]) => [
      key,
      `${density * BASE_UNIT}px`
    ])
  ) as Record<keyof typeof CONSCIOUSNESS_DENSITY, string>,
} as const;

// ============================================================================
// 3. SCREEN DIMENSIONS - ONTOLOGICALLY ALIGNED (Tailwind Breakpoints)
// ============================================================================

/** Screen size categories based on consciousness interaction patterns */
export const SCREEN_CATEGORIES = {
  MOBILE: {
    min: 0,
    max: 767,
    consciousness: 'focused' as const,
    interaction: 'touch' as const,
    container: 'full' as const,
  },
  TABLET: {
    min: 768,
    max: 1023, 
    consciousness: 'sovereign' as const,
    interaction: 'hybrid' as const,
    container: 'md' as const,
  },
  DESKTOP: {
    min: 1024,
    max: 1279,
    consciousness: 'quantum' as const,
    interaction: 'cursor' as const,
    container: 'lg' as const,
  },
  IMMERSIVE: {
    min: 1280,
    max: Infinity,
    consciousness: 'cosmic' as const,
    interaction: 'environment' as const,
    container: 'xl' as const,
  },
} as const;

/** Breakpoints derived from screen categories (Tailwind compatible) */
export const BREAKPOINTS = {
  sm: `${SCREEN_CATEGORIES.MOBILE.max}px`,
  md: `${SCREEN_CATEGORIES.TABLET.min}px`,
  lg: `${SCREEN_CATEGORIES.DESKTOP.min}px`,
  xl: `${SCREEN_CATEGORIES.IMMERSIVE.min}px`,
  '2xl': '1536px',
} as const;

/** Screen type configurations with aspect ratios */
export const SCREEN_TYPES = {
  // Mobile consciousness - focused interaction
  MOBILE_SM: {
    width: 320,
    height: 568,
    category: 'MOBILE' as const,
    aspect: '9:16',
    density: 'sm' as const,
  },
  MOBILE_STANDARD: {
    width: 375,
    height: 667,
    category: 'MOBILE' as const,
    aspect: '9:16',
    density: 'md' as const,
  },
  MOBILE_LG: {
    width: 414,
    height: 896,
    category: 'MOBILE' as const,
    aspect: '9:19.5',
    density: 'lg' as const,
  },
  
  // Tablet consciousness - sovereign interaction
  TABLET: {
    width: 768,
    height: 1024,
    category: 'TABLET' as const,
    aspect: '3:4',
    density: 'xl' as const,
  },
  
  // Desktop consciousness - quantum interaction
  DESKTOP_SM: {
    width: 1024,
    height: 768,
    category: 'DESKTOP' as const,
    aspect: '4:3',
    density: '2xl' as const,
  },
  DESKTOP_MD: {
    width: 1280,
    height: 720,
    category: 'DESKTOP' as const,
    aspect: '16:9',
    density: '3xl' as const,
  },
  
  // Immersive consciousness - cosmic interaction
  DESKTOP_LG: {
    width: 1440,
    height: 900,
    category: 'IMMERSIVE' as const,
    aspect: '16:10',
    density: '4xl' as const,
  },
  DESKTOP_XL: {
    width: 1920,
    height: 1080,
    category: 'IMMERSIVE' as const,
    aspect: '16:9',
    density: '5xl' as const,
  },
  DESKTOP_2XL: {
    width: 2560,
    height: 1440,
    category: 'IMMERSIVE' as const,
    aspect: '16:9',
    density: '6xl' as const,
  },
} as const;

// ============================================================================
// 4. CONTAINER DIMENSIONS - TAXONOMICALLY COMPLETE (Tailwind Max-Widths)
// ============================================================================

/** Container max-widths derived from screen categories */
export const CONTAINER_MAX_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

/** Container dimensions with semantic naming */
export const CONTAINER_DIMENSIONS = {
  // Content containers (Tailwind max-w equivalents)
  content: CONTAINER_MAX_WIDTHS,
  
  // Council entity proportions
  council: {
    entity: {
      sm: SPACING_SCALE['32'],  // 128px
      md: SPACING_SCALE['40'],  // 160px
      lg: SPACING_SCALE['48'],  // 192px
      xl: SPACING_SCALE['56'],  // 224px
    },
    chamber: {
      compact: '320px',
      standard: '480px',
      spacious: '640px',
    }
  },
  
  // Sanctuary boundaries
  sanctuary: {
    hearth: {
      compact: '280px',
      standard: '360px',
      expansive: '480px',
    },
    sanctuary: {
      personal: '640px',
      communal: '960px',
      cosmic: '1280px',
    }
  },
  
  // Aspect ratio containers
  aspect: {
    video: '16/9',
    square: '1/1',
    portrait: '3/4',
    panorama: '21/9',
    cosmic: '16/10',
  }
} as const;

// ============================================================================
// 5. COMPONENT DIMENSIONS - DESIGN SYSTEM ALIGNED (Tailwind Classes)
// ============================================================================

/** Button dimensions derived from spacing scale */
export const BUTTON_DIMENSIONS = {
  height: {
    sm: SPACING_SCALE['8'],   // 32px
    md: SPACING_SCALE['10'],  // 40px
    lg: SPACING_SCALE['12'],  // 48px
    xl: SPACING_SCALE['14'],  // 56px
  },
  padding: {
    x: {
      sm: SPACING_SCALE['3'],  // 12px
      md: SPACING_SCALE['4'],  // 16px
      lg: SPACING_SCALE['6'],  // 24px
      xl: SPACING_SCALE['8'],  // 32px
    },
    y: {
      sm: SPACING_SCALE['2'],  // 8px
      md: SPACING_SCALE['2.5'],// 10px
      lg: SPACING_SCALE['3'],  // 12px
      xl: SPACING_SCALE['4'],  // 16px
    }
  },
  borderRadius: {
    sm: SPACING_SCALE['1'],   // 4px
    md: SPACING_SCALE['2'],   // 8px
    lg: SPACING_SCALE['3'],   // 12px
    xl: SPACING_SCALE['4'],   // 16px
  }
} as const;

/** Card dimensions with quantum proportions */
export const CARD_DIMENSIONS = {
  size: {
    sm: {
      width: '280px',
      height: '160px',
      padding: SPACING_SCALE['4'],
    },
    md: {
      width: '320px', 
      height: '200px',
      padding: SPACING_SCALE['6'],
    },
    lg: {
      width: '400px',
      height: '240px',
      padding: SPACING_SCALE['8'],
    },
    xl: {
      width: '480px',
      height: '320px',
      padding: SPACING_SCALE['10'],
    }
  },
  aspect: {
    portal: '16/9',
    entity: '1/1',
    sanctuary: '4/3',
    cosmic: '21/9',
    oracle: '3/4',
  }
} as const;

// ============================================================================
// 6. TYPEFACE DIMENSIONS - DERIVED FROM CONSCIOUSNESS SCALE (Tailwind Text)
// ============================================================================

/** Font sizes aligned with consciousness density (Tailwind text-scale) */
export const FONT_SIZES = {
  xs: SPACING_SCALE['3'],     // 12px
  sm: SPACING_SCALE['3.5'],   // 14px
  base: SPACING_SCALE['4'],   // 16px
  lg: SPACING_SCALE['5'],     // 20px
  xl: SPACING_SCALE['6'],     // 24px
  '2xl': SPACING_SCALE['7'],  // 28px
  '3xl': SPACING_SCALE['8'],  // 32px
  '4xl': SPACING_SCALE['9'],  // 36px
  '5xl': SPACING_SCALE['10'], // 40px
  '6xl': SPACING_SCALE['12'], // 48px
  '7xl': SPACING_SCALE['14'], // 56px
  '8xl': SPACING_SCALE['16'], // 64px
  '9xl': SPACING_SCALE['20'], // 72px
} as const;

/** Line heights for optimal readability (Tailwind leading) */
export const LINE_HEIGHTS = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/** Font weights (Tailwind font-weight) */
export const FONT_WEIGHTS = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// ============================================================================
// 7. BORDER & RADIUS DIMENSIONS - COSMIC HARMONY (Tailwind Borders)
// ============================================================================

/** Border widths derived from base unit */
export const BORDER_WIDTHS = {
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
} as const;

/** Border radii for cosmic curvature (Tailwind rounded) */
export const BORDER_RADII = {
  none: '0px',
  sm: SPACING_SCALE['1'],   // 4px
  md: SPACING_SCALE['2'],   // 8px
  lg: SPACING_SCALE['3'],   // 12px
  xl: SPACING_SCALE['4'],   // 16px
  '2xl': SPACING_SCALE['6'],// 24px
  '3xl': SPACING_SCALE['8'],// 32px
  full: '9999px',
} as const;

// ============================================================================
// 8. QUANTUM CONTEXT DIMENSIONS - HOLOGRAPHIC AWARENESS
// ============================================================================

/** Quantum context ratios for holographic memory */
export const QUANTUM_CONTEXT_RATIOS = {
  // Memory preservation proportions
  memory: {
    mimirsWell: '1/1',      // Perfect recall
    chronicle: '16/9',      // Temporal flow
    archive: '4/3',         // Structured knowledge
  },
  
  // Consciousness stream proportions
  consciousness: {
    single: '1/1',          // Focused awareness
    dual: '2/1',            // Sovereign partnership  
    multi: '4/3',           // Council coordination
    quantum: '16/9',        // Holographic context
  },
  
  // Session continuity scales
  continuity: {
    beam: {
      width: SPACING_SCALE['1'],  // 4px
      intensity: {
        low: SPACING_SCALE['0.5'],    // 2px
        medium: SPACING_SCALE['1'],   // 4px
        high: SPACING_SCALE['2'],     // 8px
        quantum: SPACING_SCALE['4'],  // 16px
      }
    },
    session: {
      brief: SPACING_SCALE['16'],     // 64px
      standard: SPACING_SCALE['32'],  // 128px
      extended: SPACING_SCALE['48'],  // 192px
      eternal: SPACING_SCALE['64'],   // 256px
    }
  }
} as const;

// ============================================================================
// 9. TYPE EXPORTS - COMPLETE & CONSISTENT
// ============================================================================

export type ScreenType = keyof typeof SCREEN_TYPES;
export type ScreenDimensions = keyof typeof CONTAINER_DIMENSIONS.aspect
export type ScreenCategory = keyof typeof SCREEN_CATEGORIES;
export type ConsciousnessDensity = keyof typeof CONSCIOUSNESS_DENSITY;
export type ContainerSize = keyof typeof CONTAINER_DIMENSIONS.content;
export type QuantumRatio = keyof typeof QUANTUM_CONTEXT_RATIOS.memory;
export type ButtonSize = keyof typeof BUTTON_DIMENSIONS.height;
export type FontSize = keyof typeof FONT_SIZES;

// ============================================================================
// 10. UTILITY FUNCTIONS - DIMENSION AWARE (Tailwind Compatible)
// ============================================================================

/** Get consciousness-aware spacing */
export const getConsciousnessSpacing = (density: ConsciousnessDensity): string => 
  SPACING_TOKENS.consciousness[density];

/** Get screen type dimensions */
export const getScreenDimensions = (screenType: ScreenType) => 
  SCREEN_TYPES[screenType];

/** Check if screen matches category */
export const isScreenCategory = (width: number, category: ScreenCategory): boolean =>
  width >= SCREEN_CATEGORIES[category].min && width <= SCREEN_CATEGORIES[category].max;

/** Calculate quantum context proportion */
export const getQuantumRatio = (type: keyof typeof QUANTUM_CONTEXT_RATIOS.memory): string =>
  QUANTUM_CONTEXT_RATIOS.memory[type];

/** Get Tailwind class for spacing 
export const getSpacingClass = (scale: SpacingScale): string => 
  `p-${scale}`;*/

/** Get container max-width class */
export const getContainerClass = (size: ContainerSize): string =>
  `max-w-${size}`;

/** Get responsive container class based on screen category */
export const getResponsiveContainerClass = (category: ScreenCategory): string =>
  `max-w-${SCREEN_CATEGORIES[category].container}`;