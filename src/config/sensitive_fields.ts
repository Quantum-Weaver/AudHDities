// src/config/sensitive_fields.ts
// ============================================================================
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
  'user_agent',
  'legal_name',
  'government_id',
  'date_of_birth',
  'phone_number',
  'address',
  'emergency_contact',
  'crisis_plan'
];

export type SensitiveField = typeof SENSITIVE_FIELDS[number];