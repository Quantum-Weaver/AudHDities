/* @/scripts/generators/cosmic/generateZoomTargets.ts */
// ============================================================================
// GENERATE ZOOM TARGETS
// ============================================================================
// Purpose: Generate CSS custom properties and classes for panorama zoom targets
// Source Files: positioning.ts (ZOOM_TARGETS)
// Output: src/styles/generated/zoom.css
// ============================================================================

import type { CosmicGeneratorOptions } from '../../system/cosmic';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../../shared/logger';
import * as fs from 'fs';
import * as path from 'path';

// Import cosmic constants
import { ZOOM_TARGETS, type ZoomTarget } from '@/lib/constants/cosmic/positioning';
import { durations, easing } from '@/lib/constants/cosmic/motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ZoomTargetVariable {
  environment: string;
  x: number;
  y: number;
  scale: number;
  duration?: number;
  easing?: string;
  description?: string;
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
 * Get default zoom transition duration
 */
function getDefaultDuration(): number {
  return durations.normal;
}

/**
 * Get default zoom transition easing
 */
function getDefaultEasing(): string {
  return easing.quantum;
}

// ============================================================================
// VARIABLE GENERATION FUNCTIONS
// ============================================================================

/**
 * Extract zoom targets from ZOOM_TARGETS constant
 */
function extractZoomTargets(): ZoomTargetVariable[] {
  const targets: ZoomTargetVariable[] = [];
  
  for (const [environment, target] of Object.entries(ZOOM_TARGETS)) {
    if (target && typeof target === 'object') {
      targets.push({
        environment: toKebabCase(environment),
        x: target.x,
        y: target.y,
        scale: target.scale,
        duration: target.duration,
        easing: target.easing,
        description: target.description
      });
    }
  }
  
  return targets;
}

/**
 * Generate CSS custom properties for zoom targets
 */
