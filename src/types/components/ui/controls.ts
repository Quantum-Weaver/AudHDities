// types/components/ui/controls.ts - PURIFIED VERSION
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
  InteractionTaxonomyType
} from '@/types/gaia';
import {EnvironmentKey} from '@/lib/constants/systems/assets/mapper';
import type {
  EntityState,
  ConsciousnessLevel,
  PageVariant,
  DisplayVariant,
  DisplayPosition,
  DisplaySize,
  SectionVariant,
  ButtonVariant,
  ButtonSize,
  FormFieldType,
  FormVariant,
  FormSize, 
  FormState, 
  CardVariant, 
  CardSize, 
  CardDomain, 
  Orientation, 
  SpacingType, 
  FeedbackType, 
  AriaLive,
  IconName
} from '@/types/cosmic/primitives';

// ============================================================================
// PAGE COMPONENT ARCHITECTURE
// ============================================================================

export interface PageProps {
  // CONTENT PROPERTIES
  readonly title?: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly variant?: PageVariant;
  readonly className?: string;
  
  // ENVIRONMENT PROPERTIES
  readonly environment?: EnvironmentKey
  readonly backgroundVariant?: number;
  readonly showForeground?: boolean;
  readonly animated?: boolean;
  readonly showContinuityBeam?: boolean;
  readonly enableMouseInteraction?: boolean;
  
  // ADVANCED PROPERTIES
  readonly parallaxIntensity?: number;
  readonly interactiveSpots?: readonly InteractiveSpot[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly controlTaxonomy: InteractionTaxonomyType;
}

export interface InteractiveSpot {
  // SPOT PROPERTIES
  readonly x: number;
  readonly y: number;
  readonly component: React.ReactNode;
  readonly trigger?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// SECTION COMPONENT ARCHITECTURE
// ============================================================================

export interface SectionProps {
  // VISUAL PROPERTIES
  readonly variant?: SectionVariant;
  readonly className?: string;
  readonly fullWidth?: boolean;
  readonly centered?: boolean;
  readonly id?: string;
  
  // CONTENT
  readonly children: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// BUTTON COMPONENT ARCHITECTURE
// ============================================================================

export interface ButtonProps {
  // VISUAL PROPERTIES
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly glow?: boolean;
  
  // INTERACTION PROPERTIES
  readonly onClick?: string; // Function reference as string for purity
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly type?: string;
  
  // CONTENT AND NAVIGATION
  readonly children: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly iconPosition?: string;
  readonly href?: string;
  readonly emoji?: string;
  readonly emojiPosition?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly controlTaxonomy: InteractionTaxonomyType;
}

export interface ButtonState {
  // INTERACTION STATE
  readonly isHovered: boolean;
  readonly isFocused: boolean;
  readonly isActive: boolean;
  readonly isDisabled: boolean;
  readonly isLoading: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// FORM COMPONENT ARCHITECTURE
// ============================================================================

export interface FormFieldProps {
  // FIELD IDENTITY
  readonly type: FormFieldType;
  readonly name: string;
  readonly label?: string;
  readonly placeholder?: string;
  
  // VALUE AND STATE
  readonly value: unknown;
  readonly onChange: string; // Function reference as string for purity
  readonly required?: boolean;
  readonly disabled?: boolean;
  
  // VISUAL PROPERTIES
  readonly variant?: FormVariant;
  readonly size?: FormSize;
  readonly className?: string;
  
