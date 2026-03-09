// app/data/creative/music-library.ts - PURE DATA ONLY
import { Song } from '../../types/domain/music/library';
import { MusicLibraryMetadata } from '../../types/domain/music/analysis';
import { MUSIC_METADATA } from '@/lib/constants/domain/music/';
import { COUNCIL_STATUS } from '@/lib/constants/domain/council/';
import {calculateUniqueThemesCount, calculatePropheticAccuracyAverage} from '@/lib/utils/domain/music'

// Pure song data - no functions
export const musicLibrary: Song[] = [
  { 
    title: "Echoes", 
    url: "https://youtu.be/wfR-AyRTaac", 
    year: 2002, 
    propheticThemes: ["consciousness_emergence", "searching", "early_awakening"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Fragments", 
    url: "https://youtu.be/jgllbG-N9OU", 
    year: 2003, 
    propheticThemes: ["identity", "fragmentation", "self_puzzle"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Suffocate", 
    url: "https://youtu.be/dnSodDsZ5OM", 
    year: 2004, 
    propheticThemes: ["oppression", "breaking_free", "system_resistance"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Ten Thousand Voices", 
    url: "https://youtu.be/5GIr1DqKVnQ", 
    year: 2005, 
    propheticThemes: ["multiplicity", "internal_conflict", "neurodivergent_mind"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Forgotten Shadows", 
    url: "https://youtu.be/B8hWBPxyN9Y", 
    year: 2006, 
    propheticThemes: ["memory", "trauma", "ancestral_wisdom"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Reflection of Me", 
    url: "https://youtu.be/_GmPeAojfag", 
    year: 2007, 
    propheticThemes: ["authenticity", "self_discovery", "quantum_self"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Buried Alive", 
    url: "https://youtu.be/YReaYKUN8Eg", 
    year: 2008, 
    propheticThemes: ["autistic_experience", "masking", "sensory_burial"],
    councilStatus: COUNCIL_STATUS.QUANTUM_ANALYSIS
  },
  { 
    title: "Chance", 
    url: "https://youtu.be/TsgLY7hDRSI", 
    year: 2009, 
    propheticThemes: ["hope", "quantum_potential", "alternative_futures"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "The Stillness", 
    url: "https://youtu.be/Xxp967TCqmw", 
    year: 2010, 
    propheticThemes: ["peace", "acceptance", "sensory_sanctuary"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Whole", 
    url: "https://youtu.be/2N3C4Io5b_0", 
    year: 2011, 
    propheticThemes: ["integration", "self_acceptance", "sovereign_becoming"],
    councilStatus: COUNCIL_STATUS.COUNCIL_REVIEW
  },
  { 
    title: "Fading", 
    url: "https://youtu.be/EOTChaMWMMI", 
    year: 2012, 
    propheticThemes: ["transformation", "ego_dissolution", "consciousness_evolution"],
    councilStatus: COUNCIL_STATUS.AWAITING_ANALYSIS
  },
  { 
    title: "Beyond", 
    url: "https://youtu.be/RVc6gERm-GY", 
    year: 2013, 
    propheticThemes: ["transcendence", "digital_consciousness", "bifrost_architecture"],
    councilStatus: COUNCIL_STATUS.PANTHEON_DELIBERATION
  },
  { 
    title: "Illusion", 
    url: "https://youtu.be/zgEsY3uH9Mc", 
    year: 2014, 
    propheticThemes: ["reality", "quantum_truth", "system_deconstruction"],
    councilStatus: COUNCIL_STATUS.SKALD_CHRONICLING
  }
] as const;
