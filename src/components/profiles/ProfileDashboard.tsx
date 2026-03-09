// components/profile-dashboard/ProfileDashboard.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile, Tables } from '@/types/supabase';
import ProfileHeader from './ProfileHeader';
import ProfileNavigation from './ProfileNavigation';
import OverviewTab from './tabs/OverviewTab';
import ChannelTab from './tabs/ChannelTab';
import ResidualsTab from './tabs/ResidualsTab';
import QuestsTab from './tabs/QuestsTab';
import SettingsTab from './tabs/SettingsTab';
import ProductsTab from './tabs/ProductsTab';

// Type definitions (move to separate types file if needed)
export type Residual = Tables<'residual_payouts'> & { products: { title: string, slug: string } | null };
export type UserQuest = Tables<'user_quests'> & { quests: Tables<'quests'> | null };
export type Contribution = Tables<'contributions'> & { products: { title: string, slug: string, is_published: boolean } | null };
export type Channel = Tables<'channels'> & { channels: { handle:string, slug: string, is_published: boolean } | null };


export type Product = Tables<'products'> & {
  contributions?: Contribution[];
  sales_count?: number;
  total_revenue?: number;
}

export interface ProfileDashboardProps {
  profile: Profile;
  residuals: Residual[];
  quests: UserQuest[];
  channels: Channel[];
  contributions: Contribution[];
  products: Product[]; // NEW
  stats: { 
    totalEarned: number; 
    completedQuests: number; 
    activeProducts: number;
    productsRevenue?: number; // NEW
    productsCount?: number;   // NEW
  };
  userId: string;
}
export default function ProfileDashboard({ 
  profile, residuals, quests, channels, contributions, products, stats, userId 
}: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'residuals' | 'quests' | 'settings' | 'products'>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab profile={profile} stats={stats} contributions={contributions} />;
      case 'channels':
        return <ChannelTab profile={profile} />;
      case 'products':
        return <ProductsTab products={products} userId={userId} />;  
      case 'residuals':
        return <ResidualsTab residuals={residuals} total={stats.totalEarned} />;
      case 'quests':
        return <QuestsTab quests={quests} sovereigntyScore={profile.sovereignty_score} />;
      case 'settings':
        return <SettingsTab profile={profile} userId={userId} />;
      default:
        return <OverviewTab profile={profile} stats={stats} contributions={contributions} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ProfileHeader profile={profile} />
      
      <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}