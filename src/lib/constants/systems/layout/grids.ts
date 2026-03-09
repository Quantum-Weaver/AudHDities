// lib/constants/systems/layout/grids.ts
import { 
  GRID_COLUMNS,
  GRID_GAPS,
  CONTAINER_SIZES,
  type GridColumnCount,
  type GridGap,
  type ContainerSizeKey
} from './breakpoints';
import {
  SPACING_SYSTEM,
  type SpacingToken
} from './spacing';
import { 
  SCREEN_CATEGORIES,
  type ScreenCategory 
} from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// GRID SYSTEM - Derived from cosmic layout foundations
// ============================================================================
export { GRID_COLUMNS, SPACING_SYSTEM}
export const GRID_SYSTEM = {
  // Responsive grid templates derived from screen categories
  templates: {
    cards: `grid grid-cols-1 ${SCREEN_CATEGORIES.MOBILE.interaction === 'touch' ? 'sm:grid-cols-2' : ''} ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-3' : ''} ${SCREEN_CATEGORIES.IMMERSIVE.interaction === 'environment' ? 'xl:grid-cols-4' : ''}`,
    portals: `grid grid-cols-1 ${SCREEN_CATEGORIES.TABLET.interaction === 'hybrid' ? 'md:grid-cols-2' : ''} ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-3' : ''}`,
    entities: `grid grid-cols-1 ${SCREEN_CATEGORIES.MOBILE.interaction === 'touch' ? 'sm:grid-cols-2' : ''} ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-4' : ''}`,
    social: `grid grid-cols-2 ${SCREEN_CATEGORIES.MOBILE.interaction === 'touch' ? 'sm:grid-cols-3' : ''} ${SCREEN_CATEGORIES.TABLET.interaction === 'hybrid' ? 'md:grid-cols-4' : ''} ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-6' : ''}`,
    gaming: `grid grid-cols-1 ${SCREEN_CATEGORIES.MOBILE.interaction === 'touch' ? 'sm:grid-cols-2' : ''} ${SCREEN_CATEGORIES.IMMERSIVE.interaction === 'environment' ? 'xl:grid-cols-3' : ''}`,
    oracle: `grid grid-cols-1 ${SCREEN_CATEGORIES.TABLET.interaction === 'hybrid' ? 'md:grid-cols-2' : ''}`
  },
  
  // Gap sizes derived from cosmic grid gaps
  gaps: {
    [GRID_GAPS.COMPACT]: GRID_GAPS.COMPACT,
    [GRID_GAPS.BALANCED]: GRID_GAPS.BALANCED,
    [GRID_GAPS.EXPANSIVE]: GRID_GAPS.EXPANSIVE,
    [GRID_GAPS.COSMIC]: GRID_GAPS.COSMIC,
  },
  
  // Container max widths derived from cosmic container sizes
  containers: Object.fromEntries(
    Object.entries(CONTAINER_SIZES).map(([key, value]) => [
      key.toLowerCase(),
      `max-w-${value}`
    ])
  ) as Record<Lowercase<ContainerSizeKey>, string>,
  
  // Layout patterns derived from cosmic consciousness patterns
  patterns: {
    sidebar: `grid grid-cols-1 ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-4' : ''} ${GRID_GAPS.BALANCED}`,
    header: `grid grid-cols-1 ${SCREEN_CATEGORIES.TABLET.interaction === 'hybrid' ? 'md:grid-cols-3' : ''} ${GRID_GAPS.BALANCED}`,
    footer: `grid grid-cols-1 ${SCREEN_CATEGORIES.TABLET.interaction === 'hybrid' ? 'md:grid-cols-2' : ''} ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:grid-cols-4' : ''} ${GRID_GAPS.EXPANSIVE}`,
    centered: 'grid place-items-center'
  }
} as const;

// ============================================================================
// FLEX SYSTEM - Derived from cosmic spacing and consciousness patterns
// ============================================================================

export const FLEX_SYSTEM = {
  // Flex directions with cosmic alignment
  directions: {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse'
  },
  
  // Justify content derived from cosmic consciousness patterns
  justify: {
    start: 'justify-start',        // Focused consciousness
    end: 'justify-end',            // Directed consciousness
    center: 'justify-center',      // Balanced consciousness
    between: 'justify-between',    // Sovereign distribution
    around: 'justify-around',      // Quantum distribution
    evenly: 'justify-evenly'       // Cosmic distribution
  },
  
  // Align items with cosmic harmony
  align: {
    start: 'items-start',          // Grounded alignment
    end: 'items-end',              // Elevated alignment
    center: 'items-center',        // Centered harmony
    baseline: 'items-baseline',    // Textual harmony
    stretch: 'items-stretch'       // Expansive alignment
  },
  
  // Flex wrap for responsive consciousness
  wrap: {
    nowrap: 'flex-nowrap',         // Focused stream
    wrap: 'flex-wrap',             // Multi-stream
    'wrap-reverse': 'flex-wrap-reverse' // Quantum stream
  }
} as const;

// ============================================================================
// SCROLLING SYSTEM - Derived from cosmic dimensions and consciousness
// ============================================================================

