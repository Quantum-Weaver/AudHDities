// src/scripts/shared/quote_manager.ts
// ============================================================================
// QUOTE MANAGER - Handle quote wrapping for time/date values and field names
// ============================================================================
// Purpose: Ensure proper quote formatting for generated files
// Used by: All GAIA format generators
// ============================================================================

// ============================================================================
// PATTERNS FOR VALUE CLEANING
// ============================================================================

/** Patterns for enum values that need space removal (time formats) */
const TIME_DATE_VALUE_PATTERNS = [
  /^\d{1,2}\s?h$/i,      // "12h", "12 h", "24H"
  /^\d{1,2}\s?hour$/i,    // "12hour", "12 hour"
  /^\d{1,2}\s?hr$/i,      // "12hr", "12 hr"
];

/** Patterns for field names that need quote wrapping in interfaces */
const TIME_DATE_FIELD_PATTERNS = [
  /_at$/,           // created_at, updated_at, deleted_at
  /_time$/,         // start_time, end_time, processing_time
  /^last_/,         // last_active, last_login, last_accessed
  /^date_/,         // date_of_birth, date_created, date_modified
  /timestamp/,
  /expires/,
  /expiry/,
  /started/,
  /completed/,
  /published/,
  /scheduled/,
  /duration/,
];

// ============================================================================
// VALUE CLEANING FUNCTIONS
// ============================================================================

/**
 * Check if a value is a time/date format that needs cleaning
 */
export function isTimeDateValue(value: string): boolean {
  return TIME_DATE_VALUE_PATTERNS.some(pattern => pattern.test(value));
}

/**
 * Clean enum value (remove spaces, normalize time formats)
 * Example: "12 h" → "12h", "24 H" → "24H"
 */
export function cleanEnumValue(value: string): string {
  if (isTimeDateValue(value)) {
    return value.replace(/\s/g, '');
  }
  return value;
}

/**
 * Clean an array of enum values
 */
export function cleanEnumValues(values: string[]): string[] {
  return values.map(v => cleanEnumValue(v));
}

// ============================================================================
// FIELD QUOTE WRAPPING FUNCTIONS
// ============================================================================

/**
 * Check if a field name needs quote wrapping in interfaces
 */
export function needsQuoteWrapping(fieldName: string): boolean {
  return TIME_DATE_FIELD_PATTERNS.some(pattern => pattern.test(fieldName));
}

/**
 * Format a field declaration with proper quotes if needed
 * @param fieldName - Name of the field (e.g., 'created_at')
 * @param fieldType - Type of the field (e.g., 'string | null')
 * @returns Formatted field declaration (e.g., '"created_at": "string | null";')
 */
export function formatFieldDeclaration(fieldName: string, fieldType: string): string {
  if (needsQuoteWrapping(fieldName)) {
    return `"${fieldName}": "${fieldType}";`;
  }
  return `${fieldName}: ${fieldType};`;
}

/**
 * Parse a field line into name and type
 * @param line - Line from a Row/Insert/Update definition
 * @returns Object with fieldName and fieldType, or null if no match
 */
export function parseFieldLine(line: string): { fieldName: string; fieldType: string } | null {
  const match = line.match(/^\s*(\w+):\s*(.+)/);
  if (!match) return null;
  return {
    fieldName: match[1],
    fieldType: match[2].trim()
  };
}

/**
 * Format an entire interface field list with proper quote wrapping
 * @param lines - Array of field definition lines
 * @returns Formatted field declarations
 */
export function formatFieldList(lines: string[]): string[] {
  const results: string[] = [];
  
  for (const line of lines) {
    const parsed = parseFieldLine(line);
    if (parsed) {
      results.push(formatFieldDeclaration(parsed.fieldName, parsed.fieldType));
    } else if (line.trim()) {
      // Preserve non-field lines (like comments)
      results.push(line);
    }
  }
  
  return results;
}

// ============================================================================
// CONSTANT OBJECT FORMATTING
// ============================================================================

/**
 * Format a key-value pair for a constant object
 * @param key - The constant key (will be UPPER_SNAKE_CASE)
 * @param value - The value (will be cleaned)
 * @returns Formatted key-value pair (e.g., "  COMMUNITY: 'community',")
 */
export function formatConstantKeyValue(key: string, value: string): string {
  const cleanValue = cleanEnumValue(value);
  return `  ${key}: '${cleanValue}',`;
}

/**
 * Check if a value needs special handling in constant objects
 */
export function needsConstantValueCleaning(value: string): boolean {
  return isTimeDateValue(value);
}

