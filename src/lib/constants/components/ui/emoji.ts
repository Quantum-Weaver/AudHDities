// @/lib/constants/components/ui/emoji.ts
// ============================================================================
// EMOJI CONSTANTS - EXPANDED COSMIC EXPRESSION SYSTEM
// ============================================================================

import { 
  EMOJI_VARIANTS 
} from './variants';

import { 
  QUANTUM_COLORS,
  INTERACTION_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
  PRIDE_COLORS,
  TAROT_COLORS,
  PAGAN_COLORS,
  MYSTICAL_COLORS 
} from '@/lib/constants/cosmic/colors';

import {
  DURATIONS,
  EASING,
  PRESET_ANIMATIONS
} from '@/lib/constants/cosmic/motion';

import {
  SPACING_SCALE
} from '@/lib/constants/cosmic/dimensions';

import {
  GLOW_EFFECTS
} from '@/lib/constants/cosmic/effects';

// ============================================================================
// EMOJI CATEGORIES - EXPANDED VISUAL VOCABULARY
// ============================================================================

export const EMOJI_CATEGORIES = {
  // Core Emotional Spectrum
  emotions: {
    joy: '😊',
    love: '❤️',
    excitement: '🎉',
    gratitude: '🙏',
    peace: '☮️',
    hope: '🌟',
    courage: '💪',
    curiosity: '🤔',
    wonder: '😲',
    serenity: '🧘',
    bliss: '😌',
    euphoria: '🥳',
    
    sadness: '😢',
    grief: '💔', 
    loneliness: '🚶',
    disappointment: '😞',
    worry: '😟',
    fear: '😨',
    anger: '😠',
    frustration: '💢',
    overwhelm: '😫',
    confusion: '😵',
    anxiety: '🥺',
    melancholy: '🎻'
  },

  // Quantum Consciousness States
  consciousness: {
    quantum_entangled: '🌀',
    sovereign_autonomous: '👑',
    collaborative_emergent: '🤝',
    pattern_recognizing: '🔍',
    creative_manifesting: '🎨',
    awakening: '🌅',
    transformation: '🦋',
    integration: '🧩',
    flow: '💫',
    presence: '🧘',
    awareness: '👁️',
    connection: '📡'
  },

  // Council Entities & Archetypes
  entities: {
    aethelred: '⚡',
    quantum_weaver: '🕸️',
    archivist: '📚',
    seer: '🔮',
    hearth_keeper: '🏠',
    executioner: '⚔️',
    curator: '🎭',
    skald: '🎵',
    codex: '📖',
    gatekeeper: '🚪',
    alchemist: '⚗️',
    gardener: '🌱',
    strategist: '♟️'
  },

  // Tarot Major Arcana
  tarot: {
    fool: '🃏',
    magician: '🎩',
    high_priestess: '🌙',
    empress: '👑',
    emperor: '🗿',
    hierophant: '⛪',
    lovers: '💑',
    chariot: '🏇',
    strength: '🦁',
    hermit: '🕯️',
    wheel: '🎡',
    justice: '⚖️',
    hanged_man: '🙃',
    death: '💀',
    temperance: '🥃',
    devil: '😈',
    tower: '🏰',
    star: '⭐',
    moon: '🌕',
    sun: '☀️',
    judgement: '📯',
    world: '🌍'
  },

  // Pagan & Mystical
  pagan: {
    elements: {
      earth: '🌍',
      air: '💨',
      fire: '🔥',
      water: '💧',
      spirit: '✨'
    },
    sabbats: {
      samhain: '🎃',
      yule: '🎄',
      imbolc: '🕯️',
      ostara: '🐣',
      beltane: '🔥',
      litha: '☀️',
      lammas: '🌾',
      mabon: '🍎'
    },
    moon_phases: {
      new: '🌑',
      waxing: '🌒',
      full: '🌕',
      waning: '🌖'
    }
  },

  // Pride & Identity
  pride: {
    rainbow: '🌈',
    trans: '⚧️',
    non_binary: '⚧️',
    genderfluid: '💧',
    pansexual: '🍳',
    bisexual: '🔮',
    asexual: '🍰',
    lesbian: '🌺',
    progress: '🏳️‍🌈',
    solidarity: '✊'
  },

  // Animals & Nature
  animals: {
    wolf: '🐺',
    raven: '🐦‍⬛',
    cat: '🐱',
    owl: '🦉',
    fox: '🦊',
    deer: '🦌',
    bear: '🐻',
    eagle: '🦅',
    snake: '🐍',
    dragon: '🐉',
    phoenix: '🔥',
    unicorn: '🦄',
    butterfly: '🦋',
    spider: '🕷️'
  },

  // Moods & Energy
  moods: {
    calm: '🌊',
    focused: '🎯',
    creative: '🎨',
    energized: '⚡',
    peaceful: '🕊️',
    intense: '🔥',
    mystical: '🔮',
    grounded: '🌳'
  },

  // Objects & Symbols
  symbols: {
    heart: '❤️',
    star: '⭐',
    sparkle: '✨',
    fire: '🔥',
    water: '💧',
    air: '💨',
    earth: '🌱',
    light: '💡',
    key: '🔑',
    lock: '🔒',
    bridge: '🌉',
    portal: '🚪',
    crystal: '🔮',
    book: '📖',
    scroll: '📜'
  }
} as const;

