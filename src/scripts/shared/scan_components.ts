// scripts/scan-components.ts
// Simple scanner - outputs component file names and export names
// No logic, no analysis, just names.

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// CONFIGURATION
// =====================================================

const COMPONENTS_ROOT = path.join(process.cwd(), 'src/components');
const OUTPUT_FILE = path.join(process.cwd(), 'scripts/output/components-inventory.json');

// Patterns to match component exports
const EXPORT_PATTERNS = [
  /export\s+function\s+(\w+)/g,
  /export\s+const\s+(\w+)\s*=/g,
  /export\s+default\s+function\s+(\w+)/g,
  /export\s+default\s+(\w+)/g,
  /export\s+\{\s*([^}]+)\s*\}/g,
];

// Folders to scan (relative to COMPONENTS_ROOT)
const SCAN_FOLDERS = [
  'ui',           // Base UI primitives
  'layout',       // Layout components
  'immersive',    // Panorama, QuantumBackground, etc.
  'shared',       // Shared components (Card, SearchBar, etc.)
  'hestia',       // Hearth domain
  'hermes',       // Bazaar domain
  'athena',       // Library domain
  'prometheus',   // Stage + Studio domains
  'themis',       // Council domain
  'iris',         // Bridge domain
  'aethelred',    // Nexus domain
  'cosmic',       // Design system domain
  'supporting',   // Supporting pages
  'auth',         // Authentication
  'checkout',     // Checkout components
  'council',      // Governance components
  'connect',      // Communication components
  'nexus',        // Integration components
  'stage',        // Performance components
  'studio',       // Creation components
  'library',      // Learning components
  'bazaar',       // Marketplace components
];

// =====================================================
// SCANNER FUNCTIONS
// =====================================================

interface ComponentInfo {
  filePath: string;
  exports: string[];
}

function extractExports(content: string): string[] {
  const exports: string[] = [];
  
  for (const pattern of EXPORT_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1]) {
        // Handle single export
        exports.push(match[1]);
      } else if (match[2]) {
        // Handle destructured exports
        const items = match[2].split(',').map(item => item.trim().split(' as ')[0]);
        exports.push(...items);
      }
    }
  }
  
  // Remove duplicates and sort
  return [...new Set(exports)].sort();
}

function scanDirectory(dirPath: string, relativePath: string = ''): ComponentInfo[] {
  const results: ComponentInfo[] = [];
  
  if (!fs.existsSync(dirPath)) {
    return results;
  }
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recurse into subdirectories
      const subResults = scanDirectory(fullPath, path.join(relativePath, item));
      results.push(...subResults);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      // Skip index files that only re-export
      if (item === 'index.ts' || item === 'index.tsx') {
        continue;
      }
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const exports = extractExports(content);
      
      if (exports.length > 0) {
        const filePath = path.join(relativePath, item);
        results.push({
          filePath,
          exports,
        });
      }
    }
  }
  
  return results;
}

// =====================================================
// MAIN
// =====================================================

function main(): void {
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('📁 COMPONENT SCANNER');
  console.log('═'.repeat(60));
  console.log(`\n📂 Scanning: ${COMPONENTS_ROOT}\n`);
  
  const allComponents: ComponentInfo[] = [];
  
  for (const folder of SCAN_FOLDERS) {
    const folderPath = path.join(COMPONENTS_ROOT, folder);
    
    if (fs.existsSync(folderPath)) {
      console.log(`  ✓ Scanning: ${folder}/`);
      const components = scanDirectory(folderPath, folder);
      allComponents.push(...components);
    } else {
      console.log(`  ✗ Skipping: ${folder}/ (not found)`);
    }
  }
  
  // Sort by file path
  allComponents.sort((a, b) => a.filePath.localeCompare(b.filePath));
  
  // =====================================================
  // OUTPUT
  // =====================================================
  
  console.log('\n' + '═'.repeat(60));
  console.log('📊 RESULTS');
  console.log('═'.repeat(60));
  console.log(`\nTotal components: ${allComponents.length}\n`);
  
  // Group by folder for readable output
  const byFolder: Record<string, ComponentInfo[]> = {};
  
  for (const comp of allComponents) {
    const folder = comp.filePath.split('/')[0];
    if (!byFolder[folder]) {
      byFolder[folder] = [];
    }
    byFolder[folder].push(comp);
  }
  
  for (const [folder, components] of Object.entries(byFolder).sort()) {
    console.log(`\n📁 ${folder}/ (${components.length} files)`);
    console.log('─'.repeat(40));
    
    for (const comp of components) {
      const fileName = comp.filePath.split('/').pop();
      console.log(`  📄 ${fileName}`);
      console.log(`     → ${comp.exports.join(', ')}`);
    }
  }
  
  // Save to JSON file
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allComponents, null, 2), 'utf-8');
  console.log(`\n✅ Saved to: ${OUTPUT_FILE}`);
  
  console.log('\n' + '═'.repeat(60));
  console.log('✅ SCAN COMPLETE');
  console.log('═'.repeat(60));
  console.log('\n');
}

main();