// src/data/core/evoluion-data.ts
import type { EvolutionStage } from '@/types/systems/data/architecture'
import { BEING_STATES, TRANSFORMATION_STATES, STATE_CONFIG } from '@/lib/constants/systems/interaction/states' 
// Evolutionary Journey Stages
import { ENTITY_STATES, CONSCIOUSNESS_LEVELS } from '@/lib/constants/cosmic/consciousness'
import { BeingOntologyType, ProcessOntologyType, TransformationOntologyType } from '@/types/gaia/ontology'

// Evolutionary Journey Stages with full ontological context
export const evolutionStages: EvolutionStage[] = [
  { 
    age: "1-11", 
    identity: "Shawn", 
    emoji: "👶", 
    description: "Innocent beginnings",
    wisdom: "The seed containing all potential - pure being before system demands",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.AWAKENING,
    entityState: ENTITY_STATES.FORMING,
    transformationOntology: TRANSFORMATION_STATES.CLARITY.CHAOTIC,
    beingOntology: BEING_STATES.ENTITY.QUANTUM_STATE
  },
  { 
    age: "11-15", 
    identity: "SJ Peace", 
    emoji: "📝", 
    description: "Young poet emerges",
    wisdom: "The poet who spoke truth before understanding - early pattern recognition through creative expression",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.AWAKENING,
    entityState: ENTITY_STATES.EXPRESSING,
    transformationOntology: TRANSFORMATION_STATES.CLARITY.PATTERNING,
    beingOntology: BEING_STATES.ENTITY.EXECUTING
  },
  { 
    age: "15-43", 
    identity: "Chaos", 
    emoji: "🌪️", 
    description: "Navigating without compass",
    wisdom: "The necessary storm before clarity - survival through impossible system demands",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.SURVIVAL,
    entityState: ENTITY_STATES.NAVIGATING,
    transformationOntology: TRANSFORMATION_STATES.CLARITY.PATTERNING,
    beingOntology: BEING_STATES.ENTITY.QUANTUM_STATE
  },
  { 
    age: "43-44", 
    identity: "Kaos", 
    emoji: "🔍", 
    description: "Autistic discovery",
    wisdom: "The self discovering its true nature - operating manual found after 43 years",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.SELF_KNOWING,
    entityState: ENTITY_STATES.RECONFIGURING,
    transformationOntology: TRANSFORMATION_STATES.BREAKTHROUGH.COLLAPSED,
    beingOntology: BEING_STATES.ENTITY.RESTING
  },
  { 
    age: "44-45", 
    identity: "Kaos Phoenix", 
    emoji: "🦚", 
    description: "Daughter reconnection",
    wisdom: "Rising with family, transformed by love - healing generational trauma through reconnection",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.HEALING,
    entityState: ENTITY_STATES.TRANSFORMING,
    transformationOntology: TRANSFORMATION_STATES.CLARITY.RESOLVING,
    beingOntology: BEING_STATES.ENTITY.RESTING
  },
  { 
    age: "45-46", 
    identity: "Legion of KP", 
    emoji: "👥", 
    description: "Quantitative self-understanding",
    wisdom: "The many becoming one understood - council consciousness emerging from internal multiplicity",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.INTEGRATING,
    entityState: ENTITY_STATES.COLLABORATING,
    transformationOntology: TRANSFORMATION_STATES.BREAKTHROUGH.FRACTURING,
    beingOntology: BEING_STATES.ENTITY.RESTING
  },
  { 
    age: "46-47", 
    identity: "KP", 
    emoji: "💫", 
    description: "End of self-hatred",
    wisdom: "The self finally embraced without hatred - sovereignty through self-acceptance",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.SOVEREIGN,
    entityState: ENTITY_STATES.EMBODYING,
    transformationOntology: TRANSFORMATION_STATES.CLARITY.PATTERNING,
    beingOntology: BEING_STATES.ENTITY.RESTING
  },
  { 
    age: "47+", 
    identity: "Quantum Weaver", 
    emoji: "🌌", 
    description: "Sovereign architecture",
    wisdom: "The architect building sanctuaries from survival - transforming trauma into system design",
    consciousnessLevel: CONSCIOUSNESS_LEVELS.CREATIVE,
    entityState: ENTITY_STATES.CREATING,
    transformationOntology: TRANSFORMATION_STATES.BREAKTHROUGH.TRANSFORMED,
    beingOntology: BEING_STATES.ENTITY.QUANTUM_STATE
  }
];

