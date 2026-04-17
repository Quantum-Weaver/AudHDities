// src/types/categories.ts
// =====================================================
// CATEGORIES - Content and Product Classification
// =====================================================

// =====================================================
// CONTENT CATEGORIES (for posts, quests, lessons)
// =====================================================

export type ContentCategory = 
  | 'art'
  | 'writing'
  | 'music'
  | 'video'
  | 'podcast'
  | 'education'
  | 'community'
  | 'announcement'
  | 'ritual'
  | 'mythology'
  | 'technology'
  | 'wellness'
  | 'neurodiversity'
  | 'social_justice'
  | 'economics'
  | 'governance'
  | 'other';

export const CONTENT_CATEGORIES: { value: ContentCategory; label: string; emoji: string }[] = [
  { value: 'art', label: 'Art', emoji: '🎨' },
  { value: 'writing', label: 'Writing', emoji: '✍️' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'video', label: 'Video', emoji: '📹' },
  { value: 'podcast', label: 'Podcast', emoji: '🎙️' },
  { value: 'education', label: 'Education', emoji: '📚' },
  { value: 'community', label: 'Community', emoji: '🤝' },
  { value: 'announcement', label: 'Announcement', emoji: '📢' },
  { value: 'ritual', label: 'Ritual', emoji: '🕯️' },
  { value: 'mythology', label: 'Mythology', emoji: '📜' },
  { value: 'technology', label: 'Technology', emoji: '💻' },
  { value: 'wellness', label: 'Wellness', emoji: '🌿' },
  { value: 'neurodiversity', label: 'Neurodiversity', emoji: '🧠' },
  { value: 'social_justice', label: 'Social Justice', emoji: '⚖️' },
  { value: 'economics', label: 'Economics', emoji: '💰' },
  { value: 'governance', label: 'Governance', emoji: '🏛️' },
  { value: 'other', label: 'Other', emoji: '✨' },
];

// =====================================================
// PRODUCT CATEGORIES (for commerce)
// =====================================================

export type ProductCategory = 
  | 'digital_course'
  | 'digital_download'
  | 'digital_membership'
  | 'digital_subscription'
  | 'physical_product'
  | 'audio'
  | 'video'
  | 'podcast'
  | 'event'
  | 'service'
  | 'commission'
  | 'donation'
  | 'clothing'
  | 'bundle';

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string; description: string }[] = [
  { value: 'digital_course', label: 'Course', description: 'Structured learning content' },
  { value: 'digital_download', label: 'Download', description: 'Single file or asset' },
  { value: 'digital_membership', label: 'Membership', description: 'Ongoing access to content' },
  { value: 'digital_subscription', label: 'Subscription', description: 'Recurring paid content' },
  { value: 'physical_product', label: 'Physical', description: 'Tangible goods' },
  { value: 'audio', label: 'Audio', description: 'Music, podcasts, sound' },
  { value: 'video', label: 'Video', description: 'Films, tutorials, performances' },
  { value: 'podcast', label: 'Podcast', description: 'Episode or series' },
  { value: 'event', label: 'Event', description: 'Live or virtual gathering' },
  { value: 'service', label: 'Service', description: 'Consultation, coaching' },
  { value: 'commission', label: 'Commission', description: 'Custom work' },
  { value: 'donation', label: 'Donation', description: 'Support the creator' },
  { value: 'clothing', label: 'Clothing', description: 'Apparel and accessories' },
  { value: 'bundle', label: 'Bundle', description: 'Multiple items together' },
];

// =====================================================
// SUPPORT NEEDS (for ND identity)
// =====================================================

export type SupportNeed = 
  | 'executive_functioning'
  | 'sensory_processing'
  | 'social_communication'
  | 'emotional_regulation'
  | 'time_management'
  | 'task_initiation'
  | 'focus_sustaining'
  | 'transition_support'
  | 'auditory_processing'
  | 'visual_processing'
  | 'reading_comprehension'
  | 'written_expression'
  | 'verbal_expression'
  | 'mobility'
  | 'chronic_illness';

export const SUPPORT_NEEDS: { value: SupportNeed; label: string; description: string }[] = [
  { value: 'executive_functioning', label: 'Executive Functioning', description: 'Planning, organizing, prioritizing' },
  { value: 'sensory_processing', label: 'Sensory Processing', description: 'Managing sensory input' },
  { value: 'social_communication', label: 'Social Communication', description: 'Interpreting social cues' },
  { value: 'emotional_regulation', label: 'Emotional Regulation', description: 'Managing emotional responses' },
  { value: 'time_management', label: 'Time Management', description: 'Tracking and estimating time' },
  { value: 'task_initiation', label: 'Task Initiation', description: 'Starting tasks' },
  { value: 'focus_sustaining', label: 'Focus Sustaining', description: 'Maintaining attention' },
  { value: 'transition_support', label: 'Transition Support', description: 'Switching between activities' },
  { value: 'auditory_processing', label: 'Auditory Processing', description: 'Processing spoken language' },
  { value: 'visual_processing', label: 'Visual Processing', description: 'Processing visual information' },
  { value: 'reading_comprehension', label: 'Reading Comprehension', description: 'Understanding written text' },
  { value: 'written_expression', label: 'Written Expression', description: 'Writing clearly' },
  { value: 'verbal_expression', label: 'Verbal Expression', description: 'Speaking clearly' },
  { value: 'mobility', label: 'Mobility', description: 'Physical movement' },
  { value: 'chronic_illness', label: 'Chronic Illness', description: 'Managing ongoing health conditions' },
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function getContentCategoryLabel(category: ContentCategory): string {
  return CONTENT_CATEGORIES.find(c => c.value === category)?.label || category;
}

export function getContentCategoryEmoji(category: ContentCategory): string {
  return CONTENT_CATEGORIES.find(c => c.value === category)?.emoji || '📄';
}

export function getProductCategoryLabel(category: ProductCategory): string {
  return PRODUCT_CATEGORIES.find(c => c.value === category)?.label || category;
}

export function getSupportNeedLabel(need: SupportNeed): string {
  return SUPPORT_NEEDS.find(n => n.value === need)?.label || need;
}