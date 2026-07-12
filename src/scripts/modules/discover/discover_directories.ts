// src/scripts/modules/discover/discover_directories.ts
// ============================================================================
// DISCOVER DIRECTORIES - Phase 1.5
// ============================================================================
// Purpose: Discover all target directories (2 levels deep) with formula display
// Only tracks directories we GENERATE into - never touches manual directories
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logSuccess, logError, logInfo, logDebug, logWarning, logSeparator } from '@/scripts/shared/logger.js';
import { DEITY_GROUPS } from '@/config/deity_groups.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// CONFIGURATION - DIRECTORIES WE GENERATE INTO
// ============================================================================

export interface GenerationPaths {
  // Base paths for generated content
  constantsBase: string;      // src/lib/constants/generated
  typesBase: string;           // src/types/generated
  validatorsBase: string;      // lib/validators/generated
  utilsBase: string;           // src/utils/generated
  hooksBase: string;           // src/hooks/generated
  apiBase: string;             // app/api/generated
}

// Directories we NEVER touch (for exclusion)
export const PROTECTED_DIRECTORIES: string[] = [
  'lib/api',
  'lib/daedalus',
  'lib/stripe',
  'lib/supabase',
  'lib/ziggy',
  'lib/utils',        // root utils (not generated/)
  'types/stripe',
  'types/supabase',
  'styles',
  'app/api'           // root API (not generated/)
];

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  modified: Date;
}

export interface DirectoryManifest {
  path: string;
  exists: boolean;
  createdAt?: Date;
  fileCount: number;
  files: string[];
  subdirectories: Map<string, DirectoryManifest>;
}

export interface DiscoveryResult {
  // Constants directories
  constantsRoot: DirectoryManifest;
  constantsDeityGroups: Map<string, DirectoryManifest>;
  
  // Types directories
  typesRoot: DirectoryManifest;
  typesDeityGroups: Map<string, DirectoryManifest>;
  
  // Validators directories
  validatorsRoot: DirectoryManifest;
  validatorsDeityGroups: Map<string, DirectoryManifest>;
  
  // Utils directories
  utilsRoot: DirectoryManifest;
  utilsDeityGroups: Map<string, DirectoryManifest>;
  
  // Hooks directories
  hooksRoot: DirectoryManifest;
  hooksDeityGroups: Map<string, DirectoryManifest>;
  
  // API directories
  apiRoot: DirectoryManifest;
  apiDeityGroups: Map<string, DirectoryManifest>;
  
  // Summary with formulas
  summary: {
    totalExistingFiles: number;
    formula: string;
    components: {
      constantsFiles: number;
      typesFiles: number;
      validatorsFiles: number;
      utilsFiles: number;
      hooksFiles: number;
      apiFiles: number;
      otherFiles: number;
    };
    constantsFormula: string;
    typesFormula: string;
    validatorsFormula: string;
    utilsFormula: string;
    hooksFormula: string;
    apiFormula: string;
  };
}

export interface DiscoverDirectoriesOptions {
  verbose?: boolean;
  maxDepth?: number;
  generationPaths?: Partial<GenerationPaths>;
}

