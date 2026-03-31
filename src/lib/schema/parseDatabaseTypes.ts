// src/lib/schema/parseDatabaseTypes.ts

import type { Database } from '@/types/supabase/database.types';
import { ENUM_VALUES } from '@/types/supabase/enums';

export interface SchemaColumn {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
}

export interface SchemaTable {
  name: string;
  columns: SchemaColumn[];
  relationships: {
    from: string;
    to: string;
    type: 'one-to-one' | 'one-to-many' | 'many-to-one';
  }[];
  description?: string;
}

export interface SchemaEnum {
  name: string;
  values: string[];
}

export function parseDatabaseTypes(): { tables: SchemaTable[]; enums: SchemaEnum[] } {
  // This is a simplified parser - in practice you'd use the actual type structure
  // Since we can't dynamically import the types at runtime, we'll create a static representation
  // that can be updated when the types file changes via a build script
  
  const tables: SchemaTable[] = [
    {
      name: 'profiles',
      description: 'Core user data extending Supabase auth.users',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key, references auth.users' },
        { name: 'username', type: 'TEXT', nullable: true, description: 'Unique public handle' },
        { name: 'display_name', type: 'TEXT', nullable: true, description: 'Name shown in UI' },
        { name: 'avatar_url', type: 'TEXT', nullable: true, description: 'Profile picture URL' },
        { name: 'banner_url', type: 'TEXT', nullable: true, description: 'Profile header image' },
        { name: 'bio', type: 'TEXT', nullable: true, description: 'User description' },
        { name: 'is_creator', type: 'BOOLEAN', nullable: true, description: 'Can list products' },
        { name: 'is_vendor', type: 'BOOLEAN', nullable: true, description: 'Can sell services' },
        { name: 'is_admin', type: 'BOOLEAN', nullable: true, description: 'Full system access' },
        { name: 'user_tier', type: 'user_tier', nullable: true, description: 'community | ally | corporate | council' },
        { name: 'sovereignty_score', type: 'INTEGER', nullable: true, description: 'Points earned through participation' },
        { name: 'primary_house', type: 'council_house', nullable: true, description: 'Affiliated council house' },
        { name: 'residual_pledge_percent', type: 'INTEGER', nullable: true, description: '50% Covenant pledge amount' },
        { name: 'created_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Account creation timestamp' },
      ],
      relationships: [
        { from: 'profiles.id', to: 'creator_profiles.id', type: 'one-to-one' },
        { from: 'profiles.id', to: 'vendor_profiles.id', type: 'one-to-one' },
        { from: 'profiles.id', to: 'community_profiles.id', type: 'one-to-one' },
        { from: 'profiles.id', to: 'products.creator_id', type: 'one-to-many' },
        { from: 'profiles.id', to: 'sales.buyer_id', type: 'one-to-many' },
      ],
    },
    {
      name: 'creator_profiles',
      description: 'Extended data for creators who sell products',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'References profiles.id' },
        { name: 'creative_categories', type: 'TEXT[]', nullable: true, description: 'Art, music, code, etc.' },
        { name: 'creative_description', type: 'TEXT', nullable: true, description: 'About their creative practice' },
        { name: 'portfolio_url', type: 'TEXT', nullable: true, description: 'Link to portfolio' },
        { name: 'default_residual_pool', type: 'INTEGER', nullable: true, description: 'Default % for contributors' },
        { name: 'total_products', type: 'INTEGER', nullable: true, description: 'Number of products listed' },
        { name: 'total_sales', type: 'INTEGER', nullable: true, description: 'Total units sold' },
        { name: 'total_earnings', type: 'DECIMAL', nullable: true, description: 'Lifetime earnings' },
        { name: 'verification_status', type: 'verification_status', nullable: true, description: 'pending | verified | rejected | suspended' },
        { name: 'verified_badge', type: 'BOOLEAN', nullable: true, description: 'Display verified badge' },
      ],
      relationships: [
        { from: 'creator_profiles.id', to: 'profiles.id', type: 'one-to-one' },
        { from: 'creator_profiles.id', to: 'products.creator_id', type: 'one-to-many' },
      ],
    },
    {
      name: 'products',
      description: 'Digital and physical items for sale',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
        { name: 'creator_id', type: 'UUID', nullable: false, description: 'References profiles.id' },
        { name: 'title', type: 'TEXT', nullable: false, description: 'Product name' },
        { name: 'description', type: 'TEXT', nullable: true, description: 'Product details' },
        { name: 'product_type', type: 'product_type', nullable: false, description: 'digital_course, physical_product, etc.' },
        { name: 'price_community', type: 'DECIMAL', nullable: true, description: 'Discounted price for community tier' },
        { name: 'price_ally', type: 'DECIMAL', nullable: false, description: 'Standard price' },
        { name: 'price_corporate', type: 'DECIMAL', nullable: true, description: 'Premium price' },
        { name: 'residual_pool_percent', type: 'INTEGER', nullable: true, description: 'Percentage to contributors' },
        { name: 'is_published', type: 'BOOLEAN', nullable: true, description: 'Visible to public' },
        { name: 'created_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Listing date' },
      ],
      relationships: [
        { from: 'products.creator_id', to: 'profiles.id', type: 'many-to-one' },
        { from: 'products.id', to: 'sales.product_id', type: 'one-to-many' },
        { from: 'products.id', to: 'contributions.product_id', type: 'one-to-many' },
      ],
    },
    {
      name: 'sales',
      description: 'Records every transaction',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
        { name: 'product_id', type: 'UUID', nullable: false, description: 'References products.id' },
        { name: 'buyer_id', type: 'UUID', nullable: false, description: 'References profiles.id' },
        { name: 'tier_applied', type: 'user_tier', nullable: false, description: 'Which price tier was used' },
        { name: 'gross_amount', type: 'DECIMAL', nullable: false, description: 'Total sale amount' },
        { name: 'to_creator_immediate', type: 'DECIMAL', nullable: true, description: 'Creator instant payout' },
        { name: 'to_residual_pool', type: 'DECIMAL', nullable: true, description: 'Amount to contributor pool' },
        { name: 'to_infrastructure', type: 'DECIMAL', nullable: true, description: 'Platform operations fund' },
        { name: 'payment_status', type: 'TEXT', nullable: true, description: 'pending | completed | refunded' },
        { name: 'created_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Transaction timestamp' },
      ],
      relationships: [
        { from: 'sales.product_id', to: 'products.id', type: 'many-to-one' },
        { from: 'sales.buyer_id', to: 'profiles.id', type: 'many-to-one' },
        { from: 'sales.id', to: 'residual_payouts.sale_id', type: 'one-to-many' },
      ],
    },
    {
      name: 'contributions',
      description: 'Tracks who contributed to each product',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
        { name: 'product_id', type: 'UUID', nullable: true, description: 'References products.id' },
        { name: 'contributor_id', type: 'UUID', nullable: true, description: 'References profiles.id' },
        { name: 'contribution_type', type: 'contribution_type', nullable: false, description: 'concept, code, design, content, testing, promotion, infrastructure' },
        { name: 'percent_share', type: 'DECIMAL', nullable: false, description: 'Percentage of residual pool' },
        { name: 'is_residual_eligible', type: 'BOOLEAN', nullable: true, description: 'Receives ongoing payments' },
        { name: 'is_one_time', type: 'BOOLEAN', nullable: true, description: 'One-time payment only' },
      ],
      relationships: [
        { from: 'contributions.product_id', to: 'products.id', type: 'many-to-one' },
        { from: 'contributions.contributor_id', to: 'profiles.id', type: 'many-to-one' },
      ],
    },
    {
      name: 'residual_payouts',
      description: 'Ongoing payments to contributors',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
        { name: 'sale_id', type: 'UUID', nullable: true, description: 'References sales.id' },
        { name: 'contributor_id', type: 'UUID', nullable: true, description: 'References profiles.id' },
        { name: 'amount', type: 'DECIMAL', nullable: false, description: 'Payment amount' },
        { name: 'status', type: 'payout_status', nullable: true, description: 'pending | paid | failed' },
        { name: 'calculation_note', type: 'TEXT', nullable: true, description: 'Explanation of calculation' },
        { name: 'paid_at', type: 'TIMESTAMPTZ', nullable: true, description: 'When payment was sent' },
        { name: 'created_at', type: 'TIMESTAMPTZ', nullable: true, description: 'When record was created' },
      ],
      relationships: [
        { from: 'residual_payouts.sale_id', to: 'sales.id', type: 'many-to-one' },
        { from: 'residual_payouts.contributor_id', to: 'profiles.id', type: 'many-to-one' },
      ],
    },
    {
      name: 'applications',
      description: 'One table for all application types (creator, vendor, etc.)',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
        { name: 'user_id', type: 'UUID', nullable: true, description: 'References profiles.id' },
        { name: 'application_type', type: 'TEXT', nullable: false, description: 'creator, vendor, mentor, etc.' },
        { name: 'form_data', type: 'JSONB', nullable: false, description: 'Flexible form data storage' },
        { name: 'status', type: 'verification_status', nullable: true, description: 'pending | verified | rejected | suspended' },
        { name: 'review_notes', type: 'TEXT', nullable: true, description: 'Admin review notes' },
        { name: 'created_at', type: 'TIMESTAMPTZ', nullable: true, description: 'Submission timestamp' },
      ],
      relationships: [
        { from: 'applications.user_id', to: 'profiles.id', type: 'many-to-one' },
      ],
    },
    {
      name: 'community_profiles',
      description: 'Extended data for community members',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'References profiles.id' },
        { name: 'nd_identity', type: 'TEXT[]', nullable: true, description: 'Autistic, ADHD, Dyslexic, etc.' },
        { name: 'joined_house', type: 'council_house', nullable: true, description: 'Hearth_Keeper, Chancellor, etc.' },
        { name: 'is_mentor', type: 'BOOLEAN', nullable: true, description: 'Willing to mentor others' },
        { name: 'peer_endorsements', type: 'INTEGER', nullable: true, description: 'Upvotes from community' },
        { name: 'crisis_contact_name', type: 'TEXT', nullable: true, description: 'Emergency contact' },
        { name: 'crisis_contact_phone', type: 'TEXT', nullable: true, description: 'Emergency phone' },
        { name: 'crisis_instructions', type: 'TEXT', nullable: true, description: 'How to help in crisis' },
      ],
      relationships: [
        { from: 'community_profiles.id', to: 'profiles.id', type: 'one-to-one' },
      ],
    },
    {
      name: 'vendor_profiles',
      description: 'Extended data for vendors who provide services',
      columns: [
        { name: 'id', type: 'UUID', nullable: false, description: 'References profiles.id' },
        { name: 'business_name', type: 'TEXT', nullable: false, description: 'Business name' },
        { name: 'business_type', type: 'business_type', nullable: true, description: 'sole_proprietor, llc, nonprofit, etc.' },
        { name: 'business_description', type: 'TEXT', nullable: true, description: 'About the business' },
        { name: 'product_categories', type: 'TEXT[]', nullable: true, description: 'Categories of services' },
        { name: 'verification_status', type: 'verification_status', nullable: true, description: 'pending | verified | rejected | suspended' },
        { name: 'verified_badge', type: 'BOOLEAN', nullable: true, description: 'Display verified badge' },
      ],
      relationships: [
        { from: 'vendor_profiles.id', to: 'profiles.id', type: 'one-to-one' },
      ],
    },
  ];

  // Build enums from ENUM_VALUES instead of hardcoding
  const enums: SchemaEnum[] = [
    { name: 'user_tier', values: [...ENUM_VALUES.userTier] },
    { name: 'council_house', values: [...ENUM_VALUES.councilHouse] },
    { name: 'product_type', values: [...ENUM_VALUES.productType] },
    { name: 'contribution_type', values: [...ENUM_VALUES.contributionType] },
    { name: 'verification_status', values: [...ENUM_VALUES.verificationStatus] },
    { name: 'payout_status', values: [...ENUM_VALUES.payoutStatus] },
    { name: 'business_type', values: [...ENUM_VALUES.businessType] },
    { name: 'post_visibility', values: [...ENUM_VALUES.postVisibility] },
    { name: 'quest_status', values: [...ENUM_VALUES.questStatus] },
    { name: 'report_type', values: [...ENUM_VALUES.reportType] },
    { name: 'report_status', values: [...ENUM_VALUES.reportStatus] },
    { name: 'notification_type', values: [...ENUM_VALUES.notificationType] },
    { name: 'acid_persona', values: [...ENUM_VALUES.acidPersona] },
  ];

  return { tables, enums };
}