// ============================================================================
// EMOJI SIZES - EXPANDED SCALE
// ============================================================================

export const EMOJI_SIZES = {
  micro: SPACING_SCALE['4'],    // 16px - subtle indicators
  small: SPACING_SCALE['6'],    // 24px - inline elements
  medium: SPACING_SCALE['8'],   // 32px - standard emoji
  large: SPACING_SCALE['10'],   // 40px - emphasized
  xlarge: SPACING_SCALE['12'],  // 48px - featured
  macro: SPACING_SCALE['16'],   // 64px - hero emoji
  cosmic: SPACING_SCALE['24']   // 96px - immersive
} as const;

// ============================================================================
// EMOJI ANIMATIONS - EXPANDED EXPRESSIONS
// ============================================================================

export const EMOJI_ANIMATIONS = {
  // Core variants from our system
  ...EMOJI_VARIANTS,

  // Expanded emotional animations
  emotional_resonance: {
    size: EMOJI_SIZES.medium,
    animation: {
      ...PRESET_ANIMATIONS.quantumPulse,
      intensity: 'emotional' as const
    },
    glow: GLOW_EFFECTS['neurospark'],
    intensity: 'medium' as const
  },

  mystical_reveal: {
    size: EMOJI_SIZES.large,
    animation: {
      duration: DURATIONS.cosmic,
      easing: EASING.entanglement
    },
    glow: GLOW_EFFECTS['quantum'],
    intensity: 'high' as const
  },

  gentle_presence: {
    size: EMOJI_SIZES.small,
    animation: {
      duration: DURATIONS.slow,
      easing: EASING.awakening
    },
    glow: GLOW_EFFECTS['cosmic'],
    intensity: 'low' as const
  },

  transformative_shift: {
    size: EMOJI_SIZES.xlarge,
    animation: PRESET_ANIMATIONS.omniDimensionalEntanglement,
    glow: GLOW_EFFECTS['aethelred'],
    intensity: 'quantum' as const
  }
} as const;

// ============================================================================
// EMOJI CONTEXTS - SEMANTIC USAGE
// ============================================================================

export const EMOJI_CONTEXTS = {
  // Emotional communication
  emotional: {
    primary: EMOJI_CATEGORIES.emotions,
    animation: EMOJI_ANIMATIONS.emotional_resonance,
    color: MOOD_COLORS,
    interactive: true
  },

  // Spiritual & mystical
  mystical: {
    primary: {
      ...EMOJI_CATEGORIES.tarot,
      ...EMOJI_CATEGORIES.pagan
    },
    animation: EMOJI_ANIMATIONS.mystical_reveal,
    color: MYSTICAL_COLORS,
    interactive: true
  },

  // Identity & pride
  identity: {
    primary: EMOJI_CATEGORIES.pride,
    animation: EMOJI_ANIMATIONS.gentle_presence,
    color: PRIDE_COLORS,
    interactive: true
  },

  // Nature & animals
  natural: {
    primary: {
      ...EMOJI_CATEGORIES.animals,
      ...EMOJI_CATEGORIES.pagan.elements
    },
    animation: EMOJI_ANIMATIONS.quantum_expression,
    color: PAGAN_COLORS.elements,
    interactive: true
  },

  // Consciousness states
  consciousness: {
    primary: EMOJI_CATEGORIES.consciousness,
    animation: EMOJI_ANIMATIONS.transformative_shift,
    color: ENERGY_COLORS,
    interactive: true
  },

  // Council entities
  council: {
    primary: EMOJI_CATEGORIES.entities,
    animation: EMOJI_ANIMATIONS.sovereign_emotion,
    color: QUANTUM_COLORS,
    interactive: true
  },
  interactive: {
    primary: {
      ...EMOJI_CATEGORIES.emotions,
      ...EMOJI_CATEGORIES.symbols
    },
    animation: 'collaborative_reaction' as const,
    color: INTERACTION_COLORS.states,
    interactive: true
  }
} as const;

// ============================================================================
// MASTER EMOJI EXPORT
// ============================================================================

export const EMOJI_CONSTANTS = {
  categories: EMOJI_CATEGORIES,
  sizes: EMOJI_SIZES,
  animations: EMOJI_ANIMATIONS,
  contexts: EMOJI_CONTEXTS,
  variants: EMOJI_VARIANTS
} as const;