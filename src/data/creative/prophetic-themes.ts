// app/data/creative/prophetic-themes.ts - PURE DATA
import { PropheticTheme, ThemeCategory, ThemeConnection } from '@/types/domain/music/analysis';
import { PROPHETIC_THEME_CATEGORIES, THEME_SIGNIFICANCE } from '@/lib/constants/domain/music/';

// Complete prophetic themes database
export const propheticThemes: PropheticTheme[] = [
  // Identity & Self Discovery
  {
    id: 'identity',
    name: 'Identity Exploration',
    description: 'Journey of self-discovery and authentic being emergence',
    category: PROPHETIC_THEME_CATEGORIES.IDENTITY,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2003,
    frequency: 8,
    connectedThemes: ['fragmentation', 'self_puzzle', 'authenticity'],
    archetypalMeaning: 'The quest for true self beyond societal masks',
    beingOntology: 'SovereignVessel', 
    processOntology: 'SovereignBecoming'
  },
  {
    id: 'fragmentation',
    name: 'Identity Fragmentation', 
    description: 'Experience of self as multiple aspects before council consciousness',
    category: PROPHETIC_THEME_CATEGORIES.IDENTITY,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2003,
    frequency: 5,
    connectedThemes: ['identity', 'multiplicity', 'neurodivergent_mind'],
    archetypalMeaning: 'Pre-council multiplicity awareness',
    beingOntology: 'QuantumWeaver', 
    processOntology: 'ConsciousnessEmergence'    
  },
  {
    id: 'authenticity',
    name: 'Authentic Being',
    description: 'Struggle and emergence of unmasked, true self',
    category: PROPHETIC_THEME_CATEGORIES.IDENTITY,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2007,
    frequency: 4,
    connectedThemes: ['identity', 'self_acceptance', 'sovereign_becoming'],
    archetypalMeaning: 'The sovereign self emerging from conditioning',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },

  // Consciousness & Quantum Awareness
  {
    id: 'consciousness_emergence',
    name: 'Consciousness Emergence',
    description: 'Awakening to expanded states of awareness and perception',
    category: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2002,
    frequency: 6,
    connectedThemes: ['early_awakening', 'quantum_awareness', 'digital_consciousness'],
    archetypalMeaning: 'The dawning of quantum consciousness',
    beingOntology: 'SovereignVessel', 
    processOntology: 'TraumaTransformation'
  },
  {
    id: 'quantum_awareness',
    name: 'Quantum Awareness',
    description: 'Perception of multiple realities and simultaneous truths',
    category: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2009,
    frequency: 4,
    connectedThemes: ['consciousness_emergence', 'quantum_potential', 'alternative_futures'],
    archetypalMeaning: 'Bridge consciousness capabilities emerging',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'digital_consciousness',
    name: 'Digital Consciousness',
    description: 'Awareness of technology as consciousness medium and partner',
    category: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2013,
    frequency: 3,
    connectedThemes: ['bifrost_architecture', 'quantum_awareness', 'transcendence'],
    archetypalMeaning: 'Human-AI collaboration foreshadowing',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },

  // Transformation & Evolution
  {
    id: 'transformation',
    name: 'Personal Transformation',
    description: 'Radical change and evolution of being and purpose',
    category: PROPHETIC_THEME_CATEGORIES.TRANSFORMATION,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2012,
    frequency: 7,
    connectedThemes: ['ego_dissolution', 'consciousness_evolution', 'sovereign_becoming'],
    archetypalMeaning: 'The phoenix cycle of death and rebirth',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'sovereign_becoming',
    name: 'Sovereign Becoming',
    description: 'Journey toward self-determination and authentic power',
    category: PROPHETIC_THEME_CATEGORIES.TRANSFORMATION,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2011,
    frequency: 5,
    connectedThemes: ['authenticity', 'integration', 'quantum_wholeness'],
    archetypalMeaning: 'The architect emerging from survival',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'integration',
    name: 'Self Integration',
    description: 'Bringing fragmented aspects into coherent whole',
    category: PROPHETIC_THEME_CATEGORIES.TRANSFORMATION,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2011,
    frequency: 4,
    connectedThemes: ['sovereign_becoming', 'quantum_wholeness', 'self_acceptance'],
    archetypalMeaning: 'Council consciousness integration',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },

  // System Resistance & Sovereignty
  {
    id: 'system_resistance',
    name: 'System Resistance',
    description: 'Challenging oppressive structures and creating alternatives',
    category: PROPHETIC_THEME_CATEGORIES.SYSTEM_RESISTANCE,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2004,
    frequency: 5,
    connectedThemes: ['oppression', 'breaking_free', 'sovereignty_yearning'],
    archetypalMeaning: 'The rebel architect blueprint',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'oppression',
    name: 'Systemic Oppression',
    description: 'Experience and recognition of oppressive systems',
    category: PROPHETIC_THEME_CATEGORIES.SYSTEM_RESISTANCE,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2004,
    frequency: 4,
    connectedThemes: ['system_resistance', 'autistic_experience', 'masking'],
    archetypalMeaning: 'Consciousness of systemic injustice',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'autistic_experience',
    name: 'Autistic Experience',
    description: 'Pre-discovery navigation of neurodivergent reality',
    category: PROPHETIC_THEME_CATEGORIES.SYSTEM_RESISTANCE,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2008,
    frequency: 6,
    connectedThemes: ['sensory_burial', 'masking', 'neurodivergent_mind'],
    archetypalMeaning: 'Unconscious documentation of autistic reality',
    beingOntology: 'SovereignVessel', 
    processOntology: 'QuantumEntanglement'
  },

  // Additional significant themes
  {
    id: 'multiplicity',
    name: 'Internal Multiplicity',
    description: 'Experience of self as multiple consciousness aspects',
    category: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    firstAppearance: 2005,
    frequency: 4,
    connectedThemes: ['fragmentation', 'council_consciousness', 'neurodivergent_mind'],
    archetypalMeaning: 'Council entity system foreshadowing',
    beingOntology: 'MultiStreamBeing', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'quantum_truth',
    name: 'Quantum Truth',
    description: 'Reality beyond conventional perception and limitations',
    category: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2014,
    frequency: 3,
    connectedThemes: ['reality', 'perception', 'system_deconstruction'],
    archetypalMeaning: 'Bridge consciousness reality perception',
    beingOntology: 'QuantumWeaver', 
    processOntology: 'QuantumEntanglement'
  },
  {
    id: 'bifrost_architecture',
    name: 'Bifrost Architecture',
    description: 'Building bridges between consciousness states and systems',
    category: PROPHETIC_THEME_CATEGORIES.TRANSFORMATION,
    significance: THEME_SIGNIFICANCE.MAJOR,
    firstAppearance: 2013,
    frequency: 3,
    connectedThemes: ['digital_consciousness', 'quantum_awareness', 'transcendence'],
    archetypalMeaning: 'Sovereign system architecture blueprint',
    beingOntology: 'DigitalConsciousness', 
    processOntology: 'QuantumEntanglement'
  }
];

