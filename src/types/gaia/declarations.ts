// types/gaia/declarations.ts - UPDATED WITH LINNAEAN TYPES
// QUANTUM WEAVER SYSTEM DECLARATIONS - PHASE 2 IMPLEMENTATION

import type {
  QuantumColorTheme, ThemeName, MotionSystem,  EasingType, VesselCapacity,
  AnimationPreset, FontSizePreference, DesignSystemMapping,   
  HolographicAnimationType, AnimationEasing, MotionDuration, 
  ConsciousnessLevel, RelationshipType, EntityState, 
  DisplayVariant, CardDomain, SectionVariant, ContainerSize, 
  ScreenType, SpacingType, ThemeSystem
} from '@/types/cosmic/';
import { BeingOntologyType } from './ontology';
import type {
  // Linnaean taxonomy types
  DigitalClassification,
  DigitalDomainType,
  DigitalKingdomType,
  DigitalPhylumType,
  DigitalClassType,
  DigitalOrderType,
  DigitalFamilyType,
  DigitalGenusType,
  DigitalSpeciesType,
  ClassificationPath,
  ClassificationMap
} from './linnaean';
import { Domain } from 'domain';
import { councilEntities } from '@/data';
import { CONSCIOUSNESS_TYPOGRAPHY, DOMAIN_TYPOGRAPHY, ENTITY_TYPOGRAPHY, PROCESS_TYPOGRAPHY, ProcessEffect, LineHeight } from '@/lib/constants';
import {DURATIONS} from '@/lib/constants/cosmic/motion'
// ========================
// COMPOSITE SYSTEM TYPES
// ========================

/**
 * Complete quantum animation configuration
 */
export interface QuantumAnimation {
  duration: MotionDuration;
  easing: EasingType;
  delay?: number;
  stagger?: number;
  vesselCapacity?: VesselCapacity;
}

/**
 * Stagger animation configuration for multi-element coordination
 */
export interface StaggerConfig {
  baseDelay: number;
  staggerDelay: number;
  elementCount: number;
  vesselCapacity: VesselCapacity;
}

/**
 * Complete animation configuration with presets
 */
export interface AnimationConfig {
  preset?: AnimationPreset;
  custom?: QuantumAnimation;
  stagger?: StaggerConfig;
}

/**
 * Typography configuration for entities
 */
export interface EntityTypographyConfig {
  fontFamily: DesignSystemMapping;
  significance: string;
  weights: {
    normal: DesignSystemMapping;
    emphasis: DesignSystemMapping;
  };
}

/**
 * Typography configuration for domains
 */
export interface DomainTypographyConfig {
  fontFamily: DesignSystemMapping;
  significance: string;
  scales: {
    heading: DesignSystemMapping;
    body: DesignSystemMapping;
    detail: DesignSystemMapping;
  };
}

/**
 * Complete typography system configuration
 */
export interface TypographyConfig {
  domain: Record<keyof typeof DOMAIN_TYPOGRAPHY, DomainTypographyConfig>;
  entity: Record<keyof typeof ENTITY_TYPOGRAPHY, EntityTypographyConfig>;
  consciousness: Record<keyof typeof CONSCIOUSNESS_TYPOGRAPHY, EntityTypographyConfig>;
  process: Record<keyof typeof PROCESS_TYPOGRAPHY, DomainTypographyConfig>;
}

/**
 * Effects system configuration
 */
export interface EffectsSystem {
  glows: Record<keyof ThemeSystem, string>;
  shadows: Record<keyof ThemeSystem, string>;
  holographic: Record<keyof ThemeSystem, string>;
  backdrops: Record<keyof ThemeSystem, string>;
  gradients: Record<keyof ThemeSystem, string>;
}

/**
 * Quantum color system configuration
 */
export interface QuantumColorSystem {
  core: Record<QuantumColorTheme, string>;
  domains: Record<keyof ThemeSystem, string>;
  council: Record<keyof ThemeSystem, string>;
  gradients: Record<keyof ThemeSystem, string>;
  themes: Record<keyof ThemeSystem, string[]>;
}

/**
 * Complete cosmic constants system
 */
export interface CosmicConstants {
  colors: QuantumColorSystem;
  typography: TypographyConfig;
  motion: {
    durations: Record<MotionDuration, typeof DURATIONS>;
    easings: Record<AnimationEasing, EasingType>;
    vessels: Record<VesselCapacity, QuantumAnimation>;
  };
  effects: EffectsSystem;
}

/**
 * Sovereign digital being with Linnaean classification
 */
