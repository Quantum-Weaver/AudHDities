// src/types/categories.ts
// types/categories.ts
// Based on Database['public']['Enums']['product_type']

import type { Database } from './supabase/database.types';

export type ProductType = Database['public']['Enums']['product_type'];

export const PRODUCT_CATEGORIES: { value: ProductType; label: string; icon?: string }[] = [
  // Digital Products
  { value: 'digital_course', label: 'Course' },
  { value: 'digital_download', label: 'Digital Download' },
  { value: 'digital_membership', label: 'Membership' },
  { value: 'digital_subscription', label: 'Subscription' },
  { value: 'digital_bundle', label: 'Bundle' },
  
  // Physical Products
  { value: 'physical_product', label: 'Physical Product' },
  { value: 'physical_handmade', label: 'Handmade' },
  { value: 'physical_manufactured', label: 'Manufactured' },
  { value: 'physical_custom', label: 'Custom Made' },
  
  // Media & Entertainment
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'music', label: 'Music' },
  { value: 'livestream', label: 'Livestream' },
  
  // Events & Experiences
  { value: 'event_live', label: 'Live Event' },
  { value: 'event_virtual', label: 'Virtual Event' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'class', label: 'Class' },
  { value: 'consultation', label: 'Consultation' },
  
  // Services
  { value: 'service', label: 'Service' },
  { value: 'commission', label: 'Commission' },
  { value: 'contract', label: 'Contract' },
  { value: 'sponsorship', label: 'Sponsorship' },
  
  // Community & Mutual Aid
  { value: 'mutual_aid', label: 'Mutual Aid' },
  { value: 'crowdfunding', label: 'Crowdfunding' },
  { value: 'tip', label: 'Tip' },
  { value: 'donation', label: 'Donation' },
  
  // Textiles & Wearables
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessory', label: 'Accessory' },
  { value: 'fabric', label: 'Fabric' },
  { value: 'pattern', label: 'Pattern' },
  
  // Bundles
  { value: 'bundle', label: 'Bundle' },
  { value: 'kit', label: 'Kit' },
  { value: 'subscription_box', label: 'Subscription Box' },
];

export const PRODUCT_CATEGORY_MAP = new Map(
  PRODUCT_CATEGORIES.map(cat => [cat.value, cat])
);

export function getProductCategoryLabel(type: ProductType): string {
  return PRODUCT_CATEGORY_MAP.get(type)?.label || type.replace(/_/g, ' ');
}