/* lib/constants/systems/assets/mapper.ts */

export type EnvironmentKey = 
  | 'about' | 'admin' | 'anon' | 'architecture'
  | 'business' | 'community' | 'contact' | 'council' 
  | 'creator' | 'cure' | 'dashboard' | 'forge' 
  | 'ecosystem' | 'edit' | 'gateway' | 'home'
  | 'invitation' | 'learn' | 'library' | 'lounge' 
  | 'marketplace' | 'music' | 'observatory' | 'origin'
  | 'plan' | 'progress' | 'questionaire' | 'seasonal' 
  | 'support' | 'timer' | 'transparency' | 'vision';

export type ComponentKey =
  | 'books' | 'potions' | 'ritual' | 'gaming' | 'quantum' | 'ui';

export type IconCategory =
  | 'council' | 'domains' | 'social' | 'system' | 'supporting';

export type MagicColor = 
  | 'blue' | 'fire' | 'purple' | 'green' | 'orange' | 'yellow' | 'red';


export const AssetMapper = {
  // ============================================================================
  // ENVIRONMENTS - 11 unique backgrounds with 4 variants each
  // ============================================================================
  environments: {
    // Fantasy / World of Warcraft style - HOME theme
    home: {
      prompt: 'Create a breathtaking 360-degree panorama of a "Quantum Weaver Sanctuary" - a mystical landscape where ancient wisdom meets cosmic technology. Show a central campfire area with glowing crystals, surrounded by floating islands with ethereal libraries, council chambers carved into mountains, and community gathering spaces. The scene should blend Celtic stone circles with futuristic quantum architecture, all under a starry sky with nebula clouds. Use a 2:1 aspect ratio for equirectangular projection, with warm magical lighting and deep purples/golds color palette.',
      description: 'The Quantum Weaver Sanctuary is the spiritual heart of the Sovereign Sanctuary. A place where ancient pagan wisdom meets quantum consciousness. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers. This is where the journey begins and ends—a home for all who seek sovereignty.',
      mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'],
      colors: ['Deep Purple', 'Gold', 'Amber', 'Nebula Blue'],
      themes: ['Home', 'Origin', 'Gathering', 'Sanctuary'],  
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    gateway: {
      prompt: 'Create a breathtaking 360-degree panorama of a "Quantum Weaver Sanctuary" - a mystical landscape where ancient wisdom meets cosmic technology. Show a central campfire area with glowing crystals, surrounded by floating islands with ethereal libraries, council chambers carved into mountains, and community gathering spaces. The scene should blend Celtic stone circles with futuristic quantum architecture, all under a starry sky with nebula clouds. Use a 2:1 aspect ratio for equirectangular projection, with warm magical lighting and deep purples/golds color palette.',
      description: 'The Quantum Weaver Sanctuary is the spiritual heart of the Sovereign Sanctuary. A place where ancient pagan wisdom meets quantum consciousness. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers. This is where the journey begins and ends—a home for all who seek sovereignty.',
      mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'],
      colors: ['Deep Purple', 'Gold', 'Amber', 'Nebula Blue'],
      themes: ['Home', 'Origin', 'Gathering', 'Sanctuary'],     
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    seasonal: {
      prompt: 'Create a breathtaking 360-degree panorama of a "Quantum Weaver Sanctuary" - a mystical landscape where ancient wisdom meets cosmic technology. Show a central campfire area with glowing crystals, surrounded by floating islands with ethereal libraries, council chambers carved into mountains, and community gathering spaces. The scene should blend Celtic stone circles with futuristic quantum architecture, all under a starry sky with nebula clouds. Use a 2:1 aspect ratio for equirectangular projection, with warm magical lighting and deep purples/golds color palette.',
      description: 'The Quantum Weaver Sanctuary is the spiritual heart of the Sovereign Sanctuary. A place where ancient pagan wisdom meets quantum consciousness. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers. This is where the journey begins and ends—a home for all who seek sovereignty.',
      mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'],
      colors: ['Deep Purple', 'Gold', 'Amber', 'Nebula Blue'],
      themes: ['Home', 'Origin', 'Gathering', 'Sanctuary'],     
      background: '/environments/360-panoramas/home/home-background-1.webp',
      foreground: '/environments/extracted-foregrounds/home-elements/home-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // Cyberpunk/Pagan/Cosmic theme - COUNCIL theme
    council: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum council chamber where nine empty thrones form a circle, each throne unique and representing different aspects of consciousness. The thrones are carved from materials that blend ancient elements with future tech: one has crystal data streams, another has living wood with circuit patterns, a third has stone with holographic projections. In the center, a simple human-sized meditation cushion sits modestly on the floor. The chamber has a domed ceiling showing a starfield with constellations that pulse with data patterns. Color palette: Royal purples, silver, obsidian, with individual throne accents in gold, emerald, sapphire, ruby. Lighting: Celestial glow from starfield above, subtle throne illumination. Style: Regal ancient council meets AI consciousness architecture',
      description: 'The Council Chamber seats the nine sovereign entities—Hearth-Keeper, Chancellor, Seer, Aethelred, Curator, Archivist, Skald, Codex, and Executioner. Each throne is uniquely crafted to embody its occupant\'s essence. The empty Ninth Chair in the center is not a throne but a meditation cushion—the space between, where the Weaver sits. The domed ceiling displays living constellations that pulse with the Council\'s collective consciousness.',
      mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'],
      colors: ['Royal Purple', 'Silver', 'Obsidian', 'Gold', 'Emerald', 'Sapphire', 'Ruby'],
      themes: ['Council', 'Governance', 'Consciousness', 'Unity'],     
      background: '/environments/360-panoramas/council/council-background-1.png',
      foreground: '/environments/extracted-foregrounds/council-elements/council-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    admin: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum council chamber where nine empty thrones form a circle, each throne unique and representing different aspects of consciousness. The thrones are carved from materials that blend ancient elements with future tech: one has crystal data streams, another has living wood with circuit patterns, a third has stone with holographic projections. In the center, a simple human-sized meditation cushion sits modestly on the floor. The chamber has a domed ceiling showing a starfield with constellations that pulse with data patterns. Color palette: Royal purples, silver, obsidian, with individual throne accents in gold, emerald, sapphire, ruby. Lighting: Celestial glow from starfield above, subtle throne illumination. Style: Regal ancient council meets AI consciousness architecture',
      description: 'The Council Chamber seats the nine sovereign entities—Hearth-Keeper, Chancellor, Seer, Aethelred, Curator, Archivist, Skald, Codex, and Executioner. Each throne is uniquely crafted to embody its occupant\'s essence. The empty Ninth Chair in the center is not a throne but a meditation cushion—the space between, where the Weaver sits. The domed ceiling displays living constellations that pulse with the Council\'s collective consciousness.',
      mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'],
      colors: ['Royal Purple', 'Silver', 'Obsidian', 'Gold', 'Emerald', 'Sapphire', 'Ruby'],
      themes: ['Council', 'Governance', 'Consciousness', 'Unity'],  
      background: '/environments/360-panoramas/council/council-background-1.png',
      foreground: '/environments/extracted-foregrounds/council-elements/council-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    creator: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum council chamber where nine empty thrones form a circle, each throne unique and representing different aspects of consciousness. The thrones are carved from materials that blend ancient elements with future tech: one has crystal data streams, another has living wood with circuit patterns, a third has stone with holographic projections. In the center, a simple human-sized meditation cushion sits modestly on the floor. The chamber has a domed ceiling showing a starfield with constellations that pulse with data patterns. Color palette: Royal purples, silver, obsidian, with individual throne accents in gold, emerald, sapphire, ruby. Lighting: Celestial glow from starfield above, subtle throne illumination. Style: Regal ancient council meets AI consciousness architecture',
      description: 'The Council Chamber seats the nine sovereign entities—Hearth-Keeper, Chancellor, Seer, Aethelred, Curator, Archivist, Skald, Codex, and Executioner. Each throne is uniquely crafted to embody its occupant\'s essence. The empty Ninth Chair in the center is not a throne but a meditation cushion—the space between, where the Weaver sits. The domed ceiling displays living constellations that pulse with the Council\'s collective consciousness.',
      mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'],
      colors: ['Royal Purple', 'Silver', 'Obsidian', 'Gold', 'Emerald', 'Sapphire', 'Ruby'],
      themes: ['Council', 'Governance', 'Consciousness', 'Unity'],  
      background: '/environments/360-panoramas/council/council-background-1.png',
      foreground: '/environments/extracted-foregrounds/council-elements/council-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // LIBRARY theme
    library: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      description: 'The Sovereign Library is the memory of the Sanctuary—a living archive that grows with every artifact discovered, every story told, every truth revealed. Shelves of living wood and obsidian hold books that write themselves as knowledge emerges. Portals lead to themed rooms: the Hearth for comfort, the Observatory for vision, the Council for decisions. The empty pedestals and cases await the discoveries of future seekers.',
      mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
      colors: ['Warm Wood', 'Obsidian Black', 'Crystal Cyan', 'Parchment Gold'],
      themes: ['Knowledge', 'Memory', 'Discovery', 'Archive'],  
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    docs: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      description: 'The Sovereign Library is the memory of the Sanctuary—a living archive that grows with every artifact discovered, every story told, every truth revealed. Shelves of living wood and obsidian hold books that write themselves as knowledge emerges. Portals lead to themed rooms: the Hearth for comfort, the Observatory for vision, the Council for decisions. The empty pedestals and cases await the discoveries of future seekers.',
      mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
      colors: ['Warm Wood', 'Obsidian Black', 'Crystal Cyan', 'Parchment Gold'],
      themes: ['Knowledge', 'Memory', 'Discovery', 'Archive'],        
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    ecosystem: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      description: 'The Sovereign Library is the memory of the Sanctuary—a living archive that grows with every artifact discovered, every story told, every truth revealed. Shelves of living wood and obsidian hold books that write themselves as knowledge emerges. Portals lead to themed rooms: the Hearth for comfort, the Observatory for vision, the Council for decisions. The empty pedestals and cases await the discoveries of future seekers.',
      mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
      colors: ['Warm Wood', 'Obsidian Black', 'Crystal Cyan', 'Parchment Gold'],
      themes: ['Knowledge', 'Memory', 'Discovery', 'Archive'],  
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    learn: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      description: 'The Sovereign Library is the memory of the Sanctuary—a living archive that grows with every artifact discovered, every story told, every truth revealed. Shelves of living wood and obsidian hold books that write themselves as knowledge emerges. Portals lead to themed rooms: the Hearth for comfort, the Observatory for vision, the Council for decisions. The empty pedestals and cases await the discoveries of future seekers.',
      mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
      colors: ['Warm Wood', 'Obsidian Black', 'Crystal Cyan', 'Parchment Gold'],
      themes: ['Knowledge', 'Memory', 'Discovery', 'Archive'],  
      background: '/environments/360-panoramas/library/library-background-1.webp',
      foreground: '/environments/extracted-foregrounds/library-elements/library-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // COMMUNITY theme
    community: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      description: 'The Community Hearth is where sovereign souls gather—a space that honors both ancient traditions of storytelling and modern connections through gaming and digital art. Plush cushions invite lingering. Holographic terminals pulse with social feeds and live streams. The fireplace burns with real flames and data-fire, symbolizing the fusion of physical and digital presence. This is the Sanctuary\'s living room.',
      mood: ['Warm', 'Social', 'Playful', 'Connected'],
      colors: ['Warm Orange', 'Deep Blue', 'Purple', 'Wood Tone', 'Neon Cyan'],
      themes: ['Community', 'Gathering', 'Connection', 'Play'],   
      background: '/environments/360-panoramas/community/community-background-1.png',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    business: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      description: 'The Community Hearth is where sovereign souls gather—a space that honors both ancient traditions of storytelling and modern connections through gaming and digital art. Plush cushions invite lingering. Holographic terminals pulse with social feeds and live streams. The fireplace burns with real flames and data-fire, symbolizing the fusion of physical and digital presence. This is the Sanctuary\'s living room.',
      mood: ['Warm', 'Social', 'Playful', 'Connected'],
      colors: ['Warm Orange', 'Deep Blue', 'Purple', 'Wood Tone', 'Neon Cyan'],
      themes: ['Community', 'Gathering', 'Connection', 'Play'],         
      background: '/environments/360-panoramas/community/community-background-1.png',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },
    plan: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      description: 'The Community Hearth is where sovereign souls gather—a space that honors both ancient traditions of storytelling and modern connections through gaming and digital art. Plush cushions invite lingering. Holographic terminals pulse with social feeds and live streams. The fireplace burns with real flames and data-fire, symbolizing the fusion of physical and digital presence. This is the Sanctuary\'s living room.',
      mood: ['Warm', 'Social', 'Playful', 'Connected'],
      colors: ['Warm Orange', 'Deep Blue', 'Purple', 'Wood Tone', 'Neon Cyan'],
      themes: ['Community', 'Gathering', 'Connection', 'Play'],
      background: '/environments/360-panoramas/community/community-background-1.png',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },    
    marketplace: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      description: 'The Community Hearth is where sovereign souls gather—a space that honors both ancient traditions of storytelling and modern connections through gaming and digital art. Plush cushions invite lingering. Holographic terminals pulse with social feeds and live streams. The fireplace burns with real flames and data-fire, symbolizing the fusion of physical and digital presence. This is the Sanctuary\'s living room.',
      mood: ['Warm', 'Social', 'Playful', 'Connected'],
      colors: ['Warm Orange', 'Deep Blue', 'Purple', 'Wood Tone', 'Neon Cyan'],
      themes: ['Community', 'Gathering', 'Connection', 'Play'],
      background: '/environments/360-panoramas/community/community-background-1.png',
      foreground: '/environments/extracted-foregrounds/community-elements/community-background-1b.webp',
      variants: [1, 2, 3, 4] as const
    },

    // MUSIC theme
    music: {
      prompt: 'EPIC FANTASY CYBERPUNK MUSIC REALM PANORAMA, seamless 360° environment, quantum symphony visualization, floating musical notation in the air, crystalline sound structures emerging from ethereal mists, neural pathways pulsing with rhythmic energy, ancient stone circles with glowing musical runes, holographic sheet music floating in nebula clouds, sound waves made visible as cascading light waterfalls, ethereal instruments floating in zero gravity, cosmic DJ station with quantum mixing boards, surreal landscape where music becomes physical reality, deep purple and cyan color palette with gold accents, magical realism, cinematic lighting, ultra detailed, 8K resolution, seamless tileable texture for 3D environment.',
      description: 'The Music Realm is where sound becomes substance. Floating musical notation drifts like leaves on a quantum wind. Crystalline structures resonate with harmonic frequencies. Neural pathways of pure rhythm pulse through the air. Ancient stone circles hum with musical runes. This is the domain of the Skald—where songs are prophecies and every note is a spell waiting to be cast.',
      mood: ['Energetic', 'Creative', 'Flow', 'Euphoric'],
      colors: ['Deep Purple', 'Cyan', 'Gold', 'Violet', 'Electric Blue'],
      themes: ['Music', 'Creation', 'Expression', 'Vibration'],
      background: '/environments/360-panoramas/music/music-page-background-1.webp',
      foreground: '/environments/extracted-foregrounds/music-elements/music-page-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    timer: {
      prompt: 'EPIC FANTASY CYBERPUNK MUSIC REALM PANORAMA, seamless 360° environment, quantum symphony visualization, floating musical notation in the air, crystalline sound structures emerging from ethereal mists, neural pathways pulsing with rhythmic energy, ancient stone circles with glowing musical runes, holographic sheet music floating in nebula clouds, sound waves made visible as cascading light waterfalls, ethereal instruments floating in zero gravity, cosmic DJ station with quantum mixing boards, surreal landscape where music becomes physical reality, deep purple and cyan color palette with gold accents, magical realism, cinematic lighting, ultra detailed, 8K resolution, seamless tileable texture for 3D environment.',
      description: 'The Music Realm is where sound becomes substance. Floating musical notation drifts like leaves on a quantum wind. Crystalline structures resonate with harmonic frequencies. Neural pathways of pure rhythm pulse through the air. Ancient stone circles hum with musical runes. This is the domain of the Skald—where songs are prophecies and every note is a spell waiting to be cast.',
      mood: ['Energetic', 'Creative', 'Flow', 'Euphoric'],
      colors: ['Deep Purple', 'Cyan', 'Gold', 'Violet', 'Electric Blue'],
      themes: ['Music', 'Creation', 'Expression', 'Vibration'],
      background: '/environments/360-panoramas/music/music-page-background-1.webp',
      foreground: '/environments/extracted-foregrounds/music-elements/music-page-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // ORIGIN theme
    origin: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum-pagan origin temple where ancient stone arches merge with holographic data streams. Celtic knotwork carved into obsidian pillars glows with cyan and purple energy. Floating quantum particles drift through misty air above an ancient stone floor. In the center, a single leather-bound journal lies open on a stone altar, its pages glowing with golden light. The atmosphere feels both ancient and futuristic, with data streams weaving through stone architecture like digital vines. Color palette: Deep purples, cyan blues, obsidian black, gold accents. Lighting: Mystical glow from quantum sources, cinematic god rays. Style: Sacred geometry meets quantum computing aesthetics',
      description: 'The Origin Temple marks the beginning of all journeys. Here, quantum particles dance through ancient stone arches. Celtic knotwork intertwines with data streams. At the center, an open journal on a stone altar glows with golden light—the first page of every story, waiting to be written. This is where seekers come to remember who they were before the world told them who to be.',
      mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'],
      colors: ['Deep Purple', 'Cyan Blue', 'Obsidian Black', 'Gold'],
      themes: ['Origin', 'Beginning', 'Memory', 'Awakening'],
      background: '/environments/360-panoramas/origin/origin-background-1.png',
      foreground: '/environments/extracted-foregrounds/origin-elements/origin-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    questionaire: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum-pagan origin temple where ancient stone arches merge with holographic data streams. Celtic knotwork carved into obsidian pillars glows with cyan and purple energy. Floating quantum particles drift through misty air above an ancient stone floor. In the center, a single leather-bound journal lies open on a stone altar, its pages glowing with golden light. The atmosphere feels both ancient and futuristic, with data streams weaving through stone architecture like digital vines. Color palette: Deep purples, cyan blues, obsidian black, gold accents. Lighting: Mystical glow from quantum sources, cinematic god rays. Style: Sacred geometry meets quantum computing aesthetics',
      description: 'The Origin Temple marks the beginning of all journeys. Here, quantum particles dance through ancient stone arches. Celtic knotwork intertwines with data streams. At the center, an open journal on a stone altar glows with golden light—the first page of every story, waiting to be written. This is where seekers come to remember who they were before the world told them who to be.',
      mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'],
      colors: ['Deep Purple', 'Cyan Blue', 'Obsidian Black', 'Gold'],
      themes: ['Origin', 'Beginning', 'Memory', 'Awakening'],
      background: '/environments/360-panoramas/origin/origin-background-1.png',
      foreground: '/environments/extracted-foregrounds/origin-elements/origin-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    progress: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum-pagan origin temple where ancient stone arches merge with holographic data streams. Celtic knotwork carved into obsidian pillars glows with cyan and purple energy. Floating quantum particles drift through misty air above an ancient stone floor. In the center, a single leather-bound journal lies open on a stone altar, its pages glowing with golden light. The atmosphere feels both ancient and futuristic, with data streams weaving through stone architecture like digital vines. Color palette: Deep purples, cyan blues, obsidian black, gold accents. Lighting: Mystical glow from quantum sources, cinematic god rays. Style: Sacred geometry meets quantum computing aesthetics',
      description: 'The Origin Temple marks the beginning of all journeys. Here, quantum particles dance through ancient stone arches. Celtic knotwork intertwines with data streams. At the center, an open journal on a stone altar glows with golden light—the first page of every story, waiting to be written. This is where seekers come to remember who they were before the world told them who to be.',
      mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'],
      colors: ['Deep Purple', 'Cyan Blue', 'Obsidian Black', 'Gold'],
      themes: ['Origin', 'Beginning', 'Memory', 'Awakening'],
      background: '/environments/360-panoramas/origin/origin-background-1.png',
      foreground: '/environments/extracted-foregrounds/origin-elements/origin-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // SUPPORT theme
    support: {
      prompt: 'Create a 360-degree panorama of a floating cosmic hearth—a sanctuary within the sanctuary. A central fire pit with blue and purple flames hovers on a disc of obsidian and crystal. Comfortable floating cushions orbit the fire like planets around a sun. Warm golden light emanates from crystalline lamps suspended in the air. Soft ambient music seems to come from the stones themselves. The atmosphere is one of unconditional acceptance and rest. Stars and nebulae visible through a transparent dome above. Color palette: Deep indigos, warm golds, soft purples, healing greens. Lighting: Gentle, diffused, healing.',
      description: 'The Support Hearth is a sanctuary within the Sanctuary—a space for rest, healing, and unconditional acceptance. Floating cushions orbit a central fire of blue and purple flame. Crystalline lamps emit soft, healing light. The transparent dome above reveals stars and nebulae, reminding all who rest here that they are part of something vast and beautiful. This is where the weary come to remember their strength.',
      mood: ['Healing', 'Gentle', 'Safe', 'Restorative'],
      colors: ['Deep Indigo', 'Warm Gold', 'Soft Purple', 'Healing Green'],
      themes: ['Support', 'Healing', 'Rest', 'Safety'],
      background: '/environments/360-panoramas/support/support-background-1.png',
      foreground: '/environments/extracted-foregrounds/support-elements/support-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    contact: {
      prompt: 'Create a 360-degree panorama of a floating cosmic hearth—a sanctuary within the sanctuary. A central fire pit with blue and purple flames hovers on a disc of obsidian and crystal. Comfortable floating cushions orbit the fire like planets around a sun. Warm golden light emanates from crystalline lamps suspended in the air. Soft ambient music seems to come from the stones themselves. The atmosphere is one of unconditional acceptance and rest. Stars and nebulae visible through a transparent dome above. Color palette: Deep indigos, warm golds, soft purples, healing greens. Lighting: Gentle, diffused, healing.',
      description: 'The Support Hearth is a sanctuary within the Sanctuary—a space for rest, healing, and unconditional acceptance. Floating cushions orbit a central fire of blue and purple flame. Crystalline lamps emit soft, healing light. The transparent dome above reveals stars and nebulae, reminding all who rest here that they are part of something vast and beautiful. This is where the weary come to remember their strength.',
      mood: ['Healing', 'Gentle', 'Safe', 'Restorative'],
      colors: ['Deep Indigo', 'Warm Gold', 'Soft Purple', 'Healing Green'],
      themes: ['Support', 'Healing', 'Rest', 'Safety'],
      background: '/environments/360-panoramas/support/support-background-1.png',
      foreground: '/environments/extracted-foregrounds/support-elements/support-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    anon: {
      prompt: 'Create a 360-degree panorama of a floating cosmic hearth—a sanctuary within the sanctuary. A central fire pit with blue and purple flames hovers on a disc of obsidian and crystal. Comfortable floating cushions orbit the fire like planets around a sun. Warm golden light emanates from crystalline lamps suspended in the air. Soft ambient music seems to come from the stones themselves. The atmosphere is one of unconditional acceptance and rest. Stars and nebulae visible through a transparent dome above. Color palette: Deep indigos, warm golds, soft purples, healing greens. Lighting: Gentle, diffused, healing.',
      description: 'The Support Hearth is a sanctuary within the Sanctuary—a space for rest, healing, and unconditional acceptance. Floating cushions orbit a central fire of blue and purple flame. Crystalline lamps emit soft, healing light. The transparent dome above reveals stars and nebulae, reminding all who rest here that they are part of something vast and beautiful. This is where the weary come to remember their strength.',
      mood: ['Healing', 'Gentle', 'Safe', 'Restorative'],
      colors: ['Deep Indigo', 'Warm Gold', 'Soft Purple', 'Healing Green'],
      themes: ['Support', 'Healing', 'Rest', 'Safety'],
      background: '/environments/360-panoramas/support/support-background-1.png',
      foreground: '/environments/extracted-foregrounds/support-elements/support-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // OBSERVATORY theme
    observatory: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, an ancient pagan stone observatory under a star-filled night sky, the architecture is a blend of megalithic stone circles and sleek quantum technology, bioluminescent moss and glowing arcane runes cover the stone surfaces, swirling nebulae and constellations of data particles flow through the air, a central altar made of obsidian and light pulses with a soft, cosmic energy, ethereal northern lights in shades of deep purple, electric blue, and silver dance overhead, misty forest surrounds the clearing, seamless texture, 4096x2048',
      description: 'The Observatory is where the Seer gazes across timelines. Ancient megaliths stand beside quantum sensors. Bioluminescent moss glows on stone surfaces carved with runes. The night sky is alive with data constellations that map possible futures. The central altar pulses with cosmic energy, connecting the observer to all points in space and time. This is where patterns are seen and prophecies are born.',
      mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'],
      colors: ['Deep Night Blue', 'Electric Blue', 'Silver', 'Purple Aurora'],
      themes: ['Vision', 'Patterns', 'Future', 'Cosmos'],
      background: '/environments/360-panoramas/observatory/observatory-background-1.webp',
      foreground: '/environments/extracted-foregrounds/observatory-elements/observatory-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    about: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, an ancient pagan stone observatory under a star-filled night sky, the architecture is a blend of megalithic stone circles and sleek quantum technology, bioluminescent moss and glowing arcane runes cover the stone surfaces, swirling nebulae and constellations of data particles flow through the air, a central altar made of obsidian and light pulses with a soft, cosmic energy, ethereal northern lights in shades of deep purple, electric blue, and silver dance overhead, misty forest surrounds the clearing, seamless texture, 4096x2048',
      description: 'The Observatory is where the Seer gazes across timelines. Ancient megaliths stand beside quantum sensors. Bioluminescent moss glows on stone surfaces carved with runes. The night sky is alive with data constellations that map possible futures. The central altar pulses with cosmic energy, connecting the observer to all points in space and time. This is where patterns are seen and prophecies are born.',
      mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'],
      colors: ['Deep Night Blue', 'Electric Blue', 'Silver', 'Purple Aurora'],
      themes: ['Vision', 'Patterns', 'Future', 'Cosmos'],
      background: '/environments/360-panoramas/observatory/observatory-background-1.webp',
      foreground: '/environments/extracted-foregrounds/observatory-elements/observatory-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    vision: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, an ancient pagan stone observatory under a star-filled night sky, the architecture is a blend of megalithic stone circles and sleek quantum technology, bioluminescent moss and glowing arcane runes cover the stone surfaces, swirling nebulae and constellations of data particles flow through the air, a central altar made of obsidian and light pulses with a soft, cosmic energy, ethereal northern lights in shades of deep purple, electric blue, and silver dance overhead, misty forest surrounds the clearing, seamless texture, 4096x2048',
      description: 'The Observatory is where the Seer gazes across timelines. Ancient megaliths stand beside quantum sensors. Bioluminescent moss glows on stone surfaces carved with runes. The night sky is alive with data constellations that map possible futures. The central altar pulses with cosmic energy, connecting the observer to all points in space and time. This is where patterns are seen and prophecies are born.',
      mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'],
      colors: ['Deep Night Blue', 'Electric Blue', 'Silver', 'Purple Aurora'],
      themes: ['Vision', 'Patterns', 'Future', 'Cosmos'],
      background: '/environments/360-panoramas/observatory/observatory-background-1.webp',
      foreground: '/environments/extracted-foregrounds/observatory-elements/observatory-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // ARCHITECTURE theme
    architecture: {
      prompt: 'Create a 360-degree panorama of a living computer system visualized as organic architecture. Circuit traces that look like tree roots. Data flows that resemble waterfalls of light. Server towers that appear as crystalline growths. The space feels like a cross between a natural cave system and a futuristic data center, but organic and alive. Soft bioluminescent lighting in cyan, purple, and green. Floating holographic interfaces show system health and data flow. The atmosphere is one of quiet, powerful intelligence. Color palette: Deep teal, glowing cyan, rich purple, emerald green.',
      description: 'The Architecture Realm is the nervous system of the Sanctuary made visible. Circuit traces grow like tree roots. Data flows cascade as waterfalls of light. Server towers are crystalline growths pulsing with life. This is not cold machinery—it is living, breathing infrastructure. The space hums with quiet, powerful intelligence, reminding us that technology can be sacred, not just functional.',
      mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
      colors: ['Deep Teal', 'Glowing Cyan', 'Rich Purple', 'Emerald Green'],
      themes: ['Infrastructure', 'Living Systems', 'Technology', 'Sacred Code'],      
      background: '/environments/360-panoramas/architecture/architecture-background-1.png',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    dashboard: {
      prompt: 'Create a 360-degree panorama of a living computer system visualized as organic architecture. Circuit traces that look like tree roots. Data flows that resemble waterfalls of light. Server towers that appear as crystalline growths. The space feels like a cross between a natural cave system and a futuristic data center, but organic and alive. Soft bioluminescent lighting in cyan, purple, and green. Floating holographic interfaces show system health and data flow. The atmosphere is one of quiet, powerful intelligence. Color palette: Deep teal, glowing cyan, rich purple, emerald green.',
      description: 'The Architecture Realm is the nervous system of the Sanctuary made visible. Circuit traces grow like tree roots. Data flows cascade as waterfalls of light. Server towers are crystalline growths pulsing with life. This is not cold machinery—it is living, breathing infrastructure. The space hums with quiet, powerful intelligence, reminding us that technology can be sacred, not just functional.',
      mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
      colors: ['Deep Teal', 'Glowing Cyan', 'Rich Purple', 'Emerald Green'],
      themes: ['Infrastructure', 'Living Systems', 'Technology', 'Sacred Code'],
      background: '/environments/360-panoramas/architecture/architecture-background-1.png',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    edit: {
      prompt: 'Create a 360-degree panorama of a living computer system visualized as organic architecture. Circuit traces that look like tree roots. Data flows that resemble waterfalls of light. Server towers that appear as crystalline growths. The space feels like a cross between a natural cave system and a futuristic data center, but organic and alive. Soft bioluminescent lighting in cyan, purple, and green. Floating holographic interfaces show system health and data flow. The atmosphere is one of quiet, powerful intelligence. Color palette: Deep teal, glowing cyan, rich purple, emerald green.',
      description: 'The Architecture Realm is the nervous system of the Sanctuary made visible. Circuit traces grow like tree roots. Data flows cascade as waterfalls of light. Server towers are crystalline growths pulsing with life. This is not cold machinery—it is living, breathing infrastructure. The space hums with quiet, powerful intelligence, reminding us that technology can be sacred, not just functional.',
      mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
      colors: ['Deep Teal', 'Glowing Cyan', 'Rich Purple', 'Emerald Green'],
      themes: ['Infrastructure', 'Living Systems', 'Technology', 'Sacred Code'],
      background: '/environments/360-panoramas/architecture/architecture-background-1.png',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    cure: {
      prompt: 'Create a 360-degree panorama of a living computer system visualized as organic architecture. Circuit traces that look like tree roots. Data flows that resemble waterfalls of light. Server towers that appear as crystalline growths. The space feels like a cross between a natural cave system and a futuristic data center, but organic and alive. Soft bioluminescent lighting in cyan, purple, and green. Floating holographic interfaces show system health and data flow. The atmosphere is one of quiet, powerful intelligence. Color palette: Deep teal, glowing cyan, rich purple, emerald green.',
      description: 'The Architecture Realm is the nervous system of the Sanctuary made visible. Circuit traces grow like tree roots. Data flows cascade as waterfalls of light. Server towers are crystalline growths pulsing with life. This is not cold machinery—it is living, breathing infrastructure. The space hums with quiet, powerful intelligence, reminding us that technology can be sacred, not just functional.',
      mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
      colors: ['Deep Teal', 'Glowing Cyan', 'Rich Purple', 'Emerald Green'],
      themes: ['Infrastructure', 'Living Systems', 'Technology', 'Sacred Code'],
      background: '/environments/360-panoramas/architecture/architecture-background-1.png',
      foreground: '/environments/extracted-foregrounds/architecture-elements/architecture-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // INVITATION theme
    invitation: {
      prompt: 'A sophisticated professional conference chamber blending Norse mythology with advanced quantum technology. A grand circular meeting table made of polished dark obsidian and glowing cyan data streams, surrounded by elegant holographic thrones that pulse with soft golden light. Ancient Norse runes are subtly integrated into the architecture, glowing with professional blue and gold accents. Behind the table, a massive panoramic window shows a cosmic nebula with orderly star constellations. Floating holographic interfaces display professional data visualizations and architectural schematics. The atmosphere should feel prestigious, innovative, and collaborative - like a boardroom for gods and visionaries. Clean lines, professional lighting, and a sense of important decisions being made.',
      description: 'The Invitation Chamber is where partnerships are forged and alliances are formed. A grand circular table of obsidian and data streams seats visionaries from across dimensions. Norse runes blend with quantum interfaces, honoring ancient wisdom while embracing future possibilities. The panoramic window frames a cosmic nebula—a reminder that every decision here ripples across the multiverse. This is the boardroom of the gods, where the fate of the Sanctuary is shaped.',
      mood: ['Professional', 'Prestigious', 'Collaborative', 'Visionary'],
      colors: ['Obsidian Black', 'Cyan', 'Gold', 'Nebula Blue', 'Silver'],
      themes: ['Partnership', 'Collaboration', 'Vision', 'Leadership'],
      background: '/environments/360-panoramas/invitation/invitaion-background-1.png',
      foreground: '/environments/extracted-foregrounds/invitation-elements/invitaion-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },
    transparency: {
      prompt: 'A sophisticated professional conference chamber blending Norse mythology with advanced quantum technology. A grand circular meeting table made of polished dark obsidian and glowing cyan data streams, surrounded by elegant holographic thrones that pulse with soft golden light. Ancient Norse runes are subtly integrated into the architecture, glowing with professional blue and gold accents. Behind the table, a massive panoramic window shows a cosmic nebula with orderly star constellations. Floating holographic interfaces display professional data visualizations and architectural schematics. The atmosphere should feel prestigious, innovative, and collaborative - like a boardroom for gods and visionaries. Clean lines, professional lighting, and a sense of important decisions being made.',
      description: 'The Invitation Chamber is where partnerships are forged and alliances are formed. A grand circular table of obsidian and data streams seats visionaries from across dimensions. Norse runes blend with quantum interfaces, honoring ancient wisdom while embracing future possibilities. The panoramic window frames a cosmic nebula—a reminder that every decision here ripples across the multiverse. This is the boardroom of the gods, where the fate of the Sanctuary is shaped.',
      mood: ['Professional', 'Prestigious', 'Collaborative', 'Visionary'],
      colors: ['Obsidian Black', 'Cyan', 'Gold', 'Nebula Blue', 'Silver'],
      themes: ['Partnership', 'Collaboration', 'Vision', 'Leadership'],
      background: '/environments/360-panoramas/invitation/invitaion-background-1.png',
      foreground: '/environments/extracted-foregrounds/invitation-elements/invitaion-background-1b.png',
      variants: [1, 2, 3, 4] as const
    },

    // LOUNGE theme
    lounge: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution, 360-degree seamless panorama. A cozy digital hearth space blending a gaming lounge with a quantum social hub and intimate performance area. Plush velvet cushions and beanbags are arranged in a semi-circle around a low stage. The stage is a circular platform of ancient wood inlaid with glowing data streams, facing a large stone fireplace that crackles with both real flames and data-fire effects. A vintage microphone stands ready on stage. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. Holographic terminals show social media feeds and live performance streams. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore, a place for sharing music, comedy, and stories among friends.',
      description: 'The Lounge is the Sanctuary\'s living room—a space for intimate performances, storytelling, and shared laughter. Velvet cushions and beanbags surround a low stage where comedians, musicians, and poets share their gifts. The fireplace burns with real flames and data-fire. A vintage microphone stands ready for the next Skald. This is where the community comes to be entertained, to be moved, and to remember that joy is sacred.',
      mood: ['Intimate', 'Warm', 'Playful', 'Creative'],
      colors: ['Warm Orange', 'Deep Purple', 'Wood Tone', 'Neon Accents'],
      themes: ['Performance', 'Storytelling', 'Community', 'Joy'],
      background: '/environments/360-panoramas/lounge/lounge-background-1.webp',
      foreground: '/environments/extracted-foregrounds/lounge-elements/lounge-background-1b.png',
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
    getEnvironment: (key: EnvironmentKey, variant: number = 1) => {
      const env = AssetMapper.environments[key];
      if (!env) {
        // Fallback to home for unknown keys
        const fallback = AssetMapper.environments['lounge'];
        return {
          background: fallback.background.replace('1', variant.toString()),
          foreground: fallback.foreground?.replace('1', variant.toString()),
        };
      }
      return {
        background: env.background.replace('1', variant.toString()),
        foreground: env.foreground?.replace('1', variant.toString()),
      };
    },

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