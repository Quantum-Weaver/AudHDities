// lib/constants/systems/layout/breakpoints.ts
import { 
  SCREEN_TYPES, 
  SCREEN_CATEGORIES,
  BREAKPOINTS,
  type ScreenType,
  type ScreenCategory,
  type ContainerSize
} from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// BREAKPOINT SYSTEM - Properly derived from cosmic dimensions
// ============================================================================


// Screen category mappings derived from cosmic screen types
export const SCREEN_CATEGORY_MAP = {
  MOBILE: Object.values(SCREEN_TYPES).filter(screen => 
    screen.category === 'MOBILE'
  ),
  TABLET: Object.values(SCREEN_TYPES).filter(screen => 
    screen.category === 'TABLET'
  ),
  DESKTOP: Object.values(SCREEN_TYPES).filter(screen => 
    screen.category === 'DESKTOP'
  ),
  IMMERSIVE: Object.values(SCREEN_TYPES).filter(screen => 
    screen.category === 'IMMERSIVE'
  ),
} as const;

// ============================================================================
// RESPONSIVE CONTAINER SYSTEM - Derived from cosmic container dimensions
// ============================================================================

export const CONTAINER_SIZES = {
  // Direct derivation from cosmic container dimensions
  SM: 'sm' as ContainerSize,
  MD: 'md' as ContainerSize,
  LG: 'lg' as ContainerSize,
  XL: 'xl' as ContainerSize,
  '2XL': '2xl' as ContainerSize,
  FULL: 'full' as ContainerSize,
} as const;

export const CONTAINER_PADDING = {
  // Derived from cosmic screen categories and consciousness patterns
  MOBILE: 'p-4',      // Focused consciousness - compact spacing
  TABLET: 'p-6',      // Sovereign consciousness - balanced spacing
  DESKTOP: 'p-8',     // Quantum consciousness - comfortable spacing
  IMMERSIVE: 'p-12',  // Cosmic consciousness - expansive spacing
} as const;

// ============================================================================
// GRID SYSTEM - Derived from cosmic dimensions and consciousness density
// ============================================================================

export const GRID_COLUMNS = {
  // Based on screen categories and interaction patterns
  MOBILE: 4,    // Focused interaction - simple grid
  TABLET: 8,    // Sovereign interaction - balanced grid
  DESKTOP: 12,  // Quantum interaction - complex grid
  IMMERSIVE: 16, // Cosmic interaction - expansive grid
} as const;

export const GRID_GAPS = {
  // Derived from cosmic spacing scale and consciousness density
  COMPACT: 'gap-4',    // Focused consciousness
  BALANCED: 'gap-6',   // Sovereign consciousness  
  EXPANSIVE: 'gap-8',  // Quantum consciousness
  COSMIC: 'gap-12',    // Cosmic consciousness
} as const;

// ============================================================================
// TYPE EXPORTS - Properly typed from cosmic dimensions
// ============================================================================

export type Breakpoint = keyof typeof BREAKPOINTS;
export type ContainerSizeKey = keyof typeof CONTAINER_SIZES;
export type GridColumnCount = keyof typeof GRID_COLUMNS;
export type GridGap = keyof typeof GRID_GAPS;

// Master layout export with proper cosmic derivation
export const LAYOUT_SYSTEM = {
  breakpoints: BREAKPOINTS,
  containers: CONTAINER_SIZES,
  grid: {
    columns: GRID_COLUMNS,
    gaps: GRID_GAPS,
  },
  screens: {
    types: SCREEN_TYPES,
    categories: SCREEN_CATEGORIES,
    categoryMap: SCREEN_CATEGORY_MAP,
  },
  padding: CONTAINER_PADDING,
} as const;