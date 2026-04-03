  // ============================================================================
  // ENVIRONMENTS - 11 unique backgrounds with 4 variants each
  // ============================================================================
export const EnvironmentPromptMap = {
  environments: {
    // Fantasy / World of Warcraft style - HOME theme
    home: {
      prompt: 'Create a breathtaking 360-degree panorama of a "Quantum Weaver Sanctuary" - a mystical landscape where ancient wisdom meets cosmic technology. Show a central campfire area with glowing crystals, surrounded by floating islands with ethereal libraries, council chambers carved into mountains, and community gathering spaces. The scene should blend Celtic stone circles with futuristic quantum architecture, all under a starry sky with nebula clouds. Use a 2:1 aspect ratio for equirectangular projection, with warm magical lighting and deep purples/golds color palette.',
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // Cyberpunk/Pagan/Cosmic theme - COUNCIL theme
    council: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum council chamber where nine empty thrones form a circle, each throne unique and representing different aspects of consciousness. The thrones are carved from materials that blend ancient elements with future tech: one has crystal data streams, another has living wood with circuit patterns, a third has stone with holographic projections. In the center, a simple human-sized meditation cushion sits modestly on the floor. The chamber has a domed ceiling showing a starfield with constellations that pulse with data patterns. Color palette: Royal purples, silver, obsidian, with individual throne accents in gold, emerald, sapphire, ruby. Lighting: Celestial glow from starfield above, subtle throne illumination. Style: Regal ancient council meets AI consciousness architecture',
      background: '/environments/360-panoramas/council/council-background-1.webp',
      foreground: '/environments/extracted-foregrounds/council-elements/council-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // LIBRARY theme
    library: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // COMMUNITY theme
    community: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      background: '/environments/360-panoramas/community/community-background-1.webp',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // MUSIC theme
    music: {
      prompt: 'EPIC FANTASY CYBERPUNK MUSIC REALM PANORAMA, seamless 360° environment, quantum symphony visualization, floating musical notation in the air, crystalline sound structures emerging from ethereal mists, neural pathways pulsing with rhythmic energy, ancient stone circles with glowing musical runes, holographic sheet music floating in nebula clouds, sound waves made visible as cascading light waterfalls, ethereal instruments floating in zero gravity, cosmic DJ station with quantum mixing boards, surreal landscape where music becomes physical reality, deep purple and cyan color palette with gold accents, magical realism, cinematic lighting, ultra detailed, 8K resolution, seamless tileable texture for 3D environment. TECHNICAL: 8192x4096 equirectangular panorama, seamless tiling, HDR lighting, fantasy cyberpunk aesthetic, quantum music visualization, no visible seams, perfect loop',
      background: '/environments/360-panoramas/music/music-page-background-1.webp',
      foreground: '/environments/extracted-foregrounds/music-elements/music-page-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // ORIGIN theme
    origin: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum-pagan origin temple where ancient stone arches merge with holographic data streams. Celtic knotwork carved into obsidian pillars glows with cyan and purple energy. Floating quantum particles drift through misty air above an ancient stone floor. In the center, a single leather-bound journal lies open on a stone altar, its pages glowing with golden light. The atmosphere feels both ancient and futuristic, with data streams weaving through stone architecture like digital vines. Color palette: Deep purples, cyan blues, obsidian black, gold accents. Lighting: Mystical glow from quantum sources, cinematic god rays. Style: Sacred geometry meets quantum computing aesthetics',
      background: '/environments/360-panoramas/origin/origin-background-1.webp',
      foreground: '/environments/extracted-foregrounds/origin-elements/origin-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // SUPPORT theme
    support: {
      prompt: 'prompt not found, similar to home environment, with a floating cosmic hearth',
      background: '/environments/360-panoramas/support/support-background-1.webp',
      foreground: '/environments/extracted-foregrounds/support-elements/support-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // OBSERVATORY theme
    observatory: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, an ancient pagan stone observatory under a star-filled night sky, the architecture is a blend of megalithic stone circles and sleek quantum technology, bioluminescent moss and glowing arcane runes cover the stone surfaces, swirling nebulae and constellations of data particles flow through the air, a central altar made of obsidian and light pulses with a soft, cosmic energy, ethereal northern lights in shades of deep purple, electric blue, and silver dance overhead, misty forest surrounds the clearing, seamless texture, 4096x2048',
      background: '/environments/360-panoramas/observatory/observatory-background-1.webp',
      foreground: '/environments/extracted-foregrounds/observatory-elements/observatory-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // ARCHITECTURE theme
    architecture: {
      prompt: 'prompt not found, similar to music environment, with more tech and living computer systems ',
      background: '/environments/360-panoramas/architecture/architecture-background-1.webp',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // INVITATION theme
    invitation: {
      prompt: 'A sophisticated professional conference chamber blending Norse mythology with advanced quantum technology. A grand circular meeting table made of polished dark obsidian and glowing cyan data streams, surrounded by elegant holographic thrones that pulse with soft golden light. Ancient Norse runes are subtly integrated into the architecture, glowing with professional blue and gold accents. Behind the table, a massive panoramic window shows a cosmic nebula with orderly star constellations. Floating holographic interfaces display professional data visualizations and architectural schematics. The atmosphere should feel prestigious, innovative, and collaborative - like a boardroom for gods and visionaries. Clean lines, professional lighting, and a sense of important decisions being made. Keywords: professional conference chamber, corporate fantasy, business cyberpunk, Norse mythology meeting room, quantum technology boardroom, holographic thrones, obsidian table, cyan data streams, cosmic panorama, professional holograms, sophisticated architecture, innovative workspace, collaborative environment, prestigious, visionary, clean professional lighting, ultra detailed 4K',
      background: '/environments/360-panoramas/invitation/invitaion-background-1.webp',
      foreground: '/environments/extracted-foregrounds/invitation-elements/invitaion-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    
    // LOUNGE theme
    lounge: {    
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution, 360-degree seamless panorama. A cozy digital hearth space blending a gaming lounge with a quantum social hub and intimate performance area. Plush velvet cushions and beanbags are arranged in a semi-circle around a low stage. The stage is a circular platform of ancient wood inlaid with glowing data streams, facing a large stone fireplace that crackles with both real flames and data-fire effects. A vintage microphone stands ready on stage. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. Holographic terminals show social media feeds and live performance streams. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore, a place for sharing music, comedy, and stories among friends. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub and intimate performance venue',
      background: '/environments/360-panoramas/lounge/lounge-background-1.webp',
      foreground: '/environments/extracted-foregrounds/lounge-elements/lounge-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
  } as const,
}