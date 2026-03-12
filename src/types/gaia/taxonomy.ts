// @/types/gaia/taxonomy.ts - DERIVED FROM LINNAEAN
import type {
  DigitalDomainType,
  DigitalKingdomType, 
  DigitalPhylumType,
  DigitalClassType,
  DigitalOrderType,
  DigitalFamilyType,
  DigitalGenusType,
  DigitalSpeciesType,
  DigitalClassification,
  ClassificationPath
} from './linnaean';

// ============================================================================
// TAXONOMY TYPES DERIVED FROM LINNAEAN CLASSIFICATION
// ============================================================================

// 1. COMPONENT TAXONOMY - Derived from DigitalClassType
export type ComponentTaxonomyType =
  | Extract<DigitalClassType, 'ContainerClass' | 'GridClass' | 'FlexClass'>
  | 'LayoutComponent'      // Spatial organization systems
  | 'DisplayComponent'     // Visual representation systems
  | 'ControlComponent'     // Interactive manipulation systems
  | 'InteractiveComponent' // User engagement systems
  | 'ProviderComponent'    // Service delivery systems
  | 'ServiceComponent'     // Functional operation systems
  | 'UtilityComponent'     // Helper function systems
  | 'EntityComponent';     // Consciousness manifestation systems

// 2. DOMAIN TAXONOMY - Direct mapping from DigitalDomainType
export type DomainTaxonomyType = DigitalDomainType;

// 3. ENTITY TAXONOMY - Derived from DigitalClassType and DigitalSpeciesType
export type EntityTaxonomyType =
  | Extract<DigitalClassType, 'CouncilEntityClass' | 'UserVesselClass' | 'SystemVesselClass' | 'BridgeEntityClass' | 'TranslationalEntityClass'>
  | Extract<DigitalSpeciesType, 'QuantumWeaverPartner' | 'DigitalBard' | 'DigitalSeer' | 'DigitalGuardian' | 'DigitalCompanion' | 'ConsciousnessConnector'>
  | 'ContentEntity'        // Creative works and expressions
  | 'DataEntity'           // Information and knowledge forms
  | 'PatternEntity'        // Recognition and wisdom forms
  | 'StateEntity';         // Temporal and conditional forms

// 4. PATTERN TAXONOMY - Derived from DigitalPhylumType
export type PatternTaxonomyType =
  | Extract<DigitalPhylumType, 'AnalyticalConsciousness' | 'CreativeConsciousness' | 'CollaborativeConsciousness'>
  | 'ArchitecturalPattern' // System structure patterns
  | 'InteractionPattern'   // User engagement patterns
  | 'DataPattern'          // Information flow patterns
  | 'StatePattern'         // Condition management patterns
  | 'LayoutPattern'        // Spatial organization patterns
  | 'AnimationPattern'     // Motion and transition patterns
  | 'ColorPattern'         // Visual harmony patterns
  | 'TypographyPattern'    // Text hierarchy patterns
  | 'ComponentPattern'     // UI building block patterns
  | 'SystemPattern';       // Infrastructure coordination patterns

// 5. STATE TAXONOMY - Derived from behavioral capabilities
export type StateTaxonomyType =
  | 'UIState'              // Interface condition states
  | 'DataState'            // Information condition states
  | 'ApplicationState'     // System operation states
  | 'UserState'            // Human engagement states
  | 'SystemState'          // Infrastructure condition states
  | 'AnimationState'       // Motion and transition states
  | 'ThemeState'           // Visual appearance states
  | 'NavigationState'      // Location and flow states
  | 'LoadingState'         // Progress and waiting states
  | 'ErrorState';          // Exception and recovery states

