// src/config/object-categories.ts
// Defines how each object should be handled by the generator

export type HandlingLevel = 
  | 'full_crud'           // Row + Insert + Update + Public + Form + Validation
  | 'assessment'          // Row + Form (minimal)
  | 'join_table'          // Row + Foreign keys + Form
  | 'read_only_view'      // Row only (no Insert/Update)
  | 'function'            // Args + Returns only
  | 'type_enum'           // Type export only (from Database.public.Enums)
  | 'runtime_enum'        // Constant object + type export (from Constants.public.Enums)
  | 'composite'           // Skip
  | 'unknown';            // Needs review

export interface ObjectCategory {
  handlingLevel: HandlingLevel;
  generateRow: boolean;
  generateInsert: boolean;
  generateUpdate: boolean;
  generatePublicInterface: boolean;
  generateFormInterface: boolean;
  generateValidationInterface: boolean;
  generateConstants: boolean;
  defaultFolder?: string;
  notes?: string;
}

// Default configurations by handling level
export const LEVEL_CONFIG: Record<HandlingLevel, ObjectCategory> = {
  full_crud: {
    handlingLevel: 'full_crud',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    generateConstants: false,
    notes: 'Full CRUD operations with all interfaces'
  },
  assessment: {
    handlingLevel: 'assessment',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    generateConstants: false,
    notes: 'Assessment data - form interface only'
  },
  join_table: {
    handlingLevel: 'join_table',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: false,
    generateFormInterface: true,
    generateValidationInterface: false,
    generateConstants: false,
    notes: 'Join/link table - foreign key references'
  },
  read_only_view: {
    handlingLevel: 'read_only_view',
    generateRow: true,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: true,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    notes: 'Read-only view - no write operations'
  },
  function: {
    handlingLevel: 'function',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    defaultFolder: 'hestia_core',
    notes: 'Database function - Args + Returns only'
  },
  type_enum: {
    handlingLevel: 'type_enum',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    defaultFolder: 'hestia_core',
    notes: 'Type-only enum from Database.public.Enums'
  },
  runtime_enum: {
    handlingLevel: 'runtime_enum',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: true,
    defaultFolder: 'hestia_core',
    notes: 'Runtime enum from Constants.public.Enums'
  },
  composite: {
    handlingLevel: 'composite',
    generateRow: false,
    generateInsert: false,
    generateUpdate: false,
    generatePublicInterface: false,
    generateFormInterface: false,
    generateValidationInterface: false,
    generateConstants: false,
    notes: 'Composite type - skip generation'
  },
  unknown: {
    handlingLevel: 'unknown',
    generateRow: true,
    generateInsert: true,
    generateUpdate: true,
    generatePublicInterface: true,
    generateFormInterface: true,
    generateValidationInterface: true,
    generateConstants: false,
    notes: 'Unknown type - generate everything as safe default'
  }
};

// =====================================================
// TABLE CATEGORIZATION (by name patterns)
// =====================================================

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

// =====================================================
// HELPER FUNCTIONS
// =====================================================

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
  // Views are always read-only
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