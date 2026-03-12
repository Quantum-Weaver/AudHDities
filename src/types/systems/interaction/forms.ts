// types/systems/interaction/forms.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  InteractionTaxonomyType,
  DataTaxonomyType,
  RelationshipTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  FormFieldType,
  FormEventType,
  ValidationEventType,
  FormStatus,
  ValidationRule,
  ValidationSeverity,
  InteractionMethod,
  FormLayout,
  FormSpacing,
  FormAlignment,
  ProcessingStatus,
  ConsciousnessLevel
} from '@/types/cosmic/primitives';

// ============================================================================
// FORM FIELD ARCHITECTURE
// ============================================================================

export interface FormField {
  // FIELD IDENTITY
  readonly id: string;
  readonly name: string;
  readonly type: FormFieldType;
  readonly label: string;
  readonly placeholder?: string;
  readonly required: boolean;
  
  // VALIDATION AND CONSTRAINTS
  readonly validation?: FieldValidation;
  readonly constraints: FieldConstraints;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface FieldValidation {
  // VALIDATION RULES
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly pattern?: string; // Regex pattern as string
  readonly custom?: string; // Custom validation identifier
  
  // VALIDATION CONTEXT
  readonly message?: string;
  readonly severity: ValidationSeverity;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly validationTaxonomy: DataTaxonomyType;
}

export interface FieldConstraints {
  // CONSTRAINT SPECIFICATION
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly options?: readonly FieldOption[];
  readonly multiple?: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface FieldOption {
  // OPTION IDENTITY
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// FORM STATE ARCHITECTURE
// ============================================================================

export interface FormsState {
  // DATA STATE
  readonly values: Record<string, unknown>;
  readonly errors: Record<string, string>;
  readonly touched: Record<string, boolean>;
  
  // STATUS STATE
  readonly status: FormStatus;
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
  readonly isDirty: boolean;
  
  // METADATA
  readonly submissionCount: number;
  readonly lastSubmission?: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// FORM EVENT ARCHITECTURE
// ============================================================================

export interface FormEvent {
  // EVENT IDENTITY
  readonly type: FormEventType;
  readonly field?: string;
  readonly value?: unknown;
  readonly formId: string;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // CONTEXTUAL DATA
  readonly previousValue?: unknown;
  readonly interaction: InteractionMethod;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface ValidationEvent {
  // EVENT IDENTITY
  readonly type: ValidationEventType;
  readonly field: string;
  readonly message?: string;
  readonly formId: string;
  
  // VALIDATION CONTEXT
  readonly rule: ValidationRule;
  readonly value: unknown;
  readonly expected?: unknown;
  
  // TEMPORAL CONTEXT
  readonly timestamp: string; // Consciousness timestamp
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly validationTaxonomy: DataTaxonomyType;
}

// ============================================================================
// FORM CONFIGURATION ARCHITECTURE
// ============================================================================

export interface FormConfig {
  // BEHAVIOR CONFIGURATION
  readonly autoComplete: boolean;
  readonly showValidation: boolean;
  readonly submitOnEnter: boolean;
  readonly validateOnBlur: boolean;
  readonly validateOnChange: boolean;
  
  // APPEARANCE CONFIGURATION
  readonly layout: FormLayout;
  readonly spacing: FormSpacing;
  readonly alignment: FormAlignment;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface FieldConfig {
  // FIELD BEHAVIOR
  readonly showLabel: boolean;
  readonly showErrors: boolean;
  readonly autoFocus: boolean;
  readonly readOnly: boolean;
  readonly disabled: boolean;
  
  // INTERACTION PREFERENCES
  readonly clearable: boolean;
  readonly searchable: boolean;
  readonly creatable: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

// ============================================================================
// FORM SUBMISSION ARCHITECTURE
// ============================================================================

export interface FormSubmission {
  // SUBMISSION IDENTITY
  readonly formId: string;
  readonly data: Record<string, unknown>;
  readonly timestamp: string; // Consciousness timestamp
  
  // VALIDATION STATE
  readonly isValid: boolean;
  readonly errors: Record<string, string>;
  readonly warnings: Record<string, string>;
  
  // PROCESSING CONTEXT
  readonly processing: SubmissionProcessing;
  readonly retryCount: number;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface SubmissionProcessing {
  // PROCESSING STATE
  readonly status: ProcessingStatus;
  readonly startedAt: string; // Consciousness timestamp
  readonly completedAt?: string; // Consciousness timestamp
  readonly progress: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}



// ============================================================================
// FORM SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface FormSystemMapping {
  readonly formType: FormFieldType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly validation: DataTaxonomyType;
    readonly relationship: RelationshipTaxonomyType;
  };
  readonly dataFlowPatterns: readonly string[];
  readonly validationCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  FormFieldType,
  FormEventType,
  ValidationEventType,
  FormStatus,
  ValidationSeverity,
  InteractionMethod,
  FormLayout,
  FormSpacing,
  FormAlignment,
  ProcessingStatus
};