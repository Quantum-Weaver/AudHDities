/* src/scripts/modules/assemble/assemble_api_file.ts */
// ============================================================================
// ASSEMBLE API FILE
// ============================================================================
// Purpose: Assemble API route files from generated route components
// Supports deity folder structure: app/api/generated/{deityFolder}/{tableName}/route.ts
// ============================================================================

import { GeneratedRoute } from '../format/format_api_file.js';

export interface AssembleApiFileOptions {
  tableName: string;
  deityFolder?: string;           // Deity folder for nested structure (e.g., 'hestia-core')
  mainRoutes?: GeneratedRoute[];   // Routes for main route.ts (GET list, POST)
  singleRoutes?: GeneratedRoute[]; // Routes for [id]/route.ts (GET single, PUT, DELETE)
  specialRoutes?: Map<string, GeneratedRoute>; // Special routes (submit, results, etc.)
}

/**
 * Helper to convert table name to PascalCase for validator import
 */
function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Build the API base path with deity folder if provided
 * @param deityFolder - Optional deity folder name (e.g., 'hestia-core')
 * @param tableName - Name of the table
 * @param routePath - Additional route path (e.g., '[id]', 'submit')
 * @returns Full API route path
 */
function buildApiPath(deityFolder: string | undefined, tableName: string, routePath: string = ''): string {
  const base = 'app/api/generated';
  if (deityFolder) {
    if (routePath) {
      return `${base}/${deityFolder}/${tableName}/${routePath}`;
    }
    return `${base}/${deityFolder}/${tableName}`;
  }
  // Fallback to flat structure (no deity folder)
  if (routePath) {
    return `${base}/${tableName}/${routePath}`;
  }
  return `${base}/${tableName}`;
}

/**
 * Build validator import path with deity folder support
 * @param deityFolder - Deity folder name (e.g., 'hestia-core')
 * @param tableName - Name of the table
 * @returns Import path for validators
 */
function buildValidatorImportPath(deityFolder: string | undefined, tableName: string): string {
  if (deityFolder) {
    return `@/lib/validators/generated/${deityFolder}/${tableName}`;
  }
  return `@/lib/validators/generated/${tableName}`;
}

/**
 * Assemble main API route file (route.ts)
 */
export function assembleMainApiFile(
  tableName: string,
  routes: GeneratedRoute[],
  deityFolder?: string
): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  const filePath = buildApiPath(deityFolder, tableName, 'route.ts');
  
  // Collect all unique imports
  const allImports = new Set<string>();
  for (const route of routes) {
    route.imports.forEach(imp => allImports.add(imp));
  }
  
  // Build imports section
  const importList = Array.from(allImports).sort();
  
  // Add validator import if POST is present
  const hasPost = routes.some(r => r.code.includes('InsertSchema'));
  const validatorImportPath = buildValidatorImportPath(deityFolder, tableName);
  const validatorImport = hasPost 
    ? `\nimport { ${pascalName}InsertSchema } from '${validatorImportPath}';`
    : '';
  
  return `// =====================================================
// FILE: ${filePath}
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { ${importList.join(', ')} } from '@/lib/api/auth';${validatorImport}

${routes.map(r => r.code).join('\n\n')}
`;
}

/**
 * Assemble single-record API route file ([id]/route.ts)
 */
export function assembleSingleApiFile(
  tableName: string,
  routes: GeneratedRoute[],
  deityFolder?: string
): string {
  const timestamp = new Date().toISOString();
  const pascalName = toPascalCase(tableName);
  const filePath = buildApiPath(deityFolder, tableName, '[id]/route.ts');
  
  // Collect all unique imports
  const allImports = new Set<string>();
  for (const route of routes) {
    route.imports.forEach(imp => allImports.add(imp));
  }
  
  // Build imports section
  const importList = Array.from(allImports).sort();
  
  // Add validator import if PUT is present (PUT uses UpdateSchema)
  const hasPut = routes.some(r => r.code.includes('UpdateSchema'));
  const validatorImportPath = buildValidatorImportPath(deityFolder, tableName);
  const validatorImport = hasPut 
    ? `\nimport { ${pascalName}UpdateSchema } from '${validatorImportPath}';`
    : '';
  
  // Also check for InsertSchema (POST in main route, not here)
  const hasInsert = routes.some(r => r.code.includes('InsertSchema'));
  const insertImport = hasInsert 
    ? `\nimport { ${pascalName}InsertSchema } from '${validatorImportPath}';`
    : '';
  
  return `// =====================================================
// FILE: ${filePath}
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { ${importList.join(', ')} } from '@/lib/api/auth';${validatorImport}${insertImport}

${routes.map(r => r.code).join('\n\n')}
`;
}

/**
 * Assemble special API route file (e.g., submit, results, link, unlink)
 */
export function assembleSpecialApiFile(
  tableName: string,
  specialType: string,
  route: GeneratedRoute,
  deityFolder?: string
): string {
  const timestamp = new Date().toISOString();
  const filePath = buildApiPath(deityFolder, tableName, `${specialType}/route.ts`);
  
  const importList = route.imports.sort();
  
  return `// =====================================================
// FILE: ${filePath}
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { ${importList.join(', ')} } from '@/lib/api/auth';

${route.code}
`;
}