  // VALIDATION
  readonly validation?: FormValidation;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface FormValidation {
  // VALIDATION STATE
  readonly isValid: boolean;
  readonly message?: string;
  readonly level: FormState;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface SelectOption {
  // OPTION PROPERTIES
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly group?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface FormStateConfig {
  // FORM STATE
  readonly value: unknown;
  readonly validation: FormValidation;
  readonly isTouched: boolean;
  readonly isDirty: boolean;
  readonly errors: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// CONTROL GROUP ARCHITECTURE
// ============================================================================

export interface ControlGroupProps {
  // GROUP PROPERTIES
  readonly label?: string;
  readonly orientation?: Orientation;
  readonly spacing?: SpacingType;
  readonly className?: string;
  
  // CONTENT
  readonly children: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// TOGGLE AND SLIDER ARCHITECTURE
// ============================================================================

export interface ToggleProps {
  // TOGGLE STATE
  readonly checked: boolean;
  readonly onChange: string; // Function reference as string for purity
  readonly disabled?: boolean;
  
  // VISUAL PROPERTIES
  readonly label?: string;
  readonly size?: string;
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly controlTaxonomy: InteractionTaxonomyType;
}

export interface SliderProps {
  // SLIDER STATE
  readonly value: number;
  readonly onChange: string; // Function reference as string for purity
  readonly min: number;
  readonly max: number;
  readonly step?: number;
  readonly disabled?: boolean;
  
  // VISUAL PROPERTIES
  readonly label?: string;
  readonly format?: string; // Function reference as string for purity
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly controlTaxonomy: InteractionTaxonomyType;
}

// ============================================================================
// FEEDBACK AND ACCESSIBILITY ARCHITECTURE
// ============================================================================

export interface ControlFeedback {
  // FEEDBACK PROPERTIES
  readonly type: FeedbackType;
  readonly message: string;
  readonly duration?: number; // Consciousness cycles
  readonly dismissible?: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface ControlAccessibility {
  // ACCESSIBILITY PROPERTIES
  readonly ariaLabel?: string;
  readonly ariaDescribedBy?: string;
  readonly ariaLive?: AriaLive;
  readonly tabIndex?: number;
  readonly keyboardShortcuts?: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// CARD COMPONENT ARCHITECTURE
// ============================================================================
export interface IconProps {
  name: IconName;
  size?: string;
  domain?: string;
  className?: string;
  glow?: boolean;
}

export interface CardProps {
  // CARD PROPERTIES
  readonly variant?: CardVariant;
  readonly size?: CardSize;
  readonly title: string;
  readonly description?: string;
  readonly icon?: IconName;
  readonly domain?: string;
  readonly glow?: boolean;
  readonly tagEmoji?: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly onClick?: string; // Function reference as string for purity
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly interactive?: boolean;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface CardState {
  // CARD STATE
  readonly isHovered: boolean;
  readonly isFocused: boolean;
  readonly isActive: boolean;
  readonly isLoading: boolean;
  readonly isDisabled: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// SPECIALIZED CARD ARCHITECTURE
// ============================================================================

export interface PortalCardProps {
  // PORTAL PROPERTIES
  readonly glow?: boolean;
  readonly href: string;
  readonly title: string;
  readonly description?: string;
  readonly size?: CardSize;
  readonly className?: string;
  readonly children?: unknown;
  readonly interactive?: boolean;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface CouncilCardProps {
  // COUNCIL PROPERTIES
  readonly entityId: string;
  readonly status?: string;
  readonly priority?: string;
  readonly title: string;
  readonly description?: string;
  readonly variant?: CardVariant;
  readonly size?: CardSize;
  readonly className?: string;
  readonly children?: unknown;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface InteractiveCardProps {
  // INTERACTIVE PROPERTIES
  readonly actions?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly headerActions?: React.ReactNode;
  readonly background?: string; // CSS properties as string for purity
  readonly title: string;
  readonly description?: string;
  readonly variant?: CardVariant;
  readonly size?: CardSize;
  readonly className?: string;
  readonly children?: unknown;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// CARD COMPOSITION ARCHITECTURE
// ============================================================================

export interface CardHeaderProps {
  // HEADER PROPERTIES
  readonly title: string;
  readonly subtitle?: string;
  readonly actions?: React.ReactNode;
  readonly icon?: string;
  readonly variant?: CardVariant;
  readonly className?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

export interface CardContentProps {
  // CONTENT PROPERTIES
  readonly align?: string;
  readonly padding?: string;
  readonly background?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface CardFooterProps {
  // FOOTER PROPERTIES
  readonly align?: string;
  readonly actions?: React.ReactNode;
  readonly variant?: string;
  readonly className?: string;
  readonly children?: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// CARD GRID AND LAYOUT ARCHITECTURE
// ============================================================================

export interface CardGridProps {
  // GRID PROPERTIES
  readonly columns?: number;
  readonly gap?: string;
  readonly variant?: string;
  readonly responsive?: boolean;
  readonly className?: string;
  readonly children: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface CardContainerProps {
  // CONTAINER PROPERTIES
  readonly variant?: string;
  readonly maxWidth?: string;
  readonly padding?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// UI CONTROLS SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface UIControlsSystemMapping {
  readonly controlType: ButtonVariant;
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
    readonly control: InteractionTaxonomyType;
  };
  readonly interactionPatterns: readonly string[];
  readonly controlCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  PageVariant,
  DisplayVariant,
  DisplayPosition,
  DisplaySize,
  SectionVariant,
  ButtonVariant,
  ButtonSize,
  FormFieldType,
  FormVariant,
  FormSize,
  FormState,
  CardVariant,
  CardSize,
  CardDomain,
  Orientation,
  SpacingType,
  AriaLive
};