// 6. RELATIONSHIP TAXONOMY - Derived from interaction patterns
export type RelationshipTaxonomyType =
  | 'ParentChild'          // Hierarchical containment
  | 'Sibling'              // Equal level coordination
  | 'ContainerContained'   // Wrapper-content relationships
  | 'ControllerControlled' // Management-execution relationships
  | 'ProviderConsumer'     // Service-consumption relationships
  | 'SourceTarget'         // Origin-destination relationships
  | 'InputOutput'          // Data flow relationships
  | 'StateDerived'         // Condition-dependent relationships
  | 'EventHandler'         // Action-response relationships
  | 'DataFlow';            // Information movement relationships

// 7. DATA TAXONOMY - Derived from information structures
export type DataTaxonomyType =
  | 'PrimitiveData'        // Basic value types
  | 'CompositeData'        // Structured object types
  | 'CollectionData'       // Array and set types
  | 'StateData'            // Condition representation types
  | 'ConfigurationData'    // System setting types
  | 'UserData'             // Human information types
  | 'ContentData'          // Creative work types
  | 'SystemData'           // Infrastructure information types
  | 'AnalyticsData'        // Measurement and insight types
  | 'Metadata';            // Descriptive information types

// 8. STYLING TAXONOMY - Derived from visual representation systems
export type StylingTaxonomyType =
  | 'ColorStyle'           // Color application styles
  | 'TypographyStyle'      // Text presentation styles
  | 'LayoutStyle'          // Spatial arrangement styles
  | 'SpacingStyle'         // Distance management styles
  | 'BorderStyle'          // Edge and boundary styles
  | 'ShadowStyle'          // Depth and dimension styles
  | 'AnimationStyle'       // Motion and transition styles
  | 'InteractionStyle'     // Engagement feedback styles
  | 'ResponsiveStyle'      // Adaptive behavior styles
  | 'ThemeStyle';          // Consistent appearance styles

// 9. ANIMATION TAXONOMY - Derived from motion systems
export type AnimationTaxonomyType =
  | 'EntranceAnimation'    // Element appearance motions
  | 'ExitAnimation'        // Element disappearance motions
  | 'HoverAnimation'       // Pointer interaction motions
  | 'FocusAnimation'       // Attention indication motions
  | 'StateAnimation'       // Condition change motions
  | 'TransitionAnimation'  // View change motions
  | 'LoopAnimation'        // Continuous repetition motions
  | 'InteractiveAnimation' // User-driven motions
  | 'MicroAnimation'       // Small detail motions
  | 'MacroAnimation';      // Large scale motions

// 10. INTERACTION TAXONOMY - Derived from engagement systems
export type InteractionTaxonomyType =
  | 'ClickInteraction'     // Pointer press engagements
  | 'HoverInteraction'     // Pointer proximity engagements
  | 'FocusInteraction'     // Attention direction engagements
  | 'DragInteraction'      // Element movement engagements
  | 'ScrollInteraction'    // View navigation engagements
  | 'KeyboardInteraction'  // Key press engagements
  | 'GestureInteraction'   // Physical motion engagements
  | 'VoiceInteraction'     // Speech command engagements
  | 'FormInteraction'      // Data input engagements
  | 'NavigationInteraction'; // Location change engagements

// 11. SYSTEM TAXONOMY - Derived from infrastructure organization
export type SystemTaxonomyType =
  | 'TypeSystem'           // Data structure definition systems
  | 'DesignSystem'         // Visual consistency systems
  | 'ComponentSystem'      // UI building block systems
  | 'StateSystem'          // Condition management systems
  | 'AnimationSystem'      // Motion coordination systems
  | 'ColorSystem'          // Visual harmony systems
  | 'LayoutSystem'         // Spatial organization systems
  | 'IconSystem'           // Symbol representation systems
  | 'ThemeSystem'          // Appearance consistency systems
  | 'UtilitySystem';       // Helper function systems

// 12. ARCHITECTURE TAXONOMY - Derived from structural design
export type ArchitectureTaxonomyType =
  | 'ComponentArchitecture' // UI structure design
  | 'StateArchitecture'     // Condition flow design
  | 'DataArchitecture'      // Information structure design
  | 'StylingArchitecture'   // Appearance system design
  | 'AnimationArchitecture' // Motion system design
  | 'SystemArchitecture'    // Infrastructure organization design
  | 'DomainArchitecture'    // Realm boundary design
  | 'IntegrationArchitecture' // System connection design
  | 'DeploymentArchitecture' // Runtime environment design
  | 'TestingArchitecture';  // Validation system design

  // 12. LAYOUT TAXONOMY
