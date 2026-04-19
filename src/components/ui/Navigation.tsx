// @/components/ui/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_CONFIG, filterNavItems } from '@/lib/constants/systems/environments/navigation';
import { getPageEnvironment } from '@/lib/constants/systems/environments/page_mapping';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { HStack, VStack } from '@/components/ui/Stack';
import { Container } from '@/components/ui/Container';
import AuthButton from '@/components/auth/AuthButton';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const { beamConfig } = useContinuityBeam();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // User state (would come from your auth system)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userTier, setUserTier] = useState<'community' | 'ally' | 'corporate' | 'council'>('community');
  const [sovereigntyScore, setSovereigntyScore] = useState(0);
  
  // Get current environment from pathname
  const currentEnvironment = getPageEnvironment(pathname);
  
  // Fetch user data (simplified - replace with your actual auth hook)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setIsAuthenticated(!!data.userId);
        setIsAdmin(data.isAdmin || false);
        if (data.userTier) setUserTier(data.userTier);
        if (data.sovereigntyScore) setSovereigntyScore(data.sovereigntyScore);
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);
  
  // Filter navigation items based on current context
  const navItems = useMemo(() => {
    return filterNavItems(NAVIGATION_CONFIG.primary, {
      environment: currentEnvironment,
      userTier,
      isAuthenticated,
      isAdmin,
      sovereigntyScore,
    });
  }, [currentEnvironment, userTier, isAuthenticated, isAdmin, sovereigntyScore]);
  
  const secondaryItems = useMemo(() => {
    return filterNavItems(NAVIGATION_CONFIG.secondary, {
      environment: currentEnvironment,
      userTier,
      isAuthenticated,
      isAdmin,
      sovereigntyScore,
    });
  }, [currentEnvironment, userTier, isAuthenticated, isAdmin, sovereigntyScore]);
  
  const userMenuItems = useMemo(() => {
    return filterNavItems(NAVIGATION_CONFIG.userMenu, {
      environment: currentEnvironment,
      userTier,
      isAuthenticated,
      isAdmin,
      sovereigntyScore,
    });
  }, [currentEnvironment, userTier, isAuthenticated, isAdmin, sovereigntyScore]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={cn('md:block', className)}>
        <Container size="xl" centered>
          <HStack align="center" justify="between" className="h-14">
            {/* Left side - Logo/Brand */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AudHDities
              </span>
            </Link>
            
            {/* Center - Primary Navigation */}
            <HStack align="center" space="sm" className="flex-1 justify-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </HStack>
            
            {/* Right side - Auth & User Menu */}
            <HStack align="center" space="sm" className="flex-shrink-0">
              <AuthButton />
            </HStack>
          </HStack>
        </Container>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Container size="xl" centered>
          <HStack align="center" justify="between" className="h-14">
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AudHDities
              </span>
            </Link>
            
            <HStack align="center" space="sm">
              <AuthButton />
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </HStack>
          </HStack>
        </Container>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-deep-space/95 backdrop-blur-lg border-b border-white/10 z-50 shadow-lg">
            <Container size="xl" centered>
              <VStack space="sm" className="py-4">
                {/* Primary Navigation */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Divider */}
                <div className="h-px bg-white/10 my-2" />
                
                {/* Secondary Navigation */}
                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* User Menu (if authenticated) */}
                {isAuthenticated && userMenuItems.length > 0 && (
                  <>
                    <div className="h-px bg-white/10 my-2" />
                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </>
                )}
              </VStack>
            </Container>
          </div>
        )}
      </div>
    </>
  );
}