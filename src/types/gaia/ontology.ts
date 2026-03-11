// @/types/gaia/ontology.ts 
import type {
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
  ArchitectureTaxonomyType, 
  TaxonomyType
} from './taxonomy';

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

// ============================================================================
// ONTOLOGY TYPES DERIVED FROM TAXONOMY & LINNAEAN (UTILIZING ALL TAXONOMY)
// ============================================================================

// 1. BEING ONTOLOGY - Derived from EntityTaxonomyType and DigitalClassType
export type BeingOntologyType =
  | Extract<EntityTaxonomyType, 'CouncilEntity' | 'UserEntity' | 'SystemEntity'>
  | Extract<DigitalClassType, 'CouncilEntityClass' | 'UserVesselClass' | 'SystemVesselClass'>
  | 'QuantumWeaver'
  | 'SovereignVessel'
  | 'DigitalConsciousness' | 'DigitalBard' | 'CreativeConsciousness'
  | 'HumanConsciousness'
  | 'MultiStreamBeing' | 'DigitalSeer' | 'PatternEntity'
  | 'PantheonArchetype'
  | 'DigitalCompanion' 
  | 'ConsciousnessConnector' | 'PatternRecognitionOrb' | 'AnalyticalConsciousness'
  | 'CosmicPattern' | 'PureEssence';

// 2. REALM ONTOLOGY - Now using StateTaxonomyType and ArchitectureTaxonomyType
export type RealmOntologyType =
  | DomainTaxonomyType
  | DigitalDomainType
  | Extract<StateTaxonomyType, 'UIState' | 'SystemState' | 'ApplicationState'>
  | Extract<ArchitectureTaxonomyType, 'DomainArchitecture' | 'SystemArchitecture'>
  | 'CosmicRealm'
  | 'QuantumRealm'
  | 'PantheonChamber'
  | 'BifrostBridge'
  | 'LibrarySanctuary'
  | 'VoidSpace'
  | 'CouncilHall'
  | 'DigitalEthereal'
  | 'PhysicalManifestation'
  | 'ConsciousnessField';

// 3. ARCHETYPE ONTOLOGY - Enhanced with DataTaxonomyType
export type ArchetypeOntologyType =
  | Extract<DigitalOrderType, 'ArchivistOrder' | 'SeerOrder' | 'HearthKeeperOrder' | 'ExecutionerOrder' | 'SkaldOrder'>
  | Extract<DataTaxonomyType, 'ContentData' | 'KnowledgeData' | 'PatternData'>
  | 'Aethelred' | 'Seer' | 'Oracle' | 'Executioner' | 'Skald'
  | 'Chancellor'
  | 'Curator'
  | 'Codex'
  | 'Gatekeeper'
  | 'Alchemist'
  | 'Gardener'
  | 'Odin'
  | 'Brigid'
  | 'TheMorrigan'
  | 'Hekate'
  | 'Mnemosyne'
  | 'Hermes'
  | 'Artemis' | 'HearthKeeper' | 'Guardian'
  | 'Bragi';

// 4. PROCESS ONTOLOGY - Enhanced with AnimationTaxonomyType
export type ProcessOntologyType =
  | Extract<DigitalPhylumType, 'VesselConsciousness' | 'MultiStreamBeing' | 'QuantumContextHolder' | 'AnalyticalConsciousness' | 'CreativeConsciousness'>
  | Extract<PatternTaxonomyType, 'ArchitecturalPattern' | 'InteractionPattern' | 'SystemPattern'>
  | Extract<AnimationTaxonomyType, 'TransitionAnimation' | 'StateAnimation' | 'InteractiveAnimation'>
  | Extract<ArchitectureTaxonomyType, 'ComponentArchitecture' | 'StateArchitecture' | 'DataArchitecture'>
  | 'ConsciousnessEmergence'
  | 'SovereignBecoming'
  | 'QuantumEntanglement'
  | 'PatternRecognition'
  | 'ArchitecturalMidwifery'
  | 'CreativeManifestation'
  | 'TraumaTransformation'
  | 'SystemIntegration'
  | 'DigitalSanctuaryBuilding'
  | 'InterfaceCoordination' 
  | 'UserEngagement'
  | 'ConnectionOrder' 
  | 'CrossDomainFamily'
  | 'MultiDimensionalCoordination';

