// lib/constants/systems/immersion/panorama.ts
import { AssetMapper } from '@/lib/constants/systems/assets/mapper'

export const PANORAMA_CONFIG = {
  environments: {
    home: {
      background: AssetMapper.environments.home.background,
      foreground: AssetMapper.environments.home.foreground,
      variants: AssetMapper.environments.home.variants
    },
    council: {
      background: AssetMapper.environments.council.background,
      foreground: AssetMapper.environments.council.foreground,
      variants: AssetMapper.environments.council.variants
    },
    library: {
      background: AssetMapper.environments.library.background,
      foreground: AssetMapper.environments.library.foreground,
      variants: AssetMapper.environments.library.variants
    },
    community: {
      background: AssetMapper.environments.community.background,
      foreground: AssetMapper.environments.community.foreground,
      variants: AssetMapper.environments.community.variants
    },
    music: {
      background: AssetMapper.environments.music.background,
      foreground: AssetMapper.environments.music.foreground,
      variants: AssetMapper.environments.music.variants
    },
    origin: {
      background: AssetMapper.environments.origin.background,
      foreground: AssetMapper.environments.origin.foreground,
      variants: AssetMapper.environments.origin.variants
    },
    support: {
      background: AssetMapper.environments.support.background,
      foreground: AssetMapper.environments.support.foreground,
      variants: AssetMapper.environments.support.variants
    },
    architecture: {
      background: AssetMapper.environments.architecture.background,
      foreground: AssetMapper.environments.architecture.foreground,
      variants: AssetMapper.environments.architecture.variants
    }
  },
  
  effects: {
    particles: AssetMapper.effects.particles,
    magic: AssetMapper.effects.magic,
    ambient: AssetMapper.effects.ambient
  },
  
  interactive: {
    hotspots: {
      books: AssetMapper.components.books.spines,
      potions: AssetMapper.components.potions.sets,
      tools: AssetMapper.components.ui.tools
    }
  }
} as const
