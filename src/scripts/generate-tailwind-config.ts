// scripts/generate-tailwind-config.ts
// Generates tailwind.config.mjs from the single source of truth (colors.ts)
// Run: npx tsx scripts/generate-tailwind-config.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Paths
const COLORS_PATH = path.join(PROJECT_ROOT, 'src/lib/constants/cosmic/colors.ts');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'tailwind.config.mjs');

// Helper to convert hex to Tailwind format (remove #)
function toTailwindColor(hex: string): string {
  return hex.replace('#', '');
}

// Helper to check if a value is a valid color hex
function isColorHex(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('#') && value.length === 7;
}

// Helper to check if a value is a nested color object
function isColorObject(value: unknown): value is Record<string, string> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Generate the colors object for Tailwind
function generateTailwindColors(quantumColors: Record<string, unknown>): Record<string, unknown> {
  const colors: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(quantumColors)) {
    // Handle nested objects (like 'gold' with 50, 500, 900)
    if (isColorObject(value)) {
      const nestedColors: Record<string, string> = {};
      for (const [subKey, subValue] of Object.entries(value)) {
        if (isColorHex(subValue)) {
          nestedColors[subKey] = toTailwindColor(subValue);
        }
      }
      if (Object.keys(nestedColors).length > 0) {
        // Convert kebab-case to camelCase for Tailwind compatibility
        const tailwindKey = key.replace(/-/g, '_');
        colors[tailwindKey] = nestedColors;
      }
    }
    // Handle direct color values
    else if (isColorHex(value)) {
      // Convert kebab-case to camelCase for Tailwind compatibility
      const tailwindKey = key.replace(/\./g, '_').replace(/-/g, '_');
      colors[tailwindKey] = toTailwindColor(value);
    }
  }
  
  return colors;
}

// Generate the complete Tailwind config content
function generateConfigContent(colors: Record<string, unknown>): string {
  return `/** @type {import('tailwindcss').Config} */
// AUTO-GENERATED from src/lib/constants/cosmic/colors.ts
// Do not edit directly. Run 'npm run generate-tailwind-config' to update.

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================================
      // COLOR SYSTEM - Generated from colors.ts
      // ============================================================================
      colors: ${JSON.stringify(colors, null, 6)},

      // ============================================================================
      // TYPOGRAPHY SYSTEM
      // ============================================================================
      fontFamily: {
        'medieval': ['UnifrakturMaguntia', 'serif'],
        'arcane': ['Cinzel Decorative', 'serif'],
        'elegant': ['Crimson Text', 'serif'],
        'fantasy': ['MedievalSharp', 'cursive'],
        'runic': ['Elder Futhark', 'Futhark', 'serif'],
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },

      // ============================================================================
      // ANIMATION SYSTEM
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
        'parchment-crackle': 'parchmentCrackle 4s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'wave-slow': 'wave 1.8s ease-in-out infinite',
        'wave-fast': 'wave 0.8s ease-in-out infinite',
        // Reduced motion safe animations
        'float-safe': 'float 6s ease-in-out infinite',
      },

      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        cosmicFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(108, 92, 231, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(108, 92, 231, 0.8)' }
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
      // 3D & TRANSFORM UTILITIES
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
      // TRANSITION SYSTEM
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
      // SHADOW SYSTEM - Derived from colors
      // ============================================================================
      boxShadow: {
        'holographic': '0 0 40px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'panel': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)',
        'cosmic-glow': '0 0 60px rgba(34, 211, 238, 0.3)',
        'quantum-glow': '0 0 20px rgba(108, 92, 231, 0.5)',
        'quantum-glow-lg': '0 0 40px rgba(108, 92, 231, 0.3)',
        'fire-glow': '0 0 20px rgba(221, 107, 32, 0.5)',
        'success-glow': '0 0 20px rgba(0, 184, 148, 0.5)',
      },
    },
  },
  plugins: [],
  // Ensure animations are not purged
  safelist: [
    'animate-float', 'animate-glow', 'animate-scan', 'animate-glitch',
    'animate-cosmic-float', 'animate-spell-cast', 'animate-rune-pulse',
    'animate-tome-levitate', 'animate-parchment-crackle', 'animate-wave',
    'animate-wave-slow', 'animate-wave-fast'
  ],
}
`;
}

async function importColors(): Promise<Record<string, unknown>> {
  // Dynamic import with cache busting
  const timestamp = Date.now();
  const colorsModule = await import(`${COLORS_PATH}?t=${timestamp}`);
  return colorsModule.QUANTUM_COLORS;
}

async function main() {
  console.log('\n🔧 Generating Tailwind config from colors.ts...\n');
  
  try {
    // Import colors from the source file
    const quantumColors = await importColors();
    
    if (!quantumColors || Object.keys(quantumColors).length === 0) {
      throw new Error('Could not import QUANTUM_COLORS from colors.ts');
    }
    
    // Generate Tailwind colors object
    const tailwindColors = generateTailwindColors(quantumColors);
    
    // Generate full config content
    const configContent = generateConfigContent(tailwindColors);
    
    // Write to file
    fs.writeFileSync(OUTPUT_PATH, configContent, 'utf-8');
    
    console.log('✅ Generated tailwind.config.mjs');
    console.log(`   Colors mapped: ${Object.keys(tailwindColors).length}`);
    console.log('\n📁 Output:', OUTPUT_PATH);
    
  } catch (error) {
    console.error('❌ Error generating Tailwind config:', error);
    process.exit(1);
  }
}

main();