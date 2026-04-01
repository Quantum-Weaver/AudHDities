// scripts/generate/type-generator.ts
import { TableInfo, EnumInfo } from './parser';

export interface TypeFilePreview {
  tableName: string;
  filePath: string;
  content: string;
  action: 'create' | 'update' | 'skip';
  reason?: string;
}

export function previewTypeFile(table: TableInfo): TypeFilePreview {
  const filePath = `src/types/supabase/${table.name}.ts`;
  
  // Check if file exists (simulate)
  // In real version, we'd check fs.existsSync
  const exists = false; // Simulate for now
  
  if (exists) {
    return {
      tableName: table.name,
      filePath,
      content: '',
      action: 'skip',
      reason: 'File already exists',
    };
  }
  
  const content = generateTypeFileContent(table);
  
  return {
    tableName: table.name,
    filePath,
    content,
    action: 'create',
  };
}

function generateTypeFileContent(table: TableInfo): string {
  const typeName = toPascalCase(table.name);
  
  return `// types/supabase/${table.name}.ts
import type { Database } from './database.types';

export type ${typeName} = Database['public']['Tables']['${table.name}']['Row'];
export type ${typeName}Insert = Database['public']['Tables']['${table.name}']['Insert'];
export type ${typeName}Update = Database['public']['Tables']['${table.name}']['Update'];

// Extended type with relationships
export type ${typeName}WithRelations = ${typeName} & {
${generateRelationships(table)}
};
`;
}

function generateRelationships(table: TableInfo): string {
  const relations = table.relationships.map(rel => {
    const fieldName = toCamelCase(rel.referencedTable);
    return `  ${fieldName}?: ${toPascalCase(rel.referencedTable)} | null;`;
  });
  
  if (relations.length === 0) {
    return '  // Add relations here';
  }
  
  return relations.join('\n');
}

function toPascalCase(str: string): string {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}