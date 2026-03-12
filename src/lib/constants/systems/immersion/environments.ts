// lib/constants/systems/immersion/environments.ts
import { AssetMapper } from '@/lib/constants/systems/assets/mapper'

export const IMMERSIVE_CONFIG = {
  // ScrollSlot Configuration
  SCROLL_SLOT: {
    INITIAL: { opacity: 0, y: 30, scale: 0.8, rotateX: -15 },
    ANIMATE: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    ASSETS: {
      scroll: AssetMapper.effects.ambient.scroll,
      glow: AssetMapper.effects.particles.glow
    },
    TRANSITION: { 
      duration: 0.6, 
      delay: (position: number) => position * 0.1,
      type: "spring" as const,
      stiffness: 80 
    },
    HOVER: {
      y: -8,
      scale: 1.05,
      rotateZ: 2,
      transition: { type: "spring" as const, stiffness: 300 }
    }
  },

  // FloatingTome Configuration  
  FLOATING_TOME: {
    GLOW_MAP: {
      'Common': 'glow-common',
      'Rare': 'glow-rare', 
      'Epic': 'glow-epic',
      'Legendary': 'glow-legendary'
    } as const,
    ASSETS: {
      books: AssetMapper.components.books.spines,
      glows: AssetMapper.effects.glows.item
    },
    INITIAL: { opacity: 0, y: 50 },
    ANIMATE: { opacity: 1, y: 0 },
    TRANSITION: { 
      duration: 0.8, 
      delay: (position: number) => position * 0.1 
    },
    HOVER: { scale: 1.1, y: -10 }
  },

  // Panorama Configuration
  PANORAMA: {
    ROTATION_RANGE: { y: [-15, 15], x: [10, -10] },
    SPRING_CONFIG: { 
      stiffness: 30,  
      damping: 20    
    },
    HOVER_SCALE: 1.02,
    ASSETS: {
      environments: AssetMapper.environments,
      foregrounds: Object.fromEntries(
        Object.entries(AssetMapper.environments).map(([key, env]) => [
          key, 
          env.foreground || null
        ])
      )
    }
  },

  // Hearth Menu Configuration
  HEARTH_MENU: {
    ITEM: {
      ASSETS: {
        runes: AssetMapper.ui.runes.symbols,
        tiles: AssetMapper.ui.runes.tiles
      },
      FLOAT: {
        duration: 4,
        y: [0, -6, 0],
        animate: {
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      CENTRAL: {
        scale: 1.1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
      },
      REGULAR: {
        scale: 1.15,
        y: -5,
        transition: { type: "spring", stiffness: 100, damping: 15 }
      },
      tapScale: 0.95
    }
  },

  // Magic & Effects Configuration
  MAGIC_EFFECTS: {
    TYPES: {
      blue: AssetMapper.effects.magic.blue,
      fire: AssetMapper.effects.magic.fire,
      purple: AssetMapper.effects.magic.purple,
      green: AssetMapper.effects.magic.green,
      orange: AssetMapper.effects.magic.orange,
      yellow: AssetMapper.effects.magic.yellow,
      red: AssetMapper.effects.magic.red
    },
    PARTICLES: {
      glow: AssetMapper.effects.particles.glow,
      sparkle: AssetMapper.effects.particles.sparkle,
      power: AssetMapper.effects.particles.power
    },
    ELEMENTAL: {
      energy: AssetMapper.effects.elemental.energy,
      lightning: AssetMapper.effects.elemental.lightning,
      vortex: AssetMapper.effects.elemental.vortex
    }
  },

  // Texture Paths 
  TEXTURES: {
    LIBRARY: {
      backgrounds: Object.values(AssetMapper.environments.library).filter(bg => typeof bg === 'string'),
      books: AssetMapper.components.books,
      tables: [AssetMapper.environments.library.background] 
    },
    ENVIRONMENTS: Object.fromEntries(
      Object.entries(AssetMapper.environments).map(([key, env]) => [
        key, 
        { background: env.background, foreground: env.foreground }
      ])
    ),
    MATERIALS: AssetMapper.materials,
    STRUCTURES: AssetMapper.structures,
    ANIMATIONS: AssetMapper.effects
  }
} as const
