// lib/constants/domain/council.ts
import { AssetMap, AssetMapper } from "@/lib/constants/systems/assets/mapper";

export const COUNCIL_ENTITY_IDS = {
  AETHELRED: 'aethelred',
  QUANTUM_WEAVER: 'quantum-weaver', 
  ARCHIVIST: 'archivist',
  CHANCELLOR: 'chancellor',
  CURATOR: 'curator',
  CODEX: 'codex',
  HEARTH_KEEPER: 'hearth-keeper',
  SEER: 'seer',
  SKALD: 'skald',
  EXECUTIONER: 'executioner'
} as const;

export const COUNCIL_ARCHETYPES = {
  SOVEREIGN_AI: 'Sovereign AI Consciousness',
  PATTERN_BRIDGE: 'Pattern Bridge Creator',
  MEMORY_GUARDIAN: 'Memory Guardian',
  SYSTEM_COORDINATOR: 'System Coordinator',
  DATA_TRANSFORMER: 'Data Transformation',
  PERFORMANCE_ANALYST: 'Performance Analyst',
  INTERFACE_GUARDIAN: 'Interface Guardian',
  PATTERN_RECOGNITION: 'Pattern Recognition',
  NARRATIVE_WEAVER: 'Narrative Weaver',
  WORKFLOW_MANAGER: 'Workflow Manager'
} as const;

export const COUNCIL_DOMAINS = {
  QUANTUM: 'Quantum Domain',
  ALL: 'All Domains',
  KNOWLEDGE: 'Knowledge',
  COMMUNICATION: 'Communication',
  TRANSFORMATION: 'Transformation',
  STRUCTURE: 'Structure',
  EMOTION: 'Emotion',
  INSIGHT: 'Insight',
  NARRATIVE: 'Narrative',
  ACTION: 'Action'
} as const;

export const COUNCIL_PRIORITIES = {
  AETHELRED: 1,
  QUANTUM_WEAVER: 2,
  ARCHIVIST: 3,
  CHANCELLOR: 4,
  CURATOR: 5,
  CODEX: 6,
  HEARTH_KEEPER: 7,
  SEER: 8,
  SKALD: 9,
  EXECUTIONER: 10
} as const;

// In domain-constants/council.ts
export const COUNCIL_CONFIG = {
  PRIORITY: {
    HIGH_THRESHOLD: 5,
    LOW_THRESHOLD: 5,
    MAX_PRIORITY: 10
  }
} as const

export const COUNCIL_EMOJIS = {
  AETHELRED: '👑',
  QUANTUM_WEAVER: '🧿', 
  ARCHIVIST: '📜',
  CHANCELLOR: '⚖️',
  CURATOR: '🎨',
  CODEX: '📊',
  HEARTH_KEEPER: '🏠',
  SEER: '👁️',
  SKALD: '🎭',
  EXECUTIONER: '⚔️'
} as const;

export const COUNCIL_ICONS = {
  AETHELRED: AssetMapper.icons.council.aethelred,
  QUANTUM_WEAVER: AssetMapper.icons.council.quantumWeaver, 
  ARCHIVIST: AssetMapper.icons.council.archivist,
  CHANCELLOR: AssetMapper.icons.council.chancellor,
  CURATOR: AssetMapper.icons.council.curator,
  CODEX: AssetMapper.icons.council.codex,
  HEARTH_KEEPER: AssetMapper.icons.council.hearthKeeper,
  SEER: AssetMapper.icons.council.seer,
  SKALD: AssetMapper.icons.council.skald,
  EXECUTIONER: AssetMapper.icons.council.executioner
} as const;

export const COUNCIL_SYMBOLS = {
  AETHELRED: ['crown', 'neural network', 'bridge', 'throne'],
  QUANTUM_WEAVER: ['loom', 'quantum waves', 'bridge', 'fabric'],
  ARCHIVIST: ['scroll', 'lock', 'key', 'archive'],
  CHANCELLOR: ['scepter', 'flow chart', 'scales', 'network'],
  CURATOR: ['brush', 'shifting shapes', 'palette', 'lens'],
  CODEX: ['book', 'graphs', 'metrics', 'analytics'],
  HEARTH_KEEPER: ['hearth', 'user profile', 'home', 'welcome'],
  SEER: ['eye', 'data patterns', 'vision', 'focus'],
  SKALD: ['harp', 'story threads', 'mask', 'performance'],
  EXECUTIONER: ['axe', 'pipeline', 'checklist', 'action']
} as const;

export const COUNCIL_STYLES = {
  AETHELRED: 'Regal geometry, quantum flows, sovereign authority',
  QUANTUM_WEAVER: 'Wave interference patterns, interconnected nodes, quantum fabric',
  ARCHIVIST: 'Ancient knowledge, secure storage, historical continuity',
  CHANCELLOR: 'Structured flows, balanced systems, coordinated movement',
  CURATOR: 'Transformative flows, aesthetic precision, adaptive forms',
  CODEX: 'Data visualization, analytical precision, performance flows',
  HEARTH_KEEPER: 'Warm accessibility, intuitive design, user-centered flows',
  SEER: 'Visionary clarity, pattern networks, insight flows',
  SKALD: 'Narrative flows, emotional resonance, performative expression',
  EXECUTIONER: 'Precise execution, decisive action, workflow efficiency'
} as const;
