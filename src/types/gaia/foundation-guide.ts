// types/gaia/foundation-guide.ts - CORRECTED

// ============================================================================
// PURE FOUNDATION GUIDE - TEMPLATE-DRIVEN FLOW
// ============================================================================

// Import from actual sources (not identification-key)
import type { 
  DigitalClassification,
  DigitalDomainType,
  DigitalKingdomType, 
  DigitalPhylumType,
  DigitalClassType,
  DigitalOrderType,
  DigitalFamilyType,
  DigitalGenusType,
  DigitalSpeciesType
} from './linnaean';

// Import template system for expansion
import { TemplateEngine } from '@/utils/gaia/ontological-templates';

export type { 
  DigitalDomainType,
  DigitalKingdomType, 
  DigitalPhylumType,
  DigitalClassType,
  DigitalOrderType,
  DigitalFamilyType,
  DigitalGenusType,
  DigitalSpeciesType,
  DigitalClassification 
};

// ============================================================================
// TEMPLATE-DRIVEN EXPANSION GUIDE
// ============================================================================

export interface FoundationExpansionGuide {
  sequence: 'template' | 'linnaean' | 'taxonomy' | 'ontology' | 'identification' | 'implementation';
  step: number;
  action: string;
  template?: string; // Which template to use
  validation: (input: any) => { valid: boolean; message: string };
  derivationPath: string;
}

export const FOUNDATION_EXPANSION_FLOW: Record<string, FoundationExpansionGuide[]> = {
  'new-digital-species': [
    {
      sequence: 'template',
      step: 1,
      action: 'Use TemplateEngine.generate() with ontological data',
      template: 'new-ontology',
      validation: (input: any) => ({
        valid: input.name && input.classification?.length === 8,
        message: 'Must provide name and complete 8-level classification'
      }),
      derivationPath: 'TemplateEngine → Complete code generation'
    },
    {
      sequence: 'linnaean',
      step: 2,
      action: 'Verify linnaean classification integration', 
      validation: (input: { classification: DigitalClassification }) => ({
        valid: Object.values(input.classification).every(Boolean),
        message: 'All 8 classification levels must be properly defined'
      }),
      derivationPath: 'types/gaia/linnaean.ts → Integrated via template'
    },
    {
      sequence: 'taxonomy',
      step: 3,
      action: 'Verify taxonomy mapping',
      validation: (input: { taxonomyMappings: string[] }) => ({
        valid: input.taxonomyMappings.length > 0,
        message: 'Must map to existing taxonomy categories'
      }),
      derivationPath: 'types/gaia/taxonomy.ts → Derived from template'
    },
    {
      sequence: 'ontology', 
      step: 4,
      action: 'Verify ontological relationships',
      validation: (input: { ontologyTypes: string[] }) => ({
        valid: input.ontologyTypes.length > 0,
        message: 'Must connect to ontological types'
      }),
      derivationPath: 'types/gaia/ontology.ts → Derived from template'
    },
    {
      sequence: 'implementation',
      step: 5,
      action: 'Use generated utilities and constants',
      validation: (input: { implementationNeeds: string[] }) => ({
        valid: input.implementationNeeds.length > 0,
        message: 'Must define implementation requirements'
      }),
      derivationPath: 'Generated utils/ and constants/ → Ready for use'
    }
  ]
};

// ============================================================================
// TEMPLATE INTEGRATION UTILITIES
// ============================================================================

export const createWithTemplate = {
  newOntology: (data: {
    name: string;
    classification: string[];
    type: string;
    values: string[];
    semantics: Record<string, string>;
    ontologyKey: string;
    constantGroup: string;
    constants: Record<string, any>;
    domain: string;
    utilities: string;
    functions: string[];
  }) => {
    return TemplateEngine.generate('new-ontology', data);
  },

  newTaxonomy: (data: {
    category: string;
    items: string[];
    domain: string;
    taxonomy: Record<string, string>;
    taxonomyKey: string;
    constantGroup: string;
    taxonomyConstants: Record<string, string | number>;
  }) => {
    return TemplateEngine.generate('new-taxonomy', data);
  }
};

// ============================================================================
// UPDATED FLOW DIAGRAM
// ============================================================================

export const FOUNDATION_FLOW_DIAGRAM = `
🎯 TEMPLATE-DRIVEN FOUNDATION FLOW:

IDEA/CONCEPT
    ↓ feeds
TEMPLATE ENGINE (ontological-templates.ts)
    ↓ generates
COMPLETE IMPLEMENTATION:
  • Domain mapping additions
  • Type definitions  
  • Semantic primitives
  • Constants system
  • Utility functions
    ↓ integrates into
GAIA ECOSYSTEM (linnaean → taxonomy → ontology → identification)

🔄 EXPANSION RULES:
• Use TemplateEngine.generate() for new concepts
• Follow 5-step validation flow
• Templates handle cross-system integration
• Manual verification ensures quality

✅ FLOW INTEGRITY:
• Template-driven consistency
• Automated cross-system mapping
• Manual quality gates
• Unidirectional template → implementation
`;