// src/scripts/system/gaia/generate_tables_file.ts
// ============================================================================
// GENERATE TABLES.TS - Standalone script
// ============================================================================
// Purpose: Generate helper types for accessing tables, enums, and composite types
// Output: src/types/supabase/tables.ts
// Behavior: Idempotent - only writes when content changes
// Usage: tsx src/scripts/system/gaia/generate_tables_file.ts [--dry-run] [--force] [--verbose]
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// ============================================================================
// PATHS
// ============================================================================

const OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/types/supabase/tables.ts');

// ============================================================================
// TYPES
// ============================================================================

interface WriteOptions {
  dryRun: boolean;
  force: boolean;
  verbose: boolean;
}

interface WriteResult {
  success: boolean;
  filePath: string;
  action: 'created' | 'updated' | 'skipped' | 'dryrun' | 'error';
  message: string;
  fileHash?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateContentHash(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

function contentHasChanged(existingPath: string, newContent: string): boolean {
  if (!fs.existsSync(existingPath)) return true;
  const existingContent = fs.readFileSync(existingPath, 'utf-8');
  return generateContentHash(existingContent) !== generateContentHash(newContent);
}

// ============================================================================
// GENERATE TABLES.TS CONTENT
// ============================================================================

function generateTablesContent(): string {
  const timestamp = new Date().toISOString();
  
  return `// =====================================================
// GENERATED TABLES HELPER - DO NOT EDIT MANUALLY
// =====================================================
// Generated: ${timestamp}
// Source: database.types.ts
// Purpose: Type-safe helpers for accessing tables, enums, and composite types
// =====================================================

import type { Database } from './database.types';

// =====================================================
// HELPER TYPES
// =====================================================

/**
 * Database without internal Supabase types
 */
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

/**
 * Default schema (public)
 */
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

// =====================================================
// TABLE HELPERS
// =====================================================

/**
 * Get the Row type for a table or view
 * 
 * @example
 * type Profile = Tables<'profiles'>;
 * type CustomTable = Tables<{ schema: 'public' }, 'my_table'>;
 */
export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never;

/**
 * Get the Insert type for a table
 * 
 * @example
 * type NewProfile = TablesInsert<'profiles'>;
 */
export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never;

/**
 * Get the Update type for a table
 * 
 * @example
 * type UpdateProfile = TablesUpdate<'profiles'>;
 */
export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never;

// =====================================================
// ENUM HELPERS
// =====================================================

/**
 * Get the type for an enum
 * 
 * @example
 * type UserTier = Enums<'user_tier'>;
 */
export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

// =====================================================
// COMPOSITE TYPE HELPERS
// =====================================================

/**
 * Get the type for a composite type
 * 
 * @example
 * type Address = CompositeTypes<'address'>;
 */
export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

// =====================================================
// CONVENIENCE EXPORTS
// =====================================================

/**
 * All table names in the public schema
 */
export type PublicTableNames = keyof DefaultSchema["Tables"];

/**
 * All view names in the public schema
 */
export type PublicViewNames = keyof DefaultSchema["Views"];

/**
 * All enum names in the public schema
 */
export type PublicEnumNames = keyof DefaultSchema["Enums"];

/**
 * All composite type names in the public schema
 */
export type PublicCompositeTypeNames = keyof DefaultSchema["CompositeTypes"];
`;
}

// ============================================================================
// WRITE FILE
// ============================================================================

async function writeTablesFile(
  content: string,
  options: WriteOptions
): Promise<WriteResult> {
  const { dryRun, force, verbose } = options;
  const fullPath = OUTPUT_PATH;
  const dir = path.dirname(fullPath);
  
  // Check if file exists
  const exists = fs.existsSync(fullPath);
  
  // Dry run mode
  if (dryRun) {
    if (verbose) {
      console.log(`[DRY RUN] Would write to: ${fullPath}`);
      console.log(`  Content length: ${content.length} characters`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'dryrun',
      message: `Would write to ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // New file - safe to create
  if (!exists) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      console.log(`✅ Created: ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'created',
      message: `Created ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Existing file - check if content changed
  const hasChanged = contentHasChanged(fullPath, content);
  
  if (!hasChanged) {
    if (verbose) {
      console.log(`⏭️  Unchanged: ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'skipped',
      message: `Unchanged: ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Content changed - handle based on force flag
  if (force) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    if (verbose) {
      console.log(`⚠️  Overwrote (forced): ${fullPath}`);
    }
    return {
      success: true,
      filePath: fullPath,
      action: 'updated',
      message: `Overwrote ${fullPath}`,
      fileHash: generateContentHash(content)
    };
  }
  
  // Not forcing - skip with warning
  if (verbose) {
    console.log(`⚠️  Skipped (would overwrite): ${fullPath}`);
    console.log(`   Use --force to overwrite existing files`);
  }
  
  return {
    success: false,
    filePath: fullPath,
    action: 'skipped',
    message: `Skipped ${fullPath} (would overwrite)`,
    fileHash: generateContentHash(content)
  };
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function generateTablesFile(options: WriteOptions): Promise<{
  success: boolean;
  filePath: string;
  action: string;
  message: string;
}> {
  const { verbose = false } = options;
  
  console.log('\n📦 Generating tables.ts helper...\n');
  
  try {
    // Generate content (no extraction needed - it's static)
    const content = generateTablesContent();
    
    // Write the file
    const writeResult = await writeTablesFile(content, options);
    
    console.log(`\n✅ ${writeResult.message}`);
    
    return {
      success: writeResult.success,
      filePath: OUTPUT_PATH,
      action: writeResult.action,
      message: writeResult.message
    };
    
  } catch (error) {
    console.error(`\n❌ Error generating tables.ts:`, error);
    return {
      success: false,
      filePath: OUTPUT_PATH,
      action: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const force = args.includes('--force') || args.includes('-f');
  const verbose = args.includes('--verbose') || args.includes('-v');
  
  console.log('\n' + '='.repeat(60));
  console.log('🌍 GAIA - Tables Helper Generator');
  console.log('='.repeat(60));
  
  if (dryRun) console.log('\n⚠️  DRY RUN MODE - No files will be written');
  if (force) console.log('\n⚠️  FORCE MODE - Will overwrite existing files');
  
  const result = await generateTablesFile({ dryRun, force, verbose });
  
  console.log('\n' + '='.repeat(60));
  if (result.success) {
    console.log(`✅ Success: ${result.message}`);
  } else {
    console.log(`❌ Failed: ${result.message}`);
    process.exit(1);
  }
  console.log('='.repeat(60) + '\n');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateTablesFile };