// tailwind.config.mjs - UPDATED & CLEANED
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================================
      // STANDARDIZED COLOR SYSTEM - All HEX values
      // ============================================================================
      colors: {
        // Core Quantum Palette
        'quantum-purple': '#8B5CF6',
        'arcane-gold': '#F59E0B', 
        'neurospark': '#22D3EE',      // Fixed: was '#22d3ee' (inconsistent casing)
        'torch-gold': '#F59E0B',      // Fixed: was '#f59e0b'
        'hearth-orange': '#EA580C',
        'cosmic-blue': '#3B82F6',     // Fixed: was '#3b82f6'
        'magic-rune': '#00FF87',
        
        // Surface & Text Colors
        'star-dust': '#F3F4F6',
        'deep-space': '#1F2937',
        'surface': '#374151',
        'obsidian': '#1F2937',
        'velvet': '#4C1D95',
        
        // Material Colors
        'parchment': '#FEF3C7',
        'scroll-parchment': '#DAD1B7',
        'grimoire-cover': '#2C1810',
        'enchanted-silver': '#C0C0C0',
        'ancient-bronze': '#CD7F32',
        'ethereal': '#A78BFA',
        
        // Semantic Colors
        'fire-base': '#EA580C',
        'fire-dark': '#C2410C', 
        'sanctuary-green': '#10B981',
        
        // Gold Scale (consistent casing)
        'gold': {
          50: '#FFFBEB',
          500: '#F59E0B', 
          900: '#78350F'
        }
      },

      // ============================================================================
      // TYPOGRAPHY SYSTEM
      // ============================================================================
      fontFamily: {
        'medieval': ['UnifrakturMaguntia', 'serif'],
        'arcane': ['Cinzel Decorative', 'serif'],
        'elegant': ['Crimson Text', 'serif'],
        'fantasy': ['MedievalSharp', 'cursive'],
        'runic': ['Elder Futhark', 'Futhark', 'serif']
      },

      // ============================================================================
      // ANIMATION SYSTEM - Keep these, they're used in components
      // ============================================================================
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 8s linear infinite',
        'glitch': 'glitch 4s infinite',
        'cosmic-float': 'cosmicFloat 6s ease-in-out infinite',
        'spell-cast': 'spellCast 1s ease-out',
        'rune-pulse': 'runePulse 3s ease-in-out infinite',
        'tome-levitate': 'tomeLevitate 8s ease-in-out infinite',
        'parchment-crackle': 'parchmentCrackle 4s ease-in-out infinite'
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        cosmicFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }, // rgba for glow effects only
          '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        glitch: {
          '0%, 100%': { opacity: 0 },
          '2%, 64%': { opacity: 0 },
          '4%, 60%': { opacity: 0.1 },
          '62%': { opacity: 0.05 }
        },
        spellCast: {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: 0 },
          '50%': { transform: 'scale(1.1) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 }
        },
        runePulse: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' }
        },
        tomeLevitate: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' }
        },
        parchmentCrackle: {
          '0%, 100%': { filter: 'brightness(1) contrast(1)' },
          '50%': { filter: 'brightness(1.1) contrast(1.2)' }
        }
      },

      // ============================================================================
      // 3D & TRANSFORM UTILITIES - Keep these
      // ============================================================================
      transformStyle: {
        'preserve-3d': 'preserve-3d'
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px'
      },
      rotate: {
        '3d-x': 'rotateX(15deg)',
        '3d-y': 'rotateY(15deg)'
      },

      // ============================================================================
      // TRANSITION SYSTEM - Keep these
      // ============================================================================
      transitionDuration: {
        'quantum': '500ms',
        'holographic': '700ms',
        'control': '200ms'
      },
      transitionTimingFunction: {
        'quantum': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'holographic': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },

      // ============================================================================
      // SHADOW SYSTEM - Keep these (they use rgba for glow effects)
      // ============================================================================
      boxShadow: {
        'holographic': '0 0 40px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'panel': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
        'cosmic-glow': '0 0 60px rgba(34, 211, 238, 0.3)'
      },
    },
  },
  plugins: [],
}