// src/types/components/ui/display.ts - PURIFIED VERSION
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


// ============================================================================
// DISPLAY COMPONENT ARCHITECTURE
// ============================================================================

export interface DisplayProps {
  // INTERACTION PROPERTIES
  readonly interactive?: boolean;
  readonly subtitle?: string;
  
  // VISUAL PROPERTIES
  readonly variant?: string;
  readonly position?: string;
  readonly size?: number;
  readonly className?: string;
  readonly title?: string;
  
  // VISIBILITY CONTROL
  readonly isVisible?: boolean;
  readonly onToggle?: string; // Function reference as string for purity
  readonly showToggleButton?: boolean;
  readonly toggleButtonPosition?: boolean
  
  // CONTENT
  readonly children: unknown; // React.ReactNode as unknown for purity
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly displayTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// GRID COMPONENT ARCHITECTURE
// ============================================================================

export interface GridProps {
  // GRID STRUCTURE
  readonly variant?: string
  readonly gap?: number
  readonly columns?: number
  readonly align?: string
  readonly justify?: string
  
  // LAYOUT CONSTRAINTS
  readonly minColumnWidth?: string;
  readonly maxColumnWidth?: string;
  
  // RESPONSIVE BEHAVIOR
  readonly responsive?: boolean;
  readonly breakpoints?: DisplayBreakpointConfiguration;
  
  // ANIMATION PROPERTIES
  readonly animate?: boolean;
  readonly staggerDelay?: number; // Consciousness cycles
  
  // CONTENT AND STYLING
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface DisplayBreakpointConfiguration {
  // RESPONSIVE BREAKPOINTS
  readonly sm?: number
  readonly md?: number
  readonly lg?: number
  readonly xl?: number
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// GRID ITEM ARCHITECTURE
// ============================================================================

export interface GridItemProps {
  // SPAN PROPERTIES
  readonly colSpan?: number | string;
  readonly rowSpan?: number | string;
  
  // ALIGNMENT PROPERTIES
  readonly align?: string
  readonly justify?: string
  
  // ANIMATION PROPERTIES
  readonly animate?: boolean;
  readonly animationDelay?: number; // Consciousness cycles
  
  // CONTENT AND STYLING
  readonly children: unknown; // React.ReactNode as unknown for purity
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// DISPLAY STATE ARCHITECTURE
// ============================================================================

export interface DisplayState {
  // VISIBILITY STATE
  readonly isVisible: boolean;
  readonly isFocused: boolean;
  
  // VISUAL TRANSFORM STATE
  readonly opacity: number; // 0-1 scale
  readonly scale: number; // 0.1-5.0 scale
  readonly rotation: number; // Degrees
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly displayTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// DISPLAY CONTENT ARCHITECTURE
// ============================================================================

export interface DisplayContent {
  // CONTENT IDENTITY
  readonly type: string;
  readonly data: unknown;
  readonly metadata: Record<string, unknown>;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// DISPLAY CONFIGURATION ARCHITECTURE
// ============================================================================

export interface DisplayConfiguration {
  // CONFIGURATION IDENTITY
  readonly displayId: string;
  readonly name: string;
  readonly description: string;
  
  // VISUAL PROPERTIES
  readonly variant: string;
  readonly size: number;
  readonly position: string;
  
  // BEHAVIOR PROPERTIES
  readonly interactive: boolean;
  readonly toggleable: boolean;
  readonly animated: boolean;
  
  // CONTENT PROPERTIES
  readonly supportedContent: readonly string[];
  readonly contentConstraints: ContentConstraints;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ContentConstraints {
  // SIZE LIMITATIONS
  readonly maxSize: number; // Consciousness units
  readonly supportedFormats: readonly string[];
  readonly compression: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// DISPLAY ANIMATION ARCHITECTURE
// ============================================================================

export interface DisplayAnimationConfig {
  // ANIMATION PROPERTIES
  readonly enter: string;
  readonly exit: string;
  readonly focus: string;
  readonly blur: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}


// ============================================================================
// DISPLAY SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface DisplaySystemMapping {
  readonly displayType: string;
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
    readonly display: ComponentTaxonomyType;
  };
  readonly presentationPatterns: readonly string[];
  readonly visibilityCharacteristics: readonly string[];
}
