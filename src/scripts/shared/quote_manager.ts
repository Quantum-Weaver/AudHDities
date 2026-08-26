// src/scripts/shared/quote_manager.ts
// ============================================================================
// ============================================================================
// Used by: GAIA constant generators (format_constants.ts)
// ============================================================================

// ============================================================================
// CONSTANTS-ONLY PATTERNS
// ============================================================================

/** Patterns for enum values that need space removal (time formats) */
const TIME_DATE_VALUE_PATTERNS = [
  /^\d{1,2}\s?h$/i,      // "12h", "12 h", "24H"
  /^\d{1,2}\s?hour$/i,    // "12hour", "12 hour"
  /^\d{1,2}\s?hr$/i,      // "12hr", "12 hr"
];

/** Enum names that should NEVER be cleaned (preserve original values) */
const EXCLUDED_ENUM_NAMES = [
  'user_tier',
  'user_status', 
  'council_house',
  'business_type',
  'verification_status',
  'communication_style'
];

// ============================================================================
// CONSTANTS-ONLY FUNCTIONS
// ============================================================================

/**
 * Check if an enum value needs cleaning (time/date formats only)
 * Used ONLY for constant file generation
 */
export function needsConstantValueCleaning(value: string): boolean {
  return TIME_DATE_VALUE_PATTERNS.some(pattern => pattern.test(value));
}

/**
 * Check if an enum name should be excluded from cleaning
 */
export function isExcludedEnum(enumName: string): boolean {
  return EXCLUDED_ENUM_NAMES.includes(enumName);
}

/**
 * Clean enum value for constants (remove spaces, normalize time formats)
 * Used ONLY for constant file generation
 * 
 * Example: "12 h" → "12h", "24 H" → "24H"
 */
export function cleanConstantValue(value: string, enumName?: string): string {
  if (enumName && isExcludedEnum(enumName)) {
    return value;
  }
  
  if (needsConstantValueCleaning(value)) {
    return value.replace(/\s/g, '');
  }
  return value;
}

/**
 * Format a key-value pair for a constant object
 * Used ONLY for constant file generation
 * 
 * @param key - The constant key (will be UPPER_SNAKE_CASE)
 * @param value - The value (will be cleaned)
 * @param enumName - Optional enum name for exclusion rules
 * @returns Formatted key-value pair (e.g., "  COMMUNITY: 'community',")
 */
export function formatConstantKeyValue(key: string, value: string, enumName?: string): string {
  const cleanValue = cleanConstantValue(value, enumName);
  return `  ${key}: '${cleanValue}',`;
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns the original value unchanged.
 */
export function cleanEnumValue(value: string): string {
  // NO-OP: Return unchanged - constants only
  return value;
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns the original array unchanged.
 */
export function cleanEnumValues(values: string[]): string[] {
  // NO-OP: Return unchanged - constants only
  return values;
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns false for all fields.
 */
export function needsQuoteWrapping(fieldName: string): boolean {
  // NO-OP: Return false - no quote wrapping for types
  return false;
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns the field name unchanged (no quotes).
 */
export function formatFieldDeclaration(fieldName: string, fieldType: string): string {
  // NO-OP: Return without quotes
  return `${fieldName}: ${fieldType};`;
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns the field name and type unchanged.
 */
export function parseFieldLine(line: string): { fieldName: string; fieldType: string } | null {
  // NO-OP: Return null - not used for constants
  const match = line.match(/^\s*(\w+):\s*(.+)/);
  if (!match) return null;
  return {
    fieldName: match[1],
    fieldType: match[2].trim()
  };
}

/**
 * @deprecated This function is no longer used. Constants only.
 * Returns the original lines unchanged.
 */
export function formatFieldList(lines: string[]): string[] {
  // NO-OP: Return unchanged
  return lines;
}