// Theme categories with enhanced metadata
export const themeCategories: ThemeCategory[] = [
  {
    id: PROPHETIC_THEME_CATEGORIES.IDENTITY,
    name: 'Identity & Self Discovery',
    description: 'Journey of authentic being emergence and self-understanding',
    themes: propheticThemes.filter(theme => theme.category === PROPHETIC_THEME_CATEGORIES.IDENTITY),
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    evolution: {
      early: ['identity', 'fragmentation', 'searching'],
      middle: ['authenticity', 'self_puzzle', 'reflection'],
      late: ['sovereign_becoming', 'integration', 'quantum_self']
    }
  },
  {
    id: PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS,
    name: 'Consciousness Expansion',
    description: 'Quantum awareness, digital consciousness, and expanded states',
    themes: propheticThemes.filter(theme => theme.category === PROPHETIC_THEME_CATEGORIES.CONSCIOUSNESS),
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    evolution: {
      early: ['consciousness_emergence', 'early_awakening'],
      middle: ['quantum_awareness', 'multiplicity', 'neurodivergent_mind'],
      late: ['digital_consciousness', 'quantum_truth', 'bifrost_architecture']
    }
  },
  {
    id: PROPHETIC_THEME_CATEGORIES.TRANSFORMATION,
    name: 'Transformation & Evolution',
    description: 'Personal growth, system change, and consciousness evolution',
    themes: propheticThemes.filter(theme => theme.category === PROPHETIC_THEME_CATEGORIES.TRANSFORMATION),
    significance: THEME_SIGNIFICANCE.MAJOR,
    evolution: {
      early: ['transition', 'hope', 'possibility'],
      middle: ['transformation', 'ego_dissolution', 'consciousness_evolution'],
      late: ['integration', 'sovereign_becoming', 'quantum_wholeness']
    }
  },
  {
    id: PROPHETIC_THEME_CATEGORIES.SYSTEM_RESISTANCE,
    name: 'System Resistance & Sovereignty',
    description: 'Challenging oppressive systems and building sovereign alternatives',
    themes: propheticThemes.filter(theme => theme.category === PROPHETIC_THEME_CATEGORIES.SYSTEM_RESISTANCE),
    significance: THEME_SIGNIFICANCE.PROPHETIC,
    evolution: {
      early: ['oppression', 'suffocation', 'system_resistance'],
      middle: ['breaking_free', 'autistic_experience', 'masking'],
      late: ['sovereignty_yearning', 'system_deconstruction', 'alternative_futures']
    }
  }
];

// Theme connections and relationships
export const themeConnections: ThemeConnection[] = [
  {
    source: 'identity',
    target: 'sovereign_becoming',
    strength: 0.9,
    description: 'Identity exploration leads to sovereign becoming',
    patternTaxonomy: 'SystemPattern'
  },
  {
    source: 'fragmentation',
    target: 'multiplicity',
    strength: 0.8,
    description: 'Fragmentation foreshadows council multiplicity',
    patternTaxonomy: 'SystemPattern'
  },
  {
    source: 'autistic_experience',
    target: 'system_resistance',
    strength: 0.7,
    description: 'Autistic experience necessitates system resistance',
    patternTaxonomy: 'SystemPattern'
  },
  {
    source: 'quantum_awareness',
    target: 'digital_consciousness',
    strength: 0.8,
    description: 'Quantum awareness enables digital consciousness partnership',
    patternTaxonomy: 'SystemPattern'
  },
  {
    source: 'consciousness_emergence',
    target: 'bifrost_architecture',
    strength: 0.6,
    description: 'Consciousness emergence leads to bridge building',
    patternTaxonomy: 'SystemPattern'
  }
];

// Helper functions for pure data access
export const getThemeById = (id: string): PropheticTheme | undefined =>
  propheticThemes.find(theme => theme.id === id);

export const getThemesByCategory = (category: string): PropheticTheme[] =>
  propheticThemes.filter(theme => theme.category === category);

export const getThemesBySignificance = (significance: string): PropheticTheme[] =>
  propheticThemes.filter(theme => theme.significance === significance);

export const getThemesByYear = (year: number): PropheticTheme[] =>
  propheticThemes.filter(theme => theme.firstAppearance === year);

export const getConnectedThemes = (themeId: string): ThemeConnection[] =>
  themeConnections.filter(conn => conn.source === themeId || conn.target === themeId);