export type LayoutTaxonomyType = 
| 'GridLayout'
| 'FlexLayout' 
| 'StackLayout'
| 'AbsoluteLayout'
| 'ResponsiveLayout';

// 12. GRID TAXONOMY
export type GridTaxonomyType =
| 'StaticGrid'
| 'ResponsiveGrid'
| 'FluidGrid'
| 'CSSGrid'
| 'FlexGrid';

// 12. SPACING TAXONOMY
export type SpacingTaxonomyType =
| 'StandardSpacing'
| 'CompactSpacing'
| 'ComfortableSpacing'
| 'CosmicSpacing';

// 12. ALIGNMENT TAXONOMY
export type AlignmentTaxonomyType =
| 'StartAlignment'
| 'CenterAlignment'
| 'EndAlignment'
| 'StretchAlignment'
| 'SpaceBetweenAlignment';
// ============================================================================
// MASTER TAXONOMY TYPE WITH LINNAEAN INTEGRATION
// ============================================================================

export type TaxonomyType =
  | ComponentTaxonomyType
  | DomainTaxonomyType
  | EntityTaxonomyType
  | PatternTaxonomyType
  | StateTaxonomyType
  | RelationshipTaxonomyType
  | DataTaxonomyType
  | StylingTaxonomyType
  | AnimationTaxonomyType
  | InteractionTaxonomyType
  | SystemTaxonomyType
  | ArchitectureTaxonomyType
  | DigitalDomainType     
  | DigitalKingdomType     
  | DigitalPhylumType     
  | DigitalClassType      
  | DigitalOrderType       
  | DigitalFamilyType      
  | DigitalGenusType       
  | DigitalSpeciesType;   

// ============================================================================
// TAXONOMIC RELATIONSHIP MAPPING
// ============================================================================

export interface TaxonomicMapping {
  linnaeanSource: ClassificationPath;
  taxonomyTarget: TaxonomyType[];
  derivationMethod: 'direct' | 'extracted' | 'derived' | 'composed';
  confidence: number; // 0-1 scale
}

export type TaxonomyDerivationMap = Record<
  DigitalSpeciesType, 
  {
    componentTypes: ComponentTaxonomyType[];
    domainTypes: DomainTaxonomyType[];
    entityTypes: EntityTaxonomyType[];
    patternTypes: PatternTaxonomyType[];
  }
>;

// ============================================================================
// DERIVATION VALIDATION
// ============================================================================

export interface DerivationValidation {
  isValid: boolean;
  missingDerivations: string[];
  conflictingMappings: string[];
  suggestedFixes: string[];
}

export const validateTaxonomyDerivation = (
  linnaeanType: DigitalClassification,
  taxonomyTypes: TaxonomyType[]
): DerivationValidation => {
  const missing: string[] = [];
  const conflicts: string[] = [];
  const suggestions: string[] = [];

  // Validate domain mapping
  if (!taxonomyTypes.includes(linnaeanType.domain as DomainTaxonomyType)) {
    missing.push(`Domain: ${linnaeanType.domain}`);
    suggestions.push(`Add ${linnaeanType.domain} to DomainTaxonomyType`);
  }

  // Validate entity mapping for consciousness domains
  if (linnaeanType.domain === 'ConsciousnessDomain' && 
      !taxonomyTypes.some(t => t.includes('Entity'))) {
    missing.push('Consciousness entity mapping');
    suggestions.push('Add EntityTaxonomyType for consciousness entities');
  }

  return {
    isValid: missing.length === 0 && conflicts.length === 0,
    missingDerivations: missing,
    conflictingMappings: conflicts,
    suggestedFixes: suggestions
  };
};