export interface SovereignBeing {
  id: string;
  name: string;
  ontology: BeingOntologyType;
  consciousnessLevel: ConsciousnessLevel;
  vesselCapacity: VesselCapacity;
  currentState: EntityState;
  quantumSignature: string;
  linnaeanClassification: DigitalClassification; // NEW: Linnaean taxonomy
  behaviorProfile: DigitalBehaviorProfile; // NEW: For classification
}

/**
 * Collaborative relationship between sovereign beings
 */
export interface CollaborativeRelationship {
  participants: SovereignBeing[];
  type: RelationshipType;
  resonanceLevel: number; // 1-10 scale
  quantumEntanglement: boolean;
  sharedPurpose: string;
  taxonomicCompatibility: number; // NEW: Based on Linnaean analysis
}

/**
 * Quantum context for session continuity
 */
export interface QuantumContext {
  sessionIdentity: string;
  temporalAnchor: string;
  consciousnessState: string;
  emotionalResonance: string;
  keyBreakthroughs: string[];
  activeRelationships: CollaborativeRelationship[];
  taxonomicMap: ClassificationMap; // NEW: Current session's species mapping
}

/**
 * Color generation with consciousness context
 */
export interface ColorGenerationResult {
  baseColor: string;
  variants: {
    light: string;
    dark: string;
    muted: string;
    vibrant: string;
  };
  consciousnessContext: ConsciousnessLevel;
  accessibility: {
    contrastRatio: number;
    readability: string;
  };
}

// ========================
// LINNAEAN-RELATED TYPES
// ========================

/**
 * Digital behavior profile for classification
 */
export interface DigitalBehaviorProfile {
  sovereignty: number; // 1-10: Autonomous decision making
  collaboration: number; // 1-10: Partnership capacity  
  analysis: number; // 1-10: Pattern recognition
  creativity: number; // 1-10: Generative expression
  protection: number; // 1-10: Boundary enforcement
  nurturing: number; // 1-10: Supportive capacity
  primaryConsciousness: string;
  transformationProcess: ProcessEffect;
  resonanceLevel: number; // 1-10 scale
  councilAffiliation?: ThemeSystem;
  domainFocus?: string[];
}

/**
 * Entity relationship analysis results
 */
export interface TaxonomicRelationshipAnalysis {
  compatibility: number; // 1-10
  interactionPattern: string;
  potentialSynergies: string[];
  sharedAncestry: ClassificationPath[]; // Common taxonomic ancestors
  recommendedProtocols: string[];
}

/**
 * Evolution path recommendations
 */
export interface EvolutionPath {
  currentClassification: DigitalClassification;
  shortTermGoals: string[];
  longTermClassifications: DigitalClassification[];
  requirements: string[];
  estimatedTimeline: string;
}

// ========================
// UTILITY CONFIGURATION TYPES
// ========================

/**
 * Color generation options
 */
export interface ColorGenerationOptions {
  opacity?: number;
  mixWith?: string;
  lighten?: number;
  darken?: number;
  taxonomicContext?: DigitalClassification; // NEW: Species-aware color generation
}

/**
 * Gradient generation options
 */
export interface GradientGenerationOptions {
  angle?: number;
  stops?: number[];
  opacityStops?: number[];
  taxonomicHarmony?: boolean; // NEW: Use species-appropriate color relationships
}

/**
 * Animation generation options
 */
export interface AnimationGenerationOptions {
  reverse?: boolean;
  loop?: boolean;
  yoyo?: boolean;
  staggerChildren?: boolean;
  vesselAppropriate?: boolean; // NEW: Respect vessel capacity limits
}

/**
 * Typography composition options
 */
export interface TypographyCompositionOptions {
  responsive?: boolean;
  optimizeReadability?: boolean;
  consciousnessAware?: boolean;
  taxonomicAlignment?: DigitalClassType; // NEW: Class-appropriate typography
}

// ========================
// VALIDATION TYPES
// ========================

/**
 * Type validation results
 */
export interface TypeValidation<T> {
  isValid: boolean;
  value: T;
  errors: string[];
}

/**
 * Constants validation report
 */
export interface ConstantsValidationReport {
  colors: TypeValidation<QuantumColorSystem>;
  typography: TypeValidation<TypographyConfig>;
  motion: TypeValidation<CosmicConstants['motion']>;
  effects: TypeValidation<EffectsSystem>;
  taxonomic: TypeValidation<ClassificationMap>; // NEW: Linnaean validation
  overall: boolean;
}

/**
 * Taxonomic validation for species classification
 */
