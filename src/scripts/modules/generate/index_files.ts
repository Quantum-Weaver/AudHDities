// generate-indexes.ts
// ONE-TIME SCRIPT - Creates barrel exports for all generated files
// Run with: tsx generate-indexes.ts
// Run with: tsx generate-indexes.ts --dry-run (to preview)

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = process.cwd();

// ============================================================================
// CONFIGURATION - EDIT THESE IF NEEDED
// ============================================================================

const DEITY_FOLDERS = [
  'hestia-core',
  'plutus-economics', 
  'hermes-social',
  'athena-gamification',
  'mnemosyne-assessment',
  'themis-governance',
  'iris-communications',
  'hephaestus-infrastructure',
  'aethelred-connections',
  'prometheus-meta'
];

const CATEGORIES = [
  { name: 'types', path: 'src/types/generated' },
  { name: 'hooks', path: 'src/hooks/generated' },
  { name: 'utils', path: 'src/utils/generated' },
  { name: 'constants', path: 'src/lib/constants/generated' },
  { name: 'validators', path: 'src/lib/validators/generated' }
];

const EXCLUDE_FILES = ['index.ts', 'index.js'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getAllFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !EXCLUDE_FILES.includes(f));
}

function writeFileIfChanged(filePath: string, content: string): boolean {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf-8');
    if (existing === content) return false;
  }
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function generateDeityIndex(files: string[]): string {
  if (files.length === 0) return '// No files to export\n';
  
  const lines = [
    '// AUTO-GENERATED - DO NOT EDIT',
    '// Barrel exports for this deity',
    '',
    ...files.sort().map(f => `export * from './${f.replace('.ts', '')}.js';`),
    ''
  ];
  return lines.join('\n');
}

function generateMasterIndex(deities: string[]): string {
  if (deities.length === 0) return '// No deities to export\n';
  
  const lines = [
    '// AUTO-GENERATED - DO NOT EDIT',
    '// Master barrel exports for all deities',
    '',
    ...deities.sort().map(d => `export * as ${d.replace(/-/g, '_')} from './${d}/index.js';`),
    ''
  ];
  return lines.join('\n');
}

// ============================================================================
// MAIN
// ============================================================================

const isDryRun = process.argv.includes('--dry-run');
console.log('\n📦 Generating barrel exports...\n');
if (isDryRun) console.log('⚠️  DRY RUN MODE - no files will be written\n');

let totalWritten = 0;

for (const category of CATEGORIES) {
  const basePath = path.join(PROJECT_ROOT, category.path);
  
  if (!fs.existsSync(basePath)) {
    console.log(`⚠️  Skipping ${category.name} - path not found: ${category.path}`);
    continue;
  }
  
  console.log(`\n📁 Processing ${category.name}...`);
  
  // Find which deity folders actually exist
  const existingDeities = DEITY_FOLDERS.filter(deity => 
    fs.existsSync(path.join(basePath, deity))
  );
  
  if (existingDeities.length === 0) {
    console.log(`   No deity folders found in ${category.name}`);
    continue;
  }
  
  // Generate per-deity index files
  let deityCount = 0;
  for (const deity of existingDeities) {
    const deityPath = path.join(basePath, deity);
    const files = getAllFiles(deityPath);
    
    if (files.length === 0) continue;
    
    const indexPath = path.join(deityPath, 'index.ts');
    const content = generateDeityIndex(files);
    
    if (!isDryRun && writeFileIfChanged(indexPath, content)) {
      console.log(`   ✅ Created ${deity}/index.ts (${files.length} exports)`);
      totalWritten++;
    } else if (isDryRun) {
      console.log(`   📝 Would create ${deity}/index.ts (${files.length} exports)`);
      deityCount++;
    } else {
      console.log(`   ⏭️  ${deity}/index.ts unchanged`);
    }
  }
  
  // Generate master index file
  const masterIndexPath = path.join(basePath, 'index.ts');
  const masterContent = generateMasterIndex(existingDeities);
  
  if (!isDryRun && writeFileIfChanged(masterIndexPath, masterContent)) {
    console.log(`   ✅ Created master index.ts (${existingDeities.length} namespaces)`);
    totalWritten++;
  } else if (isDryRun) {
    console.log(`   📝 Would create master index.ts (${existingDeities.length} namespaces)`);
  } else {
    console.log(`   ⏭️  Master index.ts unchanged`);
  }
}

console.log(`\n✨ Complete! ${isDryRun ? 'Would write' : 'Wrote'} ${totalWritten} files.\n`);

if (isDryRun) {
  console.log('To actually write files, run: tsx generate-indexes.ts\n');
}