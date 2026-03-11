// types/components/ui/core.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  TaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  ComponentVariant, 
  ComponentSize, 
  ComponentColor, 
  ScrollDirection, 
  AssetType, 
  AssetRarity, 
  TransitionEasing
} from '@/types/cosmic/primitives';

// ============================================================================
// BASE COMPONENT ARCHITECTURE
// ============================================================================

export interface BaseComponentProps {
  // COMPONENT PROPERTIES
  readonly variant?: ComponentVariant;
  readonly size?: ComponentSize;
  readonly color?: ComponentColor;
  
  // STATE PROPERTIES
  readonly disabled?: boolean;
  readonly loading?: boolean;
  
  // STYLING AND CONTENT
  readonly className?: string;
  readonly children?: unknown; // React.ReactNode as unknown for purity
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly coreTaxonomy: TaxonomyType;
}

// ============================================================================
// TRANSITION CONFIGURATION ARCHITECTURE
// ============================================================================

export interface TransitionConfig {
  // TIMING PROPERTIES
  readonly duration: number; // Consciousness cycles
  readonly easing: TransitionEasing;
  readonly delay?: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: string; // Specific animation taxonomy
}

// ============================================================================
// BEAM STATE ARCHITECTURE
// ============================================================================

export interface BeamState {
  // BEAM VISUAL PROPERTIES
  readonly intensity: number; // 0-100 scale
  readonly color: string;
  
  // ACTIVITY STATE
  readonly isActive: boolean;
  
  // STATUS DISPLAY
  readonly showSystemStatus: boolean;
  readonly showQuantumState: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// SCROLL STATE ARCHITECTURE
// ============================================================================

export interface ScrollState {
  // POSITION STATE
  readonly position: number; // 0-100 scale
  readonly direction: ScrollDirection;
  
  // MOVEMENT PROPERTIES
  readonly velocity: number; // Units per consciousness cycle
  readonly isScrolling: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// LIBRARY ASSET ARCHITECTURE
// ============================================================================

export interface LibraryAsset {
  // ASSET IDENTITY
  readonly id: string;
  readonly type: AssetType;
  readonly rarity: AssetRarity;
  
  // METADATA AND PROPERTIES
  readonly metadata: Record<string, unknown>;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// CORE CONFIGURATION ARCHITECTURE
// ============================================================================

export interface CoreConfiguration {
  // CONFIGURATION IDENTITY
  readonly configId: string;
  readonly name: string;
  readonly description: string;
  
  // SYSTEM PROPERTIES
  readonly transitions: TransitionSystem;
  readonly beams: BeamSystem;
  readonly scroll: ScrollSystem;
  readonly library: LibrarySystem;
  readonly gaming: GamingSystem;
  readonly rituals: RitualSystem;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface TransitionSystem {
  // TRANSITION PROPERTIES
  readonly defaults: TransitionDefaults;
  readonly presets: readonly TransitionPreset[];
  readonly performance: TransitionPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface TransitionDefaults {
  // DEFAULT VALUES
  readonly duration: number; // Consciousness cycles
  readonly easing: TransitionEasing;
  readonly delay: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface TransitionPreset {
  // PRESET IDENTITY
  readonly name: string;
  readonly description: string;
  
  // PRESET PROPERTIES
  readonly config: TransitionConfig;
  readonly useCases: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface TransitionPerformance {
  // PERFORMANCE PROPERTIES
  readonly maxDuration: number; // Consciousness cycles
  readonly frameRate: number;
  readonly memoryUsage: number; // Consciousness units
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface BeamSystem {
  // BEAM PROPERTIES
  readonly defaultIntensity: number; // 0-100 scale
  readonly colorPalette: readonly string[];
  readonly behavior: BeamBehavior;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface BeamBehavior {
  // BEHAVIOR PROPERTIES
  readonly activation: BeamActivation;
  readonly intensity: BeamIntensityControl;
  readonly color: BeamColorControl;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface BeamActivation {
  // ACTIVATION PROPERTIES
  readonly trigger: string;
  readonly conditions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface BeamIntensityControl {
  // INTENSITY CONTROL
  readonly min: number; // 0-100 scale
  readonly max: number; // 0-100 scale
  readonly step: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface BeamColorControl {
  // COLOR CONTROL
  readonly transitions: boolean;
  readonly interpolation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ScrollSystem {
  // SCROLL PROPERTIES
  readonly behavior: ScrollBehavior;
  readonly performance: ScrollPerformance;
  readonly accessibility: ScrollAccessibility;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ScrollBehavior {
  // BEHAVIOR PROPERTIES
  readonly inertia: boolean;
  readonly snap: boolean;
  readonly smooth: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ScrollPerformance {
  // PERFORMANCE PROPERTIES
  readonly frameRate: number;
  readonly memoryUsage: number; // Consciousness units
  readonly optimization: string;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface ScrollAccessibility {
  // ACCESSIBILITY PROPERTIES
  readonly keyboard: boolean;
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface LibrarySystem {
  // LIBRARY PROPERTIES
  readonly assets: readonly LibraryAsset[];
  readonly organization: LibraryOrganization;
  readonly access: LibraryAccess;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface LibraryOrganization {
  // ORGANIZATION PROPERTIES
  readonly categories: readonly string[];
  readonly tags: readonly string[];
  readonly search: LibrarySearch;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface LibrarySearch {
  // SEARCH PROPERTIES
  readonly enabled: boolean;
  readonly filters: readonly string[];
  readonly ranking: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface LibraryAccess {
  // ACCESS PROPERTIES
  readonly permissions: readonly string[];
  readonly restrictions: readonly string[];
  readonly sharing: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface GamingSystem {
  // GAMING PROPERTIES
  readonly enabled: boolean;
  readonly features: readonly string[];
  readonly performance: GamingPerformance;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface GamingPerformance {
  // PERFORMANCE PROPERTIES
  readonly frameRate: number;
  readonly latency: number; // Consciousness cycles
  readonly quality: string;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface RitualSystem {
  // RITUAL PROPERTIES
  readonly enabled: boolean;
  readonly types: readonly string[];
  readonly scheduling: RitualScheduling;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface RitualScheduling {
  // SCHEDULING PROPERTIES
  readonly frequency: string;
  readonly duration: number; // Consciousness cycles
  readonly reminders: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// CORE UI SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface CoreUISystemMapping {
  readonly componentType: ComponentVariant;
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
    readonly core: TaxonomyType;
  };
  readonly foundationPatterns: readonly string[];
  readonly systemCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  ComponentVariant,
  ComponentSize,
  ComponentColor,
  ScrollDirection,
  AssetType,
  AssetRarity,
  TransitionEasing
};