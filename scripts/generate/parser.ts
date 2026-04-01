// scripts/generate/parser.ts
import * as fs from 'fs';
import * as path from 'path';

export interface TableInfo {
  name: string;
  schema: 'public';
  columns: string[];
  relationships: {
    foreignKeyName: string;
    columns: string[];
    referencedTable: string;
    referencedColumns: string[];
  }[];
  isView: boolean;
}

export interface EnumInfo {
  name: string;
  values: string[];
}

export interface ParserOutput {
  tables: TableInfo[];
  enums: EnumInfo[];
  views: TableInfo[];
}

export function parseDatabaseTypes(filePath: string): ParserOutput {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const tables: TableInfo[] = [];
  const enums: EnumInfo[] = [];
  const views: TableInfo[] = [];
  
  // Extract the public section
  const publicMatch = content.match(/public: \{\s*Tables: \{([\s\S]*?)\}\s*Views:/);
  if (!publicMatch) {
    console.error('Could not find public.Tables section');
    return { tables, enums, views };
  }
  
  const tablesContent = publicMatch[1];
  
  // Find all table definitions - match from table name to the closing brace before next table
  const tableRegex = /(\w+): \{\s*Row: \{([\s\S]*?)\}\s*Insert:/g;
  let match;
  
  while ((match = tableRegex.exec(tablesContent)) !== null) {
    const tableName = match[1];
    const rowContent = match[2];
    
    // Skip if it's a view (no Insert/Update sections will be caught by different regex)
    if (rowContent) {
      const columns = extractColumns(rowContent);
      const relationships = extractRelationships(content, tableName);
      
      tables.push({
        name: tableName,
        schema: 'public',
        columns,
        relationships,
        isView: false,
      });
    }
  }
  
  // Find views (tables without Insert/Update sections)
  const viewRegex = /(\w+): \{\s*Row: \{([\s\S]*?)\}\s*Relationships:/g;
  let viewMatch;
  
  while ((viewMatch = viewRegex.exec(tablesContent)) !== null) {
    const viewName = viewMatch[1];
    const rowContent = viewMatch[2];
    
    // Skip if it's already in tables
    if (!tables.find(t => t.name === viewName)) {
      const columns = extractColumns(rowContent);
      
      views.push({
        name: viewName,
        schema: 'public',
        columns,
        relationships: [],
        isView: true,
      });
    }
  }
  
  // Extract Enums
  const enumsMatch = content.match(/Enums: \{([\s\S]*?)\}\s*CompositeTypes:/);
  if (enumsMatch) {
    const enumsContent = enumsMatch[1];
    const enumRegex = /(\w+): \[([\s\S]*?)\]/g;
    let enumMatch;
    
    while ((enumMatch = enumRegex.exec(enumsContent)) !== null) {
      const enumName = enumMatch[1];
      const valuesStr = enumMatch[2];
      
      const values = valuesStr
        .split(',')
        .map(v => v.trim().replace(/"/g, ''))
        .filter(v => v && v !== '');
      
      enums.push({
        name: enumName,
        values,
      });
    }
  }
  
  return { tables, enums, views };
}

function extractColumns(rowContent: string): string[] {
  const columns: string[] = [];
  
  // Match column names (word followed by colon)
  const colRegex = /(\w+): /g;
  let colMatch;
  
  while ((colMatch = colRegex.exec(rowContent)) !== null) {
    columns.push(colMatch[1]);
  }
  
  return columns;
}

function extractRelationships(content: string, tableName: string): TableInfo['relationships'] {
  const relationships: TableInfo['relationships'] = [];
  
  // Find the Relationships section for this table
  const tableSectionRegex = new RegExp(`${tableName}: \\{([\\s\\S]*?)\\n  \\}`, 'm');
  const tableMatch = content.match(tableSectionRegex);
  
  if (!tableMatch) return relationships;
  
  const tableContent = tableMatch[1];
  
  // Find the Relationships array
  const relArrayRegex = /Relationships: \[([\s\S]*?)\]/;
  const relMatch = tableContent.match(relArrayRegex);
  
  if (!relMatch) return relationships;
  
  const relContent = relMatch[1];
  
  // Match each relationship object - simpler regex for each property
  const relationshipBlocks = relContent.split('},\n  {');
  
  for (const block of relationshipBlocks) {
    // Extract foreignKeyName
    const fkMatch = block.match(/foreignKeyName: "([^"]+)"/);
    // Extract columns
    const colsMatch = block.match(/columns: \[([^\]]+)\]/);
    // Extract referencedRelation
    const refTableMatch = block.match(/referencedRelation: "([^"]+)"/);
    // Extract referencedColumns
    const refColsMatch = block.match(/referencedColumns: \[([^\]]+)\]/);
    
    if (fkMatch && colsMatch && refTableMatch && refColsMatch) {
      relationships.push({
        foreignKeyName: fkMatch[1],
        columns: colsMatch[1].split(',').map(c => c.trim().replace(/"/g, '')),
        referencedTable: refTableMatch[1],
        referencedColumns: refColsMatch[1].split(',').map(c => c.trim().replace(/"/g, '')),
      });
    }
  }
  
  return relationships;
}