// src/types/systems/interaction/variants.ts - PURIFIED VERSION
import type {
  EnergyOntologyType,
  ProcessOntologyType,
  BeingOntologyType,
  RealmOntologyType,
  PatternTaxonomyType,
  StylingTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  ArchitectureTaxonomyType,
  DataTaxonomyType
} from '@/types/gaia';

// ============================================================================
// SIZE CLASS ARCHITECTURE
// ============================================================================

export interface ButtonSizeClasses {
  // SIZE MAPPINGS
  readonly quantum_small: string;
  readonly sovereign_medium: string;
  readonly collaborative_large: string;
  readonly universal_extra_large: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface CardSizeClasses {
  // SIZE MAPPINGS
  readonly quantum_small: string;
  readonly sovereign_medium: string;
  readonly collaborative_large: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface DisplaySizeClasses {
  // SIZE MAPPINGS
  readonly quantum_small: string;
  readonly sovereign_medium: string;
  readonly collaborative_large: string;
  readonly universal_extra_large: string;
  readonly immersive_fullscreen: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// COLOR MAPPING ARCHITECTURE
// ============================================================================

export interface VariantColorMap {
  // CORE VARIANT COLORS
  readonly quantum_resonance: string; // CSS color value
  readonly cosmic_expansion: string; // CSS color value
  readonly emergency_intervention: string; // CSS color value
  readonly sovereign_autonomy: string; // CSS color value
  readonly neutral_equilibrium: string; // CSS color value
  readonly holographic_manifestation: string; // CSS color value
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
}

export interface ButtonColorMap extends VariantColorMap {
  // BUTTON SPECIFIC COLORS
  readonly consciousness_primary: string; // CSS color value
  readonly quantum_secondary: string; // CSS color value
  
  // ONTOLOGICAL CONTEXT
  readonly interactionTaxonomy: string; // Will be specific interaction taxonomy
}

export interface CardColorMap extends VariantColorMap {
  // CARD SPECIFIC COLORS
  readonly portal_transition: string; // CSS color value
  readonly feature_highlight: string; // CSS color value
  readonly oracle_insight: string; // CSS color value
  readonly entity_consciousness: string; // CSS color value
  
  // ONTOLOGICAL CONTEXT
  readonly realmOntology: RealmOntologyType;
}

export interface SectionColorMap extends VariantColorMap {
  // SECTION SPECIFIC COLORS
  readonly raised_elevation: string; // CSS color value
  readonly gradient_transition: string; // CSS color value
  
  // ONTOLOGICAL CONTEXT
  readonly architectureTaxonomy: ArchitectureTaxonomyType;
}

export interface DisplayColorMap extends VariantColorMap {
  // DISPLAY SPECIFIC COLORS
  readonly panel_contained: string; // CSS color value
  readonly floating_free: string; // CSS color value
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// VARIANT CONFIGURATION ARCHITECTURE
// ============================================================================

export interface VariantConfiguration {
  // CORE SETTINGS
  readonly defaultVariant: string;
  readonly defaultSize: string;
  readonly responsive: ResponsiveSettings;
  
  // ACCESSIBILITY
  readonly highContrast: boolean;
  readonly reducedMotion: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface ResponsiveSettings {
  // BREAKPOINT CONFIGURATION
  readonly breakpoints: BreakpointConfiguration;
  readonly scaling: string;
  readonly adaptation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface BreakpointConfiguration {
  // BREAKPOINT DEFINITIONS
  readonly quantum_small: number; // px
  readonly sovereign_medium: number; // px
  readonly collaborative_large: number; // px
  readonly universal_extra_large: number; // px
  // CONFIGURATION PROPERTIES
  readonly thresholds: string;
  readonly debounce: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}


// ============================================================================
// VARIANT MAPPING ARCHITECTURE
// ============================================================================

export interface VariantMapping {
  // COMPONENT MAPPING
  readonly component: string;
  readonly variants: readonly string[];
  readonly sizes: readonly string[];
  
  // DOMAIN ASSOCIATION
  readonly domains: readonly string[];
  readonly contexts: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// VARIANT SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface VariantSystemMapping {
  readonly variantType: string;
  readonly ontologicalContext: {
    readonly energy: EnergyOntologyType;
    readonly process: ProcessOntologyType;
    readonly being: BeingOntologyType;
    readonly realm: RealmOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly styling: StylingTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly architecture: ArchitectureTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  readonly visualCharacteristics: readonly string[];
  readonly usagePatterns: readonly string[];
}
