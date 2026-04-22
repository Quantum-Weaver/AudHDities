// =====================================================
// FILE: types/generated/plutus-economics/products.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.815Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type ProductsRow = Tables<'products'>;
export type ProductsInsert = TablesInsert<'products'>;
export type ProductsUpdate = TablesUpdate<'products'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicProducts = Omit<ProductsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type ProductsFormData = Partial<ProductsInsert>;

