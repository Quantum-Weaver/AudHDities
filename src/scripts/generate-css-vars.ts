// scripts/generate-css-vars.ts
// Generates CSS custom properties from colors.ts
// Run: npx tsx scripts/generate-css-vars.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const COLORS_PATH = path.join(PROJECT_ROOT, 'src/lib/constants/cosmic/colors.ts');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/app/globals.css');

async function importColors() {
  const colorsModule = await import(COLORS_PATH);
  return {
    quantum: colorsModule.QUANTUM_COLORS,
    gradients: colorsModule.QUANTUM_GRADIENTS,
    status: colorsModule.STATUS_COLORS,
    mood: colorsModule.MOOD_COLORS,
    energy: colorsModule.ENERGY_COLORS,
    pride: colorsModule.PRIDE_COLORS,
  };
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
}

function generateCssVariables(colors: any): string {
  const quantumColors = colors.quantum;
  let cssVars = '/* ============================================================================\n';
  cssVars += '   CSS CUSTOM PROPERTIES - AUTO-GENERATED FROM colors.ts\n';
  cssVars += '   Do not edit directly. Run \'npm run generate-css-vars\' to update.\n';
  cssVars += '   ============================================================================ */\n\n';
  cssVars += ':root {\n';
  
  // Core Quantum Colors
  cssVars += '  /* ===== Core Quantum Colors ===== */\n';
  const coreColors = [
    'quantum.purple', 'quantum.dark', 'quantum.light', 'quantum.base',
    'cosmic.blue', 'cosmic.dark', 'cosmic.light',
    'fire.base', 'fire.dark', 'fire.light',
    'hearth.orange', 'hearth.gold',
    'sanctuary.green', 'sanctuary.emerald',
    'deepSpace', 'surface', 'starDust', 'neurospark'
  ];
  
  for (const key of coreColors) {
    const value = quantumColors[key];
    if (value && typeof value === 'string' && value.startsWith('#')) {
      const cssKey = key.replace(/\./g, '-');
      cssVars += `  --${cssKey}: ${value};\n`;
      cssVars += `  --${cssKey}-rgb: ${hexToRgb(value)};\n`;
    }
  }
  
  // Semantic Colors
  cssVars += '\n  /* ===== Semantic Colors ===== */\n';
  const semanticColors = ['success', 'warning', 'error', 'info'];
  for (const key of semanticColors) {
    const value = quantumColors[key];
    if (value && typeof value === 'string' && value.startsWith('#')) {
      cssVars += `  --${key}: ${value};\n`;
      cssVars += `  --${key}-rgb: ${hexToRgb(value)};\n`;
    }
  }
  
  // Mood Colors
  cssVars += '\n  /* ===== Mood Colors ===== */\n';
  const moodColors = ['calm', 'focused', 'creative', 'energized', 'peaceful', 'intense', 'mystical', 'grounded'];
  for (const key of moodColors) {
    const value = colors.mood?.[key] || quantumColors[`mood.${key}`];
    if (value && typeof value === 'string' && value.startsWith('#')) {
      cssVars += `  --mood-${key}: ${value};\n`;
    }
  }
  
  // Energy Colors
  cssVars += '\n  /* ===== Energy Colors ===== */\n';
  const energyColors = ['low', 'medium', 'high', 'quantum', 'cosmic', 'transformative'];
  for (const key of energyColors) {
    const value = colors.energy?.[key] || quantumColors[`energy.${key}`];
    if (value && typeof value === 'string' && value.startsWith('#')) {
      cssVars += `  --energy-${key}: ${value};\n`;
    }
  }
  
  // Domain Colors
  cssVars += '\n  /* ===== Domain Colors ===== */\n';
  const domains = ['quantum', 'cosmic', 'pantheon', 'bifrost', 'library', 'void'];
  for (const domain of domains) {
    const base = quantumColors[`${domain}.base`] || quantumColors[`${domain}.purple`];
    if (base && typeof base === 'string' && base.startsWith('#')) {
      cssVars += `  --domain-${domain}: ${base};\n`;
    }
  }
  
  // Entity Colors (Council Members)
  cssVars += '\n  /* ===== Entity Colors ===== */\n';
  const entities = [
    'aethelred', 'archivist', 'chancellor', 'curator', 'seer', 
    'skald', 'executioner', 'hearthKeeper', 'codex'
  ];
  for (const entity of entities) {
    const value = quantumColors[`entity.${entity}`];
    if (value && typeof value === 'string' && value.startsWith('#')) {
      cssVars += `  --entity-${entity}: ${value};\n`;
    }
  }
  
  cssVars += '}\n';
  
  return cssVars;
}

async function main() {
  console.log('\n🔧 Generating CSS variables from colors.ts...\n');
  
  try {
    const colors = await importColors();
    const cssVars = generateCssVariables(colors);
    
    // Read existing globals.css
    let existingContent = fs.readFileSync(OUTPUT_PATH, 'utf-8');
    
    // Replace the CSS variables section
    const varStart = '/* ============================================================================\n   CSS CUSTOM PROPERTIES';
    const varEnd = ':root {';
    
    // Find and replace the variables section
    const newContent = existingContent.replace(
      /\/\* ============================================================================\n   CSS CUSTOM PROPERTIES[\s\S]*?\*\/\n\n:root \{[\s\S]*?\n\}/,
      cssVars.trim()
    );
    
    fs.writeFileSync(OUTPUT_PATH, newContent, 'utf-8');
    
    console.log('✅ Updated globals.css with CSS variables from colors.ts');
    console.log('\n📁 Output:', OUTPUT_PATH);
    
  } catch (error) {
    console.error('❌ Error generating CSS variables:', error);
    process.exit(1);
  }
}

main();