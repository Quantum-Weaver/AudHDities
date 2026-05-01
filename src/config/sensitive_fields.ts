// src/config/sensitive_fields.ts
// ============================================================================
// SENSITIVE FIELDS - Single source of truth for fields to exclude from public interfaces
// ============================================================================

export const SENSITIVE_FIELDS = [
  'email',
  'password',
  'stripe_account_id',
  'stripe_account',
  'crisis_contact_email',
  'crisis_contact_phone',
  'crisis_contact_name',
  'crisis_instructions',
  'access_token',
  'refresh_token',
  'api_key',
  'secret_key',
  'private_key',
  'encrypted_data',
  'verification_token',
  'reset_token',
  'ip_address',
  'user_agent'
];

export type SensitiveField = typeof SENSITIVE_FIELDS[number];