/* src/scripts/generators/cosmic/generateParallaxClasses.ts */
// ============================================================================
// GENERATE PARALLAX CLASSES
// ============================================================================
// Purpose: Generate CSS classes for parallax layering
// Source Files: positioning.ts (PARALLAX_LAYERS)
// Output: src/styles/generated/parallax.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { PARALLAX_LAYERS, getParallaxFactor, type ParallaxLayer } from 'src/lib/constants/cosmic/positioning';
import { QUANTUM_COLORS } from 'src/lib/constants/cosmic/colors';
import { durations, easing } from 'src/lib/constants/cosmic/motion';
import { BREAKPOINTS } from 'src/lib/constants/cosmic/dimensions';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ParallaxLayerConfig {
  name: ParallaxLayer;
  factor: number;
  zIndex: number;
  blur: number;
}

export interface ParallaxIntensityVariant {
  name: 'subtle' | 'normal' | 'intense' | 'extreme';
  multiplier: number;
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
 * Get intensity multiplier for parallax factor
 */
function getIntensityMultiplier(intensity: ParallaxIntensityVariant['name']): number {
  const multipliers = {
    subtle: 0.5,
    normal: 1,
    intense: 1.5,
    extreme: 2
  };
  return multipliers[intensity];
}

/**
 * Format blur value for CSS
 */
function formatBlur(blur: number): string {
  return blur === 0 ? 'none' : `${blur}px`;
}

// ============================================================================
// LAYER EXTRACTION FUNCTIONS
// ============================================================================

/**
 * Extract parallax layer configurations from PARALLAX_LAYERS
 */
function extractParallaxLayers(): ParallaxLayerConfig[] {
  const layers: ParallaxLayerConfig[] = [];
  
  for (const [name, config] of Object.entries(PARALLAX_LAYERS)) {
    layers.push({
      name: name as ParallaxLayer,
      factor: config.factor,
      zIndex: config.zIndex,
      blur: config.blur
    });
  }
  
  // Sort by z-index (background to foreground)
  return layers.sort((a, b) => a.zIndex - b.zIndex);
}

// ============================================================================
// CLASS GENERATION FUNCTIONS
// ============================================================================

/**
 * Generate parallax layer CSS classes
 */
function generateParallaxLayerClasses(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PARALLAX LAYER CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const layer of layers) {
    const layerName = toKebabCase(layer.name);
    const blurValue = formatBlur(layer.blur);
    
    css += `.parallax-${layerName} {\n`;
    css += `  position: relative;\n`;
    css += `  z-index: ${layer.zIndex};\n`;
    css += `  will-change: transform;\n`;
    if (blurValue !== 'none') {
      css += `  filter: blur(${blurValue});\n`;
    }
    css += `}\n\n`;
    
    // Add hover effect for interactive layers
    if (layer.name === 'interactive') {
      css += `.parallax-${layerName}:hover {\n`;
      css += `  filter: blur(0);\n`;
      css += `  transition: filter 0.3s ease;\n`;
      css += `}\n\n`;
    }
  }
  
  return css;
}

/**
 * Generate parallax intensity variants
 */
function generateParallaxIntensityVariants(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PARALLAX INTENSITY VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const intensities: ParallaxIntensityVariant[] = [
    { name: 'subtle', multiplier: 0.5 },
    { name: 'normal', multiplier: 1 },
    { name: 'intense', multiplier: 1.5 },
    { name: 'extreme', multiplier: 2 }
  ];
  
  for (const layer of layers) {
    const layerName = toKebabCase(layer.name);
    const baseFactor = layer.factor;
    
    for (const intensity of intensities) {
      const factor = baseFactor * intensity.multiplier;
      const className = `parallax-${layerName}-${intensity.name}`;
      
      css += `.${className} {\n`;
      css += `  --parallax-factor: ${factor};\n`;
      css += `  transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px));\n`;
      css += `}\n\n`;
    }
  }
  
  return css;
}

/**
 * Generate parallax container class
 */
