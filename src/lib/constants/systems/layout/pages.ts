// lib/constants/systems/layout/pages.ts 
import { 
  FONT_SIZES,
  type FontSize,
} from '@/lib/constants/cosmic/';
import {
  SPACING_SYSTEM,
  type ComponentSpacing
} from './spacing';
import {
  CONTAINER_SIZES,
  type ContainerSizeKey
} from './breakpoints';
import { 
  THEME_COLORS
} from '@/lib/constants/cosmic/colors';

// ============================================================================
// PAGE VARIANTS - Derived from cosmic themes and consciousness
// ============================================================================

export const PAGE_VARIANT_CLASSES: Record< keyof typeof THEME_COLORS, string> = {
  quantum: `page-quantum ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  cosmic: `page-cosmic ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  emergency: `page-emergency ${SPACING_SYSTEM.components.SECTION_PADDING.MD}`,
  sovereign: `page-sovereign ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  pride: `page-pride ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  creative: `page-creative ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  tarot: `page-tarot ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  pagan: `page-pagan ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  mystical: `page-mystical ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  calm: `page-calm ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
  energized: `page-energized ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
} as const;

export const PAGE_TITLE_SIZES: Record< keyof typeof THEME_COLORS, string> = {
  quantum: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  cosmic: `${FONT_SIZES['5xl']} md:${FONT_SIZES['7xl']} lg:${FONT_SIZES['8xl']}`,
  emergency: `${FONT_SIZES['3xl']} md:${FONT_SIZES['4xl']} lg:${FONT_SIZES['5xl']}`,
  sovereign: `${FONT_SIZES['5xl']} md:${FONT_SIZES['7xl']} lg:${FONT_SIZES['8xl']}`,
  pride: `${FONT_SIZES['4xl']} md:${FONT_SIZES['6xl']} lg:${FONT_SIZES['7xl']}`,
  creative: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  tarot: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  pagan: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  mystical: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  calm: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
  energized: `${FONT_SIZES['4xl']} md:${FONT_SIZES['5xl']} lg:${FONT_SIZES['6xl']}`,
} as const;

// ============================================================================
// PAGE LAYOUT PATTERNS - Derived from cosmic consciousness patterns
// ============================================================================

export const PAGE_LAYOUT_PATTERNS = {
  // Content-focused layouts (sovereign consciousness)
  CONTENT: {
    centered: `${CONTAINER_SIZES.XL} mx-auto ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
    wide: `${CONTAINER_SIZES['2XL']} mx-auto ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`,
    full: `w-full ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`
  },
  
  // Immersive layouts (cosmic consciousness)
  IMMERSIVE: {
    panorama: 'w-screen h-screen overflow-hidden',
    cosmic: 'w-full min-h-screen relative'
  },
  
  // Utility layouts (quantum consciousness)
  UTILITY: {
    sandbox: 'w-full h-full overflow-auto',
    library: `${CONTAINER_SIZES['2XL']} mx-auto ${SPACING_SYSTEM.layout.STACK_SPACING.LOOSE}`
  },
  
  // Specialized layouts (consciousness-specific)
  SPECIALIZED: {
    council: `${CONTAINER_SIZES.LG} mx-auto ${SPACING_SYSTEM.components.SECTION_PADDING.MD}`,
    hearth: `${CONTAINER_SIZES.MD} mx-auto ${SPACING_SYSTEM.components.SECTION_PADDING.SM}`,
    quantum: `w-full ${SPACING_SYSTEM.components.SECTION_PADDING.LG}`
  }
} as const;

// ============================================================================
// TYPE EXPORTS - Properly derived from cosmic types
// ============================================================================

export type PageVariant = keyof typeof PAGE_VARIANT_CLASSES;
export type PageLayoutPattern = keyof typeof PAGE_LAYOUT_PATTERNS;

export const PAGE_SYSTEM = {
  variants: PAGE_VARIANT_CLASSES,
  titleSizes: PAGE_TITLE_SIZES,
  layouts: PAGE_LAYOUT_PATTERNS,
} as const;