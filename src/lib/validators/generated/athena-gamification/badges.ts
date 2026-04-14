// =====================================================
// FILE: validators/generated/athena-gamification/badges.ts
// GENERATED: 2026-04-14T19:39:30.070Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Badges SCHEMAS
// =====================================================

export const BadgesRowSchema = z.object({
  badge_type: z.enum(Object.values(BadgeType));
  color: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  description: z.string();
  earn_condition: z.any().nullable();
  house: z.enum(Object.values(CouncilHouse)).nullable();
  icon: z.string().nullable();
  id: z.string();
  is_active: z.boolean().nullable();
  name: z.string();
  rarity: z.enum(Object.values(BadgeRarity));
  slug: z.string();
  tier: z.enum(Object.values(BadgeTier)).nullable();
});

export const BadgesInsertSchema = z.object({
  badge_type: z.enum(Object.values(BadgeType)).optional();
  color: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  description: z.string().optional();
  earn_condition: z.any().nullable().optional();
  house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  icon: z.string().nullable().optional();
  id: z.string().optional();
  is_active: z.boolean().nullable().optional();
  name: z.string().optional();
  rarity: z.enum(Object.values(BadgeRarity)).optional();
  slug: z.string().optional();
  tier: z.enum(Object.values(BadgeTier)).nullable().optional();
});

export const BadgesUpdateSchema = z.object({
  badge_type: z.enum(Object.values(BadgeType)).optional();
  color: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  description: z.string().optional();
  earn_condition: z.any().nullable().optional();
  house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  icon: z.string().nullable().optional();
  id: z.string().optional();
  is_active: z.boolean().nullable().optional();
  name: z.string().optional();
  rarity: z.enum(Object.values(BadgeRarity)).optional();
  slug: z.string().optional();
  tier: z.enum(Object.values(BadgeTier)).nullable().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type BadgesRowInput = z.infer<typeof BadgesRowSchema>;
export type BadgesInsertInput = z.infer<typeof BadgesInsertSchema>;
export type BadgesUpdateInput = z.infer<typeof BadgesUpdateSchema>;
