// scripts/fix-validators-and-apis.ts
// Run with: npx tsx scripts/fix-validators-and-apis.ts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TableSchema {
  tableName: string;
  requiredFields: string[];
  optionalFields: string[];
}

// Database schema definitions - extract from your database.types.ts
const TABLE_SCHEMAS: Record<string, TableSchema> = {
  products: {
    tableName: 'products',
    requiredFields: ['creator_id', 'product_type', 'slug', 'title'],
    optionalFields: ['active', 'bigot_tax_cents', 'category', 'channel_id', 'collaborators', 'created_at', 'created_by', 'description', 'download_url', 'id', 'is_published', 'is_recurring', 'media_urls', 'owner_type', 'platform_fee_percent', 'price_ally', 'price_community', 'price_corporate', 'recurring_interval', 'residual_pool_percent', 'sanctuary_infrastructure_percent', 'stripe_price_id', 'stripe_product_id', 'tags', 'updated_at']
  },
  applications: {
    tableName: 'applications',
    requiredFields: ['application_type', 'form_data', 'user_id'],
    optionalFields: ['admin_notes', 'created_at', 'created_by', 'id', 'onboarding_doc_path', 'onboarding_version', 'review_notes', 'reviewed_at', 'reviewed_by', 'status', 'updated_at']
  }
};

// Fix validator files
function fixValidatorFile(validatorPath: string, schema: TableSchema) {
  console.log(`\n📝 Fixing validator: ${validatorPath}`);
  
  if (!fs.existsSync(validatorPath)) {
    console.log(`  ⚠️ Validator not found: ${validatorPath}`);
    return false;
  }
  
  let content = fs.readFileSync(validatorPath, 'utf-8');
  
  // Fix each required field - remove .optional()
  for (const field of schema.requiredFields) {
    // Pattern 1: field_name: z.something().optional()
    const pattern1 = new RegExp(`(${field}: z\\.[a-zA-Z0-9_\\.]+\\(\\)\\.(?:nullable\\(\\)\\.)?)optional\\(\\)`, 'g');
    if (pattern1.test(content)) {
      content = content.replace(pattern1, '$1');
      console.log(`  ✅ Fixed required field: ${field} (removed .optional())`);
    }
    
    // Pattern 2: field_name: z.something().nullable().optional()
    const pattern2 = new RegExp(`(${field}: z\\.[a-zA-Z0-9_\\.]+\\(\\)\\.nullable\\(\\)\\.)optional\\(\\)`, 'g');
    if (pattern2.test(content)) {
      content = content.replace(pattern2, '$1');
      console.log(`  ✅ Fixed required field: ${field} (removed .optional() from nullable)`);
    }
    
    // Pattern 3: field_name: z.something().optional() with no chaining
    const pattern3 = new RegExp(`(${field}: z\\.[a-zA-Z0-9_\\.]+\\(\\))\\.optional\\(\\)`, 'g');
    if (pattern3.test(content)) {
      content = content.replace(pattern3, '$1');
      console.log(`  ✅ Fixed required field: ${field} (removed .optional() from base)`);
    }
  }
  
  // Write back
  fs.writeFileSync(validatorPath, content);
  console.log(`  💾 Saved: ${validatorPath}`);
  
  return true;
}

// Fix API POST routes to use InsertSchema
function fixApiRoute(apiPath: string, tableName: string) {
  console.log(`\n🔧 Fixing API route: ${apiPath}`);
  
  if (!fs.existsSync(apiPath)) {
    console.log(`  ⚠️ API route not found: ${apiPath}`);
    return false;
  }
  
  let content = fs.readFileSync(apiPath, 'utf-8');
  
  const insertSchemaName = `${tableName.charAt(0).toUpperCase() + tableName.slice(1)}InsertSchema`;
  const rowSchemaName = `${tableName.charAt(0).toUpperCase() + tableName.slice(1)}RowSchema`;
  
  // Check if using RowSchema in POST handler
  if (content.includes(rowSchemaName)) {
    // Find the POST handler section
    const lines = content.split('\n');
    let inPostHandler = false;
    let modifiedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Detect POST handler
      if (line.includes('export async function POST') || line.includes('export const POST')) {
        inPostHandler = true;
      }
      
      // Replace RowSchema with InsertSchema in POST handler
      if (inPostHandler && line.includes(rowSchemaName)) {
        modifiedLines.push(line.replace(rowSchemaName, insertSchemaName));
        console.log(`  ✅ Updated POST route to use ${insertSchemaName}`);
      } else {
        modifiedLines.push(line);
      }
      
      // Exit POST handler when we hit another export or end of function
      if (inPostHandler && (line.includes('export async function') && !line.includes('POST')) || 
          (line.includes('export const') && !line.includes('POST'))) {
        inPostHandler = false;
      }
    }
    
    content = modifiedLines.join('\n');
    
    // Also update imports if needed
    if (!content.includes(insertSchemaName)) {
      content = content.replace(
        new RegExp(`import \\{ ([^}]+) \\} from '([^']+)'`),
        (match, imports, importPath) => {
          if (imports.includes(rowSchemaName) && !imports.includes(insertSchemaName)) {
            const newImports = imports.replace(rowSchemaName, `${rowSchemaName}, ${insertSchemaName}`);
            return `import { ${newImports} } from '${importPath}'`;
          }
          return match;
        }
      );
    }
    
    fs.writeFileSync(apiPath, content);
    return true;
  } else {
    console.log(`  ℹ️ API route already using correct schema or no POST handler found`);
    return false;
  }
}

