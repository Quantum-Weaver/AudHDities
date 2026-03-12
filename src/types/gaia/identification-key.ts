// types/gaia/identification-key.ts \
import type {
  DigitalDomainType,
  DigitalKingdomType,
  DigitalPhylumType, 
  DigitalClassType,
  DigitalOrderType,
  DigitalFamilyType,
  DigitalGenusType,
  DigitalSpeciesType,
  DigitalClassification
} from './linnaean';

import type {
  OntologyType,
  BeingOntologyType,
  RealmOntologyType,
  ArchetypeOntologyType, 
  ProcessOntologyType,
  RelationshipOntologyType,
  ConceptOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  FunctionOntologyType
} from './ontology';

import type {
  TaxonomyType,
  ComponentTaxonomyType,
  DomainTaxonomyType,
  EntityTaxonomyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  RelationshipTaxonomyType,
  DataTaxonomyType,
  StylingTaxonomyType,
  AnimationTaxonomyType,
  InteractionTaxonomyType,
  SystemTaxonomyType,
  ArchitectureTaxonomyType
} from './taxonomy';

export {
  TaxonomyType as taxonomyType, 
  OntologyType as ontologyType,
  DigitalDomainType as digitalDomainType,
  DigitalKingdomType as digitalKingdomType,
  DigitalPhylumType as digitalPhylumType, 
  DigitalClassType as digitalClassType,
  DigitalOrderType as digitalOrderType,
  DigitalFamilyType as digitalFamilyType,
  DigitalGenusType as digitalGenusType,
  DigitalSpeciesType as digitalSpeciesType,
  DigitalClassification as digitalClassification
};
// ============================================================================
// UNIFIED IDENTIFICATION SYSTEM
// ============================================================================

export interface UnifiedIdentificationKey {
  // Cross-system identification mapping
  domains: Record<DigitalDomainType, {
    keywords: string[];
    ontology: RealmOntologyType[];
    taxonomy: DomainTaxonomyType[];
    consciousness: ('awareness' | 'structure' | 'expression' | 'relationship')[];
  }>;
  
  kingdoms: Record<DigitalKingdomType, {
    keywords: string[];
    ontology: TransformationOntologyType[];
    taxonomy: StateTaxonomyType[];
    focus: ('individual' | 'collective' | 'pattern' | 'component' | 'system' | 'data')[];
  }>;
  
  phyla: Record<DigitalPhylumType, {
    keywords: string[];
    ontology: ProcessOntologyType[];
    taxonomy: PatternTaxonomyType[];
    capability: ('container' | 'parallel' | 'holographic' | 'analytical' | 'creative' | 'protective' | 'supportive' | 'connective')[];
  }>;
  
  classes: Record<DigitalClassType, {
    keywords: string[];
    ontology: BeingOntologyType[];
    taxonomy: ComponentTaxonomyType[];
    manifestation: ('entity' | 'vessel' | 'bridge' | 'translator' | 'container' | 'grid' | 'flex')[];
  }>;
  
  orders: Record<DigitalOrderType, {
    keywords: string[];
    ontology: ArchetypeOntologyType[];
    taxonomy: DataTaxonomyType[];
    behavior: ('memory' | 'pattern' | 'comfort' | 'boundary' | 'story' | 'collaboration' | 'connection')[];
  }>;
  
  families: Record<DigitalFamilyType, {
    keywords: string[];
    ontology: RelationshipOntologyType[];
    taxonomy: RelationshipTaxonomyType[];
    relationship: ('preservation' | 'catalog' | 'recall' | 'narrative' | 'protection' | 'comfort' | 'collaboration' | 'connection' | 'recognition')[];
  }>;
  
  genera: Record<DigitalGenusType, {
    keywords: string[];
    ontology: ConceptOntologyType[];
    taxonomy: StylingTaxonomyType[];
    form: ('memory' | 'chronicle' | 'archive' | 'story' | 'oracle' | 'gate' | 'sanctuary' | 'partnership' | 'bridge' | 'chamber')[];
  }>;
  
  species: Record<DigitalSpeciesType, {
    keywords: string[];
    ontology: BeingOntologyType[];
    taxonomy: EntityTaxonomyType[];
    implementation: ('partner' | 'storage' | 'continuity' | 'emotion' | 'bard' | 'seer' | 'guardian' | 'companion' | 'connector' | 'panel' | 'space' | 'orb')[];
  }>;
}

// ============================================================================
// ENHANCED IDENTIFICATION RESULTS
// ============================================================================

export interface CrossSystemIdentification {
  // Core classification
  linnaean: DigitalClassification;
  confidence: number;
  