function generateZoomVariables(targets: ZoomTargetVariable[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM TARGET CSS VARIABLES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `:root {\n`;
  
  // Default transition values
  css += `  /* Default zoom transition */\n`;
  css += `  --zoom-duration: ${formatDuration(getDefaultDuration())};\n`;
  css += `  --zoom-easing: ${getDefaultEasing()};\n`;
  css += `\n`;
  
  // Environment-specific zoom targets
  css += `  /* Environment-specific zoom targets */\n`;
  for (const target of targets) {
    css += `  --zoom-${target.environment}-x: ${target.x}%;\n`;
    css += `  --zoom-${target.environment}-y: ${target.y}%;\n`;
    css += `  --zoom-${target.environment}-scale: ${target.scale};\n`;
    if (target.duration) {
      css += `  --zoom-${target.environment}-duration: ${formatDuration(target.duration)};\n`;
    }
    if (target.easing) {
      css += `  --zoom-${target.environment}-easing: ${target.easing};\n`;
    }
  }
  
  css += `}\n`;
  return css;
}

/**
 * Generate zoom target CSS classes
 */
function generateZoomTargetClasses(targets: ZoomTargetVariable[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM TARGET CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const target of targets) {
    const duration = target.duration 
      ? `var(--zoom-${target.environment}-duration, var(--zoom-duration))`
      : `var(--zoom-duration)`;
    const timing = target.easing
      ? `var(--zoom-${target.environment}-easing, var(--zoom-easing))`
      : `var(--zoom-easing)`;
    
    css += `.zoom-target-${target.environment} {\n`;
    css += `  --target-x: var(--zoom-${target.environment}-x);\n`;
    css += `  --target-y: var(--zoom-${target.environment}-y);\n`;
    css += `  --target-scale: var(--zoom-${target.environment}-scale);\n`;
    css += `  transform: translate(var(--target-x), var(--target-y)) scale(var(--target-scale));\n`;
    css += `  transition: transform ${duration} ${timing};\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate zoom transition class
 */
function generateZoomTransitionClass(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM TRANSITION UTILITIES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.zoom-transition {\n`;
  css += `  transition-property: transform, scale, translate;\n`;
  css += `  transition-duration: var(--zoom-duration);\n`;
  css += `  transition-timing-function: var(--zoom-easing);\n`;
  css += `}\n\n`;
  
  // Transition variants
  const variants = [
    { name: 'slow', multiplier: 1.5 },
    { name: 'fast', multiplier: 0.5 },
    { name: 'quantum', multiplier: 0.3 }
  ];
  
  for (const variant of variants) {
    css += `.zoom-transition-${variant.name} {\n`;
    css += `  transition-property: transform, scale, translate;\n`;
    css += `  transition-duration: calc(var(--zoom-duration) * ${variant.multiplier});\n`;
    css += `  transition-timing-function: var(--zoom-easing);\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate zoom active state class
 */
function generateZoomActiveClass(targets: ZoomTargetVariable[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM ACTIVE STATE */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.zoom-active {\n`;
  css += `  transition: transform var(--zoom-duration) var(--zoom-easing);\n`;
  css += `}\n\n`;
  
  // Environment-specific active states
  for (const target of targets) {
    const duration = target.duration 
      ? `var(--zoom-${target.environment}-duration, var(--zoom-duration))`
      : `var(--zoom-duration)`;
    const timing = target.easing
      ? `var(--zoom-${target.environment}-easing, var(--zoom-easing))`
      : `var(--zoom-easing)`;
    
    css += `.zoom-active.zoom-target-${target.environment} {\n`;
    css += `  transform: translate(var(--zoom-${target.environment}-x), var(--zoom-${target.environment}-y)) scale(var(--zoom-${target.environment}-scale));\n`;
    css += `  transition: transform ${duration} ${timing};\n`;
    css += `}\n\n`;
  }
  
  return css;
}

/**
 * Generate zoom container class
 */
function generateZoomContainerClass(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM CONTAINER */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.zoom-container {\n`;
  css += `  position: relative;\n`;
  css += `  overflow: hidden;\n`;
  css += `  cursor: grab;\n`;
  css += `}\n\n`;
  
  css += `.zoom-container:active {\n`;
  css += `  cursor: grabbing;\n`;
  css += `}\n\n`;
  
  css += `.zoom-content {\n`;
  css += `  transform-origin: center center;\n`;
  css += `  transition: transform var(--zoom-duration) var(--zoom-easing);\n`;
  css += `  will-change: transform;\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate zoom control classes (buttons, indicators)
 */
function generateZoomControlClasses(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM CONTROL CLASSES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `.zoom-controls {\n`;
  css += `  position: absolute;\n`;
  css += `  bottom: 1rem;\n`;
  css += `  right: 1rem;\n`;
  css += `  display: flex;\n`;
  css += `  gap: 0.5rem;\n`;
  css += `  z-index: 10;\n`;
  css += `}\n\n`;
  
  css += `.zoom-btn {\n`;
  css += `  width: 2.5rem;\n`;
  css += `  height: 2.5rem;\n`;
  css += `  border-radius: 9999px;\n`;
  css += `  background: rgba(0, 0, 0, 0.6);\n`;
  css += `  backdrop-filter: blur(8px);\n`;
  css += `  border: 1px solid rgba(255, 255, 255, 0.2);\n`;
  css += `  color: white;\n`;
  css += `  font-size: 1.25rem;\n`;
  css += `  cursor: pointer;\n`;
  css += `  transition: all 0.2s ease;\n`;
  css += `  display: flex;\n`;
  css += `  align-items: center;\n`;
  css += `  justify-content: center;\n`;
  css += `}\n\n`;
  
  css += `.zoom-btn:hover {\n`;
  css += `  background: rgba(108, 92, 231, 0.6);\n`;
  css += `  border-color: rgba(108, 92, 231, 0.8);\n`;
  css += `  transform: scale(1.05);\n`;
  css += `}\n\n`;
  
  css += `.zoom-indicator {\n`;
  css += `  position: absolute;\n`;
  css += `  bottom: 1rem;\n`;
  css += `  left: 50%;\n`;
  css += `  transform: translateX(-50%);\n`;
  css += `  background: rgba(0, 0, 0, 0.6);\n`;
  css += `  backdrop-filter: blur(8px);\n`;
  css += `  border-radius: 9999px;\n`;
  css += `  padding: 0.25rem 0.75rem;\n`;
  css += `  font-size: 0.75rem;\n`;
  css += `  color: white;\n`;
  css += `  z-index: 10;\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate reduced motion overrides for zoom
 */
function generateReducedMotionOverrides(): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* REDUCED MOTION OVERRIDES */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  css += `@media (prefers-reduced-motion: reduce) {\n`;
  css += `  .zoom-transition,\n`;
  css += `  .zoom-transition-slow,\n`;
  css += `  .zoom-transition-fast,\n`;
  css += `  .zoom-transition-quantum,\n`;
  css += `  .zoom-content,\n`;
  css += `  .zoom-active,\n`;
  css += `  .zoom-target-* {\n`;
  css += `    transition-duration: 0.01ms;\n`;
  css += `  }\n`;
  css += `}\n`;
  
  return css;
}

/**
 * Generate documentation comments for each zoom target
 */
function generateZoomDocumentation(targets: ZoomTargetVariable[]): string {
  let css = `/* ========================================================================== */\n`;
  css += `/* ZOOM TARGET DOCUMENTATION */\n`;
  css += `/* ========================================================================== */\n\n`;
  
  for (const target of targets) {
    if (target.description) {
      css += `/* ${target.environment}: ${target.description} */\n`;
      css += `/*   Position: (${target.x}%, ${target.y}%) */\n`;
      css += `/*   Scale: ${target.scale}x */\n`;
      if (target.duration) {
        css += `/*   Duration: ${target.duration}ms */\n`;
      }
      css += `*/\n\n`;
    }
  }
  
  return css;
}

/**
 * Combine all zoom styles into CSS string
 */
function combineZoomStyles(targets: ZoomTargetVariable[]): string {
  const timestamp = new Date().toISOString();
  let css = `/* ============================================================================\n`;
  css += ` * ZOOM TARGETS - Generated from positioning.ts\n`;
  css += ` * Generated: ${timestamp}\n`;
  css += ` * ============================================================================ */\n\n`;
  
  css += generateZoomDocumentation(targets);
  css += generateZoomVariables(targets);
  css += `\n`;
  css += generateZoomTargetClasses(targets);
  css += `\n`;
  css += generateZoomTransitionClass();
  css += `\n`;
  css += generateZoomActiveClass(targets);
  css += `\n`;
  css += generateZoomContainerClass();
  css += `\n`;
  css += generateZoomControlClasses();
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
 * Generate zoom targets CSS file
 * @param options - Generator options
 * @returns Path to generated file (or null if failed)
 */
export async function generateZoomTargets(options: CosmicGeneratorOptions): Promise<string | null> {
  const { verbose } = options;
  const outputPath = 'src/styles/generated/zoom.css';
  
  if (verbose) {
    logInfo('Generating zoom targets from positioning constants...');
  }
  
  try {
    // Extract zoom targets from constants
    const targets = extractZoomTargets();
    
    if (verbose) {
      logDebug(`Found ${targets.length} zoom targets`);
      for (const target of targets.slice(0, 5)) {
        logDebug(`  - ${target.environment}: (${target.x}%, ${target.y}%) scale ${target.scale}`);
      }
      if (targets.length > 5) {
        logDebug(`  ... and ${targets.length - 5} more`);
      }
    }
    
    // Generate CSS content
    const cssContent = combineZoomStyles(targets);
    
    // Write to file
    const writeSuccess = writeGeneratedFile(outputPath, cssContent, options);
    
    if (!writeSuccess) {
      return null;
    }
    
    if (verbose) {
      logSuccess(`Zoom targets generated: ${outputPath}`);
      logInfo(`  Generated ${targets.length} zoom target configurations`);
      logInfo(`  Generated zoom transition utilities`);
      logInfo(`  Generated zoom control classes`);
    }
    
    return outputPath;
    
  } catch (error) {
    logError(`Failed to generate zoom targets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { ZoomTargetVariable as ZoomTargetVariableType };