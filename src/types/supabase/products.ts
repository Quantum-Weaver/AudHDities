// src/types/supabase/products.ts
// types/supabase/products.ts
import type { Database } from './database.types';

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type ProductWithCreator = Product & {
  creator: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
};

export type ProductWithContributions = ProductWithCreator & {
  contributions: Array<{
    id: string;
    contributor_id: string;
    contribution_type: string;
    percent_share: number;
    description: string | null;
  }>;
};

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  digital_course: 'Course',
  digital_download: 'Digital',
  digital_membership: 'Membership',
  digital_subscription: 'Subscription',
  digital_bundle: 'Bundle',
  physical_product: 'Physical',
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

export const getProductTypeLabel = (type: string): string => {
  return PRODUCT_TYPE_LABELS[type] || type.replace(/_/g, ' ');
};

export const formatProductPrice = (product: Product): string => {
  const prices: number[] = [];
  if (product.price_community) prices.push(product.price_community);
  if (product.price_ally) prices.push(product.price_ally);
  if (product.price_corporate) prices.push(product.price_corporate);
  
  if (prices.length === 0) return 'Pay What You Want';
  if (prices.length === 1) return `$${prices[0].toFixed(2)}`;
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
};