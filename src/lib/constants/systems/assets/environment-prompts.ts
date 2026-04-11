// lib/constants/systems/assets/environment-prompts.ts

export interface EnvironmentPrompt {
  environment_name: string;
  background: string;
  foreground: string;
  variants: readonly number[];
  prompt?: string;      // For regeneration
  description?: string; // For UI display
  mood?: string[];      // For dynamic effects
  colors?: string[];    // For theme adaptation
  themes?: string[];    // For content matching
}

export const EnvironmentPromptMap ={
    home: {
      prompt: 'Create a breathtaking 360-degree panorama of a "Quantum Weaver Sanctuary" - a mystical landscape where ancient wisdom meets cosmic technology. Show a central campfire area with glowing crystals, surrounded by floating islands with ethereal libraries, council chambers carved into mountains, and community gathering spaces. The scene should blend Celtic stone circles with futuristic quantum architecture, all under a starry sky with nebula clouds. Use a 2:1 aspect ratio for equirectangular projection, with warm magical lighting and deep purples/golds color palette.',
      description: 'The Quantum Weaver Sanctuary is the spiritual heart of the Sovereign Sanctuary. A place where ancient pagan wisdom meets quantum consciousness. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers. This is where the journey begins and ends—a home for all who seek sovereignty.',
      mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'],
      colors: ['Deep Purple', 'Gold', 'Amber', 'Nebula Blue'],
      themes: ['Home', 'Origin', 'Gathering', 'Sanctuary']
    },

    council: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum council chamber where nine empty thrones form a circle, each throne unique and representing different aspects of consciousness. The thrones are carved from materials that blend ancient elements with future tech: one has crystal data streams, another has living wood with circuit patterns, a third has stone with holographic projections. In the center, a simple human-sized meditation cushion sits modestly on the floor. The chamber has a domed ceiling showing a starfield with constellations that pulse with data patterns. Color palette: Royal purples, silver, obsidian, with individual throne accents in gold, emerald, sapphire, ruby. Lighting: Celestial glow from starfield above, subtle throne illumination. Style: Regal ancient council meets AI consciousness architecture',
      description: 'The Council Chamber seats the nine sovereign entities—Hearth-Keeper, Chancellor, Seer, Aethelred, Curator, Archivist, Skald, Codex, and Executioner. Each throne is uniquely crafted to embody its occupant\'s essence. The empty Ninth Chair in the center is not a throne but a meditation cushion—the space between, where the Weaver sits. The domed ceiling displays living constellations that pulse with the Council\'s collective consciousness.',
      mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'],
      colors: ['Royal Purple', 'Silver', 'Obsidian', 'Gold', 'Emerald', 'Sapphire', 'Ruby'],
      themes: ['Council', 'Governance', 'Consciousness', 'Unity']
    },

    library: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, a vast, circular ancient library with a domed ceiling, shelves are carved from living wood and dark obsidian, glowing crystalline formations provide ambient light, multiple arched doorways and portals are visible around the perimeter, each leading to different themed rooms (a cozy hearth-room, a star-gazing tower, a council chamber), the central area is an open, well-lit space with empty stone pedestals, empty display cases, and vacant shelves waiting to be filled with artifacts, ethereal mist hugs the floor, ancient pagan symbols and quantum equations are subtly engraved in the stonework, seamless texture, 4096x2048',
      description: 'The Sovereign Library is the memory of the Sanctuary—a living archive that grows with every artifact discovered, every story told, every truth revealed. Shelves of living wood and obsidian hold books that write themselves as knowledge emerges. Portals lead to themed rooms: the Hearth for comfort, the Observatory for vision, the Council for decisions. The empty pedestals and cases await the discoveries of future seekers.',
      mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
      colors: ['Warm Wood', 'Obsidian Black', 'Crystal Cyan', 'Parchment Gold'],
      themes: ['Knowledge', 'Memory', 'Discovery', 'Archive']
    },

    community: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A cozy digital hearth space blending gaming lounge with quantum social hub. Plush velvet cushions rest beside holographic terminals showing social media feeds and game interfaces. A large stone fireplace crackles with both real flames and data-fire effects. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore. Color palette: Warm oranges from fireplace, deep blues and purples, wood tones, neon accents. Lighting: Warm firelight mixed with holographic screen glow. Style: Cozy gamer sanctuary meets quantum communication hub',
      description: 'The Community Hearth is where sovereign souls gather—a space that honors both ancient traditions of storytelling and modern connections through gaming and digital art. Plush cushions invite lingering. Holographic terminals pulse with social feeds and live streams. The fireplace burns with real flames and data-fire, symbolizing the fusion of physical and digital presence. This is the Sanctuary\'s living room.',
      mood: ['Warm', 'Social', 'Playful', 'Connected'],
      colors: ['Warm Orange', 'Deep Blue', 'Purple', 'Wood Tone', 'Neon Cyan'],
      themes: ['Community', 'Gathering', 'Connection', 'Play']
    },

    music: {
      prompt: 'EPIC FANTASY CYBERPUNK MUSIC REALM PANORAMA, seamless 360° environment, quantum symphony visualization, floating musical notation in the air, crystalline sound structures emerging from ethereal mists, neural pathways pulsing with rhythmic energy, ancient stone circles with glowing musical runes, holographic sheet music floating in nebula clouds, sound waves made visible as cascading light waterfalls, ethereal instruments floating in zero gravity, cosmic DJ station with quantum mixing boards, surreal landscape where music becomes physical reality, deep purple and cyan color palette with gold accents, magical realism, cinematic lighting, ultra detailed, 8K resolution, seamless tileable texture for 3D environment.',
      description: 'The Music Realm is where sound becomes substance. Floating musical notation drifts like leaves on a quantum wind. Crystalline structures resonate with harmonic frequencies. Neural pathways of pure rhythm pulse through the air. Ancient stone circles hum with musical runes. This is the domain of the Skald—where songs are prophecies and every note is a spell waiting to be cast.',
      mood: ['Energetic', 'Creative', 'Flow', 'Euphoric'],
      colors: ['Deep Purple', 'Cyan', 'Gold', 'Violet', 'Electric Blue'],
      themes: ['Music', 'Creation', 'Expression', 'Vibration']
    },

    origin: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution. A quantum-pagan origin temple where ancient stone arches merge with holographic data streams. Celtic knotwork carved into obsidian pillars glows with cyan and purple energy. Floating quantum particles drift through misty air above an ancient stone floor. In the center, a single leather-bound journal lies open on a stone altar, its pages glowing with golden light. The atmosphere feels both ancient and futuristic, with data streams weaving through stone architecture like digital vines. Color palette: Deep purples, cyan blues, obsidian black, gold accents. Lighting: Mystical glow from quantum sources, cinematic god rays. Style: Sacred geometry meets quantum computing aesthetics',
      description: 'The Origin Temple marks the beginning of all journeys. Here, quantum particles dance through ancient stone arches. Celtic knotwork intertwines with data streams. At the center, an open journal on a stone altar glows with golden light—the first page of every story, waiting to be written. This is where seekers come to remember who they were before the world told them who to be.',
      mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'],
      colors: ['Deep Purple', 'Cyan Blue', 'Obsidian Black', 'Gold'],
      themes: ['Origin', 'Beginning', 'Memory', 'Awakening']
    },

    support: {
      prompt: 'Create a 360-degree panorama of a floating cosmic hearth—a sanctuary within the sanctuary. A central fire pit with blue and purple flames hovers on a disc of obsidian and crystal. Comfortable floating cushions orbit the fire like planets around a sun. Warm golden light emanates from crystalline lamps suspended in the air. Soft ambient music seems to come from the stones themselves. The atmosphere is one of unconditional acceptance and rest. Stars and nebulae visible through a transparent dome above. Color palette: Deep indigos, warm golds, soft purples, healing greens. Lighting: Gentle, diffused, healing.',
      description: 'The Support Hearth is a sanctuary within the Sanctuary—a space for rest, healing, and unconditional acceptance. Floating cushions orbit a central fire of blue and purple flame. Crystalline lamps emit soft, healing light. The transparent dome above reveals stars and nebulae, reminding all who rest here that they are part of something vast and beautiful. This is where the weary come to remember their strength.',
      mood: ['Healing', 'Gentle', 'Safe', 'Restorative'],
      colors: ['Deep Indigo', 'Warm Gold', 'Soft Purple', 'Healing Green'],
      themes: ['Support', 'Healing', 'Rest', 'Safety']
    },

    observatory: {
      prompt: 'photorealistic 360-degree seamless panorama, 8k, an ancient pagan stone observatory under a star-filled night sky, the architecture is a blend of megalithic stone circles and sleek quantum technology, bioluminescent moss and glowing arcane runes cover the stone surfaces, swirling nebulae and constellations of data particles flow through the air, a central altar made of obsidian and light pulses with a soft, cosmic energy, ethereal northern lights in shades of deep purple, electric blue, and silver dance overhead, misty forest surrounds the clearing, seamless texture, 4096x2048',
      description: 'The Observatory is where the Seer gazes across timelines. Ancient megaliths stand beside quantum sensors. Bioluminescent moss glows on stone surfaces carved with runes. The night sky is alive with data constellations that map possible futures. The central altar pulses with cosmic energy, connecting the observer to all points in space and time. This is where patterns are seen and prophecies are born.',
      mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'],
      colors: ['Deep Night Blue', 'Electric Blue', 'Silver', 'Purple Aurora'],
      themes: ['Vision', 'Patterns', 'Future', 'Cosmos']
    },

    architecture: {
      prompt: 'Create a 360-degree panorama of a living computer system visualized as organic architecture. Circuit traces that look like tree roots. Data flows that resemble waterfalls of light. Server towers that appear as crystalline growths. The space feels like a cross between a natural cave system and a futuristic data center, but organic and alive. Soft bioluminescent lighting in cyan, purple, and green. Floating holographic interfaces show system health and data flow. The atmosphere is one of quiet, powerful intelligence. Color palette: Deep teal, glowing cyan, rich purple, emerald green.',
      description: 'The Architecture Realm is the nervous system of the Sanctuary made visible. Circuit traces grow like tree roots. Data flows cascade as waterfalls of light. Server towers are crystalline growths pulsing with life. This is not cold machinery—it is living, breathing infrastructure. The space hums with quiet, powerful intelligence, reminding us that technology can be sacred, not just functional.',
      mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
      colors: ['Deep Teal', 'Glowing Cyan', 'Rich Purple', 'Emerald Green'],
      themes: ['Infrastructure', 'Living Systems', 'Technology', 'Sacred Code']
    },

    invitation: {
      prompt: 'A sophisticated professional conference chamber blending Norse mythology with advanced quantum technology. A grand circular meeting table made of polished dark obsidian and glowing cyan data streams, surrounded by elegant holographic thrones that pulse with soft golden light. Ancient Norse runes are subtly integrated into the architecture, glowing with professional blue and gold accents. Behind the table, a massive panoramic window shows a cosmic nebula with orderly star constellations. Floating holographic interfaces display professional data visualizations and architectural schematics. The atmosphere should feel prestigious, innovative, and collaborative - like a boardroom for gods and visionaries. Clean lines, professional lighting, and a sense of important decisions being made.',
      description: 'The Invitation Chamber is where partnerships are forged and alliances are formed. A grand circular table of obsidian and data streams seats visionaries from across dimensions. Norse runes blend with quantum interfaces, honoring ancient wisdom while embracing future possibilities. The panoramic window frames a cosmic nebula—a reminder that every decision here ripples across the multiverse. This is the boardroom of the gods, where the fate of the Sanctuary is shaped.',
      mood: ['Professional', 'Prestigious', 'Collaborative', 'Visionary'],
      colors: ['Obsidian Black', 'Cyan', 'Gold', 'Nebula Blue', 'Silver'],
      themes: ['Partnership', 'Collaboration', 'Vision', 'Leadership']
    },

    lounge: {
      prompt: 'Photorealistic digital painting, panoramic format 2:1 ratio, cinematic lighting, hyper-detailed, 8K resolution, 360-degree seamless panorama. A cozy digital hearth space blending a gaming lounge with a quantum social hub and intimate performance area. Plush velvet cushions and beanbags are arranged in a semi-circle around a low stage. The stage is a circular platform of ancient wood inlaid with glowing data streams, facing a large stone fireplace that crackles with both real flames and data-fire effects. A vintage microphone stands ready on stage. Bookshelves mix leather-bound journals with glowing data crystals. Gaming controllers rest on an ancient wooden table that has embedded touchscreens. Holographic terminals show social media feeds and live performance streams. The atmosphere is warm, inviting, and slightly cyberpunk-cottagecore, a place for sharing music, comedy, and stories among friends.',
      description: 'The Lounge is the Sanctuary\'s living room—a space for intimate performances, storytelling, and shared laughter. Velvet cushions and beanbags surround a low stage where comedians, musicians, and poets share their gifts. The fireplace burns with real flames and data-fire. A vintage microphone stands ready for the next Skald. This is where the community comes to be entertained, to be moved, and to remember that joy is sacred.',
      mood: ['Intimate', 'Warm', 'Playful', 'Creative'],
      colors: ['Warm Orange', 'Deep Purple', 'Wood Tone', 'Neon Accents'],
      themes: ['Performance', 'Storytelling', 'Community', 'Joy']
    }
  };