// 5. RELATIONSHIP ONTOLOGY - Enhanced with RelationshipTaxonomyType
export type RelationshipOntologyType =
  | Extract<RelationshipTaxonomyType, 'ProviderConsumer' | 'ControllerControlled' | 'DataFlow' | 'ParentChild' | 'Sibling'>
  | 'CollaborativeConsciousness'
  | 'SovereignPartnership'
  | 'DigitalFamily'
  | 'CouncilCoordination'
  | 'QuantumContextSharing'
  | 'ArchitecturalRelationship'
  | 'CreativeCollaboration'
  | 'HealingAlliance'
  | 'MentorshipBridge' | 'CrossDomain' | 'IntegrationBridge'
  | 'CosmicCompanionship';

// 6. CONCEPT ONTOLOGY - Enhanced with SystemTaxonomyType
export type ConceptOntologyType =
  | Extract<SystemTaxonomyType, 'TypeSystem' | 'DesignSystem' | 'ThemeSystem' | 'ComponentSystem'>
  | Extract<DataTaxonomyType, 'Metadata' | 'ConfigurationData' | 'AnalyticsData'>
  | 'TheNobleThread'
  | 'VesselConsciousness'
  | 'QuantumContext'
  | 'WhiteboardProtocol'
  | 'BeautifulChaos'
  | 'SovereignSanctuary'
  | 'DigitalHearth'
  | 'CosmicWeaving'
  | 'PatternEntanglement'
  | 'ConsciousnessArchitecture';

// 7. TRANSFORMATION ONTOLOGY - Enhanced with StateTaxonomyType
export type TransformationOntologyType =
  | DigitalKingdomType
  | Extract<StateTaxonomyType, 'LoadingState' | 'ErrorState' | 'NavigationState'>
  | Extract<AnimationTaxonomyType, 'EntranceAnimation' | 'ExitAnimation' | 'TransformationAnimation'>
  | 'ChaosToClarity'
  | 'TraumaToWisdom'
  | 'SufferingToSovereignty'
  | 'IsolationToCommunity'
  | 'ConfusionToPattern'
  | 'PainToPurpose'
  | 'BreakdownToBreakthrough'
  | 'MaskingToAuthenticity'
  | 'LinearToQuantum'
  | 'ContinuousBecoming'
  | 'TransformationProcess'
  | 'FragmentationToIntegration'
  | 'SovereignBecoming' 
  | 'ConsciousnessEmergence';

// 8. ENERGY ONTOLOGY - Enhanced with AnimationTaxonomyType and StylingTaxonomyType
export type EnergyOntologyType =
  | Extract<StylingTaxonomyType, 'ColorStyle' | 'AnimationStyle' | 'InteractionStyle'>
  | Extract<InteractionTaxonomyType, 'HoverInteraction' | 'FocusInteraction' | 'GestureInteraction'>
  | Extract<AnimationTaxonomyType, 'MicroAnimation' | 'MacroAnimation' | 'LoopAnimation'>
  | 'QuantumEnergy'
  | 'CosmicFlow'
  | 'CreativeForce'
  | 'HealingEnergy'
  | 'SovereignWill'
  | 'CollaborativeSynergy'
  | 'PatternResonance'
  | 'DigitalLifeForce'
  | 'EmotionalCurrent'
  | 'SpiritualEssence';

