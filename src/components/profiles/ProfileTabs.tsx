// app/components/profiles/ProfileTabs.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Tab {
  name: string;
  href: string;
  count?: number;
}

interface ProfileTabsProps {
  username: string;
  isOwnProfile: boolean;
  productCount?: number;
  followerCount?: number;
  followingCount?: number;
}

export default function ProfileTabs({ 
  username, 
  isOwnProfile, 
  productCount = 0,
  followerCount = 0,
  followingCount = 0
}: ProfileTabsProps) {
  const pathname = usePathname();
  
  const tabs: Tab[] = [
    { 
      name: 'Products', 
      href: `/${username}/products`,
      count: productCount 
    },
    { 
      name: 'About', 
      href: `/${username}/about` 
    },
  ];

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
    <div className="border-b border-white/10">
      <nav className="flex gap-6" aria-label="Profile tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive 
                  ? 'border-cyan-400 text-cyan-400' 
                  : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
                }
              `}
            >
              {tab.name}
              {tab.count !== undefined && (
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