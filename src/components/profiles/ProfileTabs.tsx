// app/components/profiles/ProfileTabs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface Tab {
  name: string;
  href: string;
  count?: number;
}

interface ProfileTabsProps {
  profile: Profile;
  communityProfile?: CommunityProfile | null;
  creatorProfile?: CreatorProfile | null;
  vendorProfile?: VendorProfile | null;
  isOwnProfile: boolean;
  // Keep these for backward compatibility
  productCount?: number;
  followerCount?: number;
  followingCount?: number;
}

export default function ProfileTabs({ 
  profile,
  communityProfile,
  creatorProfile,
  vendorProfile,
  isOwnProfile, 
  productCount = 0,
  followerCount = 0,
  followingCount = 0
}: ProfileTabsProps) {
  const pathname = usePathname();
  
  // Build tabs array dynamically
  const tabs: Tab[] = [
    // Overview tab (always first)
    { 
      name: 'Overview', 
      href: `/profile/${profile.username}` 
    },
    
    // About tab (always second)
    { 
      name: 'About', 
      href: `/profile/${profile.username}/about` 
    },
  ];

  // Add Community tab (if community profile exists or if own profile)
  if (communityProfile || isOwnProfile) {
    tabs.push({ 
      name: 'Community', 
      href: `/profile/${profile.username}/community` 
    });
  }

  // Add Creator tab (if user is a creator)
  if (profile.is_creator) {
    tabs.push({ 
      name: 'Creator', 
      href: `/profile/${profile.username}/creator`,
      count: productCount 
    });
  }

  // Add Vendor tab (if user is a vendor)
  if (profile.is_vendor) {
    tabs.push({ 
      name: 'Vendor', 
      href: `/profile/${profile.username}/vendor` 
    });
  }

  // Add Products tab (if they have products)
  if (productCount > 0) {
    tabs.push({ 
      name: 'Products', 
      href: `/profile/${profile.username}/products`,
      count: productCount 
    });
  }

  // Add dashboard tabs for own profile - keeping existing paths
  if (isOwnProfile) {
    tabs.push(
      { 
        name: 'Followers', 
        href: `/dashboard/followers`,
        count: followerCount 
      },
      { 
        name: 'Following', 
        href: `/dashboard/following`,
        count: followingCount 
      }
    );
  }

  return (
    <div className="border-b border-white/10 overflow-x-auto">
      <nav className="flex gap-6 min-w-max px-1" aria-label="Profile tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                ${isActive 
                  ? 'border-cyan-400 text-cyan-400' 
                  : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
                }
              `}
            >
              {tab.name}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`
                  ml-2 py-0.5 px-2 rounded-full text-xs
                  ${isActive 
                    ? 'bg-cyan-400/20 text-cyan-400' 
                    : 'bg-white/10 text-white/60'
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
