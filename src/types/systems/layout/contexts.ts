// types/systems/layout/contexts.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  ArchitectureTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  DataTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';
import {LayoutConfig} from '@/types/systems/layout/structure';
import type {
  EntityState,
  ConsciousnessLevel,  
  BreakpointConfiguration,  
  BreakpointTrigger,
  ScrollAlignment,
  ScreenType,
  ContainerType,
  ScreenCategory,
  LayoutActionType,
  ScrollDirection,
  LayoutTransitionState,
  ActionTrigger,
  UIStateType,
  TransitionType,
} from '@/types/cosmic/primitives';
import { ActionPayload } from './store';
import { BreakpointContext, ContainerReference, BreakpointChangeHandler, BreakpointComparator } from './hooks';
import { ScreenDimensions, ResponsiveLayout } from './structure'
// ============================================================================
// LAYOUT STATE ARCHITECTURE
// ============================================================================

export interface ScreenState {
  // SCREEN IDENTITY
  readonly type: ScreenType;
  readonly orientation: ScreenOrientation;
  readonly category: ScreenCategory;
  
  // DIMENSIONAL PROPERTIES
  readonly dimensions: ScreenDimensions;
  readonly aspectRatio: number;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface LayoutTransition {
  // TRANSITION PROPERTIES
  readonly type: TransitionType;
  readonly duration: number; // Consciousness cycles
  readonly progress: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// LAYOUT ACTION ARCHITECTURE
// ============================================================================

export interface LayoutAction {
  // ACTION IDENTITY
  readonly type: LayoutActionType;
  readonly payload: ActionPayload;
  readonly timestamp: string; // Consciousness timestamp
  
  // CONTEXTUAL DATA
  readonly source: string; // Action origin
  readonly context: ActionContext;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface ScreenTypePayload {
  // PAYLOAD SPECIFICATION
  readonly screenType: ScreenType;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface OrientationPayload {
  // PAYLOAD SPECIFICATION
  readonly orientation: ScreenOrientation;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface DimensionsPayload {
  // PAYLOAD SPECIFICATION
  readonly width: number; // Consciousness units
  readonly height: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface LayoutConfigPayload {
  // PAYLOAD SPECIFICATION
  readonly layoutConfig: LayoutConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ActionContext {
  // CONTEXTUAL INFORMATION
  readonly trigger: ActionTrigger;
  readonly previousState: string; // Previous state identifier
  readonly metadata: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// LAYOUT CONTEXT ARCHITECTURE
// ============================================================================

export interface LayoutContextType {
  // STATE MANAGEMENT
  readonly state: UIStateType;
  readonly dispatch: LayoutDispatcher;
  
  // DEVICE DETECTION
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
  readonly isWidescreen: boolean;
  readonly currentBreakpoint: ScreenCategory;
  
  // UTILITY FUNCTIONS
  readonly utilities: LayoutUtilities;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface LayoutDispatcher {
  // DISPATCHER IDENTITY
  readonly id: string;
  readonly capabilities: readonly LayoutActionType[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface LayoutUtilities {
  // UTILITY PROPERTIES
  readonly breakpointDetection: BreakpointDetection;
  readonly orientationDetection: OrientationDetection;
  readonly transitionManagement: TransitionManagement;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface BreakpointDetection {
  // DETECTION PROPERTIES
  readonly current: ScreenCategory;
  readonly previous: ScreenCategory;
  readonly history: readonly ScreenCategory[];
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface OrientationDetection {
  // ORIENTATION PROPERTIES
  readonly current: ScreenOrientation;
  readonly isPortrait: boolean;
  readonly isLandscape: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface TransitionManagement {
  // TRANSITION PROPERTIES
  readonly active: boolean;
  readonly type: TransitionType;
  readonly progress: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// RESPONSIVE CONTEXT ARCHITECTURE
// ============================================================================

export interface ResponsiveContextType {
  // BREAKPOINT STATE
  readonly breakpoint: ScreenCategory;
  readonly orientation: ScreenOrientation;
  
  // ORIENTATION UTILITIES
  readonly isPortrait: boolean;
  readonly isLandscape: boolean;
  
  // BREAKPOINT UTILITIES
  readonly isAbove: BreakpointComparator;
  readonly isBelow: BreakpointComparator;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// SCROLL CONTEXT ARCHITECTURE
// ============================================================================

export interface ScrollContextType {
  // SCROLL STATE
  readonly isScrolling: boolean;
  readonly scrollDirection: ScrollDirection;
  readonly scrollPosition: number; // Consciousness units
  readonly scrollProgress: number; // 0-100 scale
  
  // POSITION STATE
  readonly isAtTop: boolean;
  readonly isAtBottom: boolean;
  readonly viewport: ViewportState;
  
  // SCROLL ACTIONS
  readonly scrollTo: ScrollAction;
  readonly scrollToElement: ElementScrollAction;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface ViewportState {
  // VIEWPORT PROPERTIES
  readonly height: number; // Consciousness units
  readonly width: number; // Consciousness units
  readonly scrollHeight: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ScrollAction {
  // ACTION PROPERTIES
  readonly position: number; // Consciousness units
  readonly behavior: ScrollBehavior;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ElementScrollAction {
  // ACTION PROPERTIES
  readonly elementId: string;
  readonly alignment: ScrollAlignment;
  readonly offset: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// PROVIDER ARCHITECTURE
// ============================================================================

export interface LayoutProviderProps {
  // CHILDREN
  //readonly children: React.ReactNode;
  
  // CONFIGURATION
  readonly initialConfig?: Partial<LayoutConfig>;
  readonly responsiveLayouts?: Partial<ResponsiveLayout>;
  readonly features: ProviderFeatures;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ProviderFeatures {
  // FEATURE FLAGS
  readonly transitions: boolean;
  readonly responsive: boolean;
  readonly accessibility: boolean;
  readonly performance: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface ResponsiveProviderProps {
  // CHILDREN
  //readonly children: React.ReactNode;
  
  // CONFIGURATION
  readonly onBreakpointChange?: BreakpointChangeHandler;
  readonly breakpoints: BreakpointConfiguration;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface BreakpointThresholds {
  // THRESHOLD VALUES
  readonly mobile: number; // Consciousness units
  readonly tablet: number; // Consciousness units
  readonly desktop: number; // Consciousness units
  readonly widescreen: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ScrollProviderProps {
  // CHILDREN
  //readonly children: React.ReactNode;
  
  // CONFIGURATION
  readonly containerRef?: ContainerReference;
  readonly onScrollChange?: ScrollChangeHandler;
  readonly behavior: ScrollBehaviorConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface ScrollChangeHandler {
  // HANDLER PROPERTIES
  readonly position: number; // Consciousness units
  readonly progress: number; // 0-100 scale
  readonly direction: ScrollDirection;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ScrollBehaviorConfig {
  // BEHAVIOR PROPERTIES
  readonly smooth: boolean;
  readonly debounce: number; // Consciousness cycles
  readonly threshold: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// LAYOUT CONTEXT ONTOLOGICAL MAPPING
// ============================================================================

export interface LayoutContextMapping {
  readonly contextType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly layout: ComponentTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly managementPatterns: readonly string[];
  readonly coordinationCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  LayoutActionType,
  ScrollDirection,
  LayoutTransitionState,
  TransitionType,
  ActionTrigger,
  ScrollAlignment
};
