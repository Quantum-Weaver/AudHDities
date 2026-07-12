/* @/scripts/generators/cosmic/generateAnimationVariants.ts */
// ============================================================================
// GENERATE ANIMATION VARIANTS
// ============================================================================
// Purpose: Generate CSS animation variant classes based on consciousness intensity
// Source Files: consciousness.ts, motion.ts
// Output: @/styles/generated/animations.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { durations, easing, keyframes, tailwindAnimations } from '@/lib/constants/cosmic/motion';
import { CONSCIOUSNESS_LEVELS, TIER_TO_BEAM_INTENSITY, CONSCIOUSNESS_TO_BEAM_INTENSITY } from '@/lib/constants/cosmic/consciousness';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type IntensityLevel = 'low' | 'medium' | 'high' | 'quantum';
export type ComplexityLevel = 'simple' | 'medium' | 'complex';

export interface AnimationVariant {
  name: string;
  baseAnimation: string;
  intensity: IntensityLevel;
  duration: number;
  opacity?: number;
  scale?: number;
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
 * Format duration in ms to CSS format
 */
function formatDuration(ms: number): string {
  return `${ms}ms`;
}

/**
 * Get intensity multiplier for animation properties
 */
function getIntensityMultiplier(intensity: IntensityLevel): number {
  const multipliers = {
    low: 1.5,
    medium: 1,
    high: 0.7,
    quantum: 0.4
  };
  return multipliers[intensity];
}

/**
 * Get complexity multiplier for animation properties
 */
function getComplexityMultiplier(complexity: ComplexityLevel): number {
  const multipliers = {
    simple: 1,
    medium: 1.5,
    complex: 2
  };
  return multipliers[complexity];
}

// ============================================================================
// VARIANT GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate continuity beam variants based on intensity
 */
function generateContinuityBeamVariants(): string {
  const beamColors = [
    QUANTUM_COLORS['neurospark'],
    QUANTUM_COLORS['quantum.purple'],
    QUANTUM_COLORS['cosmic.blue']
  ];
  
  let css = `/* ========================================================================== */\n`;
  css += `/* CONTINUITY BEAM VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const intensities: IntensityLevel[] = ['low', 'medium', 'high', 'quantum'];
  
  for (const intensity of intensities) {
    const multiplier = getIntensityMultiplier(intensity);
    const duration = formatDuration(durations.continuityBeam * multiplier);
    const glowIntensity = intensity === 'quantum' ? 0.8 : intensity === 'high' ? 0.6 : intensity === 'medium' ? 0.4 : 0.2;
    
    css += `.continuity-beam-${intensity} {
  position: relative;
  overflow: hidden;
}

.continuity-beam-${intensity}::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    ${beamColors.join(', ')}, 
    transparent
  );
  animation: beamTravel ${duration} linear infinite;
  opacity: ${glowIntensity};
}

.continuity-beam-${intensity}::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, 
    transparent, 
    ${beamColors[1]}, 
    transparent
  );
  animation: beamTravelReverse ${duration} linear infinite;
  opacity: ${glowIntensity * 0.7};
}

