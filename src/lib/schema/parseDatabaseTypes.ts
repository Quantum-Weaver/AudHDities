// src/lib/schema/parseDatabaseTypes.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PARSE DATABASE TYPES                                   ║
// ║                    Thin wrapper around generated schema JSON              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import schemaData from './schema-data.json';

export interface SchemaColumn {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
}

export interface SchemaRelationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one';
}

export interface SchemaTable {
  name: string;
  description: string;
  columns: SchemaColumn[];
  relationships: SchemaRelationship[];
}

export interface SchemaEnum {
  name: string;
  values: string[];
}

export interface SchemaFunction {
  name: string;
  args: string;
  returnType: string;
}

export function parseDatabaseTypes(): {
  tables: SchemaTable[];
  enums: SchemaEnum[];
  functions: SchemaFunction[];
} {
  const data = schemaData as {
    tables: SchemaTable[];
    enums: SchemaEnum[];
    functions: SchemaFunction[];
  };
  return {
    tables: data.tables,
    enums: data.enums,
    functions: data.functions,
  };
}