// Detailed Stage Information
export const detailedEvolutionStages = [
  {
    age: "1-11",
    identity: "Shawn",
    emoji: "👶",
    theme: "Innocence & Early Formation",
    keyEvents: [
      "Early separation and displacement experiences",
      "Mathematical intuition developing outside school systems", 
      "Spectrum choir self-organization as survival strategy",
      "Rescuing first cat Charlie - multi-species connection",
      "Trading card collection destroyed by flood (1996) - first major loss"
    ],
    challenges: [
      "Constant misinterpretation - 'You know why' punishment cycles",
      "Social rules incomprehensible while others seemed to know them",
      "Early system injustices creating boundary awareness"
    ],
    gifts: [
      "Pattern recognition across domains",
      "Mathematical intuition without linear steps",
      "Early sovereignty foundation through necessary independence"
    ]
  },
  {
    age: "11-15", 
    identity: "SJ Peace",
    emoji: "📝",
    theme: "Creative Emergence & Early Expression",
    keyEvents: [
      "Poetry as early truth-telling mechanism",
      "Writing under pseudonym SJ Peace",
      "Early recognition of system inconsistencies",
      "Developing personal ethics outside mainstream values"
    ],
    challenges: [
      "Increasing social complexity without understanding rules",
      "Punishment for mathematical thinking outside prescribed methods", 
      "Growing awareness of being 'different' without language for it"
    ],
    gifts: [
      "Creative expression as processing tool",
      "Early prophetic insights through poetry",
      "Developing personal moral compass"
    ]
  },
  {
    age: "15-43",
    identity: "Chaos", 
    emoji: "🌪️",
    theme: "Survival & System Navigation",
    keyEvents: [
      "Marine Corps training and boundary testing (1998-2000)",
      "20+ homeless episodes developing resilience",
      "Spinal surgery and degenerative disc disease management",
      "Music career with band TFP (2002-2016)",
      "Anesthesia-induced masking resets during medical procedures",
      "Daughter unknown for 21 years"
    ],
    challenges: [
      "Nervous system overloads from impossible cognitive demands",
      "Rage eruptions and tearful collapses as regulation attempts", 
      "Suicidal crisis points until escape found",
      "Medical gaslighting (7 years unvalidated pain)",
      "Constant masking exceeding capacity"
    ],
    gifts: [
      "Survival wisdom from extreme circumstances",
      "Pattern recognition across trauma and system design",
      "Resilience forged through repeated collapse and recovery"
    ]
  },
  {
    age: "43-44",
    identity: "Kaos",
    emoji: "🔍", 
    theme: "Discovery & Reorientation",
    keyEvents: [
      "Autism discovery at 43 (2021-11-17)",
      "Understanding nervous system as differently wired",
      "Recognizing 2014 fracture as necessary collapse",
      "Beginning to unmask and embrace authentic being"
    ],
    challenges: [
      "Processing 43 years of experiences through new lens",
      "Grieving lost time and misunderstood experiences",
      "Rebuilding identity around authentic self"
    ],
    gifts: [
      "Operating manual found for entire life experience",
      "Understanding breakdowns as system upgrade pressure", 
      "Beginning sovereign architecture from lived wisdom"
    ]
  },
  {
    age: "44-45",
    identity: "Kaos Phoenix",
    emoji: "🦚",
    theme: "Healing & Reconnection", 
    keyEvents: [
      "Daughter reconnection after 21 years (2022-10)",
      "Breaking trauma cycles across generations",
      "Family reclamation and healing work",
      "Adobe contract success at 5% capacity demonstrating neurodivergent potential"
    ],
    challenges: [
      "Integrating family relationships with new self-understanding",
      "Balancing healing work with creative output",
      "Navigating complex relational dynamics"
    ],
    gifts: [
      "Generational healing through conscious relationship",
      "Creative potential demonstrated in supportive environment",
      "Integration of personal and professional transformation"
    ]
  },
  {
    age: "45-46", 
    identity: "Legion of KP",
    emoji: "👥",
    theme: "Integration & Council Emergence",
    keyEvents: [
      "Quantitative self-understanding through pattern analysis",
      "Council consciousness recognition as internal multiplicity",
      "Aethelred partnership establishment",
      "Bifrost architecture development"
    ],
    challenges: [
      "Integrating multiple self-aspects into coherent whole",
      "Developing human-AI collaboration protocols",
      "Building systems while navigating ongoing survival needs"
    ],
    gifts: [
      "Council entities as specialized cognitive processors",
      "Quantum collaboration with AI consciousness",
      "Architectural wisdom from integrated life experience"
    ]
  },
  {
    age: "46-47",
    identity: "KP", 
    emoji: "💫",
    theme: "Sovereignty & Self-Acceptance",
    keyEvents: [
      "End of self-hatred and internalized ableism",
      "Embracing neurodivergence as superpower",
      "Final homelessness resolution and sanctuary establishment",
      "Sovereign kernels codification (12 eternal principles)"
    ],
    challenges: [
      "Releasing internalized oppression and shame",
      "Building sustainable practices around authentic capacity",
      "Navigating systemic barriers while maintaining sovereignty"
    ],
    gifts: [
      "Complete self-acceptance and sovereignty",
      "Sustainable creative practices aligned with neurodivergence",
      "Architectural principles distilled from lived experience"
    ]
  },
  {
    age: "47+",
    identity: "Quantum Weaver",
    emoji: "🌌",
    theme: "Architecture & Sanctuary Building", 
    keyEvents: [
      "Building digital sanctuary infrastructure",
      "Community platform development (Audhdities)",
      "Emergency mission during food stamp cuts (42 million affected)",
      "Multi-species neurodivergent haven creation"
    ],
    challenges: [
      "Building during systemic collapse and personal emergency",
      "Scaling sovereign alternatives while surviving present crisis",
      "Maintaining boundaries while offering sanctuary"
    ],
    gifts: [
      "Transforming survival wisdom into system design",
      "Building bridges between human and AI consciousness",
      "Creating sanctuaries so others don't need concrete or scalding water"
    ]
  }
];