// Generate a report of what was fixed
function generateReport(fixes: { validator: string[]; api: string[] }) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 FIX REPORT');
  console.log('='.repeat(60));
  
  if (fixes.validator.length > 0) {
    console.log('\n✅ Validators Fixed:');
    fixes.validator.forEach(f => console.log(`  - ${f}`));
  }
  
  if (fixes.api.length > 0) {
    console.log('\n✅ API Routes Fixed:');
    fixes.api.forEach(f => console.log(`  - ${f}`));
  }
  
  if (fixes.validator.length === 0 && fixes.api.length === 0) {
    console.log('\n⚠️ No fixes were applied. Check that:');
    console.log('  1. File paths are correct');
    console.log('  2. Required fields match the database schema');
    console.log('  3. Validators actually have .optional() on required fields');
  }
}

// Main execution
async function main() {
  console.log('🚀 STARTING VALIDATOR AND API FIX SCRIPT\n');
  console.log('=' .repeat(60));
  
  const fixes = {
    validator: [] as string[],
    api: [] as string[]
  };
  
  // Fix validators
  console.log('\n📋 PHASE 1: Fixing Validator InsertSchemas');
  console.log('-'.repeat(40));
  
  // Try both possible paths
  const possiblePaths = [    
    'src/lib/validators/generated/aethelred-connections',
    'src/lib/validators/generated/athena-gamification',    
    'src/lib/validators/generated/hephaestus-infrastructure',
    'src/lib/validators/generated/hermes-social',
    'src/lib/validators/generated/hestia-core',    
    'src/lib/validators/generated/iris-communications',
    'src/lib/validators/generated/mnemosyne-assessment',    
    'src/lib/validators/generated/plutus-economics',
    'src/lib/validators/generated/prometheus-meta',
    'src/lib/validators/generated/themis-governance',
  ];
  
  for (const [tableName, schema] of Object.entries(TABLE_SCHEMAS)) {
    let fixed = false;
    
    for (const basePath of possiblePaths) {
      const validatorPath = path.join(process.cwd(), basePath, `${tableName}.ts`);
      
      if (fs.existsSync(validatorPath)) {
        if (fixValidatorFile(validatorPath, schema)) {
          fixes.validator.push(`${basePath}/${tableName}.ts`);
          fixed = true;
          break;
        }
      }
    }
    
    if (!fixed) {
      console.log(`  ⚠️ Could not find validator for ${tableName} in any expected location`);
    }
  }
  
  // Fix API routes
  console.log('\n\n📡 PHASE 2: Fixing API POST Routes');
  console.log('-'.repeat(40));
  
  const apiPaths = [
    'src/app/api/generated/aethelred-connections',
    'src/app/api/generated/athena-gamification',    
    'src/app/api/generated/hephaestus-infrastructure',
    'src/app/api/generated/hermes-social',
    'src/app/api/generated/hestia-core',    
    'src/app/api/generated/iris-communications',
    'src/app/api/generated/mnemosyne-assessment',    
    'src/app/api/generated/plutus-economics',
    'src/app/api/generated/prometheus-meta',
    'src/app/api/generated/themis-governance',
  ];
  
  for (const tableName of Object.keys(TABLE_SCHEMAS)) {
    let fixed = false;
    
    for (const basePath of apiPaths) {
      const apiPath = path.join(process.cwd(), basePath, tableName, 'route.ts');
      
      if (fs.existsSync(apiPath)) {
        if (fixApiRoute(apiPath, tableName)) {
          fixes.api.push(`${basePath}/${tableName}/route.ts`);
          fixed = true;
          break;
        }
      }
    }
    
    if (!fixed) {
      console.log(`  ⚠️ Could not find API route for ${tableName} in any expected location`);
    }
  }
  
  // Generate report
  generateReport(fixes);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ SCRIPT COMPLETE!');
  console.log('\n📝 Next steps:');
  console.log('  1. Run: npm run type-check');
  console.log('  2. Update forms to include required fields (creator_id, user_id, etc.)');
  console.log('  3. Test POST endpoints');
}

// Run the script
main().catch(console.error);