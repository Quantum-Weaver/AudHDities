// src/scripts/shared/type_mappings.ts
// ============================================================================
// TYPE MAPPINGS - Single source of truth for TypeScript → Zod conversion
// ============================================================================
// Used by: extract_table_fields.ts, generate_validators.ts
// ============================================================================

// ============================================================================
// CORE TYPE MAPPINGS
// ============================================================================

export interface TypeMapping {
  pattern: RegExp;                    // Pattern to match TypeScript type
  zodType: string;                    // Zod validator template
  requiresImport?: string;            // Additional import needed
  isEnum?: boolean;                   // Whether this is an enum reference
}

export const TYPE_MAPPINGS: TypeMapping[] = [
  // Primitives
  { pattern: /^string$/, zodType: 'z.string()' },
  { pattern: /^number$/, zodType: 'z.number()' },
  { pattern: /^boolean$/, zodType: 'z.boolean()' },
  { pattern: /^any$/, zodType: 'z.any()' },
  { pattern: /^unknown$/, zodType: 'z.unknown()' },
  { pattern: /^null$/, zodType: 'z.null()' },
  { pattern: /^undefined$/, zodType: 'z.undefined()' },
  { pattern: /^void$/, zodType: 'z.void()' },
  
  // JSON
  { pattern: /^Json$/, zodType: 'z.any()' },
  { pattern: /^Record<.*>$/, zodType: 'z.record(z.any())' },
  
  // Arrays
  { pattern: /^string\[\]$/, zodType: 'z.array(z.string())' },
  { pattern: /^number\[\]$/, zodType: 'z.array(z.number())' },
  { pattern: /^boolean\[\]$/, zodType: 'z.array(z.boolean())' },
  
  // Date/Time
  { pattern: /^Date$/, zodType: 'z.date()' },
  { pattern: /^timestamp$/, zodType: 'z.string().datetime()' },
  { pattern: /^timestamptz$/, zodType: 'z.string().datetime()' },
];

// ============================================================================
// ENUM PATTERN (Special handling)
// ============================================================================

export const ENUM_PATTERN = /Database\["public"\]\["Enums"\]\["(\w+)"\]/;
export const ENUM_ZOD_TEMPLATE = (enumName: string) => `z.enum(ENUM_VALUES.${toCamelCase(enumName)})`;

// ============================================================================
// FIELD-SPECIFIC OVERRIDES (Based on field name, not type)
// ============================================================================

export interface FieldNameOverride {
  pattern: RegExp;                    // Pattern to match field name
  zodType: string;                    // Zod validator template
  description: string;
}

export const FIELD_NAME_OVERRIDES: FieldNameOverride[] = [
  { pattern: /^id$/, zodType: 'z.string().uuid()', description: 'UUID primary key' },
  { pattern: /^email$/, zodType: 'z.string().email()', description: 'Email address' },
  { pattern: /^.*_email$/, zodType: 'z.string().email()', description: 'Email address' },
  { pattern: /^slug$/, zodType: 'z.string().regex(/^[a-z0-9-]+$/)', description: 'URL slug' },
  { pattern: /^.*_url$/, zodType: 'z.string().url()', description: 'URL' },
  { pattern: /^.*_uri$/, zodType: 'z.string().url()', description: 'URI' },
  { pattern: /^created_at$/, zodType: 'z.string().datetime()', description: 'Creation timestamp' },
  { pattern: /^updated_at$/, zodType: 'z.string().datetime()', description: 'Update timestamp' },
  { pattern: /^deleted_at$/, zodType: 'z.string().datetime().nullable()', description: 'Soft delete timestamp' },
  { pattern: /^.*_at$/, zodType: 'z.string().datetime()', description: 'Timestamp field' },
  { pattern: /^phone$/, zodType: 'z.string().regex(/^[\d\s\-+()]+$/)', description: 'Phone number' },
  { pattern: /^.*_phone$/, zodType: 'z.string().regex(/^[\d\s\-+()]+$/)', description: 'Phone number' },
  { pattern: /^zip$/, zodType: 'z.string().regex(/^\d{5}(-\d{4})?$/)', description: 'ZIP code' },
  { pattern: /^postal_code$/, zodType: 'z.string()', description: 'Postal code' },
  { pattern: /^uuid$/, zodType: 'z.string().uuid()', description: 'UUID' },
  { pattern: /^.*_uuid$/, zodType: 'z.string().uuid()', description: 'UUID' },
  { pattern: /^ip_address$/, zodType: 'z.string().ip()', description: 'IP address' },
  { pattern: /^color$/, zodType: 'z.string().regex(/^#[0-9A-F]{6}$/i)', description: 'Hex color' },
  { pattern: /^.*_color$/, zodType: 'z.string().regex(/^#[0-9A-F]{6}$/i)', description: 'Hex color' },
];

// ============================================================================
// AUTO-GENERATED FIELDS (Excluded from Insert/FormData)
// ============================================================================

export const AUTO_GENERATED_FIELDS: string[] = [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
  'created_by',
  'row_version',
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert snake_case to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .split('_')
    .map((part, index) => 
      index === 0 
        ? part.toLowerCase() 
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join('');
}

/**
 * Convert snake_case to PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Find the Zod type for a given TypeScript type
 */
export function findZodType(tsType: string): string | null {
  for (const mapping of TYPE_MAPPINGS) {
    if (mapping.pattern.test(tsType)) {
      return mapping.zodType;
    }
  }
  return null;
}

/**
 * Check if a field name matches any override pattern
 */
export function findFieldNameOverride(fieldName: string): string | null {
  for (const override of FIELD_NAME_OVERRIDES) {
    if (override.pattern.test(fieldName)) {
      return override.zodType;
    }
  }
  return null;
}

/**
 * Check if a field is auto-generated
 */
export function isAutoGeneratedField(fieldName: string): boolean {
  return AUTO_GENERATED_FIELDS.includes(fieldName);
}

/**
 * Apply nullable/optional modifiers to a Zod type
 */
export function applyModifiers(
  baseZodType: string, 
  isNullable: boolean, 
  isOptional: boolean
): string {
  let result = baseZodType;
  
  if (isNullable && isOptional) {
    result = `${result}.nullable().optional()`;
  } else if (isNullable) {
    result = `${result}.nullable()`;
  } else if (isOptional) {
    result = `${result}.optional()`;
  }
  
  return result;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export interface ParsedField {
  name: string;           // 'email', 'user_tier'
  tsType: string;         // 'string', 'Enums<'user_tier'>'
  isNullable: boolean;    // true if `| null`
  isOptional: boolean;    // true if `?` or auto-generated
  isEnum: boolean;        // true if references Database.Enums
  enumName?: string;      // 'user_tier' if isEnum
  zodType: string;        // Final Zod validator string
  needsImport?: boolean;  // Whether additional import needed
  importSource?: string;  // Source for additional import
}

export default {
  TYPE_MAPPINGS,
  ENUM_PATTERN,
  ENUM_ZOD_TEMPLATE,
  FIELD_NAME_OVERRIDES,
  AUTO_GENERATED_FIELDS,
  toCamelCase,
  toPascalCase,
  findZodType,
  findFieldNameOverride,
  isAutoGeneratedField,
  applyModifiers,
};