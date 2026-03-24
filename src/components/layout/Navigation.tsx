// src/components/layout/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import AuthButton from '@/components/auth/AuthButton';
import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile';
import { 
  Home, 
  BookOpen, 
  Eye, 
  Mail, 
  BriefcaseBusiness,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';


interface NavigationProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home', icon: Home, glow: 'sovereign' },
  { href: '/vision', label: 'Vision', icon: Eye, glow: 'fire' },
  { href: '/learn', label: 'Learn', icon: BookOpen, glow: 'water' },
  { href: '/contact', label: 'Contact', icon: Mail, glow: 'earth' },
  { href: '/docs', label: 'Docs', icon: BriefcaseBusiness, glow: 'quantum' },
];

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const { profile } = useProfile();
  const isAuthenticated = !!profile;

  return (
    <nav className={cn('justify-center h-min overflow-hidden gap-4', className)}>
      {/* Desktop Navigation */}
      <div className="md:flex text-center justify-center items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center text-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        
        {/* Dashboard link - only for authenticated users */}
        {isAuthenticated && (
          <Link
            href="/dashboard"
            className={cn(
              'flex text-center items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname.startsWith('/dashboard')
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        )}
      </div>
      
      {/* Auth Button */}
      <AuthButton />
      
      {/* Mobile menu button (could be enhanced) */}
      <button 
        className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
        aria-label="Menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}