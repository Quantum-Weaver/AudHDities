// generate-indexes.ts
// ONE-TIME SCRIPT - Creates barrel exports for all generated files and components
// Run with: tsx generate-indexes.ts
// Run with: tsx generate-indexes.ts --dry-run (to preview)

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = process.cwd();

// ============================================================================
// CONFIGURATION
// ============================================================================

// All possible directories to scan (including nested paths)
const COMPONENT_DIRECTORIES = [
  'admin',
  'aethelred/nexus',
  'athena/library',
  'auth',
  'cosmic',
  'hephaestus/supporting',
  'hermes/bazaar',
  'hestia',
  'immersive',
  'iris',
  'layout',
  'mnemosyne',
  'prometheus',
  'schema',  // Your new schema components
  'shared',
  'themis',
  'ui'
];

const GENERATED_DEITY_FOLDERS = [
  'hestia-core',
  'plutus-economics', 
  'hermes-social',
  'athena-gamification',
  'mnemosyne-assessment',
  'themis-governance',
  'iris-communications',
  'hephaestus-infrastructure',
  'aethelred-connections',
  'daedalus-meta'
];

const CATEGORIES = [
  { name: 'types', path: 'src/types/generated', isNested: true, deities: GENERATED_DEITY_FOLDERS },
  { name: 'hooks', path: 'src/hooks/generated', isNested: true, deities: GENERATED_DEITY_FOLDERS },
  { name: 'utils', path: 'src/utils/generated', isNested: true, deities: GENERATED_DEITY_FOLDERS },
  { name: 'constants', path: 'src/lib/constants/generated', isNested: true, deities: GENERATED_DEITY_FOLDERS },
  { name: 'validators', path: 'src/lib/validators/generated', isNested: true, deities: GENERATED_DEITY_FOLDERS },
  { name: 'components', path: 'src/components', isNested: false, subdirs: COMPONENT_DIRECTORIES }
];

const EXCLUDE_FILES = ['index.ts', 'index.js', 'index.tsx', 'page.tsx', 'layout.tsx'];
const EXCLUDE_PATTERNS = ['*.test.ts', '*.spec.ts', '*.stories.tsx'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getAllFiles(dir: string, extensions: string[] = ['.ts', '.tsx']): string[] {
  if (!fs.existsSync(dir)) return [];
  
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules, __tests__, etc.
      if (entry.name === 'node_modules' || entry.name === '__tests__' || entry.name === '__pycache__') {
        continue;
      }
      // Recursively get files from subdirectories
      const subFiles = getAllFiles(fullPath, extensions);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (extensions.includes(ext) && !EXCLUDE_FILES.includes(entry.name)) {
        // Check if file matches any exclude pattern
        let shouldExclude = false;
        for (const pattern of EXCLUDE_PATTERNS) {
          if (entry.name.match(pattern.replace('*', '.*'))) {
            shouldExclude = true;
            break;
          }
        }
        if (!shouldExclude) {
          files.push(fullPath);
        }
      }
    }
  }
  
  return files;
}

