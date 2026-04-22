// =====================================================
// FILE: types/generated/iris-communications/contact_submissions.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.160Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ContactSubmissionsRow = Tables<'contact_submissions'>;
export type ContactSubmissionsInsert = TablesInsert<'contact_submissions'>;
export type ContactSubmissionsUpdate = TablesUpdate<'contact_submissions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicContactSubmissions = Omit<ContactSubmissionsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ContactSubmissionsFormData = Partial<ContactSubmissionsInsert>;

