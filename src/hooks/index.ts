// hooks/index.ts
// Central export for all hooks

// =====================================================
// Core Hooks
// =====================================================
export { useAuth } from './core/useAuth';
export { useUser } from './core/useUser';
export { useProfile } from './core/useProfile';
export { usePermissions } from './core/usePermissions';
//export { useNDPreferences } from './core/useNDPreferences';

// =====================================================
// Entity Hooks
// =====================================================
//export { useCreator, useCreatorByUsername, useCreatorById } from './entities/useCreator';
export { useCreators } from './entities/useCreators';
//export { useVendor, useVendorByUsername, useVendorById } from './entities/useVendor';
export { useVendors } from './entities/useVendors';
//export { useProduct, useProductBySlug, useProductById, useCurrentUserProduct } from './entities/useProduct';
//export { useProducts, useMarketplaceProducts, useCreatorProducts, useVendorProducts } from './entities/useProducts';
//export { useContributions } from './entities/useContributions';
//export { useCommunity } from './entities/useCommunity';

// =====================================================
// Commerce Hooks
// =====================================================
export { useCheckout } from './commerce/useCheckout';
//export { useCart } from './commerce/useCart';
//export { useResiduals } from './commerce/useResiduals';
//export { useSale } from './commerce/useSale';
//export { usePayouts } from './commerce/usePayouts';

// =====================================================
// Gamification Hooks
// =====================================================
//export { useQuests } from './gamification/useQuests';
export { useBadgeManager as useBadges } from './gamification/useBadgeManager';
//export { useChannels } from './gamification/useChannels';
//export { usePosts } from './gamification/usePosts';
//export { useComments } from './gamification/useComments';
//export { useActivityFeed } from './gamification/useActivityFeed';

// =====================================================
// Admin Hooks
// =====================================================
//export { useAdmin } from './admin/useAdmin';
//export { useApplications } from './admin/useApplications';
//export { useModeration } from './admin/useModeration';
//export { useReports } from './admin/useReports';
//export { useNotifications } from './admin/useNotifications';

// =====================================================
// Utility Hooks
// =====================================================
//export { useRequireAuth } from './utils/useRequireAuth';
//export { useRequireRole } from './utils/useRequireRole';
//export { useApplicationSubmit } from './utils/useApplicationSubmit';