function generateParallaxContainerClass(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PARALLAX CONTAINER */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.parallax-container {\n`;
  css += `  position: relative;\n`;
  css += `  overflow-x: hidden;\n`;
  css += `  overflow-y: auto;\n`;
  css += `  perspective: 1000px;\n`;
  css += `  transform-style: preserve-3d;\n`;
  css += `  height: 100%;\n`;
  css += `}\n\n`;
  
  css += `.parallax-container::-webkit-scrollbar {\n`;
  css += `  width: 8px;\n`;
  css += `}\n\n`;
  
  css += `.parallax-container::-webkit-scrollbar-track {\n`;
  css += `  background: ${QUANTUM_COLORS['deepSpace']};\n`;
  css += `}\n\n`;
  
  css += `.parallax-container::-webkit-scrollbar-thumb {\n`;
  css += `  background: ${QUANTUM_COLORS['quantum.purple']};\n`;
  css += `  border-radius: 4px;\n`;
  css += `}\n\n`;
  
  css += `.parallax-container::-webkit-scrollbar-thumb:hover {\n`;
  css += `  background: ${QUANTUM_COLORS['neurospark']};\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate convenience classes (foreground, background)
 */
function generateConvenienceClasses(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* CONVENIENCE CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  // Find background layers (cosmic, far, mid)
  const backgroundLayers = layers.filter(l => 
    l.name === 'cosmic' || l.name === 'far' || l.name === 'mid'
  );
  
  // Find foreground layers (near, interactive, ui)
  const foregroundLayers = layers.filter(l => 
    l.name === 'near' || l.name === 'interactive' || l.name === 'ui'
  );
  
  if (backgroundLayers.length > 0) {
    css += `.parallax-background {\n`;
    css += `  position: relative;\n`;
    css += `  z-index: ${Math.min(...backgroundLayers.map(l => l.zIndex))};\n`;
    css += `}\n\n`;
  }
  
  if (foregroundLayers.length > 0) {
    css += `.parallax-foreground {\n`;
    css += `  position: relative;\n`;
    css += `  z-index: ${Math.max(...foregroundLayers.map(l => l.zIndex))};\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate scroll-based parallax animation
 */
function generateScrollParallax(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* SCROLL-DRIVEN PARALLAX */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const layer of layers) {
    const layerName = toKebabCase(layer.name);
    const factor = layer.factor;
    
    css += `.scroll-parallax-${layerName} {\n`;
    css += `  transform: translateY(calc(var(--scroll-offset, 0px) * ${factor}));\n`;
    css += `  transition: transform 0.1s linear;\n`;
    css += `}\n\n`;
  }
  
  // Smooth scroll parallax
  css += `.smooth-parallax {\n`;
  css += `  transition: transform 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate mouse-based parallax (mousemove effect)
 */
function generateMouseParallax(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* MOUSE-DRIVEN PARALLAX */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.mouse-parallax-container {\n`;
  css += `  position: relative;\n`;
  css += `  overflow: hidden;\n`;
  css += `}\n\n`;
  
  for (const layer of layers) {
    const layerName = toKebabCase(layer.name);
    const factor = layer.factor;
    
    css += `.mouse-parallax-${layerName} {\n`;
    css += `  transition: transform 0.1s ease-out;\n`;
    css += `  will-change: transform;\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate responsive parallax variants
 */
function generateResponsiveParallaxVariants(layers: ParallaxLayerConfig[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* RESPONSIVE PARALLAX VARIANTS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  const breakpoints = [
    { name: 'sm', width: BREAKPOINTS.sm, factor: 0.5 },
    { name: 'md', width: BREAKPOINTS.md, factor: 0.7 },
    { name: 'lg', width: BREAKPOINTS.lg, factor: 1 },
    { name: 'xl', width: BREAKPOINTS.xl, factor: 1.2 }
  ];
  
  for (const layer of layers) {
    const layerName = toKebabCase(layer.name);
    const baseFactor = layer.factor;
    
    for (const bp of breakpoints) {
      const adjustedFactor = baseFactor * bp.factor;
      
      css += `@media (min-width: ${bp.width}) {\n`;
      css += `  .${bp.name}\\:parallax-${layerName} {\n`;
      css += `    --parallax-factor: ${adjustedFactor};\n`;
      css += `  }\n`;
      css += `}\n\n`;
    }
  }
  
  return css;
}

/**
 * Generate reduced motion overrides for parallax
 */
function generateReducedMotionOverrides(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* REDUCED MOTION OVERRIDES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `@media (prefers-reduced-motion: reduce) {\n`;
  css += `  .parallax-container,\n`;
  css += `  .parallax-cosmic,\n`;
  css += `  .parallax-far,\n`;
  css += `  .parallax-mid,\n`;
  css += `  .parallax-near,\n`;
  css += `  .parallax-interactive {\n`;
  css += `    transform: none !important;\n`;
  css += `  }\n`;
  css += `  \n`;
  css += `  .scroll-parallax-*,\n`;
  css += `  .mouse-parallax-* {\n`;
  css += `    transform: none !important;\n`;
  css += `    transition: none !important;\n`;
  css += `  }\n`;
  css += `  \n`;
  css += `  .parallax-container {\n`;
  css += `    perspective: none;\n`;
  css += `    transform-style: flat;\n`;
  css += `  }\n`;
  css += `}\n`;
  
  return css;
}

/**
 * Generate performance optimization hints for parallax
 */
function generatePerformanceHints(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PERFORMANCE OPTIMIZATIONS */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `/* GPU acceleration for parallax layers */\n`;
  css += `.parallax-cosmic,\n`;
  css += `.parallax-far,\n`;
  css += `.parallax-mid,\n`;
  css += `.parallax-near,\n`;
  css += `.parallax-interactive {\n`;
  css += `  transform: translateZ(0);\n`;
  css += `  backface-visibility: hidden;\n`;
  css += `  perspective: 1000px;\n`;
  css += `}\n\n`;
  
  css += `/* Limit parallax effect on lower-end devices */\n`;
  css += `@media (max-width: 768px) {\n`;
  css += `  .parallax-cosmic,\n`;
  css += `  .parallax-far,\n`;
  css += `  .parallax-mid {\n`;
  css += `    transform: none !important;\n`;
  css += `  }\n`;
  css += `}\n`;
  
  return css;
}

/**
 * Generate CSS variables for parallax system
 */
function generateParallaxVariables(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* PARALLAX CSS VARIABLES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `:root {\n`;
  css += `  --parallax-speed: 1;\n`;
  css += `  --parallax-intensity: 1;\n`;
  css += `  --parallax-x: 0px;\n`;
  css += `  --parallax-y: 0px;\n`;
  css += `  --scroll-offset: 0px;\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Combine all parallax styles into CSS string
 */
function combineParallaxStyles(layers: ParallaxLayerConfig[]): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * PARALLAX CLASSES - Generated from positioning.ts\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += generateParallaxVariables();
  css += `\n`;
  css += generateParallaxLayerClasses(layers);
  css += `\n`;
  css += generateParallaxIntensityVariants(layers);
  css += `\n`;
  css += generateParallaxContainerClass();
  css += `\n`;
  css += generateConvenienceClasses(layers);
  css += `\n`;
  css += generateScrollParallax(layers);
  css += `\n`;
  css += generateMouseParallax(layers);
  css += `\n`;
  css += generateResponsiveParallaxVariants(layers);
  css += `\n`;
  css += generateReducedMotionOverrides();
  css += `\n`;
  css += generatePerformanceHints();
  
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
 * Generate parallax classes CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateParallaxClasses(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = '../styles/generated/parallax.css';
  
  if (verbose) {
    logInfo('Generating parallax classes from positioning constants...');
  }
  
  try {
    // Extract parallax layers from constants
    const layers = extractParallaxLayers();
    
    if (verbose) {
      logDebug(`Found ${layers.length} parallax layers`);
      for (const layer of layers) {
        logDebug(`  - ${layer.name}: factor=${layer.factor}, zIndex=${layer.zIndex}, blur=${layer.blur}px`);
      }
    }
    
    // Generate CSS content
    const cssContent = combineParallaxStyles(layers);
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Parallax classes generated: ${outputPath}`);
      logInfo(`  Generated ${layers.length} parallax layer classes`);
      logInfo(`  Generated 4 intensity variants per layer`);
      logInfo(`  Generated scroll and mouse-driven parallax`);
      logInfo(`  Generated responsive variants`);
      logInfo(`  Generated reduced motion overrides`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate parallax classes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { ParallaxLayerConfig as ParallaxLayerConfigType };