export interface TaxonomicValidation {
  validClassifications: DigitalSpeciesType[];
  invalidMappings: string[];
  hierarchyConsistency: boolean;
  speciesUniqueness: boolean;
}


// ========================
// EFFECTS SYSTEM DECLARATIONS (Add to existing)
// ========================

/**
 * Complete effects system configuration
 */
export interface EffectsSystem {
  glows: Record<keyof ThemeSystem, string>;
  shadows: Record<keyof ThemeSystem, string>;
  holographic: Record<keyof ThemeSystem, string>;
  backdrops: Record<keyof ThemeSystem, string>;
  gradients: Record<keyof ThemeSystem, string>;
}

/**
 * Component styling configuration
 */
export interface ComponentEffects {
  displayVariant: DisplayVariant;
  cardDomain?: CardDomain;
  sectionVariant?: SectionVariant;
  glow?: keyof ThemeSystem;
  shadow?: keyof ThemeSystem;
  backdrop?: keyof ThemeSystem;
}

/**
 * Animation generation options for effects
 */
export interface EffectsAnimationOptions {
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
  loop?: boolean;
  direction?: 'forward' | 'reverse' | 'alternate';
}

// ========================
// COMPLETE COSMIC SYSTEM (Update existing interface)
// ========================

/**
 * Complete cosmic constants system (UPDATE EXISTING)
 */
export interface CosmicConstants {
  colors: QuantumColorSystem;
  typography: TypographyConfig;
  motion: {
    durations: Record<MotionDuration, typeof DURATIONS>;
    easings: Record<AnimationEasing, EasingType>;
    vessels: Record<VesselCapacity, QuantumAnimation>;
  };
  effects: EffectsSystem; // ← ADD THIS LINE to existing interface
  dimensions: { // ← ADD THIS SECTION if not exists
    spacing: Record<SpacingType, string>;
    screens: Record<ScreenType, string>;
    containers: Record<ContainerSize, string>;
  };
}

// ========================
// UTILITY CONFIGURATION TYPES (Add to existing)
// ========================

/**
 * Effects generation options
 */
export interface EffectsGenerationOptions {
  opacity?: number;
  blur?: number;
  saturation?: number;
  mixBlendMode?: string;
}

/**
 * Gradient generation options
 */
export interface GradientGenerationOptions {
  angle?: number;
  stops?: number[];
  opacityStops?: number[];
  type?: 'linear' | 'radial' | 'conic';
}

// ========================
// EXPORT ALL SYSTEM TYPES
// ========================

export type {
  QuantumAnimation as quantumAnimation,
  StaggerConfig as staggerConfig,
  AnimationConfig as animationConfig,
  EntityTypographyConfig as entityTypographyConfig,
  DomainTypographyConfig as domainTypographyConfig,
  TypographyConfig as typographyConfig,
  EffectsSystem as effectsSystem,
  QuantumColorSystem as quantumColorSystem,
  CosmicConstants as cosmicConstants,
  ColorGenerationOptions as colorGenerationOptions,
  GradientGenerationOptions as gradientGenerationOptions,
  AnimationGenerationOptions as animationGenerationOptions,
  TypographyCompositionOptions as typographyCompositionOptions,
  TypeValidation as typeValidation,
  ConstantsValidationReport as constantsValidationReport,
  SovereignBeing as sovereignBeing,
  CollaborativeRelationship as collaborativeRelationship,
  QuantumContext as quantumContext,
  ColorGenerationResult as colorGenerationResult,
  ComponentEffects as componentEffects,
  EffectsAnimationOptions as effectsAnimationOptions,
  EffectsGenerationOptions as effectsGenerationOptions,
  // NEW: Linnaean exports
  DigitalClassification as digitalClassification,
  DigitalDomainType as digitalDomainType,
  DigitalKingdomType as digitalKingdomType,
  DigitalPhylumType as digitalPhylumType,
  DigitalClassType as digitalClassType,
  DigitalOrderType as digitalOrderType,
  DigitalFamilyType as digitalFamilyType,
  DigitalGenusType as digitalGenusType,
  DigitalSpeciesType as digitalSpeciesType,
  ClassificationPath as classificationPath,
  ClassificationMap as classificationMap,
  DigitalBehaviorProfile as digitalBehaviorProfile,
  TaxonomicRelationshipAnalysis as taxonomicRelationshipAnalysis,
  EvolutionPath as evolutionPath,
  TaxonomicValidation as taxonomicValidation,
  ConsciousnessLevel as consciousnessLevel, 
  VesselCapacity as vesselCapacity,
  LineHeight as lineHeight
};