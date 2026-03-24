// src/components/layout/Sidebar.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import type { Database } from '@/types/supabase/database.types';
import { usePermissions } from '@/hooks/usePermissions';
import { useProfile } from '@/hooks/useProfile';
import { createClient } from '@/lib/supabase/client';
import { 
  Home,
  User,
  Settings,
  Package,
  Store,
  Palette,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Award,
  Users,
  BookOpen,
  Sparkles,
  HelpCircle,
  Heart
} from 'lucide-react';

export interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  position?: 'left' | 'right';
  variant?: 'default' | 'floating' | 'minimal';
  showUser?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning' | 'purple';
  roles?: ('admin' | 'creator' | 'vendor' | 'community' | 'participant' | 'observer' | 'anon')[];
  exact?: boolean;
}

export function Sidebar({ 
  className,
  collapsed: controlledCollapsed,
  onCollapse,
  position = 'left',
  variant = 'default',
  showUser = true,
  collapsible = true,
  defaultCollapsed = false,
}: SidebarProps) {
  
  const pathname = usePathname();
  const { isAdmin, isCreator, isVendor, isCommunity, loading: permissionsLoading } = usePermissions();
  const { profile, loading: profileLoading } = useProfile();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  // Helper to check if a user has the required roles for a nav item
  const hasRequiredRole = (item: NavItem): boolean => {
    // If no roles specified, always show
    if (!item.roles) return true;
    
    // Check each role requirement
    if (item.roles.includes('admin') && isAdmin) return true;
    if (item.roles.includes('creator') && isCreator) return true;
    if (item.roles.includes('vendor') && isVendor) return true;
    if (item.roles.includes('community') && isCommunity) return true;
    
    // For participant/observer/anon - these are base roles that everyone has
    if (item.roles.includes('participant')) return true;
    if (item.roles.includes('observer')) return true;
    if (item.roles.includes('anon')) return true;
    
    return false;
  };

  // Navigation items configuration
  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: Home, exact: true },
    { href: '/profile', label: 'Profile', icon: User },
    { 
      href: '/creator', 
      label: 'Creator Studio', 
      icon: Palette, 
      roles: ['creator'],
      badge: isCreator ? undefined : 'Apply',
      badgeVariant: 'primary'
    },
    { 
      href: '/vendor', 
      label: 'Vendor Dashboard', 
      icon: Store, 
      roles: ['vendor'],
      badge: isVendor ? undefined : 'Apply',
      badgeVariant: 'primary'
    },
    { 
      href: '/products', 
      label: 'My Products', 
      icon: Package, 
      roles: ['creator', 'vendor'] 
    },
    { 
      href: '/community', 
      label: 'Community', 
      icon: Users,
      roles: ['community']
    },
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  // Admin only items
  const adminItems: NavItem[] = [
    { href: '/admin', label: 'Admin Dashboard', icon: Shield, roles: ['admin'] },
    { 
      href: '/admin/applications', 
      label: 'Applications', 
      icon: Users, 
      roles: ['admin'],
      badge: 'Pending',
      badgeVariant: 'warning'
    },
    { href: '/admin/users', label: 'Users', icon: Users, roles: ['admin'] },
    { href: '/admin/products', label: 'Moderation', icon: Package, roles: ['admin'] },
    { href: '/admin/transparency', label: 'Transparency', icon: Heart, roles: ['admin'] },
  ];

  // Filter items based on user roles
  const filteredNavItems = navItems.filter(hasRequiredRole);
  const filteredAdminItems = adminItems.filter(hasRequiredRole);

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname?.startsWith(item.href) || false;
  };

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) setInternalCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  const variantStyles = {
    default: {
      sidebar: 'bg-black/40 backdrop-blur-xl border-r border-white/10',
      header: 'border-b border-white/10',
      footer: 'border-t border-white/10',
    },
    floating: {
      sidebar: 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl m-4',
      header: 'border-b border-white/10',
      footer: 'border-t border-white/10',
    },
    minimal: {
      sidebar: 'bg-transparent border-r border-white/5',
      header: 'border-b border-white/5',
      footer: 'border-t border-white/5',
    },
  };

  const positionStyles = { left: 'left-0', right: 'right-0' };

  if (permissionsLoading || profileLoading) {
    return (
      <aside className={cn(
        'fixed top-0 h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10',
        'flex items-center justify-center',
        positionStyles[position],
        className
      )}>
        <div className="text-white/40">Loading...</div>
      </aside>
    );
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn(
        'flex items-center h-16 px-4',
        variantStyles[variant].header,
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <Link href="/" className="text-xl font-bold text-white">
            AUDHDITIES
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="text-xl font-bold text-white">
            A
          </Link>
        )}
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCollapse}
            className={cn(isCollapsed && 'ml-0')}
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {position === 'left' ? (
              isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />
            ) : (
              isCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
            )}
          </Button>
        )}
      </div>

      {/* User profile section */}
      {showUser && profile && (
        <Link
          href="/profile"
          className={cn(
            'flex items-center gap-3 p-4 mx-2 my-2 rounded-lg transition-colors',
            'hover:bg-white/5',
            pathname === '/profile' && 'bg-white/10'
          )}
          onClick={closeMobile}
        >
          <div className="relative">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {(profile.display_name || profile.username || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {profile.is_quantum_weaver && (
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {profile.display_name || profile.username || 'User'}
              </p>
              <p className="text-xs text-white/40 truncate">
                {profile.user_tier || 'community'} 
                {profile.sovereignty_score !== undefined && ` • ${profile.sovereignty_score} pts`}
              </p>
            </div>
          )}
        </Link>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative',
                'hover:bg-white/5',
                active && 'bg-white/10',
                isCollapsed && 'justify-center'
              )}
              onClick={closeMobile}
            >
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0',
                active ? 'text-cyan-400' : 'text-white/60'
              )} />
              {!isCollapsed && (
                <>
                  <span className={cn(
                    'flex-1 text-sm',
                    active ? 'text-white' : 'text-white/80'
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || 'default'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
              {isCollapsed && item.badge && (
                <Badge 
                  variant={item.badgeVariant || 'default'} 
                  size="sm"
                  className="absolute -top-1 -right-1"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}

        {filteredAdminItems.length > 0 && !isCollapsed && (
          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="px-3 text-xs font-medium text-white/40 uppercase tracking-wider">
              Admin
            </p>
          </div>
        )}

        {filteredAdminItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                'hover:bg-white/5',
                active && 'bg-white/10',
                isCollapsed && 'justify-center'
              )}
              onClick={closeMobile}
            >
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0',
                active ? 'text-purple-400' : 'text-white/60'
              )} />
              {!isCollapsed && (
                <span className={cn(
                  'flex-1 text-sm',
                  active ? 'text-white' : 'text-white/80'
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn('p-4', variantStyles[variant].footer)}>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-white/80 hover:text-white',
            isCollapsed && 'justify-center px-2'
          )}
          onClick={() => {
            const supabase = createClient();
            supabase.auth.signOut();
          }}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="text-sm">Sign Out</span>}
        </Button>
      </div>
    </div>
  );

  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMobile}
      className="fixed top-4 left-4 z-50 lg:hidden"
      aria-label="Toggle menu"
    >
      <Menu size={20} />
    </Button>
  );

  return (
    <>
      <MobileMenuButton />
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}
      <aside className={cn(
        'fixed top-0 h-screen w-64 z-50 transition-transform duration-300 lg:hidden',
        variantStyles[variant].sidebar,
        positionStyles[position],
        mobileOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'
      )}>
        <div className="relative h-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={closeMobile}
            className="absolute top-4 right-4"
            aria-label="Close"
          >
            <X size={18} />
          </Button>
          {SidebarContent}
        </div>
      </aside>
      <aside className={cn(
        'fixed top-0 h-screen hidden lg:block transition-all duration-300',
        variantStyles[variant].sidebar,
        positionStyles[position],
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}>
        {SidebarContent}
      </aside>
    </>
  );
}