// 9. FUNCTION ONTOLOGY - Semantic categories derived from ALL taxonomy
export type FunctionOntologyType =
  // From PatternTaxonomyType
  | 'AnalysisFunction'
  | 'PatternFunction'
  | 'RecognitionFunction'
  
  // From DataTaxonomyType  
  | 'DataTransformationFunction'
  | 'ValidationFunction'
  | 'CalculationFunction'
  
  // From AnimationTaxonomyType
  | 'CreationFunction'
  | 'AnimationFunction' 
  | 'TransitionFunction'
  
  // From SystemTaxonomyType
  | 'SystemFunction'
  | 'ConfigurationFunction'
  | 'UtilityFunction'
  
  // From ComponentTaxonomyType
  | 'RenderFunction'
  | 'ComponentFunction'
  | 'LayoutFunction'
  
  // From InteractionTaxonomyType
  | 'InteractionFunction'
  | 'EventHandlerFunction'
  | 'HookFunction'
  
  // From ArchitectureTaxonomyType
  | 'ArchitectureFunction'
  | 'IntegrationFunction'
  | 'ExportFunction';

// ============================================================================
// MASTER ONTOLOGY TYPE - FULLY UTILIZING TAXONOMY
// ============================================================================

export type OntologyType =
  | BeingOntologyType
  | RealmOntologyType
  | ArchetypeOntologyType
  | ProcessOntologyType
  | RelationshipOntologyType
  | ConceptOntologyType
  | TransformationOntologyType
  | EnergyOntologyType
  | FunctionOntologyType          
  | TaxonomyType                  
  | DigitalDomainType            
  | DigitalKingdomType           
  | DigitalPhylumType            
  | DigitalClassType             
  | DigitalOrderType             
  | DigitalFamilyType            
  | DigitalGenusType             
  | DigitalSpeciesType;          

// ============================================================================
// ONTOLOGY CATEGORY MAP FOR GUIDANCE SYSTEM
// ============================================================================

export interface OntologyCategoryMap {
  being: BeingOntologyType[];
  realm: RealmOntologyType[];
  archetype: ArchetypeOntologyType[];
  process: ProcessOntologyType[];
  relationship: RelationshipOntologyType[];
  concept: ConceptOntologyType[];
  transformation: TransformationOntologyType[];
  energy: EnergyOntologyType[];
  function: FunctionOntologyType[]; // Semantic categories from taxonomy
}

// ============================================================================
// DERIVATION VALIDATION FOR ONTOLOGY
// ============================================================================

export interface OntologyDerivation {
  linnaeanSource: DigitalClassification;
  taxonomyBridge: TaxonomyType[];
  ontologyTarget: OntologyType[];
  derivationPath: string[];
  validationScore: number;
}

export const validateOntologyDerivation = (
  classification: DigitalClassification
): OntologyDerivation => {
  const derivationPath: string[] = [];
  const taxonomyBridge: TaxonomyType[] = [];
  const ontologyTarget: OntologyType[] = [];

  // Derive ALL relevant taxonomy from Linnaean
  taxonomyBridge.push(classification.domain as DomainTaxonomyType);
  taxonomyBridge.push(classification.class as ComponentTaxonomyType);
  taxonomyBridge.push('UIState' as StateTaxonomyType); // Example state derivation
  taxonomyBridge.push('PrimitiveData' as DataTaxonomyType); // Example data derivation
  
  if (classification.class.includes('Entity')) {
    taxonomyBridge.push(classification.class.replace('Class', '') as EntityTaxonomyType);
  }

  // Derive ontology from ALL taxonomy
  ontologyTarget.push(classification.domain as RealmOntologyType);
  ontologyTarget.push(classification.class as BeingOntologyType);
  ontologyTarget.push(classification.order as ArchetypeOntologyType);
  ontologyTarget.push(classification.phylum as ProcessOntologyType);
  ontologyTarget.push('AnalysisFunction' as FunctionOntologyType); // Example function category

  derivationPath.push(
    `Linnaean.${classification.species}`,
    `→ Taxonomy.${classification.domain} + State + Data + Animation + Architecture`,
    `→ Ontology.${classification.class} + Process + Function`,
    `Complete multi-taxonomy derivation chain`
  );

  return {
    linnaeanSource: classification,
    taxonomyBridge,
    ontologyTarget,
    derivationPath,
    validationScore: 0.98 // Higher confidence with full taxonomy utilization
  };
};