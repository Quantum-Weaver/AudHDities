// src/config/object-categories.ts
// ============================================================================
// OBJECT CATEGORIES - Defines how each object should be handled by GAIA
// ============================================================================

export type HandlingLevel = 
  | 'full_crud'           // Row + Insert + Update + Public + Form + Validation + API + Hooks
  | 'assessment'          // Row + Form + Submit API
  | 'join_table'          // Row + Form + Link/Unlink API
  | 'read_only_view'      // Row only (no Insert/Update) + GET API only
  | 'function'            // Args + Returns only
  | 'type_enum'           // Type export only (from Database.public.Enums)
  | 'runtime_enum'        // Constant object + type export (from Constants.public.Enums)
  | 'composite'           // Skip
  | 'unknown';            // Needs review

export interface ObjectCategory {
  handlingLevel: HandlingLevel;
  
  // Type file generation flags
  generateRow: boolean;
  generateInsert: boolean;
  generateUpdate: boolean;
  generatePublicInterface: boolean;
  generateFormInterface: boolean;
  generateValidationInterface: boolean;
  
  // Constant file generation flags
  generateConstants: boolean;
  
  // API generation flags
  generateApiGetList: boolean;
  generateApiGetSingle: boolean;
  generateApiPost: boolean;
  generateApiPut: boolean;
  generateApiDelete: boolean;
  generateApiSpecial: string[];
  
  // Utility generation flag
  generateUtils: boolean;
  
  // Hook generation flag
  generateHooks: boolean;
  
  defaultFolder?: string;
  notes?: string;
}

// ============================================================================
// DEFAULT CONFIGURATIONS BY HANDLING LEVEL
// ============================================================================

export const LEVEL_CONFIG: Record<HandlingLevel, ObjectCategory> = {
  full_crud: {
    handlingLevel: 'full_crud',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: true,
    generateHooks: true,
    notes: 'Full CRUD operations with all interfaces, API routes, utils, and hooks'
  },
  
  assessment: {
    handlingLevel: 'assessment',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['submit', 'results'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Assessment data - form interface only, with submit/results API'
  },
  
  join_table: {
    handlingLevel: 'join_table',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: true,
    generateApiSpecial: ['link', 'unlink'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Join/link table - foreign key references with link/unlink API'
  },
  
  read_only_view: {
    handlingLevel: 'read_only_view',
    // Types
    generateRow: true,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: true,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Read-only view - no write operations, GET API only'
  },
  
  function: {
    handlingLevel: 'function',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: true,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: ['invoke'],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Database function - POST invoke API only'
  },
  
  type_enum: {
    handlingLevel: 'type_enum',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Type-only enum from Database.public.Enums'
  },
  
  runtime_enum: {
    handlingLevel: 'runtime_enum',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: true,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    defaultFolder: 'hestia-core',
    notes: 'Runtime enum from Constants.public.Enums'
  },
  
  composite: {
    handlingLevel: 'composite',
    // Types
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: false,
    generateApiGetSingle: false,
    generateApiPost: false,
    generateApiPut: false,
    generateApiDelete: false,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: false,
    generateHooks: false,
    notes: 'Composite type - skip generation'
  },
  
  unknown: {
    handlingLevel: 'unknown',
    // Types
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    // Constants
    generateConstants: false,
    // API
    generateApiGetList: true,
    generateApiGetSingle: true,
    generateApiPost: true,
    generateApiPut: true,
    generateApiDelete: true,
    generateApiSpecial: [],
    // Utils & Hooks
    generateUtils: true,
    generateHooks: true,
    notes: 'Unknown type - generate everything as safe default'
  }
};

// ============================================================================
// TABLE CATEGORIZATION (by name patterns)
// ============================================================================

export const TABLE_CATEGORIES: Record<string, HandlingLevel> = {
  // Full CRUD tables
  profiles: 'full_crud',
  products: 'full_crud',
  posts: 'full_crud',
  channels: 'full_crud',
  comments: 'full_crud',
  subscriptions: 'full_crud',
  notifications: 'full_crud',
  messages: 'full_crud',
  
  // Assessment tables
  acid_test_questions: 'assessment',
  acid_test_answers: 'assessment',
  acid_test_results: 'assessment',
  
  // Join tables
  user_quests: 'join_table',
  user_badges: 'join_table',
  contributions: 'join_table',
  creator_profiles: 'join_table',
  vendor_profiles: 'join_table',
  community_profiles: 'join_table',
  
  // Read-only views
  personalized_feed: 'read_only_view',
  public_transparency: 'read_only_view',
  my_residuals: 'read_only_view',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get handling level for a table by name
 */
export function getTableHandlingLevel(tableName: string): HandlingLevel {
  return TABLE_CATEGORIES[tableName] || 'full_crud';
}

/**
 * Get full category config for a table
 */
export function getTableCategory(tableName: string): ObjectCategory {
  const level = getTableHandlingLevel(tableName);
  return LEVEL_CONFIG[level];
}

/**
 * Get handling level for a view
 */
export function getViewHandlingLevel(viewName: string): HandlingLevel {
  return 'read_only_view';
}

/**
 * Get handling level for a function
 */
export function getFunctionHandlingLevel(functionName: string): HandlingLevel {
  return 'function';
}

/**
 * Get handling level for an enum (type-level)
 */
export function getTypeEnumHandlingLevel(enumName: string): HandlingLevel {
  return 'type_enum';
}

/**
 * Get handling level for an enum (runtime)
 */
export function getRuntimeEnumHandlingLevel(enumName: string): HandlingLevel {
  return 'runtime_enum';
}

/**
 * Get category config for any object based on type and name
 */
export function getObjectCategory(
  objectType: 'table' | 'view' | 'function' | 'type_enum' | 'runtime_enum',
  objectName: string
): ObjectCategory {
  switch (objectType) {
    case 'table':
      return getTableCategory(objectName);
    case 'view':
      return LEVEL_CONFIG[getViewHandlingLevel(objectName)];
    case 'function':
      return LEVEL_CONFIG[getFunctionHandlingLevel(objectName)];
    case 'type_enum':
      return LEVEL_CONFIG[getTypeEnumHandlingLevel(objectName)];
    case 'runtime_enum':
      return LEVEL_CONFIG[getRuntimeEnumHandlingLevel(objectName)];
    default:
      return LEVEL_CONFIG.unknown;
  }
}

/**
 * Check if a table needs API routes
 */
export function needsApiRoutes(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateApiGetList || category.generateApiGetSingle || 
         category.generateApiPost || category.generateApiPut || 
         category.generateApiDelete || category.generateApiSpecial.length > 0;
}

/**
 * Check if a table needs validators
 */
export function needsValidators(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateRow && (category.generateInsert || category.generateUpdate);
}

/**
 * Check if a table needs utilities
 */
export function needsUtils(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateUtils;
}

/**
 * Check if a table needs hooks
 */
export function needsHooks(tableName: string): boolean {
  const category = getTableCategory(tableName);
  return category.generateHooks;
}