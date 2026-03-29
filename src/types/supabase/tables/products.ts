// src/types/supabase/tables/products.ts
import type { Database } from '../database.types';
import { PRODUCT_CATEGORY_MAP} from '@/types/categories';

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export interface ProductWithCreator extends Product {
  creator?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
}

// Product type enum as union
export type ProductType = Database['public']['Enums']['product_type'];
export type ProductOwner = Database['public']['Enums']['owner_type'];

export const productOwnerTypeLabels: Record<ProductOwner, string> = {
  creator: 'Creator',
  vendor: 'Vendor',
};
// Helper for product type labels
export const productTypeLabels: Record<ProductType, string> = {
  digital_course: 'Digital Course',
  digital_download: 'Digital Download',
  digital_membership: 'Membership',
  digital_subscription: 'Subscription',
  digital_bundle: 'Bundle',
  physical_product: 'Physical Product',
  physical_handmade: 'Handmade',
  physical_manufactured: 'Manufactured',
  physical_custom: 'Custom',
  audio: 'Audio',
  video: 'Video',
  podcast: 'Podcast',
  music: 'Music',
  livestream: 'Livestream',
  event_live: 'Live Event',
  event_virtual: 'Virtual Event',
  workshop: 'Workshop',
  class: 'Class',
  consultation: 'Consultation',
  service: 'Service',
  commission: 'Commission',
  contract: 'Contract',
  sponsorship: 'Sponsorship',
  mutual_aid: 'Mutual Aid',
  crowdfunding: 'Crowdfunding',
  tip: 'Tip',
  donation: 'Donation',
  clothing: 'Clothing',
  accessory: 'Accessory',
  fabric: 'Fabric',
  pattern: 'Pattern',
  bundle: 'Bundle',
  kit: 'Kit',
  subscription_box: 'Subscription Box',
};

// Helper function to get product type label
export function getProductTypeLabel(productType: ProductType | string | null): string {
  if (!productType) return 'Unknown';
  return productTypeLabels[productType as ProductType] || productType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Helper function to get product type label
export function getProductOwnerTypeLabel(productOwner: ProductOwner | string | null): string {
  if (!productOwner) return 'Unknown';
  return productOwnerTypeLabels[productOwner as ProductOwner] || productOwner.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export interface ProductWithRelations extends Product {
  creator?: Database['public']['Tables']['profiles']['Row'];
  contributions?: Database['public']['Tables']['contributions']['Row'][];
  sales?: Database['public']['Tables']['sales']['Row'][];
}

export const productDefaults = {
  active: true,
  owner_type: 'creator',
  is_published: false,
  is_recurring: false,
  price_community: 5,
  price_ally: 45,
  price_corporate: 145,
  residual_pool_percent: 30,
  sanctuary_infrastructure_percent: 10,
  bigot_tax_cents: 0,
  category: [],
  tags: [],
  media_urls: [],
  collaborators: [],
} as const;