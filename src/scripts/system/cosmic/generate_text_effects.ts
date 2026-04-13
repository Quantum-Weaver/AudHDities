/* @/scripts/generators/cosmic/generateTextEffects.ts */
// ============================================================================
// GENERATE TEXT EFFECTS
// ============================================================================
// Purpose: Generate CSS text effect classes from motion and color constants
// Source Files: motion.ts, colors.ts (MOOD_COLORS, ENERGY_COLORS, PRIDE_COLORS)
// Output: src/styles/generated/text-effects.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { keyframes, durations, easing } from '@/lib/constants/cosmic/motion';
import { MOOD_COLORS, ENERGY_COLORS, PRIDE_COLORS, QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TextEffect {
  name: string;
  gradient?: { colors: string[]; direction?: string };
  animation?: { name: string; duration?: number; timing?: string };
  textShadow?: string;
  backgroundClip?: boolean;
  color?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert string to kebab-case for CSS class names
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert hex color to rgba for shadow effects
 */
function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Generate gradient string from color array
 */
function generateGradient(colors: string[], direction: string = 'to right'): string {
  const colorStops = colors.join(', ');
  return `linear-gradient(${direction}, ${colorStops})`;
}

/**
 * Generate animation string
 */
function generateAnimation(name: string, duration: number, timing: string, iteration: string = 'infinite'): string {
  return `${name} ${duration}ms ${timing} ${iteration}`;
}

// ============================================================================
// EFFECT GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate rainbow text effect
 */
function generateRainbowText(): string {
  const prideColors = Object.values(PRIDE_COLORS);
  const gradient = generateGradient(prideColors, 'to right');
  
  return `.rainbow-text {
  background: ${gradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbowFlow 8s linear infinite;
}

@keyframes rainbowFlow {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
`;
}

/**
 * Generate quantum weaver text effect
 */
function generateQuantumWeaverText(): string {
  const quantumColors = [
    QUANTUM_COLORS['quantum.purple'],
    QUANTUM_COLORS['neurospark'],
    QUANTUM_COLORS['cosmic.blue'],
    QUANTUM_COLORS['quantum.purple']
  ];
  const gradient = generateGradient(quantumColors, '135deg');
  
  return `.quantum-weaver-text {
  background: ${gradient};
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: quantumWeave 4s ease infinite;
  text-shadow: 0 0 20px ${hexToRgba(QUANTUM_COLORS['quantum.purple'], 0.3)};
}

@keyframes quantumWeave {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
`;
}

/**
 * Generate quantum entanglement text effect
 */
function generateQuantumEntanglementText(): string {
  const entanglementColors = [
    '#A855F7',
    '#EC489A',
    '#06B6D4',
    '#A855F7'
  ];
  const gradient = generateGradient(entanglementColors, '135deg');
  
  return `.quantum-entanglement-text {
  background: ${gradient};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: entanglementShift 3s ease-in-out infinite;
  filter: drop-shadow(0 0 15px ${hexToRgba('#A855F7', 0.3)});
}

@keyframes entanglementShift {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}
`;
}

/**
 * Generate quantum resonance text effect
 */
function generateQuantumResonanceText(): string {
  return `.quantum-resonance-text {
  color: #C084FC;
  text-shadow: 
    0 0 10px ${hexToRgba('#C084FC', 0.6)},
    0 0 20px ${hexToRgba('#C084FC', 0.4)},
    0 0 30px ${hexToRgba('#A855F7', 0.3)};
  animation: quantumResonance 2s ease-in-out infinite;
}

@keyframes quantumResonance {
  0%, 100% {
    text-shadow: 
      0 0 10px ${hexToRgba('#C084FC', 0.6)},
      0 0 20px ${hexToRgba('#C084FC', 0.4)};
    opacity: 0.9;
  }
  50% {
    text-shadow: 
      0 0 20px ${hexToRgba('#C084FC', 0.9)},
      0 0 40px ${hexToRgba('#A855F7', 0.7)},
      0 0 60px ${hexToRgba('#8B5CF6', 0.5)};
    opacity: 1;
  }
}
`;
}

/**
 * Generate elemental text effects (fire, water, air, earth)
 */
function generateElementalTextEffects(): string {
  return `/* Fire Text - Flickering flame */
.fire-text {
  color: #FF4500;
  text-shadow: 
    0 0 10px ${hexToRgba('#FF4500', 0.6)},
    0 0 20px ${hexToRgba('#FF4500', 0.4)},
    0 0 30px ${hexToRgba('#FF8C00', 0.3)};
  animation: fireFlicker 0.8s ease-in-out infinite;
}

@keyframes fireFlicker {
  0%, 100% {
    text-shadow: 
      0 0 8px ${hexToRgba('#FF4500', 0.7)},
      0 0 16px ${hexToRgba('#FF8C00', 0.5)};
  }
  25% {
    text-shadow: 
      0 0 12px ${hexToRgba('#FF4500', 0.9)},
      0 0 24px ${hexToRgba('#FF8C00', 0.7)},
      0 0 36px ${hexToRgba('#FF4500', 0.5)};
  }
  75% {
    text-shadow: 
      0 0 6px ${hexToRgba('#FF4500', 0.5)},
      0 0 12px ${hexToRgba('#FF8C00', 0.4)};
  }
}

/* Water Text - Flowing liquid */
.water-text {
  color: #1E90FF;
  text-shadow: 
    0 2px 8px ${hexToRgba('#1E90FF', 0.4)},
    0 -1px 4px ${hexToRgba('#00BFFF', 0.3)};
  background: linear-gradient(135deg, #1E90FF, #00BFFF, #1E90FF);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: waterFlow 3s ease-in-out infinite;
}

@keyframes waterFlow {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* Air Text - Ethereal drift */
.air-text {
  color: #87CEEB;
  text-shadow: 
    0 0 20px ${hexToRgba('#87CEEB', 0.6)},
    0 0 40px ${hexToRgba('#87CEEB', 0.3)};
  animation: airDrift 6s ease-in-out infinite;
}

@keyframes airDrift {
  0%, 100% {
    text-shadow: 0 0 20px ${hexToRgba('#87CEEB', 0.6)};
    transform: translateY(0px);
  }
  50% {
    text-shadow: 0 0 30px ${hexToRgba('#87CEEB', 0.8)};
    transform: translateY(-2px);
  }
}

/* Earth Text - Grounded stone */
.earth-text {
  color: #8B5A2B;
  text-shadow: 
    0 2px 5px ${hexToRgba('#3E260E', 0.3)},
    0 0 15px ${hexToRgba('#8B5A2B', 0.2)};
  background: linear-gradient(135deg, #8B5A2B, #C49A6C);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
`;
}

/**
 * Generate sparkle text effects
 */
function generateSparkleTextEffects(): string {
  return `/* Sparkle Text - Magical shimmer */
.sparkle-text {
  color: #F0F0F0;
  text-shadow: 
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px ${hexToRgba('#FFD700', 0.5)};
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px ${hexToRgba('#FFD700', 0.4)};
  }
  50% {
    text-shadow: 
      0 0 15px rgba(255, 255, 255, 1),
      0 0 25px ${hexToRgba('#FFD700', 0.8)};
  }
}

/* Star Dust Text - Gentle floating particles */
.stardust-text {
  background: linear-gradient(135deg, #F5F5DC, #E6E6FA, #FFD700, #E6E6FA, #F5F5DC);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: stardustFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 0 8px ${hexToRgba('#FFD700', 0.3)});
}

@keyframes stardustFloat {
  0%, 100% {
    background-position: 0% 50%;
    filter: drop-shadow(0 0 5px ${hexToRgba('#FFD700', 0.2)});
  }
  50% {
    background-position: 100% 50%;
    filter: drop-shadow(0 0 15px ${hexToRgba('#FFD700', 0.5)});
  }
}

/* Glitter Text - Sparkling celebration */
.glitter-text {
  background: linear-gradient(90deg, #FFD700, #FF69B4, #87CEEB, #FFD700);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: glitterFlow 3s linear infinite;
}

@keyframes glitterFlow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* Cosmic Sparkle - Deep space shimmer */
.cosmic-sparkle-text {
  color: #E0E0E0;
  text-shadow: 
    0 0 8px ${hexToRgba('#6C5CE7', 0.6)},
    0 0 15px ${hexToRgba('#6C5CE7', 0.4)},
    0 0 22px ${hexToRgba('#22D3EE', 0.3)};
  animation: cosmicSparkle 2.5s ease-in-out infinite;
}

@keyframes cosmicSparkle {
  0%, 100% {
    text-shadow: 0 0 5px ${hexToRgba('#6C5CE7', 0.5)};
  }
  25% {
    text-shadow: 
      0 0 12px ${hexToRgba('#6C5CE7', 0.8)},
      0 0 20px ${hexToRgba('#22D3EE', 0.5)};
  }
  75% {
    text-shadow: 
      0 0 8px ${hexToRgba('#22D3EE', 0.7)},
      0 0 15px ${hexToRgba('#6C5CE7', 0.5)};
  }
}
`;
}

/**
 * Generate pagan text effect (all four elements combined)
 */
function generatePaganText(): string {
  return `.pagan-text {
  background: linear-gradient(135deg, #8B5A2B 0%, #87CEEB 25%, #FF4500 50%, #1E90FF 75%, #8B5A2B 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: elementalCycle 12s ease infinite;
}

@keyframes elementalCycle {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
}

/**
 * Generate pride text effects
 */
function generatePrideTextEffects(): string {
  const prideColors = Object.values(PRIDE_COLORS);
  const rainbowGradient = generateGradient(prideColors.slice(0, 7), '90deg');
  
  // Trans pride gradient
  const transColors = ['#78D5E8', '#DA219F', '#FFFFFF', '#DA219F', '#78D5E8'];
  const transGradient = generateGradient(transColors, '90deg');
  
  return `.pride-rainbow-text {
  background: ${rainbowGradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbowFlow 8s linear infinite;
}

.pride-trans-text {
  background: ${transGradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbowFlow 6s linear infinite;
}

.quantum-pride-text {
  background: linear-gradient(135deg, #FF0000, #6C5CE7, #00FF00, #22D3EE, #800080);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: quantumWeave 4s ease infinite;
}
`;
}

/**
 * Generate mood-based text effects
 */
function generateMoodTextEffects(): string {
  let css = '';
  
  for (const [mood, color] of Object.entries(MOOD_COLORS)) {
    const className = `mood-${toKebabCase(mood)}-text`;
    const hexColor = color as string;
    
    css += `.${className} {
  color: ${hexColor};
  text-shadow: 0 0 10px ${hexToRgba(hexColor, 0.4)};
  transition: all 0.3s ease;
}

.${className}:hover {
  text-shadow: 0 0 20px ${hexToRgba(hexColor, 0.6)};
  transform: scale(1.02);
}

`;
  }
  
  return css;
}

/**
 * Generate energy-based text effects
 */
function generateEnergyTextEffects(): string {
  let css = '';
  
  for (const [energy, color] of Object.entries(ENERGY_COLORS)) {
    const className = `energy-${toKebabCase(energy)}-text`;
    const hexColor = color as string;
    
    css += `.${className} {
  color: ${hexColor};
  text-shadow: 0 0 10px ${hexToRgba(hexColor, 0.4)};
  animation: energyPulse 2s ease-in-out infinite;
}

`;
  }
  
  css += `@keyframes energyPulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; text-shadow: 0 0 20px currentColor; }
}
`;
  
  return css;
}

/**
 * Generate reduced motion safe versions of text effects
 */
function generateReducedMotionVariants(): string {
  return `@media (prefers-reduced-motion: reduce) {
  .rainbow-text,
  .quantum-weaver-text,
  .quantum-entanglement-text,
  .water-text,
  .air-text,
  .sparkle-text,
  .stardust-text,
  .glitter-text,
  .cosmic-sparkle-text,
  .pagan-text,
  .pride-rainbow-text,
  .pride-trans-text,
  .quantum-pride-text {
    animation: none;
    background-size: 100% 100%;
  }
  
  .fire-text {
    animation: none;
  }
  
  .quantum-resonance-text,
  .cosmic-sparkle-text {
    animation: none;
  }
  
  .energy-low-text,
  .energy-medium-text,
  .energy-high-text {
    animation: none;
  }
}
`;
}

/**
 * Combine all text effects into CSS string
 */
function combineTextEffects(): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * TEXT EFFECTS - Generated from motion.ts and colors.ts\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* RAINBOW & QUANTUM EFFECTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generateRainbowText();
  css += `\n`;
  css += generateQuantumWeaverText();
  css += `\n`;
  css += generateQuantumEntanglementText();
  css += `\n`;
  css += generateQuantumResonanceText();
  css += `\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* ELEMENTAL EFFECTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generateElementalTextEffects();
  css += `\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* SPARKLE & STARDUST EFFECTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generateSparkleTextEffects();
  css += `\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* PAGAN & PRIDE EFFECTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generatePaganText();
  css += `\n`;
  css += generatePrideTextEffects();
  css += `\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* MOOD & ENERGY EFFECTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generateMoodTextEffects();
  css += `\n`;
  css += generateEnergyTextEffects();
  css += `\n`;
  
  css += `/* ========================================================================== */\n`;
  css += `/* REDUCED MOTION VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  css += generateReducedMotionVariants();
  
  return css;
}

// ============================================================================
// HELPER FUNCTION FOR FILE WRITING
// ============================================================================

/**
 * Write generated CSS to file (handles dry-run)
 */
function writeGeneratedFile(
  filePath: string,
  content: string,
  options: CosmicGeneratorOptions
): boolean {
  const { dryRun, verbose } = options;
  const fullPath = path.join(process.cwd(), filePath);
  
  if (dryRun) {
    if (verbose) {
      logInfo(`[DRY RUN] Would write to: ${fullPath}`);
      logDebug(`  Content length: ${content.length} characters`);
    }
    return true;
  }
  
  try {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      logSuccess(`Written: ${fullPath}`);
    }
    return true;
  } catch (error) {
    logError(`Failed to write ${fullPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

/**
 * Generate text effects CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateTextEffects(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = 'src/styles/generated/text-effects.css';
  
  if (verbose) {
    logInfo('Generating text effects from motion and color constants...');
  }
  
  try {
    // Generate CSS content
    const cssContent = combineTextEffects();
    
    if (verbose) {
      logDebug(`Generated text effects CSS: ${cssContent.length} characters`);
    }
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Text effects generated: ${outputPath}`);
      logInfo(`  Generated classes: rainbow, quantum-weaver, fire, water, air, earth, sparkle, pagan, pride, mood, energy`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate text effects: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { TextEffect as TextEffectType };