function getRelativeImportPath(filePath: string, baseDir: string): string {
  let relativePath = path.relative(baseDir, filePath);
  // Remove extension
  relativePath = relativePath.replace(/\.(ts|tsx)$/, '');
  // Convert to POSIX path for imports
  relativePath = relativePath.split(path.sep).join('/');
  // Add ./ for relative imports
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  return relativePath;
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

function generateBarrelExport(files: string[], baseDir: string, isComponent: boolean = false): string {
  if (files.length === 0) return '// No files to export\n';
  
  const lines = [
    '// AUTO-GENERATED - DO NOT EDIT',
    '// Barrel exports',
    '',
  ];
  
  // Group files by directory for organized exports
  const filesByDir: Record<string, string[]> = {};
  
  for (const file of files) {
    const relativePath = getRelativeImportPath(file, baseDir);
    const dirName = path.dirname(relativePath);
    
    if (!filesByDir[dirName]) {
      filesByDir[dirName] = [];
    }
    filesByDir[dirName].push(relativePath);
  }
  
  // Sort directories
  const sortedDirs = Object.keys(filesByDir).sort();
  
  for (const dir of sortedDirs) {
    if (dir !== '.') {
      lines.push(`// =====================================================`);
      lines.push(`// ${dir.replace('./', '').toUpperCase()}`);
      lines.push(`// =====================================================`);
    }
    
    const sortedFiles = filesByDir[dir].sort();
    for (const file of sortedFiles) {
      const fileName = path.basename(file);
      if (isComponent && (fileName.startsWith('index') || fileName.endsWith('.module'))) {
        // For component index files, export default if it exists
        lines.push(`export { default as ${toPascalCase(path.basename(file, path.extname(file)))} } from '${file}.js';`);
      } else {
        lines.push(`export * from '${file}.js';`);
      }
    }
    lines.push('');
  }
  
  return lines.join('\n');
}

function generateMasterIndex(modules: string[], isComponent: boolean = false): string {
  if (modules.length === 0) return '// No modules to export\n';
  
  const lines = [
    '// AUTO-GENERATED - DO NOT EDIT',
    '// Master barrel exports',
    '',
  ];
  
  const sortedModules = [...modules].sort();
  
  if (isComponent) {
    // For components, export each module's index
    for (const module of sortedModules) {
      const moduleName = module.replace(/\//g, '_').replace(/-/g, '_');
      lines.push(`export * as ${moduleName} from './${module}/index.js';`);
    }
  } else {
    // For generated types, use namespace exports
    for (const module of sortedModules) {
      const moduleName = module.replace(/-/g, '_');
      lines.push(`export * as ${moduleName} from './${module}/index.js';`);
    }
  }
  
  lines.push('');
  return lines.join('\n');
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function scanDirectoryRecursive(dir: string, depth: number = 0, maxDepth: number = 3): string[] {
  if (!fs.existsSync(dir)) return [];
  if (depth > maxDepth) return [];
  
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      const fullPath = path.join(dir, entry.name);
      results.push(fullPath);
      
      // Recursively scan subdirectories
      const subDirs = scanDirectoryRecursive(fullPath, depth + 1, maxDepth);
      results.push(...subDirs);
    }
  }
  
  return results;
}

// ============================================================================
// MAIN
// ============================================================================

const isDryRun = process.argv.includes('--dry-run');
console.log('\n📦 Generating barrel exports...\n');
if (isDryRun) console.log('⚠️  DRY RUN MODE - no files will be written\n');

let totalWritten = 0;
let totalIndexes = 0;

for (const category of CATEGORIES) {
  const basePath = path.join(PROJECT_ROOT, category.path);
  
  if (!fs.existsSync(basePath)) {
    console.log(`⚠️  Skipping ${category.name} - path not found: ${category.path}`);
    continue;
  }
  
  console.log(`\n📁 Processing ${category.name}...`);
  
  if (category.isNested && category.deities) {
    // Handle generated folders (types, hooks, utils, constants, validators)
    const existingDeities = category.deities.filter(deity => 
      fs.existsSync(path.join(basePath, deity))
    );
    
    if (existingDeities.length === 0) {
      console.log(`   No deity folders found in ${category.name}`);
      continue;
    }
    
    // Generate per-deity index files
    for (const deity of existingDeities) {
      const deityPath = path.join(basePath, deity);
      const files = getAllFiles(deityPath, ['.ts']);
      
      if (files.length === 0) continue;
      
      const indexPath = path.join(deityPath, 'index.ts');
      const content = generateBarrelExport(files, deityPath, false);
      
      if (!isDryRun && writeFileIfChanged(indexPath, content)) {
        console.log(`   ✅ Created ${deity}/index.ts (${files.length} exports)`);
        totalWritten++;
        totalIndexes++;
      } else if (isDryRun) {
        console.log(`   📝 Would create ${deity}/index.ts (${files.length} exports)`);
      } else {
        console.log(`   ⏭️  ${deity}/index.ts unchanged`);
      }
    }
    
    // Generate master index file
    const masterIndexPath = path.join(basePath, 'index.ts');
    const masterContent = generateMasterIndex(existingDeities, false);
    
    if (!isDryRun && writeFileIfChanged(masterIndexPath, masterContent)) {
      console.log(`   ✅ Created master index.ts (${existingDeities.length} namespaces)`);
      totalWritten++;
    } else if (isDryRun) {
      console.log(`   📝 Would create master index.ts (${existingDeities.length} namespaces)`);
    }
    
  } else {
    // Handle components folder with recursive scanning
    const allComponentDirs: string[] = [];
    
    // Add explicit directories
    for (const subdir of category.subdirs || []) {
      const fullPath = path.join(basePath, subdir);
      if (fs.existsSync(fullPath)) {
        allComponentDirs.push(fullPath);
      }
    }
    
    // Also scan for any other directories (like 'schema' you added)
    const scannedDirs = scanDirectoryRecursive(basePath, 0, 2);
    for (const scannedDir of scannedDirs) {
      if (!allComponentDirs.includes(scannedDir)) {
        // Check if it's a meaningful component directory (has .tsx files)
        const files = getAllFiles(scannedDir, ['.tsx', '.ts']);
        if (files.length > 0) {
          allComponentDirs.push(scannedDir);
        }
      }
    }
    
    if (allComponentDirs.length === 0) {
      console.log(`   No component directories found`);
      continue;
    }
    
    // Generate index.ts for each component directory
    for (const componentDir of allComponentDirs) {
      const files = getAllFiles(componentDir, ['.tsx', '.ts']);
      
      if (files.length === 0) continue;
      
      const indexPath = path.join(componentDir, 'index.ts');
      const relativeDirName = path.relative(basePath, componentDir);
      const content = generateBarrelExport(files, componentDir, true);
      
      if (!isDryRun && writeFileIfChanged(indexPath, content)) {
        console.log(`   ✅ Created ${relativeDirName}/index.ts (${files.length} exports)`);
        totalWritten++;
        totalIndexes++;
      } else if (isDryRun) {
        console.log(`   📝 Would create ${relativeDirName}/index.ts (${files.length} exports)`);
      } else {
        console.log(`   ⏭️  ${relativeDirName}/index.ts unchanged`);
      }
    }
    
    // Generate master components index
    const masterIndexPath = path.join(basePath, 'index.ts');
    const componentNames = allComponentDirs.map(dir => path.relative(basePath, dir));
    const masterContent = generateMasterIndex(componentNames, true);
    
    if (!isDryRun && writeFileIfChanged(masterIndexPath, masterContent)) {
      console.log(`   ✅ Created master components index.ts (${componentNames.length} modules)`);
      totalWritten++;
    } else if (isDryRun) {
      console.log(`   📝 Would create master components index.ts (${componentNames.length} modules)`);
    }
  }
}

console.log(`\n✨ Complete! ${isDryRun ? 'Would write' : 'Wrote'} ${totalWritten} files (${totalIndexes} index files).\n`);

if (isDryRun) {
  console.log('To actually write files, run: tsx generate-indexes.ts\n');
}