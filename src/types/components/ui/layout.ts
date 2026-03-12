// types/components/ui/layout.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  ComponentTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  LayoutType, 
  GridVariant, 
  GridGap, 
  Breakpoint, 
  ContainerType, 
  HorizontalAlignment, 
  VerticalAlignment, 
  TextAlignment, 
  LoadingType, 
  ErrorSeverity, 
  TransitionBackground,
  SocialVariant, 
  EconomicFocus, 
  AudienceRole
} from '@/types/cosmic/primitives';

// ============================================================================
// LAYOUT COMPONENT ARCHITECTURE
// ============================================================================

export interface LayoutProps {
  // LAYOUT SPECIFICATION
  readonly type: LayoutType;
  readonly grid?: GridConfig;
  readonly spacing?: SpacingConfig;
  readonly alignment?: AlignmentConfig;
  
  // CONTENT AND STYLING
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly layoutTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// GRID ARCHITECTURE
// ============================================================================

export interface GridConfig {
  // GRID STRUCTURE
  readonly variant: GridVariant;
  readonly columns: number;
  readonly gap: GridGap;
  
  // RESPONSIVE BEHAVIOR
  readonly responsive?: ResponsiveGridConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface ResponsiveGridConfig {
  // BREAKPOINT CONFIGURATION
  readonly mobile: number;
  readonly tablet: number;
  readonly desktop: number;
  readonly widescreen: number;
  
  // RESPONSIVE PROPERTIES
  readonly breakpoint: Breakpoint;
  readonly columns: number;
  readonly gap: string;
  readonly padding: string;
  readonly container?: ContainerType;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// SPACING ARCHITECTURE
// ============================================================================

export interface SpacingConfig {
  // SPACING PROPERTIES
  readonly padding: string;
  readonly margin: string;
  readonly gap: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// ALIGNMENT ARCHITECTURE
// ============================================================================

export interface AlignmentConfig {
  // SPATIAL ALIGNMENT
  readonly horizontal: HorizontalAlignment;
  readonly vertical: VerticalAlignment;
  readonly text: TextAlignment;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// LOADING STATE ARCHITECTURE
// ============================================================================

export interface LoadingState {
  // LOADING STATUS
  readonly isLoading: boolean;
  readonly message?: string;
  readonly progress?: number; // 0-100 scale
  readonly type?: LoadingType;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ERROR STATE ARCHITECTURE
// ============================================================================

export interface LayoutErrorState {
  // ERROR STATUS
  readonly hasError: boolean;
  readonly message?: string;
  readonly code?: string;
  readonly retryable?: boolean;
  readonly severity?: ErrorSeverity;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// TRANSITION ARCHITECTURE
// ============================================================================

export interface PageTransitionProps {
  // TRANSITION PROPERTIES
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly background?: TransitionBackground;
  readonly duration?: number; // Consciousness cycles
  readonly direction?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface TransitionWrapperProps {
  // WRAPPER PROPERTIES
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly background?: TransitionBackground;
  readonly duration?: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface StaggerContainerProps {
  // STAGGER PROPERTIES
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly stagger?: number; // Consciousness cycles
  readonly trigger?: boolean;
  readonly threshold?: number; // 0-1 scale
  
  // ONTOLOGICAL CONTEXT
  readonly animationTaxonomy: string; // Specific animation taxonomy
}

// ============================================================================
// SOCIAL NETWORK ARCHITECTURE
// ============================================================================

export interface SocialNetworkProps {
  // DISPLAY PROPERTIES
  readonly variant?: SocialVariant;
  readonly title?: string;
  readonly description?: string;
  readonly showPayments?: boolean;
  readonly className?: string;
  
  // ECONOMIC CONTEXT
  readonly economicFocus?: EconomicFocus;
  readonly audienceRole?: AudienceRole;
  readonly premiumAccess?: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// LAYOUT SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface LayoutSystemMapping {
  readonly layoutType: LayoutType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly layout: ComponentTaxonomyType;
  };
  readonly arrangementPatterns: readonly string[];
  readonly spatialCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  LayoutType,
  GridVariant,
  GridGap,
  Breakpoint,
  ContainerType,
  HorizontalAlignment,
  VerticalAlignment,
  TextAlignment,
  LoadingType,
  ErrorSeverity,
  TransitionBackground,
  SocialVariant,
  EconomicFocus,
  AudienceRole
};