// Default generation paths
const DEFAULT_GENERATION_PATHS: GenerationPaths = {
  constantsBase: 'lib/constants/generated',
  typesBase: 'types/generated',
  validatorsBase: 'lib/validators/generated',
  utilsBase: 'utils/generated',
  hooksBase: 'hooks/generated',
  apiBase: 'app/api/generated'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a path is protected (should never be modified by generation)
 */
function isProtectedPath(filePath: string): boolean {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  for (const protectedDir of PROTECTED_DIRECTORIES) {
    if (relativePath.startsWith(protectedDir)) {
      return true;
    }
  }
  return false;
}

/**
 * Recursively discover directories up to maxDepth
 */
function discoverRecursive(
  dirPath: string, 
  currentDepth: number = 0, 
  maxDepth: number = 2,
  verbose: boolean = false
): DirectoryManifest | null {
  if (!fs.existsSync(dirPath)) {
    return null;
  }
  
  // Skip protected directories
  if (isProtectedPath(dirPath)) {
    if (verbose) logDebug(`Skipping protected directory: ${dirPath}`);
    return null;
  }
  
  const stats = fs.statSync(dirPath);
  const files: string[] = [];
  const subdirectories = new Map<string, DirectoryManifest>();
  let fileCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const itemStats = fs.statSync(itemPath);
      
      if (itemStats.isFile()) {
        // Only track .ts and .tsx files
        if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          files.push(item);
          fileCount++;
        }
      } else if (itemStats.isDirectory() && currentDepth < maxDepth - 1) {
        // Skip protected subdirectories
        if (!isProtectedPath(itemPath)) {
          const subManifest = discoverRecursive(itemPath, currentDepth + 1, maxDepth, verbose);
          if (subManifest) {
            subdirectories.set(item, subManifest);
            fileCount += subManifest.fileCount;
          }
        }
      } else if (itemStats.isDirectory()) {
        // At max depth, just record the directory exists without recursing
        if (!isProtectedPath(itemPath)) {
          subdirectories.set(item, {
            path: itemPath,
            exists: true,
            fileCount: 0,
            files: [],
            subdirectories: new Map()
          });
        }
      }
    }
  } catch (error) {
    if (verbose) logDebug(`Could not read directory: ${dirPath}`);
  }
  
  return {
    path: dirPath,
    exists: true,
    createdAt: stats.birthtime,
    fileCount,
    files,
    subdirectories
  };
}

/**
 * Get all deity folder names
 */
export function getAllDeityFolderNames(): string[] {
  return DEITY_GROUPS.map(group => group.folderName);
}

/**
 * Discover all directories with formulas
 */
