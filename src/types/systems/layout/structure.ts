// types/systems/layout/structure.ts - PURIFIED VERSION (Primitives Extracted)
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
  LayoutPattern,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,
  SpacingSize,
  ScrollContainer,
  ScrollBehavior,
  ScrollbarStyle,
  HearthPosition,
  PageVariant,
  LayoutTemplate,
  ScreenWidth,
  ScreenHeight,
  CSSDimension,
  ScreenClassification,
  HearthRadius,
  XCoordinate,
  YCoordinate,
  TitleSize,
  LayoutClass,
  MarginSize,
  GapSize,
  PaddingSize
} from '@/types/cosmic/primitives';

// ============================================================================
// SCREEN DIMENSION ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface ScreenDimensions {
  // PHYSICAL DIMENSIONS (using primitive types)
  readonly width: ScreenWidth;
  readonly height: ScreenHeight;
  readonly frame: CSSDimension;
  readonly screen: ScreenClassification;
  
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
  readonly x: XCoordinate;
  readonly y: YCoordinate;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// HEARTH LAYOUT ARCHITECTURE
// ============================================================================

export interface HearthLayout {
  // SPATIAL ORGANIZATION (using primitive types)
  readonly radius: HearthRadius;
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
  readonly titleSize: TitleSize;
  readonly layoutClass: LayoutClass;
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
    readonly padding: PaddingSize;
    readonly margin: MarginSize;
    readonly gap: GapSize;
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