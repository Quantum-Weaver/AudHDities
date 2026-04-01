// scripts/generate-schema.ts
import fs from 'fs/promises';
import path from 'path';
import { parseDatabaseTypes } from '../lib/schema/parseDatabaseTypes';

async function generateSchemaPage() {
  const { tables, enums } = parseDatabaseTypes();
  
  // Generate a static JSON file that the page can import
  const schemaData = { tables, enums, generatedAt: new Date().toISOString() };
  
  await fs.writeFile(
    path.join(process.cwd(), 'public', 'schema-data.json'),
    JSON.stringify(schemaData, null, 2)
  );
  
  console.log('✅ Schema data generated successfully');
}

generateSchemaPage().catch(console.error);