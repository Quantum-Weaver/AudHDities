// src/config/naming_guide.ts
// ============================================================================
// REALITY NAMING CONVENTION GUIDE - SINGLE SOURCE OF TRUTH
// ============================================================================
// Purpose: Define naming conventions for all Reality components
// Used by: GAIA, COSMIC, and all generators
// ============================================================================

// ============================================================================
// CORE NAMING PATTERNS
// ============================================================================

export type NamingPattern = 
  | 'kebab-case'
  | 'snake_case'
  | 'camelCase'
  | 'PascalCase'
  | 'SCREAMING_SNAKE_CASE';

export interface NamingRule {
  pattern: NamingPattern;
  description: string;
  examples: string[];
  regex: RegExp;
  transform: (input: string) => string;
}

// ============================================================================
// PATTERN DEFINITIONS
// ============================================================================

export const NAMING_RULES: Record<NamingPattern, NamingRule> = {
  'kebab-case': {
    pattern: 'kebab-case',
    description: 'Lowercase words separated by hyphens',
    examples: ['audio-processing', 'lyric-analysis', 'bifrost-app'],
    regex: /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,
    transform: (input: string): string => {
      return input
        .toLowerCase()
        .replace(/[_\s]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
  },
  
  'snake_case': {
    pattern: 'snake_case',
    description: 'Lowercase words separated by underscores',
    examples: ['definition_extractor', 'scan_results', 'max_depth'],
    regex: /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/,
    transform: (input: string): string => {
      return input
        .toLowerCase()
        .replace(/[-_\s]+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    }
  },
  
  'camelCase': {
    pattern: 'camelCase',
    description: 'Lowercase first word, uppercase subsequent words',
    examples: ['quantumState', 'processAudio', 'lyricAnalysis'],
    regex: /^[a-z][a-zA-Z0-9]*$/,
    transform: (input: string): string => {
      const words = input.split(/[-_\s]+/);
      return words.map((word, i) => 
        i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('');
    }
  },
  
  'PascalCase': {
    pattern: 'PascalCase',
    description: 'Every word starts uppercase, no separators',
    examples: ['QuantumAnalyzer', 'BifrostBridge', 'DefinitionHarvester'],
    regex: /^[A-Z][a-zA-Z0-9]*$/,
    transform: (input: string): string => {
      const words = input.split(/[-_\s]+/);
      return words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('');
    }
  },
  
  'SCREAMING_SNAKE_CASE': {
    pattern: 'SCREAMING_SNAKE_CASE',
    description: 'Uppercase words separated by underscores',
    examples: ['MAX_QUANTUM_LEVEL', 'REALITY_API_KEY', 'BIFROST_CONFIG'],
    regex: /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/,
    transform: (input: string): string => {
      return input
        .toUpperCase()
        .replace(/[-_\s]+/g, '_')
        .replace(/[^A-Z0-9_]/g, '')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
    }
  }
};

// ============================================================================
// CONTEXT-SPECIFIC MAPPINGS
// ============================================================================

export type ContextType = 
  | 'directory'
  | 'python_file'
  | 'typescript_file'
  | 'react_component'
  | 'utility_file'
  | 'config_file'
  | 'css_class'
  | 'url_endpoint'
  | 'docker_service'
  | 'environment_variable'
  | 'python_variable'
  | 'python_function'
  | 'python_class'
  | 'typescript_variable'
  | 'typescript_function'
  | 'typescript_class'
  | 'constant'
  | 'api_route'
  | 'database_table'
  | 'database_column';

export interface ContextRule {
  context: ContextType;
  pattern: NamingPattern;
  examples: string[];
  fileExtension?: string;
}

export const CONTEXT_RULES: ContextRule[] = [
  // Directories & Folders
  { context: 'directory', pattern: 'kebab-case', examples: ['audio-processing/', 'lyric-analysis/'] },
  
  // Python
  { context: 'python_file', pattern: 'snake_case', examples: ['definition_extractor.py'], fileExtension: '.py' },
  { context: 'python_variable', pattern: 'snake_case', examples: ['scan_results'] },
  { context: 'python_function', pattern: 'snake_case', examples: ['extract_definitions'] },
  { context: 'python_class', pattern: 'PascalCase', examples: ['DefinitionHarvester'] },
  
  // TypeScript/JavaScript
  { context: 'typescript_file', pattern: 'snake_case', examples: ['extract_tables.ts', 'format_types.ts'], fileExtension: '.ts' },
  { context: 'react_component', pattern: 'PascalCase', examples: ['DefinitionVisualizer.tsx'], fileExtension: '.tsx' },
  { context: 'utility_file', pattern: 'snake_case', examples: ['audio_processor.ts', 'string_utils.ts'] },
  { context: 'config_file', pattern: 'snake_case', examples: ['tailwind.config.mjs', 'scan_config.py'] },
  { context: 'typescript_variable', pattern: 'camelCase', examples: ['quantumState'] },
  { context: 'typescript_function', pattern: 'camelCase', examples: ['processAudio'] },
  { context: 'typescript_class', pattern: 'PascalCase', examples: ['QuantumAnalyzer'] },
  
  // Web/UI
  { context: 'css_class', pattern: 'kebab-case', examples: ['quantum-visualizer', 'audio-processing-tool'] },
  { context: 'url_endpoint', pattern: 'kebab-case', examples: ['/api/quantum/scan', '/api/lyric-analysis'] },
  { context: 'api_route', pattern: 'kebab-case', examples: ['/api/audio-processing', '/api/cinematic-tools'] },
  
  // Docker & Deployment
  { context: 'docker_service', pattern: 'kebab-case', examples: ['bifrost-app', 'ziggy-service'] },
  { context: 'environment_variable', pattern: 'SCREAMING_SNAKE_CASE', examples: ['MAX_QUANTUM_LEVEL', 'REALITY_API_KEY'] },
  
  // Constants
  { context: 'constant', pattern: 'SCREAMING_SNAKE_CASE', examples: ['MAX_DEFINITIONS', 'DEFAULT_OUTPUT_DIR'] },
  
  // Database
  { context: 'database_table', pattern: 'snake_case', examples: ['user_profiles', 'product_categories'] },
  { context: 'database_column', pattern: 'snake_case', examples: ['created_at', 'user_id'] }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the appropriate naming pattern for a context
 */
export function getPatternForContext(context: ContextType): NamingPattern {
  const rule = CONTEXT_RULES.find(r => r.context === context);
  if (!rule) {
    throw new Error(`No naming rule defined for context: ${context}`);
  }
  return rule.pattern;
}

/**
 * Validate a name against the pattern for a given context
 */
export function validateName(name: string, context: ContextType): { valid: boolean; errors: string[] } {
  const pattern = getPatternForContext(context);
  const rule = NAMING_RULES[pattern];
  const errors: string[] = [];
  
  if (!rule.regex.test(name)) {
    errors.push(`"${name}" does not match ${pattern} pattern`);
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Transform a name to the correct pattern for a context
 */
export function transformName(name: string, context: ContextType): string {
  const pattern = getPatternForContext(context);
  const rule = NAMING_RULES[pattern];
  return rule.transform(name);
}

/**
 * Get file extension for a context (if applicable)
 */
export function getFileExtension(context: ContextType): string {
  const rule = CONTEXT_RULES.find(r => r.context === context);
  return rule?.fileExtension || '';
}

/**
 * Generate the full filename for a given context and base name
 */
export function generateFileName(baseName: string, context: ContextType): string {
  const transformed = transformName(baseName, context);
  const extension = getFileExtension(context);
  return extension ? `${transformed}${extension}` : transformed;
}

// ============================================================================
// REALITY-SPECIFIC FILE TYPE MAPPINGS
// ============================================================================

export interface RealityFileType {
  category: 'script' | 'config' | 'component' | 'utility' | 'type' | 'style';
  context: ContextType;
  directoryPattern: RegExp;
}

export const REALITY_FILE_TYPES: RealityFileType[] = [
  // GAIA Generators
  { category: 'script', context: 'typescript_file', directoryPattern: /generators\/gaia\// },
  { category: 'script', context: 'typescript_file', directoryPattern: /modules\/(extract|find|count)/ },
  { category: 'script', context: 'typescript_file', directoryPattern: /system\// },
  { category: 'script', context: 'typescript_file', directoryPattern: /shared\// },
  
  // Config Files
  { category: 'config', context: 'config_file', directoryPattern: /config\// },
  
  // React Components
  { category: 'component', context: 'react_component', directoryPattern: /components\// },
  
  // Type Definitions
  { category: 'type', context: 'typescript_file', directoryPattern: /types\// },
  
  // Styles
  { category: 'style', context: 'css_class', directoryPattern: /styles\// }
];

/**
 * Determine the context for a file based on its path
 */
export function detectContextFromPath(filePath: string): ContextType | null {
  for (const fileType of REALITY_FILE_TYPES) {
    if (fileType.directoryPattern.test(filePath)) {
      return fileType.context;
    }
  }
  
  // Fallback based on extension
  if (filePath.endsWith('.py')) return 'python_file';
  if (filePath.endsWith('.tsx')) return 'react_component';
  if (filePath.endsWith('.ts')) return 'typescript_file';
  if (filePath.endsWith('.css') || filePath.endsWith('.scss')) return 'css_class';
  
  return null;
}

// ============================================================================
// BULK RENAMING UTILITIES (for the migration phase)
// ============================================================================

export interface RenameOperation {
  oldPath: string;
  newPath: string;
  context: ContextType;
}

/**
 * Generate rename operations for a directory
 */
export function generateRenameOperations(
  files: string[],
  targetContext: ContextType
): RenameOperation[] {
  const operations: RenameOperation[] = [];
  const targetPattern = getPatternForContext(targetContext);
  
  for (const filePath of files) {
    const baseName = filePath.split('/').pop() || '';
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, '');
    const extension = baseName.match(/\.[^/.]+$/)?.[0] || '';
    
    const transformedName = NAMING_RULES[targetPattern].transform(nameWithoutExt);
    const newBaseName = `${transformedName}${extension}`;
    const newPath = filePath.replace(baseName, newBaseName);
    
    if (baseName !== newBaseName) {
      operations.push({
        oldPath: filePath,
        newPath,
        context: targetContext
      });
    }
  }
  
  return operations;
}

/**
 * Validate all files in a list against their expected contexts
 */
export function validateFiles(files: Array<{ path: string; expectedContext: ContextType }>): {
  valid: Array<{ path: string; name: string }>;
  invalid: Array<{ path: string; name: string; errors: string[] }>;
} {
  const valid: Array<{ path: string; name: string }> = [];
  const invalid: Array<{ path: string; name: string; errors: string[] }> = [];
  
  for (const { path, expectedContext } of files) {
    const fileName = path.split('/').pop() || '';
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    const validation = validateName(nameWithoutExt, expectedContext);
    
    if (validation.valid) {
      valid.push({ path, name: fileName });
    } else {
      invalid.push({ path, name: fileName, errors: validation.errors });
    }
  }
  
  return { valid, invalid };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  NAMING_RULES,
  CONTEXT_RULES,
  getPatternForContext,
  validateName,
  transformName,
  getFileExtension,
  generateFileName,
  detectContextFromPath,
  generateRenameOperations,
  validateFiles
};