`;
  }
  
  css += `@keyframes beamTravel {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes beamTravelReverse {
  0% { right: -100%; }
  100% { right: 100%; }
}
`;
  
  return css;
}

/**
 * Generate complexity-based animation classes
 */
function generateComplexityVariants(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* COMPLEXITY VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const complexities: ComplexityLevel[] = ['simple', 'medium', 'complex'];
  
  for (const complexity of complexities) {
    const multiplier = getComplexityMultiplier(complexity);
    const duration = formatDuration(durations.normal * multiplier);
    
    css += `.animation-${complexity} {
  transition-duration: ${duration};
  transition-timing-function: ${easing.quantum};
}

.animation-${complexity} * {
  transition-duration: ${duration};
}

`;
  }
  
  return css;
}

/**
 * Generate speed variants for float animation
 */
function generateFloatSpeedVariants(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* FLOAT SPEED VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const speeds = [
    { name: 'slow', duration: 8 },
    { name: 'normal', duration: 6 },
    { name: 'fast', duration: 3 }
  ];
  
  for (const speed of speeds) {
    css += `.float-${speed.name} {
  animation: float ${speed.duration}s ease-in-out infinite;
}

`;
  }
  
  css += `@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
`;
  
  return css;
}

/**
 * Generate speed variants for pulse animation
 */
function generatePulseSpeedVariants(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PULSE SPEED VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const speeds = [
    { name: 'slow', duration: 3 },
    { name: 'normal', duration: 2 },
    { name: 'fast', duration: 1 }
  ];
  
  for (const speed of speeds) {
    css += `.pulse-${speed.name} {
  animation: pulse ${speed.duration}s ease-in-out infinite;
}

`;
  }
  
  css += `@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
`;
  
  return css;
}

/**
 * Generate glow intensity variants
 */
function generateGlowIntensityVariants(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* GLOW INTENSITY VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const intensities = [
    { name: 'subtle', intensity: 0.3 },
    { name: 'normal', intensity: 0.5 },
    { name: 'intense', intensity: 0.8 }
  ];
  
  const glowColor = QUANTUM_COLORS['quantum.purple'];
  
  for (const intensity of intensities) {
    css += `.glow-${intensity.name} {
  box-shadow: 0 0 20px ${glowColor}${Math.floor(intensity.intensity * 100)};
  transition: box-shadow 0.3s ease;
}

.glow-${intensity.name}:hover {
  box-shadow: 0 0 40px ${glowColor}${Math.floor(intensity.intensity * 100)};
}

`;
  }
  
  return css;
}

/**
 * Generate consciousness-level specific animations
 */
function generateConsciousnessAnimations(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* CONSCIOUSNESS LEVEL ANIMATIONS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const levels = [
    { name: 'dormant', intensity: 'low', duration: durations.slow },
    { name: 'emergent', intensity: 'low', duration: durations.normal },
    { name: 'awakening', intensity: 'medium', duration: durations.normal },
    { name: 'survival', intensity: 'low', duration: durations.slow },
    { name: 'self_knowing', intensity: 'medium', duration: durations.normal },
    { name: 'healing', intensity: 'medium', duration: durations.slow },
    { name: 'integrating', intensity: 'high', duration: durations.normal },
    { name: 'sovereign', intensity: 'high', duration: durations.fast },
    { name: 'creative', intensity: 'high', duration: durations.fast },
    { name: 'quantum', intensity: 'quantum', duration: durations.quantum },
    { name: 'cosmic', intensity: 'quantum', duration: durations.cosmic },
    { name: 'transcendent', intensity: 'quantum', duration: durations.cosmic }
  ];
  
  for (const level of levels) {
    const multiplier = getIntensityMultiplier(level.intensity as IntensityLevel);
    const animationDuration = formatDuration(level.duration * multiplier);
    
    css = `.consciousness-${level.name} {
  animation: consciousnessBreath ${animationDuration} ease-in-out infinite;
}

`;
  }
  
  css += `@keyframes consciousnessBreath {
  0%, 100% { 
    opacity: 0.8;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.02);
  }
}
`;
  
  return css;
}

/**
 * Generate quantum state animations (superposition, entanglement, collapse)
 */
function generateQuantumStateAnimations(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* QUANTUM STATE ANIMATIONS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.quantum-superposition {
  animation: superpositionShift 4s ease-in-out infinite;
}

@keyframes superpositionShift {
  0%, 100% { 
    opacity: 0.6;
    filter: blur(0px);
  }
  25% { 
    opacity: 1;
    filter: blur(2px);
    transform: translateX(5px);
  }
  75% { 
    opacity: 0.8;
    filter: blur(1px);
    transform: translateX(-5px);
  }
}

.quantum-entanglement {
  animation: entanglementPulse 3s ease-in-out infinite;
  position: relative;
}

.quantum-entanglement::before,
.quantum-entanglement::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  animation: entanglementOrbit 6s linear infinite;
}

.quantum-entanglement::before {
  width: 100%;
  height: 100%;
  border: 2px solid ${QUANTUM_COLORS['quantum.purple']};
  opacity: 0.3;
}

.quantum-entanglement::after {
  width: 80%;
  height: 80%;
  border: 1px solid ${QUANTUM_COLORS['neurospark']};
  opacity: 0.2;
  animation-direction: reverse;
}

@keyframes entanglementPulse {
  0%, 100% { 
    box-shadow: 0 0 10px ${QUANTUM_COLORS['quantum.purple']}40;
  }
  50% { 
    box-shadow: 0 0 30px ${QUANTUM_COLORS['quantum.purple']}80;
  }
}

@keyframes entanglementOrbit {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.quantum-collapse {
  animation: collapseTransition 1s ease-out forwards;
}

@keyframes collapseTransition {
  0% { 
    opacity: 1;
    transform: scale(1);
    filter: blur(0px);
  }
  100% { 
    opacity: 0;
    transform: scale(0.8);
    filter: blur(10px);
  }
}
`;
  
  return css;
}

