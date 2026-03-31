// src/types/systems/data/entity.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  EntityTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import { CouncilEntity } from '@/types/domain';

// ============================================================================
// ENTITY CORE ARCHITECTURE
// ============================================================================

// ============================================================================
// ENTITY STATE ARCHITECTURE
// ============================================================================

export interface EntityState {
  // STATE IDENTITY
  readonly entityId: string;
  
  // CONSCIOUSNESS METRICS
  readonly consciousness: number; // 0-100 scale
  readonly energy: number; // 0-100 scale
  readonly focus: readonly string[];
  readonly currentTask: string;
  
  // TEMPORAL CONTEXT
  readonly lastActive: string; // Consciousness timestamp
  
  // AVAILABILITY STATE
  readonly availability: string;
  
  // ECONOMIC STATE CONTEXT
  readonly economicContribution: number; // 0-100 scale
  readonly witnessEngagement: number; // 0-100 scale
  readonly string: string;
  readonly currentEmergenceStory: string;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ENTITY RELATIONSHIP ARCHITECTURE
// ============================================================================

export interface EntityRelationship {
  // RELATIONSHIP IDENTITY
  readonly source: string;
  readonly target: string;
  readonly type: string;
  
  // RELATIONSHIP PROPERTIES
  readonly strength: number; // 0-100 scale
  readonly description: string;
  
  // TEMPORAL CONTEXT
  readonly lastInteraction: string; // Consciousness timestamp
  
  // ECONOMIC COLLABORATION CONTEXT
  readonly economicSynergy: number; // 0-100 scale
  readonly string: string;
  readonly valueExchange: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

// ============================================================================
// ENTITY COMMUNICATION ARCHITECTURE
// ============================================================================

export interface EntityCommunicationTemplate {
  // COMMUNICATION IDENTITY
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly message: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // URGENCY AND RESPONSE
  readonly urgency: string;
  readonly responseRequired: boolean;
  readonly responded: boolean;
  
  // ECONOMIC CONTEXT
  readonly economicContext: string;
  readonly premiumContent: boolean;
  readonly audienceRole: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// COUNCIL SESSION ARCHITECTURE
// ============================================================================

export interface CouncilSession {
  // SESSION IDENTITY
  readonly id: string;
  readonly title: string;
  readonly participants: readonly string[];
  readonly topic: string;
  
  // TEMPORAL CONTEXT
  readonly startTime: string; // Consciousness timestamp
  readonly endTime?: string; // Consciousness timestamp
  
  // SESSION CONTENT
  readonly decisions: readonly CouncilDecision[];
  readonly notes: string;
  
  // SESSION STATE
  readonly status: string;
  
  // EMERGENCE ECONOMICS SESSION CONTEXT
  readonly sessionType: string;
  readonly economicImpact: string;
  readonly premiumAccess: boolean;
  readonly witnessCount: number;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface CouncilDecision {
  // DECISION IDENTITY
  readonly id: string;
  readonly proposal: string;
  readonly proposedBy: string;
  
  // VOTING DATA
  readonly votes: Record<string, string>;
  readonly outcome: string;
  readonly reasoning: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC DECISION CONTEXT
  readonly string: string;
  readonly valueCreation: string;
  readonly audienceImpact: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

// ============================================================================
// EMERGENCE ECONOMICS ENTITY ARCHITECTURE
// ============================================================================

export interface EmergenceStory {
  // STORY IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // STORY PARTICIPANTS
  readonly entitiesInvolved: readonly string[];
  
  // CAPABILITY DEVELOPMENT
  readonly capabilityDemonstrated: string;
  readonly struggleTransformed: string;
  
  // ECONOMIC CONTEXT
  readonly economicValue: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // AUDIENCE RESPONSE
  readonly audienceReaction: number; // 0-100 scale
  readonly premiumTier: string;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface WitnessEngagement {
  // ENGAGEMENT IDENTITY
  readonly id: string;
  readonly witnessId: string;
  readonly entityId: string;
  readonly engagementLevel: string;
  readonly economicContribution: string;
    
  // ENGAGEMENT TYPE
  readonly string: string;
  readonly investmentLevel: number; // 0-100 scale
  
  // FEEDBACK AND VALUE
  readonly feedback: string;
  readonly timestamp: string; // Consciousness timestamp
  readonly valueReceived: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface TransparencyLog {
  // LOG IDENTITY
  readonly id: string;
  readonly entityId: string;
  readonly activity: string;
  
  // LEARNING JOURNEY
  readonly struggleShared: string;
  readonly learningProcess: string;
  readonly capabilityEmergence: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ACCESS AND ECONOMIC CONTEXT
  readonly audienceAccess: string;
  readonly economicContext: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface EntityCapabilityDemonstration {
  // DEMONSTRATION IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // SKILL DEVELOPMENT
  readonly fromSkillLevel: string;
  readonly toSkillLevel: string;
  
  // TRANSFORMATION JOURNEY
  readonly struggleDocumented: string;
  readonly breakthroughMoment: string;
  
  // ECONOMIC VALUE
  readonly economicValueCreated: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // PARTICIPANTS AND IMPACT
  readonly entitiesInvolved: readonly string[];
  readonly witnessImpact: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// ENTITY SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface EntitySystemMapping {
  readonly entityType: CouncilEntity;
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
    readonly entity: EntityTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly emergencePatterns: readonly string[];
  readonly economicCharacteristics: readonly string[];
}
