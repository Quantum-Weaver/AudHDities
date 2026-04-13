/* @/scripts/modules/assemble/assemble_api_file.ts */
// Updated to include validator imports for single routes

import { GeneratedRoute } from '../format/format_api_file.js';

export interface AssembleApiFileOptions {
  tableName: string;
  mainRoutes?: GeneratedRoute[];      // Routes for main route.ts (GET list, POST)
  singleRoutes?: GeneratedRoute[];    // Routes for [id]/route.ts (GET single, PUT, DELETE)
  specialRoutes?: Map<string, GeneratedRoute>; // Special routes (submit, results, etc.)
}

/**
 * Assemble main API route file (route.ts)
 */
export function assembleMainApiFile(tableName: string, routes: GeneratedRoute[]): string {
  const timestamp = new Date().toISOString();
  
  // Collect all unique imports
  const allImports = new Set<string>();
  for (const route of routes) {
    route.imports.forEach(imp => allImports.add(imp));
  }
  
  // Build imports section
  const importList = Array.from(allImports).sort();
  
  // Add validator import if POST is present
  const hasPost = routes.some(r => r.code.includes('InsertSchema'));
  const validatorImport = hasPost 
    ? `\nimport { ${toPascalCase(tableName)}InsertSchema } from '@/lib/validators/${tableName}';`
    : '';
  
  return `// =====================================================
// FILE: app/api/${tableName}/route.ts
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
export function assembleSingleApiFile(tableName: string, routes: GeneratedRoute[]): string {
  const timestamp = new Date().toISOString();
  
  // Collect all unique imports
  const allImports = new Set<string>();
  for (const route of routes) {
    route.imports.forEach(imp => allImports.add(imp));
  }
  
  // Build imports section
  const importList = Array.from(allImports).sort();
  
  // Add validator import if PUT is present (PUT uses InsertSchema)
  const hasPut = routes.some(r => r.code.includes('InsertSchema'));
  const validatorImport = hasPut 
    ? `\nimport { ${toPascalCase(tableName)}InsertSchema } from '@/lib/validators/${tableName}';`
    : '';
  
  return `// =====================================================
// FILE: app/api/${tableName}/[id]/route.ts
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { ${importList.join(', ')} } from '@/lib/api/auth';${validatorImport}

${routes.map(r => r.code).join('\n\n')}
`;
}

/**
 * Assemble special API route file
 */
export function assembleSpecialApiFile(tableName: string, specialType: string, route: GeneratedRoute): string {
  const timestamp = new Date().toISOString();
  
  const importList = route.imports.sort();
  
  return `// =====================================================
// FILE: app/api/${tableName}/${specialType}/route.ts
// GENERATED: ${timestamp}
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { ${importList.join(', ')} } from '@/lib/api/auth';

${route.code}
`;
}

/**
 * Helper to convert table name to PascalCase for validator import
 */
function toPascalCase(str: string): string {
  return str.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}