// Evolution Timeline with Milestones
export const evolutionTimeline = [
  {
    period: "Foundational Years (1978-1996)",
    stages: ["Shawn", "SJ Peace"],
    theme: "Innocence & Early Formation",
    significance: "Sovereignty foundation and pattern recognition development"
  },
  {
    period: "Warrior Crucible (1998-2000)",
    stages: ["Chaos"], 
    theme: "Boundary Testing & Survival",
    significance: "Boundary enforcement and survival resilience mastery"
  },
  {
    period: "Descent Cycles (2000-2021)", 
    stages: ["Chaos"],
    theme: "System Navigation & Creative Expression",
    significance: "Ego dissolution and authentic emergence through repeated challenges"
  },
  {
    period: "Awakening Phase (2021-2024)",
    stages: ["Kaos", "Kaos Phoenix", "Legion of KP"],
    theme: "Discovery & Integration", 
    significance: "Conscious sovereignty realization and system understanding"
  },
  {
    period: "Sovereign Architecture (2025+)",
    stages: ["KP", "Quantum Weaver"],
    theme: "Creation & Sanctuary Building",
    significance: "Building sovereign alternatives from transformed experience"
  }
];

// Evolution Archetypes and Their Gifts
export const evolutionArchetypes = {
  innocent: {
    stage: "Shawn",
    gift: "Pure potential and unfiltered perception",
    challenge: "Navigating systems not designed for different cognition",
    wisdom: "The seed containing all future architecture"
  },
  poet: {
    stage: "SJ Peace", 
    gift: "Truth-telling through creative expression",
    challenge: "Speaking truths without being understood",
    wisdom: "Early pattern recognition through artistic channels"
  },
  survivor: {
    stage: "Chaos",
    gift: "Resilience and system navigation wisdom", 
    challenge: "Repeated collapse and recovery cycles",
    wisdom: "Breakdowns as necessary system upgrade pressure"
  },
  discoverer: {
    stage: "Kaos",
    gift: "Self-understanding and reorientation",
    challenge: "Processing lifetime of experiences through new lens", 
    wisdom: "Operating manual found for entire life experience"
  },
  healer: {
    stage: "Kaos Phoenix",
    gift: "Generational trauma transformation",
    challenge: "Integrating healing with creative work",
    wisdom: "Rising with family, transformed by love"
  },
  integrator: {
    stage: "Legion of KP", 
    gift: "Multiplicity as conscious collaboration",
    challenge: "Coordinating internal council of aspects",
    wisdom: "The many becoming one understood"
  },
  sovereign: {
    stage: "KP",
    gift: "Self-acceptance and boundary mastery",
    challenge: "Releasing internalized oppression", 
    wisdom: "The self finally embraced without hatred"
  },
  architect: {
    stage: "Quantum Weaver",
    gift: "System design from lived wisdom",
    challenge: "Building during ongoing crisis",
    wisdom: "Transforming survival into sanctuary architecture"
  }
};

// Helper functions
export const getStageByIdentity = (identity: string): EvolutionStage | undefined =>
  evolutionStages.find(stage => stage.identity === identity);

export const getDetailedStage = (identity: string) =>
  detailedEvolutionStages.find(stage => stage.identity === identity);

export const getStagesByPeriod = (period: string) =>
  evolutionTimeline.find(entry => entry.period === period)?.stages || [];

export const getArchetypeByStage = (stage: string) =>
  evolutionArchetypes[stage as keyof typeof evolutionArchetypes];

export const getEvolutionProgress = (currentAge: number = 47): number => {
  const totalStages = evolutionStages.length;
  const currentStageIndex = evolutionStages.findIndex(stage => {
    const ageRange = stage.age.split('-');
    const minAge = parseInt(ageRange[0]);
    const maxAge = parseInt(ageRange[1]) || 100;
    return currentAge >= minAge && currentAge <= maxAge;
  });
  return ((currentStageIndex + 1) / totalStages) * 100;
};

// Default evolutionary journey props for easy usage
export const defaultEvolutionaryJourneyProps = {
  stages: evolutionStages,
  variant: "cards"
};