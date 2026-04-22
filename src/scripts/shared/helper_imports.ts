// src/scripts/shared/helper_imports.ts
// ============================================================================
// HELPER IMPORTS - Centralized import templates for generators
// ============================================================================

/**
 * Convert snake_case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

export const HELPER_IMPORTS = {
  // =====================================================
  // TYPE FILE IMPORTS
  // =====================================================
  
  /** Imports for generated type files */
  typeFile: `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';`,
  
  /** Imports for generated view type files */
  viewTypeFile: `import type { Tables } from '@/types/supabase/database.helpers';`,
  
  // =====================================================
  // VALIDATOR FILE IMPORTS
  // =====================================================
  
  /**
   * Imports for generated validator files
   * @param enumRefs - Array of enum names referenced by the table
   */
  validatorFile: (enumRefs: string[] = []) => {
    const lines = [
      `import { z } from 'zod';`,
      `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';`,
    ];
    
    if (enumRefs.length > 0) {
      const pascalNames = enumRefs.map(e => toPascalCase(e));
      const enumImports = pascalNames.map(n => `isValid${n}`).join(', ');
      lines.push(`import { ENUM_VALUES, ${enumImports} } from '@/types/supabase/enums';`);
    }
    
    return lines.join('\n');
  },
  
  // =====================================================
  // CONSTANTS FILE IMPORTS
  // =====================================================
  
  /** Imports for generated constant files (runtime enums) */
  constantsFile: `import type { Enums } from '@/types/supabase/database.helpers';`,
  
  // =====================================================
  // API ROUTE IMPORTS
  // =====================================================
  
  /**
   * Imports for generated API route files
   * @param tableName - Name of the table
   * @param deityFolder - Deity folder for validator import
   */
  apiRoute: (tableName: string, deityFolder: string) => {
    const pascalName = toPascalCase(tableName);
    return [
      `import { NextRequest, NextResponse } from 'next/server';`,
      `import { createApiSupabase } from '@/lib/api/supabase';`,
      `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';`,
      `import { ${pascalName}RowSchema, ${pascalName}InsertSchema, ${pascalName}UpdateSchema } from '@/lib/validators/generated/${deityFolder}/${tableName}';`,
    ].join('\n');
  },
  
  /**
   * Imports for read-only view API routes
   */
  viewApiRoute: (viewName: string, deityFolder: string) => {
    return [
      `import { NextRequest, NextResponse } from 'next/server';`,
      `import { createApiSupabase } from '@/lib/api/supabase';`,
      `import type { Tables } from '@/types/supabase/database.helpers';`,
    ].join('\n');
  },
  
  // =====================================================
  // HOOK IMPORTS
  // =====================================================
  
  /**
   * Imports for generated React hook files
   * @param tableName - Name of the table
   * @param deityFolder - Deity folder for type import
   */
  hooks: (tableName: string, deityFolder: string) => {
    const pascalName = toPascalCase(tableName);
    return [
      `import { useState, useEffect, useCallback } from 'react';`,
      `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';`,
      `import type { ${pascalName}Row, ${pascalName}Insert, ${pascalName}Update } from '@/types/generated/${deityFolder}/${tableName}';`,
    ].join('\n');
  },
  
  // =====================================================
  // UTILITY IMPORTS
  // =====================================================
  
  /**
   * Imports for generated utility files
   */
  utils: (tableName: string, deityFolder: string) => {
    const pascalName = toPascalCase(tableName);
    return [
      `import { createClient } from '@/lib/supabase/client';`,
      `import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';`,
      `import { ${pascalName}InsertSchema, ${pascalName}UpdateSchema } from '@/lib/validators/generated/${deityFolder}/${tableName}';`,
    ].join('\n');
  },
  
  // =====================================================
  // BULK IMPORTS
  // =====================================================
  
  /** All helper types in one import */
  allHelpers: `import type { Tables, TablesInsert, TablesUpdate, Enums, PublicTableNames, PublicViewNames, PublicEnumNames } from '@/types/supabase/database.helpers';`,
  
  /** All enum runtime helpers */
  allEnumHelpers: `import { ENUM_VALUES, ALL_ENUM_NAMES } from '@/types/supabase/enums';`,
};

export default HELPER_IMPORTS;