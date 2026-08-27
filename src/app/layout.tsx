// src/app/layout.tsx
import { ReactNode } from 'react';
import '@/app/globals.css';

import '@/styles/generated/variables.css';
import '@/styles/generated/domains.css';
import '@/styles/generated/text-effects.css';
import '@/styles/generated/animations.css';
import '@/styles/generated/typography.css';
import '@/styles/generated/zoom.css';
import '@/styles/generated/parallax.css';
import '@/styles/custom_overrides.css';
import { Navigation } from '@/components/bifrost/Navigation';
import { LayoutChrome } from '@/components/bifrost/LayoutChrome';
import AuthButton from '@/components/asgard/auth/AuthButton';
import Footer from '@/components/bifrost/Footer';

export const metadata = {
  title: 'AudHDities — Sovereign Sanctuary',
  description: 'A place where you belong.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        
        <LayoutChrome>
          {/* The auth button breathes like a nav item: the same gap the bar
              uses between its own items (KP, 2026-08-27: "padding around the
              auth button like the nav buttons"). */}
          <div className='flex items-center justify-center gap-3 px-2'>
            <AuthButton/>
            <Navigation/>
          </div>
          {children}                  
        </LayoutChrome>
        
      </body>
    </html>
  );
}