export function discoverDirectories(options: DiscoverDirectoriesOptions = {}): DiscoveryResult {
  const {
    verbose = false,
    maxDepth = 2,
    generationPaths = {}
  } = options;
  
  const paths = { ...DEFAULT_GENERATION_PATHS, ...generationPaths };
  const deityFolderNames = getAllDeityFolderNames();
  
  if (verbose) {
    logInfo('Discovering target directories (recursive, depth 2)...');
    logSeparator('─', 40);
  }
  
  // Root paths
  const constantsRootPath = path.join(PROJECT_ROOT, paths.constantsBase);
  const typesRootPath = path.join(PROJECT_ROOT, paths.typesBase);
  const validatorsRootPath = path.join(PROJECT_ROOT, paths.validatorsBase);
  const utilsRootPath = path.join(PROJECT_ROOT, paths.utilsBase);
  const hooksRootPath = path.join(PROJECT_ROOT, paths.hooksBase);
  const apiRootPath = path.join(PROJECT_ROOT, paths.apiBase);
  
  // Discover roots recursively
  const constantsRoot = discoverRecursive(constantsRootPath, 0, maxDepth, verbose) || {
    path: constantsRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const typesRoot = discoverRecursive(typesRootPath, 0, maxDepth, verbose) || {
    path: typesRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const validatorsRoot = discoverRecursive(validatorsRootPath, 0, maxDepth, verbose) || {
    path: validatorsRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const utilsRoot = discoverRecursive(utilsRootPath, 0, maxDepth, verbose) || {
    path: utilsRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const hooksRoot = discoverRecursive(hooksRootPath, 0, maxDepth, verbose) || {
    path: hooksRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  const apiRoot = discoverRecursive(apiRootPath, 0, maxDepth, verbose) || {
    path: apiRootPath,
    exists: false,
    fileCount: 0,
    files: [],
    subdirectories: new Map()
  };
  
  // Extract deity groups for each type
  const constantsDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of constantsRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      constantsDeityGroups.set(folderName, manifest);
    }
  }
  
  const typesDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of typesRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      typesDeityGroups.set(folderName, manifest);
    }
  }
  
  const validatorsDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of validatorsRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      validatorsDeityGroups.set(folderName, manifest);
    }
  }
  
  const utilsDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of utilsRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      utilsDeityGroups.set(folderName, manifest);
    }
  }
  
  const hooksDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of hooksRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      hooksDeityGroups.set(folderName, manifest);
    }
  }
  
  const apiDeityGroups = new Map<string, DirectoryManifest>();
  for (const [folderName, manifest] of apiRoot.subdirectories) {
    if (deityFolderNames.includes(folderName)) {
      apiDeityGroups.set(folderName, manifest);
    }
  }
  
  // Calculate totals
  let constantsFiles = 0;
  const constantsComponents: string[] = [];
  for (const [name, manifest] of constantsDeityGroups) {
    constantsFiles += manifest.fileCount;
    constantsComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let typesFiles = 0;
  const typesComponents: string[] = [];
  for (const [name, manifest] of typesDeityGroups) {
    typesFiles += manifest.fileCount;
    typesComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let validatorsFiles = 0;
  const validatorsComponents: string[] = [];
  for (const [name, manifest] of validatorsDeityGroups) {
    validatorsFiles += manifest.fileCount;
    validatorsComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let utilsFiles = 0;
  const utilsComponents: string[] = [];
  for (const [name, manifest] of utilsDeityGroups) {
    utilsFiles += manifest.fileCount;
    utilsComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let hooksFiles = 0;
  const hooksComponents: string[] = [];
  for (const [name, manifest] of hooksDeityGroups) {
    hooksFiles += manifest.fileCount;
    hooksComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  let apiFiles = 0;
  const apiComponents: string[] = [];
  for (const [name, manifest] of apiDeityGroups) {
    apiFiles += manifest.fileCount;
    apiComponents.push(`${name}:${manifest.fileCount}`);
  }
  
  // Other files (files directly in root directories)
  const otherFiles = constantsRoot.files.length + typesRoot.files.length + 
                     validatorsRoot.files.length + utilsRoot.files.length + 
                     hooksRoot.files.length + apiRoot.files.length;
  
  const totalExistingFiles = constantsFiles + typesFiles + validatorsFiles + 
                             utilsFiles + hooksFiles + apiFiles + otherFiles;
  
  // Build formula strings
  const constantsFormula = `constants = sum(${constantsComponents.join(' + ')}) = ${constantsFiles}`;
  const typesFormula = `types = sum(${typesComponents.join(' + ')}) = ${typesFiles}`;
  const validatorsFormula = `validators = sum(${validatorsComponents.join(' + ')}) = ${validatorsFiles}`;
  const utilsFormula = `utils = sum(${utilsComponents.join(' + ')}) = ${utilsFiles}`;
  const hooksFormula = `hooks = sum(${hooksComponents.join(' + ')}) = ${hooksFiles}`;
  const apiFormula = `api = sum(${apiComponents.join(' + ')}) = ${apiFiles}`;
  const otherFormula = `other = ${otherFiles}`;
  
  const formula = `${constantsFiles} (const) + ${typesFiles} (types) + ${validatorsFiles} (validators) + ${utilsFiles} (utils) + ${hooksFiles} (hooks) + ${apiFiles} (api) + ${otherFiles} (other) = ${totalExistingFiles}`;
  
  if (verbose) {
    console.log('');
    logInfo('Directory Discovery Results (2 levels deep):');
    logInfo(`  Constants root: ${constantsRoot.exists ? '✅' : '❌'} ${paths.constantsBase}`);
    logInfo(`    ├── Deity groups: ${constantsDeityGroups.size} (${constantsFiles} files)`);
    logInfo(`    └── Root files: ${constantsRoot.files.length}`);
    
    logInfo(`  Types root: ${typesRoot.exists ? '✅' : '❌'} ${paths.typesBase}`);
    logInfo(`    ├── Deity groups: ${typesDeityGroups.size} (${typesFiles} files)`);
    logInfo(`    └── Root files: ${typesRoot.files.length}`);
    
    logInfo(`  Validators root: ${validatorsRoot.exists ? '✅' : '❌'} ${paths.validatorsBase}`);
    logInfo(`    ├── Deity groups: ${validatorsDeityGroups.size} (${validatorsFiles} files)`);
    logInfo(`    └── Root files: ${validatorsRoot.files.length}`);
    
    logInfo(`  Utils root: ${utilsRoot.exists ? '✅' : '❌'} ${paths.utilsBase}`);
    logInfo(`    ├── Deity groups: ${utilsDeityGroups.size} (${utilsFiles} files)`);
    logInfo(`    └── Root files: ${utilsRoot.files.length}`);
    
    logInfo(`  Hooks root: ${hooksRoot.exists ? '✅' : '❌'} ${paths.hooksBase}`);
    logInfo(`    ├── Deity groups: ${hooksDeityGroups.size} (${hooksFiles} files)`);
    logInfo(`    └── Root files: ${hooksRoot.files.length}`);
    
    logInfo(`  API root: ${apiRoot.exists ? '✅' : '❌'} ${paths.apiBase}`);
    logInfo(`    ├── Deity groups: ${apiDeityGroups.size} (${apiFiles} files)`);
    logInfo(`    └── Root files: ${apiRoot.files.length}`);
    
    console.log('');
    logInfo('📊 CALCULATED VALUES WITH FORMULAS:');
    logInfo(`  ${constantsFormula}`);
    logInfo(`  ${typesFormula}`);
    logInfo(`  ${validatorsFormula}`);
    logInfo(`  ${utilsFormula}`);
    logInfo(`  ${hooksFormula}`);
    logInfo(`  ${apiFormula}`);
    logInfo(`  ${otherFormula}`);
    console.log('');
    logInfo(`  TOTAL: ${formula}`);
    
    logSeparator('─', 40);
  }
  
  return {
    constantsRoot,
    constantsDeityGroups,
    typesRoot,
    typesDeityGroups,
    validatorsRoot,
    validatorsDeityGroups,
    utilsRoot,
    utilsDeityGroups,
    hooksRoot,
    hooksDeityGroups,
    apiRoot,
    apiDeityGroups,
    summary: {
      totalExistingFiles,
      formula,
      components: {
        constantsFiles,
        typesFiles,
        validatorsFiles,
        utilsFiles,
        hooksFiles,
        apiFiles,
        otherFiles
      },
      constantsFormula,
      typesFormula,
      validatorsFormula,
      utilsFormula,
      hooksFormula,
      apiFormula
    }
  };
}

/**
 * Ensure all required directories exist
 */
export function ensureAllDirectories(options: DiscoverDirectoriesOptions = {}): DiscoveryResult {
  const {
    verbose = false,
    generationPaths = {}
  } = options;
  
  const paths = { ...DEFAULT_GENERATION_PATHS, ...generationPaths };
  const deityFolderNames = getAllDeityFolderNames();
  
  // Root paths
  const constantsRootPath = path.join(PROJECT_ROOT, paths.constantsBase);
  const typesRootPath = path.join(PROJECT_ROOT, paths.typesBase);
  const validatorsRootPath = path.join(PROJECT_ROOT, paths.validatorsBase);
  const utilsRootPath = path.join(PROJECT_ROOT, paths.utilsBase);
  const hooksRootPath = path.join(PROJECT_ROOT, paths.hooksBase);
  const apiRootPath = path.join(PROJECT_ROOT, paths.apiBase);
  
  // Ensure root directories
  const ensure = (dir: string) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      if (verbose) logSuccess(`Created directory: ${dir}`);
    }
  };
  
  ensure(constantsRootPath);
  ensure(typesRootPath);
  ensure(validatorsRootPath);
  ensure(utilsRootPath);
  ensure(hooksRootPath);
  ensure(apiRootPath);
  
  // Ensure deity group directories for each type
  for (const folderName of deityFolderNames) {
    ensure(path.join(constantsRootPath, folderName));
    ensure(path.join(typesRootPath, folderName));
    ensure(path.join(validatorsRootPath, folderName));
    ensure(path.join(utilsRootPath, folderName));
    ensure(path.join(hooksRootPath, folderName));
    ensure(path.join(apiRootPath, folderName));
  }
  
  return discoverDirectories(options);
}