export const SCROLLING_SYSTEM = {
  // Container types derived from cosmic screen categories
  containers: {
    // Infinite scrolling (quantum consciousness patterns)
    infinite: {
      horizontal: `w-full max-w-none overflow-x-auto`,
      vertical: `h-full overflow-y-auto`,
      both: `w-full h-full max-w-none overflow-auto`
    },
    
    // Constrained scrolling (sovereign consciousness patterns)
    constrained: {
      centered: `w-full ${GRID_SYSTEM.containers['2xl']} mx-auto`,
      padded: `w-full ${GRID_SYSTEM.containers['2xl']} mx-auto ${SPACING_SYSTEM.layout.PAGE_MARGIN.DESKTOP}`,
      responsive: `w-full max-w-none ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:max-w-7xl' : ''} mx-auto ${SCREEN_CATEGORIES.DESKTOP.interaction === 'cursor' ? 'lg:px-8' : ''}`
    },
    
    // Full viewport (cosmic consciousness patterns)
    fullViewport: {
      standard: 'w-screen h-screen overflow-hidden',
      withHeader: 'w-screen h-[calc(100vh-4rem)] overflow-hidden' // 4rem = 64px cosmic header height
    }
  },
  
  // Scroll behavior derived from cosmic motion patterns
  behavior: {
    smooth: 'scroll-smooth',
    snap: 'snap-mandatory snap-y',
    snapHorizontal: 'snap-mandatory snap-x',
    hidden: 'overflow-hidden',
    auto: 'overflow-auto'
  },
  
  // Content spacing derived from cosmic spacing system
  content: {
    // Vertical spacing for infinite scroll
    infiniteVertical: `${SPACING_SYSTEM.layout.STACK_SPACING.LOOSE} pb-${SPACING_SYSTEM.consciousness.COSMIC}`,
    infiniteHorizontal: `space-x-${SPACING_SYSTEM.consciousness.COSMIC} pr-${SPACING_SYSTEM.consciousness.COSMIC}`,
    
    // Section spacing derived from cosmic content spacing
    sections: SPACING_SYSTEM.layout.STACK_SPACING.LOOSE,
    cards: SPACING_SYSTEM.layout.STACK_SPACING.NORMAL,
    elements: SPACING_SYSTEM.layout.STACK_SPACING.TIGHT,
    
    // Page padding derived from cosmic container spacing
    page: SPACING_SYSTEM.components.SECTION_PADDING.LG,
    section: SPACING_SYSTEM.components.SECTION_PADDING.MD,
    compact: SPACING_SYSTEM.components.SECTION_PADDING.SM
  },
  
  // Scrollbar styling derived from cosmic effects
  scrollbars: {
    hidden: 'scrollbar-hide',
    thin: `scrollbar-thin scrollbar-track-transparent scrollbar-thumb-${SPACING_SYSTEM.tokens.content.text}/20`,
    quantum: `scrollbar-thin scrollbar-track-transparent scrollbar-thumb-${SPACING_SYSTEM.tokens.component.comfortable}/40`,
    cosmic: `scrollbar-thin scrollbar-track-transparent scrollbar-thumb-${SPACING_SYSTEM.tokens.container.padding}/40`
  }
} as const;

// ============================================================================
// PAGE LAYOUT TEMPLATES - Derived from cosmic patterns
// ============================================================================

export const PAGE_LAYOUTS = {
  // Infinite scroll layouts (quantum consciousness)
  infiniteScroll: {
    sandbox: `${SCROLLING_SYSTEM.containers.infinite.vertical} ${SCROLLING_SYSTEM.content.infiniteVertical} ${SCROLLING_SYSTEM.scrollbars.quantum}`,
    gallery: `${SCROLLING_SYSTEM.containers.infinite.vertical} ${SCROLLING_SYSTEM.content.sections} ${SCROLLING_SYSTEM.scrollbars.thin}`,
    exploration: `${SCROLLING_SYSTEM.containers.infinite.both} ${SCROLLING_SYSTEM.content.infiniteVertical} ${SCROLLING_SYSTEM.behavior.smooth}`
  },
  
  // Constrained content layouts (sovereign consciousness)
  constrained: {
    standard: `${SCROLLING_SYSTEM.containers.constrained.padded} ${SCROLLING_SYSTEM.content.sections} ${SCROLLING_SYSTEM.behavior.smooth}`,
    centered: `${SCROLLING_SYSTEM.containers.constrained.centered} ${SCROLLING_SYSTEM.content.page} ${SCROLLING_SYSTEM.content.sections}`,
    responsive: `${SCROLLING_SYSTEM.containers.constrained.responsive} ${SCROLLING_SYSTEM.content.sections}`
  },
  
  // Immersive layouts (cosmic consciousness)
  immersive: {
    fullscreen: `${SCROLLING_SYSTEM.containers.fullViewport.standard} ${SCROLLING_SYSTEM.behavior.hidden}`,
    withHeader: `${SCROLLING_SYSTEM.containers.fullViewport.withHeader} ${SCROLLING_SYSTEM.behavior.auto} ${SCROLLING_SYSTEM.scrollbars.hidden}`
  }
} as const;

// ============================================================================
// TYPE EXPORTS - Properly derived from cosmic types
// ============================================================================

export type GridTemplate = keyof typeof GRID_SYSTEM.templates;
export type FlexDirection = keyof typeof FLEX_SYSTEM.directions;
export type ScrollContainer = keyof typeof SCROLLING_SYSTEM.containers;
export type PageLayout = keyof typeof PAGE_LAYOUTS;

export const LAYOUT_GRIDS = {
  grid: GRID_SYSTEM,
  flex: FLEX_SYSTEM,
  scrolling: SCROLLING_SYSTEM,
  pageLayouts: PAGE_LAYOUTS,
} as const;

export const GRID_VARIANTS = {
  STANDARD: 'standard',
  RESPONSIVE: 'responsive', 
  FLUID: 'fluid',
  CSS: 'css-grid',
  FLEX: 'flex-grid'
} as const;