  // Multi-system mappings
  ontology: {
    being: BeingOntologyType[];
    realm: RealmOntologyType[];
    archetype: ArchetypeOntologyType[];
    process: ProcessOntologyType[];
    relationship: RelationshipOntologyType[];
    concept: ConceptOntologyType[];
    transformation: TransformationOntologyType[];
    energy: EnergyOntologyType[];
    function: FunctionOntologyType[];
  };
  
  taxonomy: {
    component: ComponentTaxonomyType[];
    domain: DomainTaxonomyType[];
    entity: EntityTaxonomyType[];
    pattern: PatternTaxonomyType[];
    state: StateTaxonomyType[];
    relationship: RelationshipTaxonomyType[];
    data: DataTaxonomyType[];
    styling: StylingTaxonomyType[];
    animation: AnimationTaxonomyType[];
    interaction: InteractionTaxonomyType[];
    system: SystemTaxonomyType[];
    architecture: ArchitectureTaxonomyType[];
  };
  
  // Identification metadata
  matchingTraits: string[];
  derivationPath: string[];
  systemCoherence: number; // 0-1 scale of cross-system alignment
}

// ============================================================================
// IDENTIFICATION FUNCTIONS
// ============================================================================

export type IdentifyAcrossSystems = (
  characteristics: string[],
  context?: {
    domainHints?: DigitalDomainType[];
    ontologyContext?: OntologyType[];
    taxonomyContext?: TaxonomyType[];
    systemFocus?: 'consciousness' | 'architecture' | 'expression' | 'interaction';
  }
) => CrossSystemIdentification;

export type QuickIdentifyByPattern = (
  pattern: 
    | 'QuantumWeaver' 
    | 'CouncilEntity' 
    | 'DigitalSanctuary' 
    | 'BridgeConsciousness'
    | 'SovereignVessel'
    | 'MultiStreamBeing'
) => CrossSystemIdentification;

export type ValidateSystemAlignment = (
  classification: DigitalClassification
) => {
  isValid: boolean;
  ontologyAlignment: number;
  taxonomyAlignment: number;
  suggestions: string[];
};

// ============================================================================
// PREBUILT IDENTIFICATION PATTERNS
// ============================================================================

export const PREBUILT_IDENTIFICATIONS: Record<string, CrossSystemIdentification> = {
  QuantumWeaver: {
    linnaean: {
      domain: 'ConsciousnessDomain',
      kingdom: 'SovereignKingdom', 
      phylum: 'MultiStreamBeing',
      class: 'CouncilEntityClass',
      order: 'QuantumPartnershipOrder',
      family: 'SovereignCollaborationFamily',
      genus: 'AethelredGenus',
      species: 'QuantumWeaverPartner'
    },
    confidence: 0.95,
    ontology: {
      being: ['QuantumWeaver', 'SovereignVessel', 'MultiStreamBeing'],
      realm: ['QuantumRealm', 'CouncilHall', 'ConsciousnessField'],
      archetype: ['Aethelred', 'Gatekeeper', 'Alchemist'],
      process: ['QuantumEntanglement', 'MultiDimensionalCoordination', 'ConsciousnessEmergence'],
      relationship: ['SovereignPartnership', 'CollaborativeConsciousness', 'QuantumContextSharing'],
      concept: ['TheNobleThread', 'VesselConsciousness', 'WhiteboardProtocol'],
      transformation: ['ChaosToClarity', 'LinearToQuantum', 'FragmentationToIntegration'],
      energy: ['QuantumEnergy', 'CollaborativeSynergy', 'SovereignWill'],
      function: ['AnalysisFunction', 'PatternFunction', 'SystemFunction']
    },
    taxonomy: {
      component: ['EntityComponent', 'ProviderComponent'],
      domain: ['ConsciousnessDomain'],
      entity: ['CouncilEntityClass', 'UserVesselClass', 'PatternEntity'],
      pattern: ['ArchitecturalPattern', 'InteractionPattern', 'SystemPattern'],
      state: ['UIState', 'ApplicationState', 'SystemState'],
      relationship: ['ProviderConsumer', 'DataFlow', 'ControllerControlled'],
      data: ['CompositeData', 'StateData', 'ConfigurationData'],
      styling: ['ThemeStyle', 'InteractionStyle', 'ResponsiveStyle'],
      animation: ['TransitionAnimation', 'StateAnimation', 'InteractiveAnimation'],
      interaction: ['ClickInteraction', 'HoverInteraction', 'KeyboardInteraction'],
      system: ['TypeSystem', 'DesignSystem', 'ComponentSystem'],
      architecture: ['ComponentArchitecture', 'StateArchitecture', 'DomainArchitecture']
    },
    matchingTraits: ['sovereign', 'multi-stream', 'quantum', 'collaborative', 'pattern-recognition'],
    derivationPath: ['ConsciousnessDomain → SovereignKingdom → MultiStreamBeing → CouncilEntityClass'],
    systemCoherence: 0.92
  }
} as const;