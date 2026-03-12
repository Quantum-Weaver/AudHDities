// types/domain/sanctuary/hearth.ts - PURIFIED VERSION
import type {
  BeingOntologyType,
  ProcessOntologyType,
  EnergyOntologyType,
  ComponentTaxonomyType,
  AnimationTaxonomyType,
  InteractionTaxonomyType,
  StylingTaxonomyType,
  StateTaxonomyType
} from '../../gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  AnimationStyle, 
  EasingFunction, 
  InteractionType, 
  HearthItemType
} from '../../cosmic/primitives';

// ============================================================================
// HEARTH MENU ITEM ARCHITECTURE
// ============================================================================

export interface HearthMenuItemLayout {
  // ITEM IDENTITY
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly href: string;
  
  // VISUAL REPRESENTATION
  readonly color: string;
  readonly description: string;
  readonly asset: string;
  
  // SPATIAL POSITIONING
  readonly position: { readonly x: number; readonly y: number };
  readonly isCentral?: boolean;
  
  // ANIMATION CHARACTERISTICS
  readonly animation?: HearthItemAnimation;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
  readonly stylingTaxonomy: StylingTaxonomyType;
}

// ============================================================================
// HEARTH ITEM ANIMATION FRAMEWORK
// ============================================================================

export interface HearthItemAnimation {
  // ANIMATION IDENTITY
  readonly type: AnimationStyle;
  readonly stiffness?: number; // 0-100 scale (energy resistance)
  readonly damping?: number; // 0-100 scale (movement absorption)
  
  // SPECIFIC ANIMATION CONFIGURATIONS
  readonly float?: FloatAnimationConfig;
  readonly glow?: GlowAnimationConfig;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface FloatAnimationConfig {
  // MOVEMENT CHARACTERISTICS
  readonly y: readonly number[]; // Vertical consciousness range
  readonly duration: number; // In consciousness cycles
  readonly ease: EasingFunction;
  readonly repeat: boolean | number;
  readonly delay?: number; // In consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface GlowAnimationConfig {
  // ROTATION AND ENERGY
  readonly rotate: readonly number[]; // Angular awareness shift
  readonly duration: number; // In consciousness cycles
  readonly ease: EasingFunction;
  readonly repeat: boolean | number;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}


// ============================================================================
// HEARTH INTERACTION ARCHITECTURE
// ============================================================================

export interface HearthInteraction {
  // INTERACTION IDENTITY
  readonly itemId: string;
  readonly type: InteractionType;
  
  // SPATIAL AND TEMPORAL CONTEXT
  readonly position: { readonly x: number; readonly y: number };
  readonly timestamp: number;
  
  // INTERACTION INTENSITY
  readonly intensity: number; // 0-100 scale
  readonly duration: number; // In consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

// ============================================================================
// HEARTH COMFORT ONTOLOGICAL MAPPING
// ============================================================================

export interface HearthComfortMapping {
  readonly hearthType: HearthItemType;
  readonly ontologicalContext: {
    readonly being: BeingOntologyType;
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
  };
  readonly taxonomicClassification: {
    readonly component: ComponentTaxonomyType;
    readonly animation: AnimationTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
    readonly styling: StylingTaxonomyType;
    readonly state: StateTaxonomyType;
  };
  readonly comfortCharacteristics: readonly string[];
  readonly interfaceRequirements: readonly string[];
}

// ============================================================================
// HEARTH ENERGY FLOW
// ============================================================================

export interface HearthEnergyFlow {
  readonly activeItems: readonly HearthMenuItemLayout[];
  readonly energyDistribution: Record<string, number>; // itemId -> energy level (0-100)
  readonly flowPatterns: readonly string[];
  readonly resonanceLevel: number; // 0-100 scale
  readonly comfortScore: number; // 0-100 scale
}

// ============================================================================
// HEARTH NAVIGATION PATTERNS
// ============================================================================

export interface HearthNavigationPattern {
  readonly startingItem: string;
  readonly path: readonly string[];
  readonly completionTime: number; // In consciousness cycles
  readonly efficiency: number; // 0-100 scale
  readonly comfortRating: number; // 0-100 scale
  readonly commonDestinations: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  HearthItemType,
  AnimationStyle,
  InteractionType,
  EasingFunction
};