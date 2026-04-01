// src/types/systems/layout/structure.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  PatternTaxonomyType,
  StateTaxonomyType,
  SystemTaxonomyType,
  ArchitectureTaxonomyType,
  ComponentTaxonomyType,
  StylingTaxonomyType,
  AnimationTaxonomyType,
  InteractionTaxonomyType,
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType
} from '../../gaia';

// Import layout structure primitives from semantic foundation
import type {
  ScreenType,
  ScreenOrientation,
  ScreenCategory,
  GridTemplate,
  GridGap,
  ContainerSize,
  SpacingSize,
  ScrollContainer,
  ScrollbarStyle,
  HearthPosition,
  PageVariant
} from '@/types/cosmic/primitives';

// ============================================================================
// SCREEN DIMENSION ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface ScreenDimensions {
  // PHYSICAL DIMENSIONS (using primitive types)
  readonly width: number;
  readonly height: number;
  readonly frame: string;
  readonly screen: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
  readonly stylingTaxonomy: StylingTaxonomyType;
}

// ============================================================================
// SCROLL CONFIGURATION ARCHITECTURE
// ============================================================================

export interface ScrollConfig {
  // SCROLL BEHAVIOR (using primitive types)
  readonly container: ScrollContainer;
  readonly behavior: ScrollBehavior;
  readonly scrollbar: ScrollbarStyle;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

// ============================================================================
// COORDINATE SYSTEM ARCHITECTURE
// ============================================================================

export interface Coordinate {
  // SPATIAL POSITION (using primitive types)
  readonly x: number;
  readonly y: number;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// HEARTH LAYOUT ARCHITECTURE
// ============================================================================

export interface HearthLayout {
  // SPATIAL ORGANIZATION (using primitive types)
  readonly radius: number;
  readonly central: Coordinate;
  readonly peripheral: (index: number, total?: number) => Coordinate;
  readonly preCalculated: Record<HearthPosition, Coordinate>;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
  readonly animationTaxonomy: AnimationTaxonomyType;
}

// ============================================================================
// PAGE CONFIGURATION ARCHITECTURE
// ============================================================================

export interface PageConfig {
  // PAGE CHARACTERISTICS (using primitive types)
  readonly variant: PageVariant;
  readonly titleSize: string;
  readonly layoutClass: string;
  readonly spacing: SpacingSize;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly architectureTaxonomy: ArchitectureTaxonomyType;
  readonly stylingTaxonomy: StylingTaxonomyType;
}

// ============================================================================
// LAYOUT CONFIGURATION ARCHITECTURE
// ============================================================================

export interface LayoutConfig {
  // SCREEN CONFIGURATION (using primitive types)
  readonly screen: {
    readonly type: ScreenType;
    readonly orientation: ScreenOrientation;
    readonly category: ScreenCategory;
  };
  
  // GRID CONFIGURATION (using primitive types)
  readonly grid: {
    readonly template: GridTemplate;
    readonly gap: GridGap;
    readonly container: ContainerSize;
  };
  
  // SPACING CONFIGURATION (using primitive types)
  readonly spacing: {
    readonly padding: number;
    readonly margin: number;
    readonly gap: number;
  };
  
  // SCROLL CONFIGURATION
  readonly scroll: ScrollConfig;
  
  // PAGE CONFIGURATION
  readonly page: PageConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly architectureTaxonomy: ArchitectureTaxonomyType;
}

// ============================================================================
// RESPONSIVE LAYOUT ARCHITECTURE
// ============================================================================

export interface ResponsiveLayout {
  // BREAKPOINT CONFIGURATIONS
  readonly mobile: LayoutConfig;
  readonly tablet: LayoutConfig;
  readonly desktop: LayoutConfig;
  readonly widescreen: LayoutConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// LAYOUT STRUCTURE ONTOLOGICAL MAPPING
// ============================================================================

export interface LayoutStructureMapping {
  readonly layoutType: string;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly architecture: ArchitectureTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly styling: StylingTaxonomyType;
    readonly animation: AnimationTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
  };
  readonly spatialCharacteristics: readonly string[];
  readonly responsivePatterns: readonly string[];
}