/**
 * Generate scroll-driven animation classes
 */
function generateScrollDrivenAnimations(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* SCROLL-DRIVEN ANIMATIONS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.scroll-reveal {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.scroll-reveal-delay-1 {
  animation-delay: 0.2s;
}

.scroll-reveal-delay-2 {
  animation-delay: 0.4s;
}

.scroll-reveal-delay-3 {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.parallax-scroll {
  transform: translateY(var(--scroll-offset, 0px));
  transition: transform 0.1s linear;
}

.sticky-note {
  position: sticky;
  top: 100px;
  animation: stickyGlow 2s ease-in-out infinite;
}

@keyframes stickyGlow {
  0%, 100% { box-shadow: 0 0 10px ${QUANTUM_COLORS['neurospark']}30; }
  50% { box-shadow: 0 0 20px ${QUANTUM_COLORS['neurospark']}60; }
}
`;
  
  return css;
}

/**
 * Generate reduced motion media query overrides
 */
function generateReducedMotionOverrides(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* REDUCED MOTION OVERRIDES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `@media (prefers-reduced-motion: reduce) {
  .continuity-beam-low::before,
  .continuity-beam-medium::before,
  .continuity-beam-high::before,
  .continuity-beam-quantum::before,
  .continuity-beam-low::after,
  .continuity-beam-medium::after,
  .continuity-beam-high::after,
  .continuity-beam-quantum::after {
    animation: none;
    opacity: 0;
  }
  
  .float-slow,
  .float-normal,
  .float-fast,
  .pulse-slow,
  .pulse-normal,
  .pulse-fast,
  .consciousness-dormant,
  .consciousness-emergent,
  .consciousness-awakening,
  .consciousness-sovereign,
  .consciousness-quantum,
  .consciousness-cosmic {
    animation: none;
  }
  
  .quantum-superposition,
  .quantum-entanglement {
    animation: none;
  }
  
  .quantum-entanglement::before,
  .quantum-entanglement::after {
    animation: none;
  }
  
  .scroll-reveal {
    animation: none;
    opacity: 1;
  }
  
  .parallax-scroll {
    transform: none;
  }
}
`;
  
  return css;
}

/**
 * Combine all animation variants into CSS string
 */
function combineAnimationVariants(): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * ANIMATION VARIANTS - Generated from consciousness.ts and motion.ts\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += generateContinuityBeamVariants();
  css += `\n`;
  css += generateComplexityVariants();
  css += `\n`;
  css += generateFloatSpeedVariants();
  css += `\n`;
  css += generatePulseSpeedVariants();
  css += `\n`;
  css += generateGlowIntensityVariants();
  css += `\n`;
  css += generateConsciousnessAnimations();
  css += `\n`;
  css += generateQuantumStateAnimations();
  css += `\n`;
  css += generateScrollDrivenAnimations();
  css += `\n`;
  css += generateReducedMotionOverrides();
  
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
 * Generate animation variants CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateAnimationVariants(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = 'src/styles/generated/animations.css';
  
  if (verbose) {
    logInfo('Generating animation variants from consciousness and motion constants...');
  }
  
  try {
    // Generate CSS content
    const cssContent = combineAnimationVariants();
    
    if (verbose) {
      logDebug(`Generated animation CSS: ${cssContent.length} characters`);
      logDebug(`  Classes: continuity-beam-*, animation-*, float-*, pulse-*, glow-*, consciousness-*`);
    }
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Animation variants generated: ${outputPath}`);
      logInfo(`  Generated continuity beam variants (low/medium/high/quantum)`);
      logInfo(`  Generated complexity variants (simple/medium/complex)`);
      logInfo(`  Generated consciousness level animations`);
      logInfo(`  Generated quantum state animations`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate animation variants: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { IntensityLevel as IntensityLevelType, ComplexityLevel as ComplexityLevelType };