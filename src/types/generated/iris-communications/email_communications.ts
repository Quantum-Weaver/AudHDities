// =====================================================
// FILE: types/generated/iris-communications/email_communications.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.309Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type EmailCommunicationsRow = Tables<'email_communications'>;
export type EmailCommunicationsInsert = TablesInsert<'email_communications'>;
export type EmailCommunicationsUpdate = TablesUpdate<'email_communications'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicEmailCommunications = Omit<EmailCommunicationsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type EmailCommunicationsFormData = Partial<EmailCommunicationsInsert>;

