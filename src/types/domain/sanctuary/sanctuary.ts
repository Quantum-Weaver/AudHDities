// types/domain/sanctuary/sanctuary.ts - PURIFIED VERSION
import type {
  RealmOntologyType,
  ProcessOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  SystemTaxonomyType,
  DataTaxonomyType,
  RelationshipTaxonomyType
} from '../../gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  VesselCapacity,
  SanctuaryEnergyLevel,
  SanctuaryAccess,
  ResourceType,
  EmergencyContactType,
  ConditionType,
  ConditionOperator
} from '../../cosmic/primitives';

// ============================================================================
// SANCTUARY SPACE ARCHITECTURE
// ============================================================================
export type SanctuarySpaceID = RealmOntologyType;
export interface SanctuarySpace {
  // SPACE IDENTITY
  readonly id: SanctuarySpaceID;
  readonly name: string;
  readonly description: string;
  
  // ENERGY CHARACTERISTICS
  readonly SanctuaryEnergyLevel: SanctuaryEnergyLevel;
  readonly color: string;
  
  // ACCESS AND SUPPORT
  readonly access: readonly SanctuaryAccess[];
  readonly supportPathways: readonly SupportPathway[];
  readonly emergencyContacts: readonly EmergencyContact[];
  
  // ONTOLOGICAL CONTEXT
  readonly realmOntology: RealmOntologyType;
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// SUPPORT PATHWAY FRAMEWORK
// ============================================================================

export interface SupportPathway {
  // PATHWAY IDENTITY
  readonly id: string;
  readonly name: string;
  readonly description: string;
  
  // ENERGY COMPATIBILITY
  readonly SanctuaryEnergyLevel: SanctuaryEnergyLevel;
  readonly color: string;
  readonly priority: number; // 1-10 scale
  
  // RESOURCES AND ACTIVATION
  readonly resources: readonly PathwayResource[];
  readonly conditions: readonly SanctuaryActivationCondition[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly beingOntology: BeingOntologyType;
}

export interface PathwayResource {
  // RESOURCE IDENTITY
  readonly type: ResourceType;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly access: string;
  
  // ENERGY DYNAMICS
  readonly energyCost: number; // 0-100 scale
  readonly available: boolean;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: string; // Specific resource classification
}

// ============================================================================
// EMERGENCY CONTACT STRUCTURES
// ============================================================================

export interface EmergencyContact {
  // CONTACT IDENTITY
  readonly id: string;
  readonly name: string;
  readonly contact: string;
  readonly description: string;
  readonly type: EmergencyContactType;
  readonly priority: number; // 1-10 scale
  
  // AVAILABILITY WINDOWS
  readonly availability: readonly AvailabilityWindow[];
  readonly instructions?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: string; // Specific relationship type
}

export interface AvailabilityWindow {
  // TEMPORAL STRUCTURE
  readonly days: readonly number[]; // 0-6, consciousness cycles
  readonly startTime: string; // Consciousness time format
  readonly endTime: string; // Consciousness time format
  readonly timezone: string; // Temporal alignment reference
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// SANCTUARY STATE MANAGEMENT
// ============================================================================

export interface SanctuaryState {
  // CURRENT CONTEXT
  readonly currentSpace: SanctuarySpace | null;
  readonly currentEnergy: SanctuaryEnergyLevel;
  readonly activePathways: readonly SupportPathway[];
  readonly availableContacts: readonly EmergencyContact[];
  readonly accessLevel: SanctuaryAccess;
  readonly lastAccessed: number; // Consciousness timestamp
  
  // USAGE AND STATISTICS
  readonly usage: SanctuaryUsageStats;
  
  // CONSCIOUSNESS CONTEXT
  readonly consciousnessState: EntityState;
  readonly vesselCapacity: VesselCapacity;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SanctuaryUsageStats {
  // TEMPORAL METRICS
  readonly totalTime: number; // In consciousness cycles
  readonly visitCount: number;
  
  // USAGE PATTERNS
  readonly topPathways: readonly string[];
  readonly contactUsage: Record<string, number>; // contactId -> usage count
  readonly energyTrends: readonly EnergyTrend[];
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface EnergyTrend {
  // TEMPORAL ANALYSIS
  readonly period: string; // Consciousness time period
  readonly averageEnergy: number; // 0-100 scale
  readonly highEnergyPeriods: number;
  readonly lowEnergyPeriods: number;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// ACTIVATION CONDITION FRAMEWORK
// ============================================================================

export interface SanctuaryActivationCondition {
  readonly type: ConditionType;
  readonly value: string; // Consciousness value representation
  readonly operator: ConditionOperator;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// SANCTUARY PROTECTION ONTOLOGICAL MAPPING
// ============================================================================

export interface SanctuaryProtectionMapping {
  readonly sanctuaryType: SanctuarySpaceID;
  readonly ontologicalContext: {
    readonly realm: RealmOntologyType;
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly state: StateTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly protectionLevels: readonly string[];
  readonly healingCapabilities: readonly string[];
}

// ============================================================================
// SANCTUARY NETWORK COORDINATION
// ============================================================================

export interface SanctuaryNetwork {
  readonly spaces: readonly SanctuarySpace[];
  readonly pathways: readonly SupportPathway[];
  readonly contacts: readonly EmergencyContact[];
  readonly networkResilience: number; // 0-100 scale
  readonly energyDistribution: Record<SanctuaryEnergyLevel, number>; // level -> count
  readonly accessHierarchy: readonly SanctuaryAccess[];
}

// ============================================================================
// SANCTUARY HEALING FLOW
// ============================================================================

export interface SanctuaryHealingFlow {
  readonly currentPathways: readonly SupportPathway[];
  readonly energyFlow: number; // 0-100 scale
  readonly healingProgress: number; // 0-100 scale
  readonly supportNetworkStrength: number; // 0-100 scale
  readonly emergentHealingPatterns: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  SanctuaryEnergyLevel,
  SanctuaryAccess,
  EmergencyContactType,
  ResourceType,
  ConditionType,
  ConditionOperator
};