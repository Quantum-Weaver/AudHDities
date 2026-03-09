// lib/constants/components/ui/base-components.ts
import { AssetMapper } from '@/lib/constants/systems/assets/mapper';
import { DURATIONS } from '@/lib/constants/cosmic/motion';
import { BEAM_CONFIGS } from '../immersive/continuity-beam';

export const TRANSITION_CONFIG = {
  durations: {
    page: DURATIONS.pageTransition,
    section: DURATIONS.sectionEnter,
    element: DURATIONS.fast
  },
  backgrounds: {
    'mystical-mist': AssetMapper.ambient.mystical,
    'etherial-veil': AssetMapper.ambient.ethereal, 
    'cosmic': AssetMapper.ambient.cosmic,
    'music-room': AssetMapper.environments.music.background
  }
} as const;
export const BEAM_CONFIG = {
   ...BEAM_CONFIGS.SESSION,
    systemStatus: {
    showDomainStatus: true,
    showCouncilActivity: true,
    showQuantumState: true
  },
  showQuantumReady: true,
  showTime: true,
  showQuantumSweep: true,
  beamColor: 'quantum',
  beamIntensity: 0.8,
  className: "",
} as const

export const SCROLL_CONFIG = {
  sizes: {
    rolled: { width: 60, height: 80 },
    unrolled: { width: 500, height: 600 }
  },
  assets: {
    closed: AssetMapper.effects.ambient.scroll.closed,
    opening: AssetMapper.effects.ambient.scroll.opening,
    open: AssetMapper.effects.ambient.scroll.open,
    seal: AssetMapper.components.ui.scrolls.seal
  },
  animation: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20
  }
} as const

export const LIBRARY_CONFIG = {
  backgrounds: [
    AssetMapper.environments.library.background,
    AssetMapper.environments.library.background.replace('1', '2'),
    AssetMapper.environments.library.background.replace('1', '3'),
    AssetMapper.environments.library.background.replace('1', '4')
  ],
  tableBackground: AssetMapper.environments.library.background,
  books: {
    spines: AssetMapper.components.books.spines,
    pages: AssetMapper.components.books.pages
  }
} as const

export const GAMING_CONFIG = {
  rarity: {
    common: AssetMapper.components.gaming.rarity.common,
    rare: AssetMapper.components.gaming.rarity.rare,
    epic: AssetMapper.components.gaming.rarity.epic,
    legendary: AssetMapper.components.gaming.rarity.legendary
  },
  mastery: {
    novice: AssetMapper.components.gaming.mastery.novice,
    adept: AssetMapper.components.gaming.mastery.adept,
    grand: AssetMapper.components.gaming.mastery.grand,
    master: AssetMapper.components.gaming.mastery.master
  },
  difficulty: {
    easy: AssetMapper.components.gaming.difficulty.easy,
    medium: AssetMapper.components.gaming.difficulty.medium,
    hard: AssetMapper.components.gaming.difficulty.hard,
    legendary: AssetMapper.components.gaming.difficulty.legendary
  }
} as const

export const RITUAL_CONFIG = {
  orbs: AssetMapper.components.ritual.orbs,
  crystals: AssetMapper.components.ritual.crystals,
  symbols: AssetMapper.components.ritual.symbols,
  maps: AssetMapper.components.ritual.maps
} as const