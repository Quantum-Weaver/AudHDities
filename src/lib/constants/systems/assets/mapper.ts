// lib/constants/systems/assets/mapper.ts
export type EnvironmentKey = 
  | 'council' | 'library' | 'community' | 'music' 
  | 'origin' | 'support' | 'home' | 'observatory'
  | 'architecture' | 'invitation' | 'lounge' | 'cure' | 'gateway';

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
  // UTILITIES - Smart asset access functions
  // ============================================================================
  utils: {
    getEnvironment: (key: EnvironmentKey, variant: number = 1) => ({
      background: AssetMapper.environments[key].background.replace('1', variant.toString()),
      foreground: AssetMapper.environments[key].foreground?.replace('1', variant.toString())
    })
  }
} as const;

// ============================================================================
// TYPE EXPORTS - Full TypeScript support
// ============================================================================
export type AssetMap = typeof AssetMapper;
export type EnvironmentAssets = typeof AssetMapper.environments;
