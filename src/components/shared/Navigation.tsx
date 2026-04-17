// src/components/shared/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import AuthButton from '@/components/auth/AuthButton';
import { useState, useEffect } from 'react';
import { useProfiles } from '@/hooks/generated/hestia-core/profiles';
import { 
  Home, 
  BookOpen, 
  Eye, 
  Mail, 
  BriefcaseBusiness,
  LayoutDashboard,
  Menu
} from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/vision', label: 'Vision', icon: Eye },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/docs', label: 'Docs', icon: BriefcaseBusiness },
];

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user session from Supabase (or your auth provider)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // You'll need to implement this based on your auth setup
        // This assumes you have a way to get the current user ID
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setIsAuthenticated(!!data.userId);
        setUserId(data.userId);
      } catch {
        setIsAuthenticated(false);
        setUserId(undefined);
      }
    };
    checkAuth();
  }, []);

  // Use the generated hook to fetch profile data when authenticated
  const { data: profile, loading: profileLoading } = useProfiles(userId);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn('hidden md:flex items-center justify-between gap-4', className)}>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
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
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
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
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <AuthButton />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-deep-space/95 backdrop-blur-lg border-b border-white/10 z-50">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
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
            
            {isAuthenticated && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
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
        </div>
      )}
    </>
  );
}