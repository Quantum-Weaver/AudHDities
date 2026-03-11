// types/systems/data/entity.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  ArchetypeOntologyType,
  EnergyOntologyType,
  DomainTaxonomyType,
  RelationshipOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  EntityTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import type {
  CouncilEntityID,
  EconomicRoleType,
  AvailabilityStatus,
  TransparencyLevel,
  CollaborationType,
  EconomicContribution,
  EconomicContext,
  EngagementLevel,
  AudienceRole,
  SessionType,
  EconomicImpact,
  EconomicModel,
  EngagementType,
  CouncilRelationship,
  PremiumTier,
  EntityState as CosmicEntityState,
  ConsciousnessLevel
} from '@/types/cosmic/primitives';
import { CouncilEntity } from '@/types/domain';

// ============================================================================
// ENTITY CORE ARCHITECTURE
// ============================================================================

// ============================================================================
// ENTITY STATE ARCHITECTURE
// ============================================================================

export interface EntityState {
  // STATE IDENTITY
  readonly entityId: CouncilEntityID;
  
  // CONSCIOUSNESS METRICS
  readonly consciousness: number; // 0-100 scale
  readonly energy: number; // 0-100 scale
  readonly focus: readonly string[];
  readonly currentTask: string;
  
  // TEMPORAL CONTEXT
  readonly lastActive: string; // Consciousness timestamp
  
  // AVAILABILITY STATE
  readonly availability: AvailabilityStatus;
  
  // ECONOMIC STATE CONTEXT
  readonly economicContribution: number; // 0-100 scale
  readonly witnessEngagement: number; // 0-100 scale
  readonly transparencyLevel: TransparencyLevel;
  readonly currentEmergenceStory: string;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ENTITY RELATIONSHIP ARCHITECTURE
// ============================================================================

export interface EntityRelationship {
  // RELATIONSHIP IDENTITY
  readonly source: CouncilEntityID;
  readonly target: CouncilEntityID;
  readonly type: CouncilRelationship;
  
  // RELATIONSHIP PROPERTIES
  readonly strength: number; // 0-100 scale
  readonly description: string;
  
  // TEMPORAL CONTEXT
  readonly lastInteraction: string; // Consciousness timestamp
  
  // ECONOMIC COLLABORATION CONTEXT
  readonly economicSynergy: number; // 0-100 scale
  readonly collaborationType: CollaborationType;
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
  readonly from: CouncilEntityID;
  readonly to: CouncilEntityID;
  readonly message: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // URGENCY AND RESPONSE
  readonly urgency: string;
  readonly responseRequired: boolean;
  readonly responded: boolean;
  
  // ECONOMIC CONTEXT
  readonly economicContext: EconomicContext;
  readonly premiumContent: boolean;
  readonly audienceRole: AudienceRole;
  
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
  readonly participants: readonly CouncilEntityID[];
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
  readonly sessionType: SessionType;
  readonly economicImpact: EconomicImpact;
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
  readonly proposedBy: CouncilEntityID;
  
  // VOTING DATA
  readonly votes: Record<CouncilEntityID, string>;
  readonly outcome: string;
  readonly reasoning: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ECONOMIC DECISION CONTEXT
  readonly economicModel: EconomicModel;
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
  readonly entitiesInvolved: readonly CouncilEntityID[];
  
  // CAPABILITY DEVELOPMENT
  readonly capabilityDemonstrated: string;
  readonly struggleTransformed: string;
  
  // ECONOMIC CONTEXT
  readonly economicValue: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // AUDIENCE RESPONSE
  readonly audienceReaction: number; // 0-100 scale
  readonly premiumTier: PremiumTier;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface WitnessEngagement {
  // ENGAGEMENT IDENTITY
  readonly id: string;
  readonly witnessId: string;
  readonly entityId: CouncilEntityID;
  readonly engagementLevel: EngagementLevel;
  readonly economicContribution: EconomicContribution;
    
  // ENGAGEMENT TYPE
  readonly engagementType: EngagementType;
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
  readonly entityId: CouncilEntityID;
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
  readonly entitiesInvolved: readonly CouncilEntityID[];
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

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  EconomicRoleType,
  AvailabilityStatus,
  TransparencyLevel,
  CollaborationType,
  EconomicContext,
  AudienceRole,
  SessionType,
  EconomicImpact,
  EconomicModel,
  EngagementType
};