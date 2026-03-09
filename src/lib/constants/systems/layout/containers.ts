import { SPACING_SYSTEM } from '@/lib/constants/systems/layout/spacing';
import { BUTTON_DIMENSIONS } from '@/lib/constants/cosmic/dimensions';

// ============================================================================
// POSITIONS SYSTEM - Derived from cosmic dimensions and consciousness
// ============================================================================

export const POSITIONS = {
  // Hearth Menu Positioning derived from cosmic consciousness patterns
  hearth: {
    radius: parseInt(SPACING_SYSTEM.scale['36']), // 144px - cosmic expansion radius
    central: { x: 0, y: 0 },
    peripheral: (index: number, total: number = 6) => {
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
      const radius = parseInt(SPACING_SYSTEM.scale['36']); // 144px
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    },
    preCalculated: {
      community: { x: 0, y: -parseInt(SPACING_SYSTEM.scale['36']) }, // -144px
      music: { x: 126, y: -60 }, // Cosmic harmony position
      council: { x: 126, y: 60 }, // Sovereign coordination position
      library: { x: 0, y: parseInt(SPACING_SYSTEM.scale['36']) }, // 144px
      origin: { x: -126, y: 60 }, // Quantum origin position
      support: { x: -126, y: -60 } // Cosmic support position
    }
  },
  
  // Animation Distances derived from cosmic motion patterns
  animations: {
    float: {
      distance: parseInt(SPACING_SYSTEM.scale['1.5']),    // 6px - quantum fluctuation
      distanceLarge: parseInt(SPACING_SYSTEM.scale['2']), // 8px - cosmic fluctuation
      distanceCentral: 0                     // 0px - focused center
    },
    lift: {
      hover: -parseInt(SPACING_SYSTEM.scale['0.5']),      // -2px - quantum lift
      tap: 0                                // 0px - grounded interaction
    }
  },
  
  // Layout Positions derived from cosmic dimensions
  layout: {
    header: {
      height: parseInt(BUTTON_DIMENSIONS.height.xl), // 56px - cosmic header
      ancientQuote: { right: parseInt(SPACING_SYSTEM.scale['6']) } // 24px - balanced offset
    },
    tooltip: {
      offset: parseInt(SPACING_SYSTEM.scale['2']),        // 8px - comfortable offset
      arrow: { 
        top: -parseInt(SPACING_SYSTEM.scale['2']),        // -8px - upward pointing
        right: parseInt(SPACING_SYSTEM.scale['4'])        // 16px - balanced positioning
      }
    }
  },
  
  // Component Positioning derived from cosmic consciousness density
  components: {
    display: {
      positions: {
        center: { x: 0, y: 0 },                              // Focused consciousness
        topCenter: { x: 0, y: -50 },                         // Elevated awareness
        bottomCenter: { x: 0, y: 50 },                       // Grounded awareness
        topRight: { x: 50, y: -50 },                         // Sovereign perspective
        topLeft: { x: -50, y: -50 },                         // Quantum perspective
        bottomRight: { x: 50, y: 50 },                       // Cosmic perspective
        bottomLeft: { x: -50, y: 50 }                        // Mystical perspective
      }
    }
  }
} as const;

// ============================================================================
// CONTAINER POSITIONING - Derived from cosmic spacing system
// ============================================================================

export const CONTAINER_POSITIONS = {
  // Absolute positioning derived from cosmic consciousness patterns
  absolute: {
    top: {
      left: 'absolute top-0 left-0',
      center: 'absolute top-0 left-1/2 transform -translate-x-1/2',
      right: 'absolute top-0 right-0'
    },
    center: {
      left: 'absolute top-1/2 left-0 transform -translate-y-1/2',
      center: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      right: 'absolute top-1/2 right-0 transform -translate-y-1/2'
    },
    bottom: {
      left: 'absolute bottom-0 left-0',
      center: 'absolute bottom-0 left-1/2 transform -translate-x-1/2',
      right: 'absolute bottom-0 right-0'
    }
  },
  
  // Fixed positioning for persistent elements
  fixed: {
    header: 'fixed top-0 left-0 right-0 z-50',
    footer: 'fixed bottom-0 left-0 right-0 z-50',
    sidebar: 'fixed top-0 left-0 bottom-0 z-40'
  },
  
  // Sticky positioning for context-aware elements
  sticky: {
    header: 'sticky top-0 z-40',
    section: 'sticky top-16 z-30', // 64px below header
    element: 'sticky top-8 z-20'   // 32px comfortable offset
  }
} as const;

// ============================================================================
// TYPE EXPORTS - Properly derived from cosmic types
// ============================================================================

export type HearthPosition = keyof typeof POSITIONS.hearth.preCalculated;
export type DisplayPosition = keyof typeof POSITIONS.components.display.positions;
export type ContainerPosition = keyof typeof CONTAINER_POSITIONS.absolute;

export const POSITION_SYSTEM = {
  hearth: POSITIONS.hearth,
  animations: POSITIONS.animations,
  layout: POSITIONS.layout,
  components: POSITIONS.components,
  containers: CONTAINER_POSITIONS,
} as const;