// lib/constants/systems/assets/mapper.ts
export type EnvironmentKey = 
  | 'council' | 'library' | 'community' | 'music' 
  | 'origin' | 'support' | 'home' | 'observatory'
  | 'architecture' | 'invitation' | 'lounge' | 'cure' | 'gateway';

export type ComponentKey =
  | 'books' | 'potions' | 'ritual' | 'gaming' | 'quantum' | 'ui';

export type IconCategory =
  | 'council' | 'domains' | 'social' | 'system' | 'supporting';

export type MagicColor = 'blue' | 'fire' | 'purple' | 'green' | 'orange' | 'yellow' | 'red';

export const AssetMapper = {
  // ============================================================================
  // ENVIRONMENTS - Your brilliant -1/-1b layered system
  // ============================================================================
  environments: {
    council: {
      background: '/environments/360-panoramas/council/council-background-1.webp',
      foreground: '/environments/extracted-foregrounds/council-elements/council-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    library: {
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    community: {
      background: '/environments/360-panoramas/community/community-background-1.webp',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    music: {
      background: '/environments/360-panoramas/music/music-page-background-1.webp',
      foreground: '/environments/extracted-foregrounds/music-elements/music-page-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    origin: {
      background: '/environments/360-panoramas/origin/origin-background-1.webp',
      foreground: '/environments/extracted-foregrounds/origin-elements/origin-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    support: {
      background: '/environments/360-panoramas/support/support-background-1.webp',
      foreground: '/environments/extracted-foregrounds/support-elements/support-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    home: {
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    gateway: {
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    observatory: {
      background: '/environments/360-panoramas/observatory/observatory-background-1.webp',
      foreground: '/environments/extracted-foregrounds/observatory-elements/observatory-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    architecture: {
      background: '/environments/360-panoramas/architecture/architecture-background-1.webp',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    invitation: {
      background: '/environments/360-panoramas/invitation/invitaion-background-1.webp',
      foreground: '/environments/extracted-foregrounds/invitation-elements/invitaion-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    lounge: {
      background: '/environments/360-panoramas/lounge/lounge-background-1.webp',
      foreground: '/environments/extracted-foregrounds/lounge-elements/lounge-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    cure: {
      background: '/environments/360-panoramas/architecture/architecture-background-1.webp',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
  } as const,

  // ============================================================================
  // COMPONENTS - Organized by type for easy access
  // ============================================================================
  components: {
    // BOOKS & KNOWLEDGE
    books: {
      spines: Array.from({length: 35}, (_, i) => 
        `/components/books/book-${i+1}.png`
      ),
      pages: {
        frameA: Array.from({length: 7}, (_, i) =>
          `/components/book-page-frames/page-frame-a-${i+1}.png`
        ),
        frameB: Array.from({length: 5}, (_, i) =>
          `/components/book-page-frames/page-frame-b-${i+1}.png`
        ),
        frameC: ['/components/book-page-frames/page-frame-c-1.png'],
        frameD: ['/components/book-page-frames/page-frame-d-1.png'],
        frameE: Array.from({length: 2}, (_, i) =>
          `/components/book-page-frames/page-frame-e-${i+1}.png`
        )
      },
      details: {
        clasp: '/components/random/book-clasp.png',
        corner: '/components/book-corner-protector.png',
        spine: '/components/book-spine-detail.png'
      }
    },

    // POTIONS & ALCHEMY
    potions: {
      sets: Array.from({length: 6}, (_, i) =>
        `/components/potions/flask-set-${i+1}.png`
      ),
      cosmic: Array.from({length: 6}, (_, i) =>
        `/components/potions/cosmic-flask-${i+1}.png`
      ),
      blue: Array.from({length: 2}, (_, i) =>
        `/components/potions/blue-flask-${i+1}.png`
      ),
      purple: Array.from({length: 2}, (_, i) =>
        `/components/potions/purple-flask-${i+1}.png`
      ),
      green: Array.from({length: 2}, (_, i) =>
        `/components/potions/green-flask-${i+1}.png`
      ),
      bong: Array.from({length: 5}, (_, i) =>
        `/components/potions/flask-bong-${i+1}.png`
      ),
      empty: '/components/potions/empty-flask-1.png',
      used: '/components/potions/used-flask-1.png'
    },

    // GAMING & ACHIEVEMENTS
    gaming: {
      rarity: {
        common: '/components/gaming/rarity-frames/common-frame.png',
        rare: '/components/gaming/rarity-frames/rare-frame.png',
        epic: '/components/gaming/rarity-frames/epic-frame.png',
        legendary: '/components/gaming/rarity-frames/legendary-frame.png'
      },
      mastery: {
        novice: '/components/gaming/mastery-badges/novice-researcher.png',
        adept: '/components/gaming/mastery-badges/adept-scholar.png',
        grand: '/components/gaming/mastery-badges/grand-librarian.png',
        master: '/components/gaming/mastery-badges/master-archivist.png'
      },
      difficulty: {
        easy: '/components/gaming/difficulty-icons/difficulty-easy.png',
        medium: '/components/gaming/difficulty-icons/difficulty-medium.png',
        hard: '/components/gaming/difficulty-icons/difficulty-hard.png',
        legendary: '/components/gaming/difficulty-icons/difficulty-legendary.png'
      }
    },

    // RITUAL & MYSTICAL
    ritual: {
      orbs: {
        contact: '/components/ritual/contact-orb.png',
        contact2: '/components/ritual/contact-orb-2.png',
        contact3: '/components/ritual/contact-orb-3.png',
        contact4: '/components/ritual/contact-orb-4.png'
      },
      crystals: {
        single: '/components/ritual/crystal.png',
        cluster: '/components/ritual/crystals.png'
      },
      symbols: {
        eyeSnake: Array.from({length: 2}, (_, i) =>
          `/components/ritual/eye-snake-${i+1}.png`
        ),
        eyeSun: Array.from({length: 4}, (_, i) =>
          `/components/ritual/eye-sun-${i+1}.png`
        ),
        eyeTriangle: Array.from({length: 3}, (_, i) =>
          `/components/ritual/eye-sun-triangle-${i+1}.png`
        ),
        triangle: Array.from({length: 3}, (_, i) =>
          `/components/ritual/triangle-ritual-${i+1}.png`
        )
      },
      maps: {
        constellation: Array.from({length: 4}, (_, i) =>
          `/components/ritual/constellation-map-${i+1}.png`
        ),
        moon: '/components/ritual/moon-chart-1.png',
        runic: Array.from({length: 2}, (_, i) =>
          `/components/ritual/runic-card-c-${i+1}.png`
        )
      }
    },

    // QUANTUM & COSMIC
    quantum: {
      maps: {
        quantum: Array.from({length: 3}, (_, i) =>
          `/components/quantum/quantum-map-${i+1}.png`
        ),
        constellation: Array.from({length: 2}, (_, i) =>
          `/components/quantum/constellation-map-${i+5+i}.png` // 5 and 6
        )
      },
      sphere: '/components/quantum/metal-sphere.png'
    },

    // UI & INTERFACE
    ui: {
      diagrams: {
        bifrost: Array.from({length: 11}, (_, i) =>
          `/components/diagrams/bifrost-diagram-${i+1}.png`
        )
      },
      frames: {
        player: {
          groupA: Array.from({length: 3}, (_, i) =>
            `/components/player-frames/frame-a-${i+1}.png`
          ),
          groupB: Array.from({length: 6}, (_, i) =>
            `/components/player-frames/frame-b-${i+1}.png`
          ),
          groupC: Array.from({length: 7}, (_, i) =>
            `/components/player-frames/frame-c-${i+1}.png`
          ),
          groupD: Array.from({length: 8}, (_, i) =>
            `/components/player-frames/frame-d-${i+1}.png`
          ),
          groupE: Array.from({length: 4}, (_, i) =>
            `/components/player-frames/frame-e-${i+1}.png`
          ),
          triangles: Array.from({length: 3}, (_, i) =>
            `/components/player-frames/triangle-gold-${i+1}.png`
          )
        }
      },
      icons: {
        game: Array.from({length: 12}, (_, i) =>
          `/components/gaming/game-icons-a-${i+1}.png`
        )
      },
      scrolls: {
        floating: '/components/random/floating-scroll.png',
        seal: '/components/random/scroll-seal.png'
      },
      tools: {
        alchemy: '/components/alchemy-pouch-2.png',
        chemistry: '/components/potions/chemistry-set-3.png',
        geode: '/components/random/geode-2.png',
        observatory: '/structures/buildings/observatory-2.png',
        telescope: Array.from({length: 3}, (_, i) =>
          `/components/random/telescope-${i+1}.png`
        ),
        hourglass: '/components/random/hour-glass-1.png',
        pocketwatch: '/components/random/pocket-watch-1.png',
        headstone: '/components/random/headstone.png'
      },
      decorative: {
        pageGold: '/components/random/page-gold-leaf.png'
      }
    },

    // PHOENIX & TRANSFORMATION
    phoenix: {
      kp: {
        variant1: '/components/phoenix/kp-phoenix-1.png',
        variant1b: '/components/phoenix/kp-phoenix-1b.png',
        variant2: '/components/phoenix/kp-phoenix-2.png',
        variant2b: '/components/phoenix/kp-phoenix-2b.png',
        variant3: '/components/phoenix/kp-phoenix-3.png',
        variant3b: '/components/phoenix/kp-phoenix-3b.png'
      },
      generic: {
        variant1: '/components/phoenix/phoenix-1.png',
        variant1b: '/components/phoenix/phoenix-1b.png',
        variant2: '/components/phoenix/phoenix-2.png',
        variant2b: '/components/phoenix/phoenix-2b.png',
        variant3: '/components/phoenix/phoenix-3.png',
        variant3b: '/components/phoenix/phoenix-3b.png',
        variant4: '/components/phoenix/phoenix-4.png',
        variant4b: '/components/phoenix/phoenix-4b.png',
        variant5: '/components/phoenix/phoenix-5.png',
        variant5b: '/components/phoenix/phoenix-5b.png'
      }
    }
  } as const,

  // ============================================================================
  // ICONS - Complete vector icon system
  // ============================================================================
  icons: {
    council: {
      aethelred: '/icons/council-members/aethelred.svg',
      quantumWeaver: '/icons/council-members/quantum-weaver.svg',
      archivist: '/icons/council-members/archivist.svg',
      chancellor: '/icons/council-members/chancellor.svg',
      curator: '/icons/council-members/curator.svg',
      seer: '/icons/council-members/seer.svg',
      skald: '/icons/council-members/skald.svg',
      hearthKeeper: '/icons/council-members/hearth-keeper.svg',
      executioner: '/icons/council-members/executioner.svg',
      codex: '/icons/council-members/codex.svg',
      councilAssembly: '/icons/council-members/council.svg',
      councilCommunication: '/icons/council-members/council-communications.svg'
    },
    domains: {
      quantum: '/icons/domains/quantum-domain.svg',
      cosmic: '/icons/domains/cosmic-domain.svg',
      pantheon: '/icons/domains/pantheon-domain.svg',
      bifrost: '/icons/domains/bifrost-domain.svg',
      sovereign: '/icons/domains/sovereign-library.svg',
      void: '/icons/domains/void-domain.svg'
    },
    social: {
      github: '/icons/socials-platforms/technical-github.svg',
      bluesky: '/icons/socials-platforms/social-bluesky.svg',
      twitter: '/icons/socials-platforms/social-twitter.svg',
      youtube: '/icons/socials-platforms/social-youtube.svg',
      patreon: '/icons/socials-platforms/social-patreon.svg',
      facebook: '/icons/socials-platforms/social-facebook.svg',
      instagram: '/icons/socials-platforms/social-instagram.svg',
      linkedin: '/icons/socials-platforms/social-linkedin.svg',
      threads: '/icons/socials-platforms/social-threads.svg',
      tiktok: '/icons/socials-platforms/social-tiktok.svg'
    },
    gaming: {
      battlenet: '/icons/socials-platforms/gaming-battlenet.svg',
      playstation: '/icons/socials-platforms/gaming-playstation.svg',
      steam: '/icons/socials-platforms/gaming-steam.svg',
      twitch: '/icons/socials-platforms/gaming-twitch.svg'
    },
    supporting: {
      android: '/icons/supporting/android.svg',
      apple: '/icons/supporting/apple.svg',
      cashapp: '/icons/supporting/cashapp.svg',
      paypal: '/icons/supporting/paypal.svg',
      venmo: '/icons/supporting/venmo.svg'
    },
    system: {
      blackHole: '/icons/system-components/black-hole.svg',
      brain: '/icons/system-components/brain.svg',
      cognitiveLoom: '/icons/system-components/cognitive-loom.svg',
      consciousnessNode: '/icons/system-components/consciousness-node.svg',
      cosmicLoom: '/icons/system-components/cosmic-loom.svg',
      decisionSystem: '/icons/system-components/decision.svg',
      dna: '/icons/system-components/dna.svg',
      emergency1: '/icons/system-components/emergency-1.svg',
      emergency2: '/icons/system-components/emergency-2.svg',
      nonBinary: '/icons/system-components/nonbinary.svg',
      oracle: '/icons/system-components/oracle.svg',
      portalGateway: '/icons/system-components/portal-gateway.svg',
      quantumBridge: '/icons/system-components/quantum-bridge.svg',
      sovereignSanctuary: '/icons/system-components/sovereign-sanctuary.svg'
    },
    miscellaneous: {
      agent: '/icons/miscellaneous/agent.svg',
      cat: '/icons/miscellaneous/cat.svg',
      dog: '/icons/miscellaneous/dog.svg',
      frog: '/icons/miscellaneous/frog.svg',
      infinity: '/icons/miscellaneous/infinity.svg',
      principles: '/icons/miscellaneous/principles.svg'
    },
    pantheon: {
      artemis: '/icons/pantheon-entities/alien.svg' // Placeholder
    }
  } as const,

  // ============================================================================
  // ANIMATED EFFECTS - Magic, particles, and glows
  // ============================================================================
  effects: {
    magic: {
      blue: Array.from({length: 11}, (_, i) =>
        `/animated/effects/blue-magic-${i+1}.png`
      ),
      fire: Array.from({length: 13}, (_, i) =>
        `/animated/effects/fireball-${i+1}.png`
      ),
      purple: [
        '/animated/effects/purple-magic-1.png',
        '/animated/effects/purple-magic.png'
      ],
      green: Array.from({length: 3}, (_, i) =>
        `/animated/effects/green-magic-${i+1}.png`
      ),
      orange: Array.from({length: 5}, (_, i) =>
        `/animated/effects/orange-magic-${i+1}.png`
      ),
      yellow: Array.from({length: 6}, (_, i) =>
        `/animated/effects/yellow-magic-${i+1}.png`
      ),
      red: Array.from({length: 3}, (_, i) =>
        `/animated/effects/red-magic-${i+1}.png`
      )
    },
    particles: {
      glow: Array.from({length: 9}, (_, i) =>
        `/animated/effects/magic-glow-${i+1}.png`
      ),
      sparkle: Array.from({length: 4}, (_, i) =>
        `/animated/effects/sprakle-particle-${i+1}.png`
      ),
      power: Array.from({length: 4}, (_, i) =>
        `/animated/effects/power-spark-${i+1}.png`
      ),
      sparkleEffect: Array.from({length: 3}, (_, i) =>
        `/animated/effects/sparkle-effect-${i+1}.png`
      )
    },
    elemental: {
      energy: '/animated/effects/energy.png',
      lightning: Array.from({length: 3}, (_, i) =>
        `/animated/effects/lightning-trails-${i+1}.png`
      ),
      bolts: Array.from({length: 3}, (_, i) =>
        `/animated/effects/bolt-${i+1}.png`
      ),
      vortex: Array.from({length: 7}, (_, i) =>
        `/animated/effects/vortex-effect-${i+1}.png`
      ),
      frost: Array.from({length: 3}, (_, i) =>
        `/animated/effects/frost-effect-${i+1}.png`
      )
    },
    ambient: {
      candle: Array.from({length: 5}, (_, i) =>
        `/animated/candle-flame/candle-flame-${i+1}.png`
      ),
      pageTurn: Array.from({length: 8}, (_, i) =>
        `/animated/page-turn/page-turn-${i+1}.png`
      ),
      scroll: {
        closed: '/animated/scroll-unroll/scroll-closed.png',
        opening: '/animated/scroll-unroll/scroll-opeining.png',
        open: '/animated/scroll-unroll/scroll-open.png'
      }
    },
    glows: {
      item: {
        weak: '/animated/item-glow/glow-weak.png',
        medium: '/animated/item-glow/glow-medium.png',
        strong: '/animated/item-glow/glow-strong.png'
      },
      magic: Array.from({length: 8}, (_, i) =>
        `/animated/item-glow/magic-glow-${i+1}.png`
      )
    }
  } as const,

  // ============================================================================
  // STRUCTURES & MATERIALS
  // ============================================================================
  structures: {
    floating: {
      islands: Array.from({length: 3}, (_, i) =>
        `/structures/floating-islands/floating-island-${i+1}.png`
      ),
      planets: Array.from({length: 10}, (_, i) =>
        `/structures/floating-planets/floating-planet (${i+1}).png`
      )
    },
    buildings: {
      sanctuary: '/structures/buildings/sanctuary-2.png',
      parthenon: '/structures/buildings/parthenon.png',
      smallLibrary: '/structures/buildings/small-library.png',
      schoolRoom: '/structures/buildings/school-room.png',
      hillsideDoor: '/structures/portals/hillside-door.png'
    },
    nature: {
      rainbowWaterfall: '/structures/portals/rainbow-waterfall.png',
      riverPath: '/structures/portals/river-path.png'
    },
    pads: {
      community: '/structures/buildings/pad-community.png',
      council: '/structures/buildings/pad-council.png'
    }
  } as const,

  materials: {
    wood: {
      floor1: '/materials/compressed-wood/wood-floor-1.webp',
      floor2: '/materials/compressed-wood/wood-floor.2.webp',
      darkHorizontal: '/materials/compressed-wood/dark-wood-h.webp',
      darkVertical: '/materials/compressed-wood/dark-wood-v.webp',
      texture: '/materials/compressed-wood/wooden-texture-background.webp',
      closeup: '/materials/compressed-wood/close-up-wooden-texture-background.webp',
      damaged: '/materials/compressed-wood/texture-damaged-boards.webp',
      brown: '/materials/compressed-wood/brown-wooden-textured-flooring-background.webp'
    },
    stone: {
      wall: '/materials/compressed-stone/dark-stone-wall.webp',
      texture: '/materials/compressed-stone/stone-texture.webp'
    },
    leather: '/materials/compressed-leather/leather-texture.webp',
    parchment: '/materials/compressed-parchment/parchment-scroll.webp',
    bronze: '/materials/compressed-bronze/bronze-pattern-background.webp'
  } as const,

  // ============================================================================
  // UI & INTERFACE ELEMENTS
  // ============================================================================
  ui: {
    hud: {
      frames: Array.from({length: 13}, (_, i) =>
        `/interactive/hud-elements/hud-${i+1}.webp`
      ),
      frame: '/interactive/hud-elements/hud-frame.webp',
      notification: '/interactive/hud-elements/notification-glow.webp',
      progress: '/interactive/hud-elements/progress-bar.webp'
    },
    buttons: {
      quickAction: {
        gold: '/interactive/buttons/quick-action-gold.png',
        green: '/interactive/buttons/quick-action-green.png',
        grey: '/interactive/buttons/quick-action-grey.png',
        orange: '/interactive/buttons/quick-action-orange.png',
        purple: '/interactive/buttons/quick-action-purple.png',
        red1: '/interactive/buttons/quick-action-red-1.png',
        red2: '/interactive/buttons/quick-action-red-2.png',
        violet: '/interactive/buttons/quick-action-violet.png'
      }
    },
    achievements: {
      archivist: '/interactive/acheivement-icons/archivist.png',
      firstDiscovery: '/interactive/acheivement-icons/first-discovery.png',
      quantumScholar: '/interactive/acheivement-icons/quantum-scholar.png'
    },
    runes: {
      symbols: Array.from({length: 16}, (_, i) =>
        `/interactive/rune-symbols/runic-symbol (${i+1}).png`
      ),
      tiles: {
        groupA: Array.from({length: 9}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-a-${i+1}.png`
        ),
        groupB: Array.from({length: 9}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-b-${i+1}.png`
        ),
        groupC: Array.from({length: 6}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-c-${i+1}.png`
        ),
        groupD: Array.from({length: 9}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-d-${i+1}.png`
        ),
        groupE: Array.from({length: 9}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-e-${i+1}.png`
        ),
        groupF: Array.from({length: 6}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-f-${i+1}.png`
        ),
        groupG: Array.from({length: 9}, (_, i) =>
          `/interactive/rune-symbols/runic-tiles-g-${i+1}.png`
        )
      },
      cards: Array.from({length: 6}, (_, i) =>
        `/interactive/rune-symbols/rune-cards-a-${i+1}.png`
      ),
      clocks: {
        clock1: '/interactive/rune-symbols/clock-1.png',
        runic: '/interactive/rune-symbols/runic-clock.png'
      },
      quantum: '/interactive/rune-symbols/quantum-origin.png'
    }
  } as const,

  // ============================================================================
  // AMBIENT & BACKGROUND ELEMENTS
  // ============================================================================
  ambient: {
    cosmic: '/components/ambient/cosmic-background.png',
    ethereal: '/components/ambient/etherial-veil.png',
    mystical: '/components/ambient/mystical-mist.png',
    floatingDust: [
      '/components/ambient/floating-dust-1.png',
      '/components/ambient/floating-dust-2.png'
    ],
    libraryFloor: '/components/ambient/library-floor.png',
    stoneWall: '/components/ambient/stone-wall-tiles.png',
    woodFloor: [
      '/components/ambient/wood-floor-1.png',
      '/components/ambient/wood-floor.2.png'
    ],
    mists: {
      blue: '/components/ambient/mist-blue.png',
      gold: '/components/ambient/mist-gold.png',
      green: '/components/ambient/mist-green.png',
      orange: '/components/ambient/mist-orange.png'
    }
  } as const,

  // ============================================================================
  // UTILITIES - Smart asset access functions
  // ============================================================================
  utils: {
    getEnvironment: (key: EnvironmentKey, variant: number = 1) => ({
      background: AssetMapper.environments[key].background.replace('1', variant.toString()),
      foreground: AssetMapper.environments[key].foreground?.replace('1', variant.toString())
    }),
    
    getRandomBook: () => {
      const books = AssetMapper.components.books.spines;
      return books[Math.floor(Math.random() * books.length)];
    },
    
    getMagicEffect: (color: MagicColor) => {
      const effects = AssetMapper.effects.magic[color];
      return effects ? effects[Math.floor(Math.random() * effects.length)] : null;
    },

    getRandomRuneSymbol: () => {
      const symbols = AssetMapper.ui.runes.symbols;
      return symbols[Math.floor(Math.random() * symbols.length)];
    },

    getRandomFloatingPlanet: () => {
      const planets = AssetMapper.structures.floating.planets;
      return planets[Math.floor(Math.random() * planets.length)];
    },

    getPageFrame: (style: 'A' | 'B' | 'C' | 'D' | 'E' = 'A') => {
      const frames = AssetMapper.components.books.pages[`frame${style}` as keyof typeof AssetMapper.components.books.pages];
      return Array.isArray(frames) ? frames[Math.floor(Math.random() * frames.length)] : frames;
    }
  }
} as const;

// ============================================================================
// TYPE EXPORTS - Full TypeScript support
// ============================================================================
export type AssetMap = typeof AssetMapper;
export type EnvironmentAssets = typeof AssetMapper.environments;
export type ComponentAssets = typeof AssetMapper.components;
export type IconAssets = typeof AssetMapper.icons;
export type EffectAssets = typeof AssetMapper.effects;